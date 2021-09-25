package com.fic.udc.es.padel.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.Field;
import com.fic.udc.es.padel.model.entities.Game;
import com.fic.udc.es.padel.model.entities.RoleEnum;
import com.fic.udc.es.padel.model.entities.Schedule;
import com.fic.udc.es.padel.model.entities.ScheduleDao;
import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.entities.UserDao;
import com.fic.udc.es.padel.model.exceptions.FieldTakenException;
import com.fic.udc.es.padel.model.exceptions.FinishedGameException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;
import com.fic.udc.es.padel.model.exceptions.NoSpaceException;
import com.fic.udc.es.padel.model.exceptions.UserAlreadyAddedException;
import com.fic.udc.es.padel.model.exceptions.UserNotFoundException;

@SpringBootTest
@ActiveProfiles("test")
@SpringJUnitConfig
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
@TestPropertySource(locations="classpath:application-test.properties")
@Transactional
public class GameServiceTest {
	
	private LocalDateTime initDate = LocalDateTime.now();
	private LocalDateTime finalDate = LocalDateTime.now();
	private float minimunLevel = Float.valueOf("1.2");
	private float maximunLevel = Float.valueOf("4.4");
	private int gameType = 0;
	

	@Autowired
	private GameService gameService;
	
	@Autowired
	private FieldService fieldService;
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private ScheduleDao scheduleDao;
	
	public GameServiceTest() {}
	
	private Field createField() {
		return fieldService.addField("Campo 1");
	}
	
	private User getUser(String login) {
		User user = new User();
		user.setLogin(login);
		user.setName("Name");
		user.setPassword("password");
		user.setPosition("Position");
		user.setRole(RoleEnum.ADMIN);
		user.setState(true);
		user.setLevel(2);
		user.setLastname1("lastName");
		user.setLastname2("lastName");
		return userDao.save(user);
	}
	
	@Test
	public void getGameByIdAndCreateTest() throws InstanceNotFoundException, FieldTakenException {
		Field field = createField();
		Game game = gameService.createGame(initDate, finalDate, minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game gameObtained = gameService.getGameById(game.getGameId());
		assertEquals(game, gameObtained);
	}
	
	@Test
	public void createNoFieldTest() throws InstanceNotFoundException, FieldTakenException {
		assertThrows(InstanceNotFoundException.class,()->gameService.createGame(initDate, finalDate, minimunLevel, maximunLevel, 
				Long.valueOf(0), gameType));
	}
	
	@Test
	public void createFieldTakenTest() throws InstanceNotFoundException, FieldTakenException {
		Field field = createField();
		gameService.createGame(initDate, finalDate.plusSeconds(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		assertThrows(FieldTakenException.class,()-> gameService.createGame(initDate, finalDate, minimunLevel, maximunLevel, 
				field.getFieldId(), gameType));
	}
	
	@Test
	public void findAllFinishedGamesTest() throws InstanceNotFoundException, FieldTakenException {
		List<Game> games = new ArrayList<>(); 
		Field field = createField();
		Game game1 = gameService.createGame(initDate.minusMinutes(30), finalDate.minusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game game2 = gameService.createGame(initDate.minusMinutes(29), finalDate.minusMinutes(29), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game game3 = gameService.createGame(initDate.minusMinutes(28), finalDate.minusMinutes(28), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		games.add(game3);
		games.add(game2);
		games.add(game1);
		/*Block<Game> gamesObtained = gameService.findAllFinishedGames(0, 3);
		assertEquals(games, gamesObtained.getItems());*/
	}
	

	@Test
	public void findAllFinishedGamesBlockTest() throws InstanceNotFoundException, FieldTakenException {
		List<Game> games = new ArrayList<>(); 
		Field field = createField();
		gameService.createGame(initDate.minusMinutes(30), finalDate.minusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game game2 = gameService.createGame(initDate.minusMinutes(29), finalDate.minusMinutes(29), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		gameService.createGame(initDate.minusMinutes(28), finalDate.minusMinutes(28), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		games.add(game2);
		/*Block<Game> gamesObtained = gameService.findAllFinishedGames(2, 1);
		assertEquals(games, gamesObtained.getItems());*/
	}
	
	@Test
	public void addPlayerToGameTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		Field field = createField();
		Game game = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		User user = getUser("login");
		gameService.addPlayerToGame(game.getGameId(), user.getUserId());
		Game gameObtained = gameService.getGameById(game.getGameId());
		assertEquals(gameObtained.getGameUsers().isEmpty(), false);
	}
	
	@Test
	public void addPlayerToGameNoGameTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		User user = getUser("login");
		assertThrows(InstanceNotFoundException.class,()-> gameService.addPlayerToGame(Long.valueOf(-1), user.getUserId()));
	}
	
	@Test
	public void addPlayerToGameNoUserTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		Field field = createField();
		Game game = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		assertThrows(InstanceNotFoundException.class,()-> gameService.addPlayerToGame(game.getGameId(), Long.valueOf(-1)));
	}
	
	@Test
	public void addPlayerToGameUserAlreadyAddedTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		Field field = createField();
		Game game = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		User user = getUser("login");
		gameService.addPlayerToGame(game.getGameId(), user.getUserId());
		assertThrows(UserAlreadyAddedException.class,()-> gameService.addPlayerToGame(game.getGameId(), user.getUserId()));
	}
	
	@Test
	public void addPlayerToGameNoSpaceTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		Field field = createField();
		Game game = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		User user = getUser("login");
		User user2 = getUser("login2");
		User user3 = getUser("login3");
		User user4 = getUser("login4");
		User user5 = getUser("login5");
		gameService.addPlayerToGame(game.getGameId(), user.getUserId());
		gameService.addPlayerToGame(game.getGameId(), user2.getUserId());
		gameService.addPlayerToGame(game.getGameId(), user3.getUserId());
		gameService.addPlayerToGame(game.getGameId(), user4.getUserId());
		assertThrows(NoSpaceException.class,()-> gameService.addPlayerToGame(game.getGameId(), user5.getUserId()));
	}
	
	@Test
	public void findAllPublishedGamesTest() throws InstanceNotFoundException, FieldTakenException {
		Field field = createField();
		gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Block<Game> gamesObtained = gameService.findAllPublishedGames(0, 5);
		assertEquals(gamesObtained.getItems().size(), 4);
	}
	
	@Test
	public void findGameByDateTest() throws InstanceNotFoundException, FieldTakenException {
		Field field = createField();
		Field field2 = createField();
		gameService.createGame(initDate.minusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		gameService.createGame(initDate.minusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field2.getFieldId(), gameType);
		gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field2.getFieldId(), gameType);
		List<Game> games = gameService.findGameByDate(initDate, finalDate.plusHours(1));
		assertEquals(games.size(), 2);
	}
	
	@Test
	public void findGamesByUserIdTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		Field field = createField();
		Game game = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game game2 = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game game3 = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game game4 = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		User user = getUser("login");
		gameService.addPlayerToGame(game.getGameId(), user.getUserId());
		gameService.addPlayerToGame(game2.getGameId(), user.getUserId());
		gameService.addPlayerToGame(game3.getGameId(), user.getUserId());
		gameService.addPlayerToGame(game4.getGameId(), user.getUserId());
		Block<Game> games = gameService.findGamesByUserId(user.getUserId(), 0, 5);
		assertEquals(games.getItems().size(), 4);
	}
	
	@Test
	public void findGamesByNoUserIdTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException {
		assertThrows(InstanceNotFoundException.class, () -> gameService.findGamesByUserId(Long.valueOf(-1), 0, 5));
	}
	
	@Test
	public void removePlayerFromGameTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException, UserNotFoundException {
		Field field = createField();
		Game game = gameService.createGame(initDate.plusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		User user = getUser("login");
		gameService.addPlayerToGame(game.getGameId(), user.getUserId());
		gameService.removePlayerToGame(game.getGameId(), user.getUserId());
		Game gameObtained = gameService.getGameById(game.getGameId());
		assertEquals(gameObtained.getGameUsers().size(), 0);
	}
	
	@Test
	public void removePlayerFromGameInstanceNotFoundUserTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException, UserNotFoundException {
		Field field = createField();
		Game game = gameService.createGame(initDate.minusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		assertThrows(InstanceNotFoundException.class, () -> gameService.removePlayerToGame(game.getGameId(), Long.valueOf(-1)));
	}
	
	@Test
	public void removePlayerFromGameInstanceNotFoundGameTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException, UserNotFoundException {
		User user = getUser("login");
		assertThrows(InstanceNotFoundException.class, () -> gameService.removePlayerToGame(Long.valueOf(-1), user.getUserId()));
	}
	
	@Test
	public void removePlayerFromGameUserNotFoundTest() throws InstanceNotFoundException, FieldTakenException, FinishedGameException, UserAlreadyAddedException, NoSpaceException, UserNotFoundException {
		Field field = createField();
		Game game = gameService.createGame(initDate.minusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		User user = getUser("login");
		assertThrows(UserNotFoundException.class, () -> gameService.removePlayerToGame(game.getGameId(), user.getUserId()));
	}
	
	@Test
	public void findGamesByLevelAndScheduleTest() throws InstanceNotFoundException, FieldTakenException {
		User user = getUser("login");
		Schedule schedule = new Schedule(null, LocalDateTime.now().getDayOfWeek(), LocalDateTime.now().getHour() * 30, LocalDateTime.now().getHour() * 70,
				user);
		Field field = createField();
		scheduleDao.save(schedule);
		Game game = gameService.createGame(initDate.minusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		List<Game> gamesObtained = gameService.findByLevelAndScheduleAndDate(user.getUserId(), LocalDateTime.now().minusDays(1), LocalDateTime.now().plusDays(1));
		assertEquals(1, gamesObtained.size());
	}
	
	@Test
	public void updateGameTest() throws InstanceNotFoundException, FieldTakenException {
		User user = getUser("login");
		Field field = createField();
		Game game = gameService.createGame(initDate.minusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		gameService.updateGame(game.getGameId(), game.getInitDate(), game.getFinalDate(), 1, 2, field.getFieldId());
		Game gameObtained = gameService.getGameById(game.getGameId());
		assertEquals(1, gameObtained.getMinimunLevel());
		assertEquals(2, gameObtained.getMaximunLevel());
	}
	
	@Test
	public void updateGameFieldTakenTest() throws InstanceNotFoundException, FieldTakenException {
		User user = getUser("login");
		Field field = createField();
		Game game = gameService.createGame(initDate.minusMinutes(30), finalDate.plusMinutes(30), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		Game game2 = gameService.createGame(finalDate.plusMinutes(31), finalDate.plusMinutes(36), minimunLevel, maximunLevel, 
				field.getFieldId(), gameType);
		assertThrows(FieldTakenException.class, () -> gameService.updateGame(game.getGameId(), finalDate.plusMinutes(25), finalDate.plusMinutes(35), 1, 2, field.getFieldId()));
	}
	
	
	
	
	
	
}
