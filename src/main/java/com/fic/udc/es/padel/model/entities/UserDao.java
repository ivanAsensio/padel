package com.fic.udc.es.padel.model.entities;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<User, Long>{

	public Optional<User> getByUserId(Long id);
	
	public boolean existsById(Long userId);
	
	public Optional<User> findByLogin(String login);
	
	public boolean existsByLogin(String name);
	
	
}
