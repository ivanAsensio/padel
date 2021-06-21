package com.fic.udc.es.padel.model.entities;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository<User, Long>{

	public Optional<User> getByUserId(Long id);
	
	public boolean existsById(Long userId);
	
	public Optional<User> findByLogin(String login);
	
	public boolean existsByLogin(String name);
	
	Page<User> findAll(Pageable pageable);
	
	@Query("select distinct u from User u JOIN u.schedules s where u.level between ?1 and ?2 and ?3 between s.initHour and s.finalHour and ?4 = s.day")
	List<User> findUserByLevelAndSchedules(float minLevel, float maxLevel, int date, DayOfWeek day);
	
}
