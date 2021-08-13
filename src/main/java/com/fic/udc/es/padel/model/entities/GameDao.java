package com.fic.udc.es.padel.model.entities;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface GameDao extends PagingAndSortingRepository<Game, Long>{
	
	Slice<Game> findByGameUsersUserIdOrderByInitDateDesc(Long userId, Pageable pageable);
	
	@Query("select g from Game g where ?1 < g.initDate and ?2 between g.minimunLevel and g.maximunLevel order by g.initDate desc")
	Slice<Game> findAllWithDateAndLevel(LocalDateTime date, float level, Pageable pageable);
	
	@Query("select g from Game g where g.initDate < ?1 order by g.initDate desc")
	Slice<Game> findAllWithDateFinished(LocalDateTime date, Pageable pageable);
	
	@Query("select g from Game g where g.initDate > ?1 order by g.initDate desc")
	Slice<Game> findAllWithDatePublished(LocalDateTime date, Pageable pageable);
	
	@Query("select g from Game g where g.field = ?2 and ?1 between g.initDate and g.finalDate")
	Optional<Game> findGameByDate(LocalDateTime date, Field field);
	
	@Query("select g from Game g where g.initDate between ?1 and ?2 and ?3 between g.minimunLevel and g.maximunLevel order by g.initDate desc")
	List<Game> findGameByDateAndLevel(LocalDateTime initDate, LocalDateTime finalDate, float level);

	@Query("select g from Game g where g.initDate between ?1 and ?2 order by g.initDate desc")
	List<Game> findGameByDate(LocalDateTime initDate, LocalDateTime finalDate);

	@Query("select g from Game g where g.field.fieldId = ?3 and ?1 between g.initDate and g.finalDate and "
			+ "?2 between g.initDate and g.finalDate order by g.initDate desc")
	Optional<Game> findGameByDateAndCampo(LocalDateTime initDate, LocalDateTime finalDate, Long fieldId);
}
