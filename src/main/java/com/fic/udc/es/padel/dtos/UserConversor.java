package com.fic.udc.es.padel.dtos;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fic.udc.es.padel.model.entities.Schedule;
import com.fic.udc.es.padel.model.entities.User;

public class UserConversor {

	private UserConversor() {}
	
	public final static List<UserDto> toUserDtos(List<User> users) {
		return users.stream().map(o -> toUserDto(o)).collect(Collectors.toList());
	}
	
	public final static UserDto toUserDto(User user) {
		return new UserDto(user.getUserId(), user.getLogin(), user.getPassword(), user.getName(), user.getLastname1(), user.getLastname2(), user.getLevel(),
			user.getRole().toString(), user.getPosition(), user.isState(), user.getSchedules(), user.getImage());
	}
	
	public final static UserDetailsDto toUserDetailsDto(User user) {
		return new UserDetailsDto(user.getUserId(), user.getLogin(), user.getName(), user.getLastname1(), user.getLastname2(), user.getLevel(),
			 user.getPosition(), toScheduleSetDtos(user.getSchedules()), user.getImage(), user.isState());
	}
	
	public final static User toUser(UserDto userDto) {
		
		return new User(userDto.getId(),userDto.getName(),userDto.getLastName1(),userDto.getLastName2(),userDto.getLogin(),
				userDto.isState(), userDto.getPassword(), userDto.getLevel(),userDto.getPosition(), userDto.getImage());
	}
	
	public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		
		return new AuthenticatedUserDto(serviceToken, toUserDto(user));
		
	}
	
	public final static Set<ScheduleDto> toScheduleSetDtos(Set<Schedule> schedules) {
		return schedules.stream().map(o -> toScheduleDto(o)).collect(Collectors.toSet());
	}
	
	public final static List<ScheduleDto> toScheduleDtos(List<Schedule> schedules) {
		return schedules.stream().map(o -> toScheduleDto(o)).collect(Collectors.toList());
	}
	
	public final static ScheduleDto toScheduleDto(Schedule schedule) {
		return new ScheduleDto(schedule.getScheduleId(),schedule.getDay().toString(),schedule.getInitHour(),schedule.getFinalHour());
	}
	
	public final static Schedule toSchedule(ScheduleDto scheduleDto, User user) {
		return new Schedule(scheduleDto.getScheduleId(),DayOfWeek.valueOf(scheduleDto.getDay()),scheduleDto.getInitHour(), scheduleDto.getFinalHour(), user);
	}
}
