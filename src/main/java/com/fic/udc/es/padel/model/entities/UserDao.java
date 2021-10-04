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
	
	@Query("select u from User u where (?1=null OR u.login LIKE %?1%) and (?2=null OR u.level > ?2) and (?3=null OR u.level < ?3)")
	Page<User> findAll(String login, Float minLevel, Float maxLevel, Pageable pageable);
	
	@Query("select distinct u from User u JOIN u.schedules s where u.level between ?1 and ?2 and ?3 between s.initHour and s.finalHour and ?4 = s.day order by u.login")
	List<User> findUserByLevelAndSchedules(float minLevel, float maxLevel, int date, DayOfWeek day);
	
	@Query("select count(u) FROM User u JOIN u.teams t where u.userId = ?1 and t.resultMatch = ?2")
	int getCountGamesUserByResult(Long userId, String result);
}
