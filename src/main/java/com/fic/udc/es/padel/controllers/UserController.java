package com.fic.udc.es.padel.controllers;

import static com.fic.udc.es.padel.dtos.UserConversor.toAuthenticatedUserDto;
import static com.fic.udc.es.padel.dtos.UserConversor.toUser;
import static com.fic.udc.es.padel.dtos.UserConversor.toUserDetailsDto;
import static com.fic.udc.es.padel.dtos.UserConversor.toUserDto;

import java.net.URI;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fic.udc.es.padel.dtos.AuthenticatedUserDto;
import com.fic.udc.es.padel.dtos.BlockDto;
import com.fic.udc.es.padel.dtos.ChangeLevelParamsDto;
import com.fic.udc.es.padel.dtos.ChangePasswordParamsDto;
import com.fic.udc.es.padel.dtos.DeleteScheduleDto;
import com.fic.udc.es.padel.dtos.LoginParamsDto;
import com.fic.udc.es.padel.dtos.ScheduleDto;
import com.fic.udc.es.padel.dtos.UserConversor;
import com.fic.udc.es.padel.dtos.UserDetailsDto;
import com.fic.udc.es.padel.dtos.UserDto;
import com.fic.udc.es.padel.dtos.UserStatisticsDto;
import com.fic.udc.es.padel.model.entities.Schedule;
import com.fic.udc.es.padel.model.entities.User;
import com.fic.udc.es.padel.model.exceptions.DuplicateInstanceException;
import com.fic.udc.es.padel.model.exceptions.IncorrectLoginException;
import com.fic.udc.es.padel.model.exceptions.IncorrectPasswordException;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;
import com.fic.udc.es.padel.model.exceptions.PermissionException;
import com.fic.udc.es.padel.rest.common.ErrorsDto;
import com.fic.udc.es.padel.rest.common.JwtGenerator;
import com.fic.udc.es.padel.rest.common.JwtInfo;
import com.fic.udc.es.padel.services.Block;
import com.fic.udc.es.padel.services.GameService;
import com.fic.udc.es.padel.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {
	
	private final static String INCORRECT_LOGIN_EXCEPTION_CODE = "project.exceptions.IncorrectLoginException";
	private final static String INCORRECT_PASSWORD_EXCEPTION_CODE = "project.exceptions.IncorrectPasswordException";
	private final static String INSTANCE_NOT_FOUND_EXCEPTION_CODE = "project.exceptions.InstanceNotFoundException";
	private final static String DUPLICATE_INSTANCE_EXCEPTION_CODE = "project.exceptions.DuplicateInstanceException";
	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private JwtGenerator jwtGenerator;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private GameService gameService;
	
	@ExceptionHandler(IncorrectLoginException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleIncorrectLoginException(IncorrectLoginException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_LOGIN_EXCEPTION_CODE, null,
				INCORRECT_LOGIN_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
		
	}
	
	@ExceptionHandler(IncorrectPasswordException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleIncorrectPasswordException(IncorrectPasswordException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INCORRECT_PASSWORD_EXCEPTION_CODE, null,
				INCORRECT_PASSWORD_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@ExceptionHandler(InstanceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleInstanceNotFoundException(InstanceNotFoundException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INSTANCE_NOT_FOUND_EXCEPTION_CODE, null,
				INSTANCE_NOT_FOUND_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@ExceptionHandler(DuplicateInstanceException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleDuplicateInstanceException(DuplicateInstanceException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(DUPLICATE_INSTANCE_EXCEPTION_CODE, null,
				DUPLICATE_INSTANCE_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@PostMapping("/signUp")
	public ResponseEntity<AuthenticatedUserDto> signUp(
		@Validated({UserDto.AllValidations.class}) @RequestBody UserDto userDto) throws DuplicateInstanceException {
		
		User user = toUser(userDto);
		
		userService.signUp(user);
		
		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest().path("/{id}")
			.buildAndExpand(user.getUserId()).toUri();
	
		return ResponseEntity.created(location).body(toAuthenticatedUserDto(generateServiceToken(user), user));

	}
	
	@PostMapping("/login")
	public AuthenticatedUserDto login(@Validated @RequestBody LoginParamsDto params)
		throws IncorrectLoginException {
		
		User user = userService.login(params.getUserName(), params.getPassword());
			
		return toAuthenticatedUserDto(generateServiceToken(user), user);
		
	}
	
	@PostMapping("/loginFromServiceToken")
	public AuthenticatedUserDto loginFromServiceToken(@RequestAttribute Long userId, 
		@RequestAttribute String serviceToken) throws InstanceNotFoundException {
		
		User user = userService.loginFromId(userId);
		
		return toAuthenticatedUserDto(serviceToken, user);
		
	}
	
	@PutMapping("/{id}")
	public UserDto updateProfile(@RequestAttribute Long userId, @PathVariable Long id,
		@Validated({UserDto.UpdateValidations.class}) @RequestBody UserDto userDto) 
		throws InstanceNotFoundException, PermissionException {
		
		return toUserDto(userService.updateProfile(id, userDto.getName(), userDto.getLastName1(), 
				userDto.getLastName2(), userDto.isState(), userDto.getPosition(), userDto.getLevel(), 
				userDto.getSchedules(), userDto.getImage()));
		
	}
	
	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public UserDetailsDto getProfile(@PathVariable Long id) 
		throws InstanceNotFoundException, PermissionException {
		
		int gameWinned = userService.getCountGamesByUserIdAndResult(id, "WIN");
		int gameLossed = userService.getCountGamesByUserIdAndResult(id, "DEFEAT");
		int gamesPlayed = gameService.getCountAmateurGameUser(id);
		UserStatisticsDto statistics = new UserStatisticsDto(gameWinned, gameLossed, gamesPlayed);
		
		return toUserDetailsDto(userService.getUserById(id), statistics);
		
	}
	
	@PostMapping("/{id}/changePassword")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void changePassword(@RequestAttribute Long userId, @PathVariable Long id,
		@Validated @RequestBody ChangePasswordParamsDto params)
		throws PermissionException, InstanceNotFoundException, IncorrectPasswordException {
		
		if (!id.equals(userId)) {
			throw new PermissionException();
		}
		
		userService.changePassword(id, params.getOldPassword(), params.getNewPassword());
		
	}
	
	@PostMapping("/{id}/changeLevel")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void changeLevel(@PathVariable Long id,
		@Validated @RequestBody ChangeLevelParamsDto params)
		throws InstanceNotFoundException, IncorrectPasswordException {
		
		userService.changeLevel(id, params.getLevel());
		
	}
	
	@GetMapping("/users")
	public BlockDto<UserDto> getAllUsers(@RequestParam(defaultValue="0") int page, @RequestParam(required = false) String login,
			@RequestParam(required = false) Float minLevel, @RequestParam(required = false) Float maxLevel){
		Block<User> users = userService.getAllUsers(page, 10, login, minLevel, maxLevel);
		return new BlockDto<>(UserConversor.toUserDtos(users.getItems()), users.getExistMoreItems());	
	}
	
	
	@GetMapping("/filteredUsers")
	public List<UserDto> getUsersByScheduleAndLevel(@RequestParam float minLevel, @RequestParam float maxLevel,
			@RequestParam Long millis){
		Instant instant = Instant.ofEpochMilli(millis);
	    LocalDateTime date = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
	    return UserConversor.toUserDtos(userService.findUserByLevelAndDate(minLevel, maxLevel, date));
	}
	
	@GetMapping("/getUsers")
	public List<UserDto> getUsersWithLevelAndDate(@RequestParam float minLevel, @RequestParam float maxLevel, long millis){
		Instant instant = Instant.ofEpochMilli(millis);
	    LocalDateTime date = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
	    return UserConversor.toUserDtos(userService.findUserByLevelAndDate(minLevel, maxLevel, date));
	}
	
	@GetMapping("/getSchedules/{id}")
	public List<ScheduleDto> getSchedulesByUserId(@PathVariable Long id) throws InstanceNotFoundException{
		return UserConversor.toScheduleDtos(userService.findSchedulesByUserId(id));
	}
	
	@PostMapping("/schedules/{id}")
	@ResponseStatus( HttpStatus.NO_CONTENT )
	public void addScheduleByUserId(@PathVariable Long id, @Validated @RequestBody ScheduleDto scheduleDto) throws InstanceNotFoundException{
		User user = userService.getUserById(id);
		Schedule schedule = UserConversor.toSchedule(scheduleDto, user);
		userService.addScheduleByUserId(schedule, id);
	}
	
	@PostMapping("/deleteSchedules")
	@ResponseStatus( HttpStatus.NO_CONTENT )
	public void deleteScheduleByUserId(@Validated @RequestBody DeleteScheduleDto scheduleDto) throws InstanceNotFoundException{
		userService.deleteSchedulebyScheduleId(scheduleDto.getScheduleId());
	}
	
	private String generateServiceToken(User user) {
		
		JwtInfo jwtInfo = new JwtInfo(user.getUserId(), user.getName(), user.getRole().toString());
		
		return jwtGenerator.generate(jwtInfo);
		
	}

}
