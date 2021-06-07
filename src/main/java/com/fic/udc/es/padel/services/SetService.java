package com.fic.udc.es.padel.services;

import java.util.Set;

import com.fic.udc.es.padel.model.entities.PadelSet;

public interface SetService {
	
	Set<PadelSet> getSetsByGameId(Long id);

}
