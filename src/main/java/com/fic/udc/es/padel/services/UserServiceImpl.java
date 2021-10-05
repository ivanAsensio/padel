package com.fic.udc.es.padel.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.RoleEnum;
import com.fic.udc.es.padel.model.entities.Schedule;
import com.fic.udc.es.padel.model.entities.ScheduleDao;
import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.entities.UserDao;
import com.fic.udc.es.padel.model.exceptions.DuplicateInstanceException;
import com.fic.udc.es.padel.model.exceptions.IncorrectLoginException;
import com.fic.udc.es.padel.model.exceptions.IncorrectPasswordException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	private PermissionChecker permissionChecker;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ScheduleDao scheduleDao;

	@Override
	public void signUp(User user) throws DuplicateInstanceException {
		
		if (userDao.existsByLogin(user.getLogin())) {
			throw new DuplicateInstanceException("project.entities.user", user.getLogin());
		}
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole(RoleEnum.USER);
		
		userDao.save(user);
		
	}

	@Override
	@Transactional(readOnly=true)
	public User login(String userName, String password) throws IncorrectLoginException {
		
		Optional<User> user = userDao.findByLogin(userName);
		
		if (!user.isPresent()) {
			throw new IncorrectLoginException(userName, password);
		}
		
		if (!passwordEncoder.matches(password, user.get().getPassword())) {
			throw new IncorrectLoginException(userName, password);
		}
		
		return user.get();
		
	}

	@Override
	@Transactional(readOnly=true)
	public User loginFromId(Long id) throws InstanceNotFoundException {
		return permissionChecker.checkUser(id);
	}

	@Override
	public User updateProfile(Long id, String firstName, String lastName1, 
			String lastName2, boolean state, String position, float level, 
			Set<Schedule> schedules, String image) throws InstanceNotFoundException {
		
		User user = permissionChecker.checkUser(id);
		
		user.setName(firstName);
		user.setLastname1(lastName1);
		user.setLastname2(lastName2);
		user.setLevel(level);
		user.setPosition(position);
		user.setState(state);
		if(image != null) {
			user.setImage(image);
		}
		
		return user;

	}

	@Override
	public void changePassword(Long id, String oldPassword, String newPassword)
		throws InstanceNotFoundException, IncorrectPasswordException {
		
		User user = permissionChecker.checkUser(id);
		
		if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
			throw new IncorrectPasswordException();
		} else {
			user.setPassword(passwordEncoder.encode(newPassword));
		}
		
	}

	@Override
	public void changeLevel(Long id, float newLevel) throws InstanceNotFoundException {
		
		Optional<User> user = userDao.getByUserId(id);
		
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", id);
		}
		
		User userObtained = user.get();
		
		userObtained.setLevel(newLevel);
		
	}

	@Override
	public User getUserById(Long id) throws InstanceNotFoundException{

		Optional<User> user = userDao.getByUserId(id);
		
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", id);
		}
		
		return user.get();
	}

	@Override
	public Block<User> getAllUsers(int page, int size, String login, Float minLevel, Float maxLevel, String name) {
		Page<User> users = userDao.findAll(login, minLevel, maxLevel, name, PageRequest.of(page, size));
		return new Block<>(users.getContent(), users.hasNext());
	}

	@Override
	public List<User> findUserByLevelAndDate(float minLevel, float maxLevel, LocalDateTime date) {
		int mins = (date.getHour() * 60) + date.getMinute();
		return userDao.findUserByLevelAndSchedules(minLevel, maxLevel, mins, date.getDayOfWeek());
	}

	@Override
	public List<Schedule> findSchedulesByUserId(Long userId) throws InstanceNotFoundException {
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		return scheduleDao.findByUser(user.get());
	}

	@Override
	public void addScheduleByUserId(Schedule schedule, Long userId) throws InstanceNotFoundException {
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		scheduleDao.save(schedule);
		
	}

	@Override
	public void deleteSchedulebyScheduleId(Long scheduleId) throws InstanceNotFoundException {
		Optional<Schedule> schedule = scheduleDao.findById(scheduleId);
		if(!schedule.isPresent()) {
			throw new InstanceNotFoundException("project.entities.schedule", scheduleId);
		}
		scheduleDao.delete(schedule.get());	
	}

	@Override
	public int getCountGamesByUserIdAndResult(Long userId, String result) throws InstanceNotFoundException {
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		return userDao.getCountGamesUserByResult(userId, result);
	}
	
}
