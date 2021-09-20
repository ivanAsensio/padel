package com.fic.udc.es.padel.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.Team;
import com.fic.udc.es.padel.model.entities.TeamDao;

@Service
@Transactional
public class TeamServiceImpl implements TeamService{
	
	@Autowired
	private TeamDao teamDao;

	@Override
	public Set<Team> findTeamByGameId(Long id) {
		return teamDao.findTeamByGameGameId(id);
	}

	@Override
	public void deleteResultMatch(Long gameId) {
		Set<Team> teams = teamDao.findTeamByGameGameId(gameId);
		for(Team team: teams) {
			team.setResultMatch(null);
			teamDao.save(team);
		}
		
	}

}
