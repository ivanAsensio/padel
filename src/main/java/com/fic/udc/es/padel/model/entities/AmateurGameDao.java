package com.fic.udc.es.padel.model.entities;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AmateurGameDao extends PagingAndSortingRepository<AmateurGame, Long>  {
	
	@Query("select count(g) from Game g where ?1 member of g.gameUsers")
	int findCountGameUsersByUserId(User user);
	
}
