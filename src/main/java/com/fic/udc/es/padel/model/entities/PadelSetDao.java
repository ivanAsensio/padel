package com.fic.udc.es.padel.model.entities;

import java.util.Set;

import org.springframework.data.repository.PagingAndSortingRepository;

public interface PadelSetDao extends PagingAndSortingRepository<PadelSet, Long>{
	
	Set<PadelSet> findPadelSetByGameGameId(Long id);

}
