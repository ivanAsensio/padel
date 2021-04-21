package com.fic.udc.es.padel.services;

import java.util.Set;

import com.fic.udc.es.padel.model.entities.Schedule;
import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.exceptions.DuplicateInstanceException;
import com.fic.udc.es.padel.model.exceptions.IncorrectLoginException;
import com.fic.udc.es.padel.model.exceptions.IncorrectPasswordException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;

public interface UserService {
	
	void signUp(User user) throws DuplicateInstanceException;
	
	User login(String userName, String password) 
			throws IncorrectLoginException;
	
	User loginFromId(Long id) throws InstanceNotFoundException;
	
	User updateProfile(Long id, String firstName, String lastName1, 
			String lastName2, Set<Schedule> schedules) throws InstanceNotFoundException;
	
	void changePassword(Long id, String oldPassword, String newPassword)
			throws InstanceNotFoundException, IncorrectPasswordException;
	
	void changeLevel(Long id, float newLevel) throws InstanceNotFoundException;
	
	User getUserById(Long id) throws InstanceNotFoundException;
	
	
	

}
