package com.fic.udc.es.padel.model.entities;


import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameDao extends PagingAndSortingRepository<Game, Long>{
	
	Slice<Game> findByUserId(Long userId, Pageable pageable);
	
	@Query("select g from Game g where 1 < u.initDate and 2 betwwen g.minimunLevel and g.maximunLevel")
	Slice<Game> findByInitDateAndLevel(LocalDateTime date, float level, Pageable pageable);
	
	@Query("select g from Game g where u.initDate < 1")
	Slice<Game> findFinishedGames(LocalDateTime date, Pageable pageable);
	
	@Query("select g from Game g where u.initDate > 1")
	Slice<Game> findPublishedGames(LocalDateTime date, Pageable pageable);
	
	@Query("select g from Game g where u.field = 2 and 1 between u.initDate and u.finalDate")
	Optional<Game> findGameByDate(LocalDateTime date, Field field);

}
