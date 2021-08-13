package com.fic.udc.es.padel.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.AmateurGame;
import com.fic.udc.es.padel.model.entities.Field;
import com.fic.udc.es.padel.model.entities.FieldDao;
import com.fic.udc.es.padel.model.entities.Game;
import com.fic.udc.es.padel.model.entities.GameDao;
import com.fic.udc.es.padel.model.entities.PadelSet;
import com.fic.udc.es.padel.model.entities.PadelSetDao;
import com.fic.udc.es.padel.model.entities.ProfessionalGame;
import com.fic.udc.es.padel.model.entities.ProfessionalGameDao;
import com.fic.udc.es.padel.model.entities.Schedule;
import com.fic.udc.es.padel.model.entities.ScheduleDao;
import com.fic.udc.es.padel.model.entities.Team;
import com.fic.udc.es.padel.model.entities.TeamDao;
import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.entities.UserDao;
import com.fic.udc.es.padel.model.exceptions.FieldTakenException;
import com.fic.udc.es.padel.model.exceptions.FinishedGameException;
import com.fic.udc.es.padel.model.exceptions.GameTypeException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;
import com.fic.udc.es.padel.model.exceptions.NoSpaceException;
import com.fic.udc.es.padel.model.exceptions.UserAlreadyAddedException;
import com.fic.udc.es.padel.model.exceptions.UserNotFoundException;

@Service
@Transactional
public class GameServiceImpl implements GameService {

	@Autowired
	private GameDao gameDao;

	@Autowired
	private UserDao userDao;
	
	@Autowired
	private FieldDao fieldDao;

	@Autowired
	private ScheduleDao scheduleDao;
	
	@Autowired
	private TeamDao teamDao;
	
	@Autowired
	private PadelSetDao setDao;
	
	@Autowired
	private ProfessionalGameDao professionalGameDao;

	@Override
	public Game getGameById(Long id) throws InstanceNotFoundException {

		Optional<Game> game = gameDao.findById(id);

		if (!game.isPresent()) {
			throw new InstanceNotFoundException("project.entities.game", id);
		}

		return game.get();

	}

	@Override
	public Block<Game> findGamesByUserId(Long userId, int page, int size) {

		Slice<Game> games = gameDao.findByGameUsersUserIdOrderByInitDateDesc(userId, PageRequest.of(page, size));

		return new Block<>(games.getContent(), games.hasNext());
	}

	@Override
	public Block<Game> findAllFinishedGames(int page, int size) {

		Slice<Game> games = gameDao.findAllWithDateFinished(LocalDateTime.now(), PageRequest.of(page, size));

		return new Block<>(games.getContent(), games.hasNext());
	}
	
	@Override
	public Block<Game> findAllPublishedGames(int page, int size) {

		Slice<Game> games = gameDao.findAllWithDatePublished(LocalDateTime.now(), PageRequest.of(page, size));

		return new Block<>(games.getContent(), games.hasNext());
	}

	@Override
	public void deleteGame(Long id) throws InstanceNotFoundException {
		Optional<Game> game = gameDao.findById(id);
		if(!game.isPresent()) {
			throw new InstanceNotFoundException("project.entities.game", id);
		}
		gameDao.delete(game.get());
		
	}

	@Override
	public void addPlayerToGame(Long gameId, Long userId) throws InstanceNotFoundException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		Optional<Game> game = gameDao.findById(gameId);
		if(!game.isPresent()) {
			throw new InstanceNotFoundException("project.entities.game", gameId);
		}
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		LocalDateTime date = game.get().getInitDate();
		if(date.isBefore(LocalDateTime.now())) {
			throw new FinishedGameException();
		}
		Game gameObtained = game.get();
		if(gameObtained.getGameUsers().size() > 3) {
			throw new NoSpaceException();
		}
		for(User gameUser : gameObtained.getGameUsers()) {
			if(gameUser.getUserId() == userId) {
				throw new UserAlreadyAddedException();
			}
		}
		gameObtained.getGameUsers().add(user.get());
		gameDao.save(gameObtained);
		
	}
	
	@Override
	public void removePlayerToGame(Long gameId, Long userId) throws InstanceNotFoundException, FinishedGameException, UserNotFoundException {
		boolean foundPlayer = false;
		Optional<Game> game = gameDao.findById(gameId);
		if(!game.isPresent()) {
			throw new InstanceNotFoundException("project.entities.game", gameId);
		}
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		LocalDateTime date = game.get().getInitDate();
		if(date.isBefore(LocalDateTime.now())) {
			throw new FinishedGameException();
		}
		Game gameObtained = game.get();
		for(User gameUser : gameObtained.getGameUsers()) {
			if(gameUser.getUserId() == userId) {
				foundPlayer = true;
				continue;
			}
		}
		if(!foundPlayer) {
			throw new UserNotFoundException();
		}
		gameObtained.getGameUsers().remove(user.get());
		gameDao.save(gameObtained);
		
	}

	@Override
	public Game createGame(LocalDateTime initDate, LocalDateTime finalDate, float minimunLevel, float maximunLevel,
			Long fieldId, int gameType) throws InstanceNotFoundException, FieldTakenException {
		Optional<Field> field = fieldDao.findById(fieldId);
		if(!field.isPresent()) {
			throw new InstanceNotFoundException("project.entities.field", fieldId);
		}
		Optional<Game> game = gameDao.findGameByDateAndCampo(initDate, finalDate, field.get().getFieldId());
		if(game.isPresent()) {
			throw new FieldTakenException();
		}
		if(gameType == 0) {
			AmateurGame aGame = new AmateurGame();
			aGame.setField(field.get());
			aGame.setFinalDate(finalDate);
			aGame.setInitDate(initDate);
			aGame.setMaximunLevel(maximunLevel);
			aGame.setMinimunLevel(minimunLevel);
			aGame.setGameType("Amateur");
			AmateurGame finalGame = gameDao.save(aGame);
			return finalGame;
		}else {
			ProfessionalGame pGame = new ProfessionalGame();
			pGame.setField(field.get());
			pGame.setFinalDate(finalDate);
			pGame.setInitDate(initDate);
			pGame.setMaximunLevel(maximunLevel);
			pGame.setMinimunLevel(minimunLevel);
			pGame.setGameType("Pro");
			ProfessionalGame finalGame = gameDao.save(pGame);
			Team team1 = new Team();
			team1.setGame(finalGame);
			team1.setName("Team 1");
			teamDao.save(team1);
			Team team2 = new Team();
			team2.setGame(finalGame);
			team2.setName("Team 2");	
			teamDao.save(team2);
			return finalGame;
		}	
	}

	@Override
	public void scoreGame(Long gameId, Set<PadelSet> sets) throws InstanceNotFoundException, GameTypeException {
		Optional<Game> game = gameDao.findById(gameId);
		if(!game.isPresent()) {
			throw new InstanceNotFoundException("project.entities.game", gameId);
		}
		Optional<ProfessionalGame> pGame = professionalGameDao.findById(gameId);
		if(!pGame.isPresent()) {
			throw new GameTypeException();
		}
		int index = 0;
		Boolean winnerTeam1 = null;
		for(PadelSet set: sets) {
			set.setGame(pGame.get());
			setDao.save(set);
			if(index == (sets.size() - 1)){
				String lastResult = set.getResult();
				String[] results = lastResult.split("-");
				if(Integer.valueOf(results[0]) < Integer.valueOf(results[1])) {
					winnerTeam1 = false;
				}else {
					winnerTeam1 = true;
				}
					
			}
		}
		if(winnerTeam1 != null) {
			Set<Team> teams = teamDao.findTeamByGameGameId(pGame.get().getGameId());
			for(Team team: teams) {
				if(team.getName().equals("Team 1")) {
					if(winnerTeam1) {
						team.setResultMatch("WIN");
					}else {
						team.setResultMatch("DEFEAT");
					}
				}else {
					if(!winnerTeam1) {
						team.setResultMatch("WIN");
					}else {
						team.setResultMatch("DEFEAT");
					}
				}
				teamDao.save(team);
			}
		}
	}

	@Override
	public List<Game> findByLevelAndScheduleAndDate(Long userId, LocalDateTime initDate, LocalDateTime finalDate) throws InstanceNotFoundException {
		List<Game> gamesFiltered = new ArrayList<>();
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		List<Schedule> schedules = scheduleDao.findByUser(user.get());
		List<Game> games = gameDao.findGameByDateAndLevel(initDate, finalDate, user.get().getLevel());
		for(Game game: games) {
			for(Schedule schedule: schedules) {
				if(game.getInitDate().getDayOfWeek().equals(schedule.getDay())) {
					int mins = game.getInitDate().getHour() * 60 + game.getInitDate().getMinute();
					if((mins <= schedule.getFinalHour()) && (mins >= schedule.getInitHour())) {
						gamesFiltered.add(game);
						break;
					}
				}
			}
		}
		return gamesFiltered;
	}

	@Override
	public List<Game> findGameByDate(LocalDateTime initDate, LocalDateTime finalDate) {
		return gameDao.findGameByDate(initDate, finalDate);
	}

	@Override
	public void addPlayerToTeam(Long teamId, Long userId)
			throws InstanceNotFoundException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		Optional<Team> team = teamDao.findById(teamId);
		if(!team.isPresent()) {
			throw new InstanceNotFoundException("project.entities.team", teamId);
		}
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		LocalDateTime date = team.get().getGame().getInitDate();
		if(date.isBefore(LocalDateTime.now())) {
			throw new FinishedGameException();
		}
		Team teamObtained = team.get();
		if(teamObtained.getTeamUsers().size() > 1) {
			throw new NoSpaceException();
		}
		for(User gameUser : teamObtained.getTeamUsers()) {
			if(gameUser.getUserId() == userId) {
				throw new UserAlreadyAddedException();
			}
		}
		teamObtained.getTeamUsers().add(user.get());
		teamDao.save(teamObtained);		
	}

	@Override
	public void removePlayerToTeam(Long teamId, Long userId) throws InstanceNotFoundException, FinishedGameException, UserNotFoundException {
		boolean foundPlayer = false;
		Optional<Team> team = teamDao.findById(teamId);
		if(!team.isPresent()) {
			throw new InstanceNotFoundException("project.entities.team", teamId);
		}
		Optional<User> user = userDao.findById(userId);
		if(!user.isPresent()) {
			throw new InstanceNotFoundException("project.entities.user", userId);
		}
		LocalDateTime date = team.get().getGame().getInitDate();
		if(date.isBefore(LocalDateTime.now())) {
			throw new FinishedGameException();
		}
		Team teamObtained = team.get();
		for(User gameUser : teamObtained.getTeamUsers()) {
			if(gameUser.getUserId() == userId) {
				foundPlayer = true;
				continue;
			}
		}
		if(!foundPlayer) {
			throw new UserNotFoundException();
		}
		teamObtained.getTeamUsers().remove(user.get());
		teamDao.save(teamObtained);
		
	}

}
