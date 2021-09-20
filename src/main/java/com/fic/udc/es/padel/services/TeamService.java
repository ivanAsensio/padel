package com.fic.udc.es.padel.services;

import java.util.Set;

import com.fic.udc.es.padel.model.entities.Team;

public interface TeamService {
	
	Set<Team> findTeamByGameId(Long id);
	
	void deleteResultMatch(Long gameId);

}
