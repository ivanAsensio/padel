package com.fic.udc.es.padel.model.entities;

import java.util.Set;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface TeamDao extends PagingAndSortingRepository<Team, Long>{
	
	Set<Team> findTeamByGameGameId(Long id);

}
