package com.fic.udc.es.padel.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.HashSet;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.RoleEnum;
import com.fic.udc.es.padel.model.entities.Schedule;
import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.exceptions.DuplicateInstanceException;
import com.fic.udc.es.padel.model.exceptions.IncorrectLoginException;
import com.fic.udc.es.padel.model.exceptions.IncorrectPasswordException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;

@SpringBootTest
@ActiveProfiles("test")
@SpringJUnitConfig
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
@TestPropertySource(locations="classpath:application-test.properties")
@Transactional
public class UserServiceTest {
	
	private final Long NON_EXISTENT_ID = new Long(-1);
	
	@Autowired
	private UserService userService;
	
	private User createUser(String login) {
		User user = new User();
		user.setLogin(login);
		user.setName("Name");
		user.setPassword("password");
		user.setPosition("Position");
		user.setRole(RoleEnum.ADMIN);
		user.setState(true);
		user.setLevel(2);
		user.setLastname1("lastName");
		user.setLastname2("lastName");
		return user;
	}
	
	@Test
	public void testSignUpAndLoginFromId() throws DuplicateInstanceException, InstanceNotFoundException {
		
		User user = createUser("user");
		
		userService.signUp(user);
		
		User loggedInUser = userService.loginFromId(user.getUserId());
		
		assertEquals(user, loggedInUser);
		assertEquals(RoleEnum.USER, user.getRole());
		
	}
	
	@Test
	public void testSignUpDuplicatedUserName() throws DuplicateInstanceException {
		
		User user = createUser("user");
		
		userService.signUp(user);
		assertThrows(DuplicateInstanceException.class, () -> userService.signUp(user));
		
	}
	
	@Test
	public void testLoginFromNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () -> userService.loginFromId(NON_EXISTENT_ID));
	}
	
	@Test
	public void testLogin() throws DuplicateInstanceException, IncorrectLoginException {
		
		User user = createUser("user");
		String clearPassword = user.getPassword();
				
		userService.signUp(user);
		
		User loggedInUser = userService.login(user.getLogin(), clearPassword);
		
		assertEquals(user, loggedInUser);
		
	}
	
	@Test
	public void testLoginWithIncorrectPassword() throws DuplicateInstanceException {
		
		User user = createUser("user");
		String clearPassword = user.getPassword();
		
		userService.signUp(user);
		assertThrows(IncorrectLoginException.class, () ->
			userService.login(user.getLogin(), 'X' + clearPassword));
		
	}
	
	@Test
	public void testLoginWithNonExistentUserName() {
		assertThrows(IncorrectLoginException.class, () -> userService.login("X", "Y"));
	}
	
	@Test
	public void testUpdateProfile() throws InstanceNotFoundException, DuplicateInstanceException {
		
		User user = createUser("user");
		
		userService.signUp(user);
		
		user.setName('X' + user.getName());
		user.setLastname1('X' + user.getLastname1());
		user.setLastname2('X' + user.getLastname2());
		Set<Schedule> schedules = new HashSet<>();
		
		userService.updateProfile(user.getUserId(), 'X' + user.getName(),'X' + user.getLastname1(), 
				'X'+ user.getLastname2(), true, "Position", Float.valueOf(2), 
				schedules, null);
		
		User updatedUser = userService.loginFromId(user.getUserId());
		
		assertEquals(user, updatedUser);
		
	}
	
	@Test
	public void testUpdateProfileWithNonExistentId() {
		Set<Schedule> schedules = new HashSet<>();
		assertThrows(InstanceNotFoundException.class, () ->
			userService.updateProfile(NON_EXISTENT_ID, "X", "X", "X", true, "X", 
					Float.valueOf(0), schedules, null));
	}
	
	@Test
	public void testChangePassword() throws DuplicateInstanceException, InstanceNotFoundException,
		IncorrectPasswordException, IncorrectLoginException {
		
		User user = createUser("user");
		String oldPassword = user.getPassword();
		String newPassword = 'X' + oldPassword;
		
		userService.signUp(user);
		userService.changePassword(user.getUserId(), oldPassword, newPassword);
		userService.login(user.getLogin(), newPassword);
		
	}
	
	@Test
	public void testChangePasswordWithNonExistentId() {
		assertThrows(InstanceNotFoundException.class, () ->
			userService.changePassword(NON_EXISTENT_ID, "X", "Y"));
	}
	
	@Test
	public void testChangePasswordWithIncorrectPassword() throws DuplicateInstanceException {
		
		User user = createUser("user");
		String oldPassword = user.getPassword();
		String newPassword = 'X' + oldPassword;
		
		userService.signUp(user);
		assertThrows(IncorrectPasswordException.class, () ->
			userService.changePassword(user.getUserId(), 'Y' + oldPassword, newPassword));
		
	}
}
