package com.fic.udc.es.padel.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.PadelSet;
import com.fic.udc.es.padel.model.entities.PadelSetDao;
import com.fic.udc.es.padel.model.entities.ProfessionalGame;

@Service
@Transactional
public class SetServiceImpl implements SetService{
	
	@Autowired
	private PadelSetDao setDao;

	@Override
	public Set<PadelSet> getSetsByGameId(Long id) {
		return setDao.findPadelSetByGameGameId(id);
	}

	@Override
	public void deleteScore(Long gameId) {
		Set<PadelSet> sets = getSetsByGameId(gameId);
		for(PadelSet set: sets) {
			setDao.delete(set);
		}
	}

}
