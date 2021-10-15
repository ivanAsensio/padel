package com.fic.udc.es.padel.controllers;

import static com.fic.udc.es.padel.dtos.GameConversor.toGameDetails;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fic.udc.es.padel.dtos.AddGameDto;
import com.fic.udc.es.padel.dtos.AddUserGameDto;
import com.fic.udc.es.padel.dtos.AddUserTeamDto;
import com.fic.udc.es.padel.dtos.BlockDto;
import com.fic.udc.es.padel.dtos.DeleteUserDto;
import com.fic.udc.es.padel.dtos.GameConversor;
import com.fic.udc.es.padel.dtos.GameDetailsDto;
import com.fic.udc.es.padel.dtos.SetDto;
import com.fic.udc.es.padel.dtos.UpdateGameDto;
import com.fic.udc.es.padel.model.entities.Game;
import com.fic.udc.es.padel.model.entities.PadelSet;
import com.fic.udc.es.padel.model.entities.RoleEnum;
import com.fic.udc.es.padel.model.entities.Team;
import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.entities.UserDao;
import com.fic.udc.es.padel.model.exceptions.DuplicateInstanceException;
import com.fic.udc.es.padel.model.exceptions.FieldTakenException;
import com.fic.udc.es.padel.model.exceptions.FinishedGameException;
import com.fic.udc.es.padel.model.exceptions.GameTypeException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;
import com.fic.udc.es.padel.model.exceptions.NoSpaceException;
import com.fic.udc.es.padel.model.exceptions.UserAlreadyAddedException;
import com.fic.udc.es.padel.model.exceptions.UserNotFoundException;
import com.fic.udc.es.padel.rest.common.ErrorsDto;
import com.fic.udc.es.padel.services.Block;
import com.fic.udc.es.padel.services.GameService;
import com.fic.udc.es.padel.services.SetService;
import com.fic.udc.es.padel.services.TeamService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/games")
public class GameController {
	
	private final static String INSTANCE_NOT_FOUND_EXCEPTION_CODE = "project.exceptions.InstanceNotFoundException";
	private final static String FIELD_TAKEN_EXCEPTION_CODE = "project.exceptions.FieldTakenException";
	private final static String FINISHED_GAME_EXCEPTION_CODE = "project.exceptions.FinishedGameException";
	private final static String USER_ALREADY_ADDED_EXCEPTION_CODE = "project.exception.UserAlreadyAddedException";
	private final static String NO_SPACE_EXCEPTION_CODE = "project.exception.NoSpaceException";

	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private GameService gameService;
	
	@Autowired
	private TeamService teamService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private SetService setService;
	
	@ExceptionHandler(InstanceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleInstanceNotFoundException(InstanceNotFoundException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INSTANCE_NOT_FOUND_EXCEPTION_CODE, null,
				INSTANCE_NOT_FOUND_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@ExceptionHandler(FieldTakenException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleFieldTakenException(FieldTakenException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(FIELD_TAKEN_EXCEPTION_CODE, null,
				FIELD_TAKEN_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@ExceptionHandler(FinishedGameException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleFinishedGameException(FinishedGameException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(FINISHED_GAME_EXCEPTION_CODE, null,
				FINISHED_GAME_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}

	@ExceptionHandler(UserAlreadyAddedException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleUserAlreadyAddedException(UserAlreadyAddedException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(USER_ALREADY_ADDED_EXCEPTION_CODE, null,
				USER_ALREADY_ADDED_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@ExceptionHandler(NoSpaceException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public ErrorsDto handleNoSpaceException(NoSpaceException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(NO_SPACE_EXCEPTION_CODE, null,
				NO_SPACE_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@PostMapping("")
	public Game createGame(@Validated({AddGameDto.AllValidations.class}) @RequestBody AddGameDto params) throws InstanceNotFoundException, FieldTakenException {
		LocalDateTime initDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(params.getMillisInitDate()), ZoneId.systemDefault());
		LocalDateTime finalDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(params.getMillisFinalDate()), ZoneId.systemDefault());
		return gameService.createGame(initDate, finalDate, params.getMinimunLevel(), params.getMaximunLevel(), 
				params.getFieldId(), params.getTypeGame());
	}
	
	@PutMapping("/{gameId}")
	public GameDetailsDto updateGame(@PathVariable Long gameId, @Validated({AddGameDto.AllValidations.class}) @RequestBody UpdateGameDto params) throws InstanceNotFoundException, FieldTakenException {
		LocalDateTime initDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(params.getMillisInitDate()), ZoneId.systemDefault());
		LocalDateTime finalDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(params.getMillisFinalDate()), ZoneId.systemDefault());
		gameService.updateGame(params.getGameId(), initDate, finalDate, params.getMinimunLevel(), params.getMaximunLevel(), 
				params.getFieldId());		
		Game game = gameService.getGameById(params.getGameId());
		Set<PadelSet> sets = new HashSet<>();
		Set<Team> teams = new HashSet<>();
		if(game.getGameType().equals("Pro")) {
			sets = setService.getSetsByGameId(params.getGameId());
			teams = teamService.findTeamByGameId(params.getGameId());
		}
		return toGameDetails(game, sets, teams);
	}
	
	@PostMapping("/{gameId}/users")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void addPlayerToGame(@PathVariable Long gameId, @Validated({AddUserGameDto.AllValidations.class}) @RequestBody AddUserGameDto params) throws InstanceNotFoundException, FinishedGameException, UserAlreadyAddedException, NoSpaceException, DuplicateInstanceException {
		Long userId = params.getUserId();
		if(userId == null) {
			User user = addNewUser();
			userId = user.getUserId();
			params.setUserId(userId);
		}
		gameService.addPlayerToGame(params.getGameId(), userId);
	}
	
	@PostMapping("/{gameId}/teams/{teamId}/users")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void addPlayerToTeam(@PathVariable Long gameId, @PathVariable Long teamId, @Validated({AddUserTeamDto.AllValidations.class}) @RequestBody AddUserTeamDto params) throws InstanceNotFoundException, FinishedGameException, UserAlreadyAddedException, NoSpaceException, DuplicateInstanceException {
		gameService.addPlayerToTeam(params.getTeamId(), params.getUserId());
	}
	
	@GetMapping("/{id}")
	public GameDetailsDto getGameById(@PathVariable Long id) throws InstanceNotFoundException {
		Game game = gameService.getGameById(id);
		Set<PadelSet> sets = new HashSet<>();
		Set<Team> teams = new HashSet<>();
		if(game.getGameType().equals("Pro")) {
			sets = setService.getSetsByGameId(id);
			teams = teamService.findTeamByGameId(id);
		}
		return toGameDetails(game, sets, teams);
	}
	
	@GetMapping("/finished")
	public BlockDto<GameDetailsDto> getFinishedGames(@RequestParam(defaultValue="0") int page, @RequestParam(required=false) String login, 
			@RequestParam(required=false) Long millisInitDate, @RequestParam(required=false) Long millisFinalDate, @RequestParam(required=false) String name){
		LocalDateTime initDate = null;
		LocalDateTime finalDate = null;
		if(millisInitDate != null) {
			initDate =
				    LocalDateTime.ofInstant(Instant.ofEpochMilli(millisInitDate), ZoneId.systemDefault());
		}
		if(millisFinalDate != null) {
			finalDate =
				    LocalDateTime.ofInstant(Instant.ofEpochMilli(millisFinalDate), ZoneId.systemDefault());
		}
		
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		Block<Game> games = gameService.findAllFinishedGames(page, 10, login, initDate, finalDate, name);
		for(Game game: games.getItems()) {
			if(game.getGameType() == "Pro") {
				GameDetailsDto details = toGameDetails(game, setService.getSetsByGameId(game.getGameId()), teamService.findTeamByGameId(game.getGameId()));
				gameDetailsDtoList.add(details);
			}else {
				GameDetailsDto details = toGameDetails(game, new HashSet<>(), new HashSet<>());
				gameDetailsDtoList.add(details);
			}
		}
		return new BlockDto<>(gameDetailsDtoList, games.getExistMoreItems());	
	}
	
	@GetMapping("/published")
	public BlockDto<GameDetailsDto> getPublishedGames(@RequestParam(defaultValue="0") int page) throws InstanceNotFoundException {
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		Block<Game> games = gameService.findAllPublishedGames(page, 10);
		for(Game game: games.getItems()) {
			if(game.getGameType() == "Pro") {
				GameDetailsDto details = toGameDetails(game, setService.getSetsByGameId(game.getGameId()), teamService.findTeamByGameId(game.getGameId()));
				gameDetailsDtoList.add(details);
			}else {
				GameDetailsDto details = toGameDetails(game, new HashSet<>(), new HashSet<>());
				gameDetailsDtoList.add(details);
			}
		}
		return new BlockDto<>(gameDetailsDtoList, games.getExistMoreItems());	
	}
	
	@GetMapping("/users/{id}")
	public BlockDto<GameDetailsDto> getGamesByUserId(@PathVariable Long id, @RequestParam(defaultValue="0") int page) throws InstanceNotFoundException {
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		Block<Game> games = gameService.findGamesByUserId(id, page, 10);
		for(Game game: games.getItems()) {
			if(game.getGameType() == "Pro") {
				GameDetailsDto details = toGameDetails(game, setService.getSetsByGameId(game.getGameId()), teamService.findTeamByGameId(game.getGameId()));
				gameDetailsDtoList.add(details);
			}else {
				GameDetailsDto details = toGameDetails(game, new HashSet<>(), new HashSet<>());
				gameDetailsDtoList.add(details);
			}
		}
		return new BlockDto<>(gameDetailsDtoList, games.getExistMoreItems());	
		
	}
	
	@GetMapping("")
	public List<GameDetailsDto> getGamesFiltered(@RequestParam Long initMillis, @RequestParam Long finalMillis, @RequestParam(required=false) Float level, @RequestParam(required=false) Long userId) throws InstanceNotFoundException{
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		LocalDateTime initDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(initMillis), ZoneId.systemDefault());
		LocalDateTime finalDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(finalMillis), ZoneId.systemDefault());
		List<Game> games = null;
		if(userId != null) {
			games = gameService.findByLevelAndScheduleAndDate(userId, initDate, finalDate);
		}else {
			games = gameService.findGameByDate(initDate, finalDate);
		}
		
		for(Game game: games) {
			if(game.getGameType() == "Pro") {
				GameDetailsDto details = toGameDetails(game, setService.getSetsByGameId(game.getGameId()), teamService.findTeamByGameId(game.getGameId()));
				gameDetailsDtoList.add(details);
			}else {
				GameDetailsDto details = toGameDetails(game, new HashSet<>(), new HashSet<>());
				gameDetailsDtoList.add(details);
			}
		}
		return gameDetailsDtoList;
	}
	
	@PostMapping("/{id}/score")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void scoreGame(@PathVariable Long id, @Validated({SetDto.AllValidations.class}) @RequestBody List<SetDto> sets) throws InstanceNotFoundException, GameTypeException{
		Set<PadelSet> setsObtained = GameConversor.toSets(sets);
		gameService.scoreGame(id, setsObtained);
	}
	
	@DeleteMapping("/{id}/score")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void updateScoreGame(@PathVariable Long id) throws InstanceNotFoundException, GameTypeException{
		gameService.getGameById(id);
		setService.deleteScore(id);
		teamService.deleteResultMatch(id);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteGame(@PathVariable Long id) throws InstanceNotFoundException {
		gameService.deleteGame(id);
	}
	
	@DeleteMapping("/{gameId}/users/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleleFromGame(@PathVariable Long gameId, @PathVariable Long userId) throws InstanceNotFoundException, FinishedGameException, UserNotFoundException {
		gameService.removePlayerToGame(gameId, userId);
	}
	
	@DeleteMapping("/{gameId}/teams/{teamId}/users/{userId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleleFromTeam(@PathVariable Long gameId, @PathVariable Long teamId, @PathVariable Long userId) throws InstanceNotFoundException, FinishedGameException, UserNotFoundException {
		gameService.removePlayerToTeam(teamId, userId);
	}
	
	@GetMapping("/users/{userId}/pending")
	public List<GameDetailsDto> getPendingGames(@PathVariable Long userId) throws InstanceNotFoundException{
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		List<Game> games = gameService.findGameByUserAndDatePublished(userId, LocalDateTime.now());
		for(Game game: games) {
			if(game.getGameType() == "Pro") {
				GameDetailsDto details = toGameDetails(game, setService.getSetsByGameId(game.getGameId()), teamService.findTeamByGameId(game.getGameId()));
				gameDetailsDtoList.add(details);
			}else {
				GameDetailsDto details = toGameDetails(game, new HashSet<>(), new HashSet<>());
				gameDetailsDtoList.add(details);
			}
		}
		return gameDetailsDtoList;
	}
	
	@PostMapping("/{gameId}/rentGame")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void rentFullField(@PathVariable Long gameId, @Validated({AddUserGameDto.AllValidations.class}) @RequestBody AddUserGameDto addUserDto) throws InstanceNotFoundException, NoSpaceException, DuplicateInstanceException, FinishedGameException, UserAlreadyAddedException {
		Game game = gameService.getGameById(addUserDto.getGameId());
		if(game.getGameUsers().size() > 0) {
			throw new NoSpaceException();
		}
		if(addUserDto.getUserId() != null) {
			gameService.addPlayerToGame(addUserDto.getGameId(), addUserDto.getUserId());
		}else {
			gameService.addPlayerToGame(addUserDto.getGameId(), addNewUser().getUserId());
		}
		gameService.addPlayerToGame(addUserDto.getGameId(), addNewUser().getUserId());
		gameService.addPlayerToGame(addUserDto.getGameId(), addNewUser().getUserId());
		gameService.addPlayerToGame(addUserDto.getGameId(), addNewUser().getUserId());

	}
	
	private User addNewUser() throws DuplicateInstanceException {
		User user = new User();
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String login = "guest" + timestamp.getNanos();
		user.setLogin(login);
		user.setLastname1(null);
		user.setLastname2(null);
		user.setLevel(0);
		user.setName(login);
		user.setRole(RoleEnum.USER);
		user.setPassword("hiddenSecret");
		User userObtained = userDao.save(user);
		return userObtained;
	}
}
