package com.fic.udc.es.padel.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.fic.udc.es.padel.model.entities.Game;
import com.fic.udc.es.padel.model.entities.PadelSet;
import com.fic.udc.es.padel.model.exceptions.FieldTakenException;
import com.fic.udc.es.padel.model.exceptions.FinishedGameException;
import com.fic.udc.es.padel.model.exceptions.GameTypeException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;
import com.fic.udc.es.padel.model.exceptions.NoSpaceException;
import com.fic.udc.es.padel.model.exceptions.UserAlreadyAddedException;
import com.fic.udc.es.padel.model.exceptions.UserNotFoundException;

public interface GameService {
	
	public Game getGameById(Long id) throws InstanceNotFoundException;
	
	public Block<Game> findGamesByUserId(Long userId, int page, int size);
	
	public Block<Game> findAllFinishedGames(int page, int size, String login, LocalDateTime initDate, LocalDateTime finalDate);
	
	public Block<Game> findAllPublishedGames(int page, int size);
	
	public List<Game> findByLevelAndScheduleAndDate(Long userId, LocalDateTime initDate, LocalDateTime finalDate) throws InstanceNotFoundException;
	
	public void deleteGame(Long id) throws InstanceNotFoundException;
	
	public void addPlayerToGame(Long gameId, Long userId) throws InstanceNotFoundException, FinishedGameException, UserAlreadyAddedException, NoSpaceException;
	
	public void addPlayerToTeam(Long teamId, Long userId) throws InstanceNotFoundException, FinishedGameException, UserAlreadyAddedException, NoSpaceException;

	void removePlayerToGame(Long gameId, Long userId)
			throws InstanceNotFoundException, FinishedGameException, UserNotFoundException;
	
	void removePlayerToTeam(Long teamId, Long userId)
			throws InstanceNotFoundException, FinishedGameException, UserNotFoundException;
	
	Game createGame(LocalDateTime initDate, LocalDateTime finalDate, float minimunLevel, float maximunLevel, Long fieldId, int gameType) throws InstanceNotFoundException, FieldTakenException;

	void scoreGame(Long gameId, Set<PadelSet> sets) throws InstanceNotFoundException, GameTypeException;

	List<Game> findGameByDate(LocalDateTime initDate, LocalDateTime finalDate);
	
	List<Game> findGameByUserAndDatePublished(Long userId, LocalDateTime date) throws InstanceNotFoundException;
	
}
