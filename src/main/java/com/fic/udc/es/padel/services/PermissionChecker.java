package com.fic.udc.es.padel.services;

import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;

public interface PermissionChecker {
	
	public void checkUserExists(Long userId) throws InstanceNotFoundException;
	
	public User checkUser(Long userId) throws InstanceNotFoundException;
	
	
}