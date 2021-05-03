package com.fic.udc.es.padel.services;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
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
		
		if (userDao.existsByName(user.getName())) {
			throw new DuplicateInstanceException("project.entities.user", user.getName());
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
			Set<Schedule> schedules) throws InstanceNotFoundException {
		
		User user = permissionChecker.checkUser(id);
		
		user.setName(firstName);
		user.setLastname1(lastName1);
		user.setLastname2(lastName2);
		user.setLevel(level);
		user.setPosition(position);
		user.setState(state);
		List<Schedule> schedulesObtained = scheduleDao.findByUser(user);
		if(schedulesObtained.size() != 0) {
			for(Schedule schedule : schedulesObtained) {
				scheduleDao.delete(schedule);
			}
		}
		for(Schedule schedule : schedules) {
			scheduleDao.save(schedule);
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
	
	

}
