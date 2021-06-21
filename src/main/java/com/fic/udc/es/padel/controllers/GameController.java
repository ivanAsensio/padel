package com.fic.udc.es.padel.controllers;

import static com.fic.udc.es.padel.dtos.GameConversor.toGameDetails;

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
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fic.udc.es.padel.dtos.AddGameDto;
import com.fic.udc.es.padel.dtos.AddUserGameDto;
import com.fic.udc.es.padel.dtos.BlockDto;
import com.fic.udc.es.padel.dtos.GameDetailsDto;
import com.fic.udc.es.padel.model.entities.Game;
import com.fic.udc.es.padel.model.entities.PadelSet;
import com.fic.udc.es.padel.model.entities.Team;
import com.fic.udc.es.padel.model.exceptions.FieldTakenException;
import com.fic.udc.es.padel.model.exceptions.FinishedGameException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;
import com.fic.udc.es.padel.model.exceptions.NoSpaceException;
import com.fic.udc.es.padel.model.exceptions.UserAlreadyAddedException;
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
	
	@PostMapping("/addGame")
	public Game createGame(@Validated({AddGameDto.AllValidations.class}) @RequestBody AddGameDto params) throws InstanceNotFoundException, FieldTakenException {
		LocalDateTime initDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(params.getMillisInitDate()), ZoneId.systemDefault());
		LocalDateTime finalDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(params.getMillisFinalDate()), ZoneId.systemDefault());
		return gameService.createGame(initDate, finalDate, params.getMinimunLevel(), params.getMaximunLevel(), 
				params.getFieldId(), params.getTypeGame());
	}
	
	@PostMapping("/addPlayerToGame")
	public void addPlayerToGame(@Validated({AddUserGameDto.AllValidations.class}) @RequestBody AddUserGameDto params) throws InstanceNotFoundException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		gameService.addPlayerToGame(params.getGameId(), params.getUserId());
	}
	
	@GetMapping("/{id}")
	public GameDetailsDto getGameById(@PathVariable Long id) throws InstanceNotFoundException {
		Game game = gameService.getGameById(id);
		Set<PadelSet> sets = new HashSet<>();
		Set<Team> teams = new HashSet<>();
		if(game.getGameType().equals("Pro")) {
			sets = setService.getSetsByGameId(id);
			teams = teamService.findTeamByGameId(id);
			game.setGameUsers(new HashSet<>());
		}
		return toGameDetails(game, sets, teams);
	}
	
	@GetMapping("/findFinishedGames")
	public BlockDto<GameDetailsDto> getFinishedGames(@RequestParam(defaultValue="0") int page) throws InstanceNotFoundException {
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		Block<Game> games = gameService.findAllFinishedGames(page, 10);
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
	
	@GetMapping("/findPublishedGames")
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
	
	@GetMapping("/user/{id}")
	public BlockDto<GameDetailsDto> getGamesByUserId(@PathVariable Long id, @RequestParam(defaultValue="0") int page) {
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
	
	@GetMapping("/findGamesFiltered")
	public List<GameDetailsDto> getGamesFiltered(@PathVariable Long initMillis, @PathVariable Long finalMillis, @PathVariable float level, @PathVariable Long userId) throws InstanceNotFoundException{
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		LocalDateTime initDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(initMillis), ZoneId.systemDefault());
		LocalDateTime finalDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(finalMillis), ZoneId.systemDefault());
		List<Game> games = gameService.findByLevelAndScheduleAndDate(userId, initDate, finalDate);
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
	
	@GetMapping("/findGameByDate")
	public List<GameDetailsDto> getGamesByDate(@PathVariable Long initMillis, @PathVariable Long finalMillis){
		List<GameDetailsDto> gameDetailsDtoList = new ArrayList<>();
		LocalDateTime initDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(initMillis), ZoneId.systemDefault());
		LocalDateTime finalDate =
			    LocalDateTime.ofInstant(Instant.ofEpochMilli(finalMillis), ZoneId.systemDefault());
		List<Game> games = gameService.findGameByDate(initDate, finalDate);
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
}
