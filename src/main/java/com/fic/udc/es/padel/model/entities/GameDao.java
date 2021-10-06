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
	
	@Query("select g from Game g where ?1 member of g.gameUsers and ?2 < g.initDate order by g.initDate desc")
	List<Game> findGamesUserPending(User user, LocalDateTime date);
	
	@Query("select g from Game g where ?1 < g.initDate and ?2 between g.minimunLevel and g.maximunLevel order by g.initDate desc")
	Slice<Game> findAllWithDateAndLevel(LocalDateTime date, float level, Pageable pageable);
	
	@Query("select g from Game g JOIN g.gameUsers u where (?1=null OR g.initDate > ?1) and (?2=null OR g.finalDate < ?2) and (?3=null OR ?3 member of g.gameUsers) "
			+ "and (?4=null OR (u.name like %?4% OR u.lastname1 like %?4% OR u.lastname2 like %?4%)) order by g.initDate desc")
	Slice<Game> findAllWithDateFinished(LocalDateTime initDate, LocalDateTime finalDate, User user, String name, Pageable pageable);
	
	@Query("select g from Game g order by g.initDate desc")
	Slice<Game> findAllWithDatePublished(LocalDateTime date, Pageable pageable);
	
	@Query("select g from Game g where g.field = ?2 and ?1 between g.initDate and g.finalDate")
	Optional<Game> findGameByDate(LocalDateTime date, Field field);
	
	@Query("select g from Game g where g.initDate between ?1 and ?2 and ?3 between g.minimunLevel and g.maximunLevel order by g.initDate desc")
	List<Game> findGameByDateAndLevel(LocalDateTime initDate, LocalDateTime finalDate, float level);

	@Query("select g from Game g where g.initDate between ?1 and ?2 order by g.initDate desc")
	List<Game> findGameByDate(LocalDateTime initDate, LocalDateTime finalDate);

	@Query("select g from Game g where g.field.fieldId = ?3 and (?1 between g.initDate and g.finalDate or "
			+ "?2 between g.initDate and g.finalDate)")
	List<Game> findGameByDateAndField(LocalDateTime initDate, LocalDateTime finalDate, Long fieldId);
}
