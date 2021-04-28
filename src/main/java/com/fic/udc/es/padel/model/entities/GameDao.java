package com.fic.udc.es.padel.model.entities;


import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameDao extends PagingAndSortingRepository<Game, Long>{
	
	Slice<Game> findByGameUsersUserId(Long userId, Pageable pageable);
	
	@Query("select g from Game g where 1 < g.initDate and 2 between g.minimunLevel and g.maximunLevel")
	Slice<Game> findAllWithDateAndLevel(LocalDateTime date, float level, Pageable pageable);
	
	@Query("select g from Game g where g.initDate < 1")
	Slice<Game> findAllWithDateFinished(LocalDateTime date, Pageable pageable);
	
	@Query("select g from Game g where g.initDate > 1")
	Slice<Game> findAllWithDatePublished(LocalDateTime date, Pageable pageable);
	
	@Query("select g from Game g where g.field = 2 and 1 between g.initDate and g.finalDate")
	Optional<Game> findGameByDate(LocalDateTime date, Field field);

}
