package com.fic.udc.es.padel.dtos;

import com.fic.udc.es.padel.model.entities.User;

public class UserConversor {

	private UserConversor() {}
	
	public final static UserDto toUserDto(User user) {
		return new UserDto(user.getUserId(), user.getLogin(), user.getPassword(), user.getName(), user.getLastname1(), user.getLastname2(), user.getLevel(),
			user.getRole().toString(), user.getPosition(), user.isState(), user.getSchedules());
	}
	
	public final static UserDetailsDto toUserDetailsDto(User user) {
		return new UserDetailsDto(user.getUserId(), user.getLogin(), user.getName(), user.getLastname1(), user.getLastname2(), user.getLevel(),
			 user.getPosition(), user.getSchedules());
	}
	
	public final static User toUser(UserDto userDto) {
		
		return new User(userDto.getId(),userDto.getName(),userDto.getLastName1(),userDto.getLastName2(),userDto.getLogin(),
				userDto.isState(), userDto.getPassword(), userDto.getLevel(),userDto.getPosition());
	}
	
	public final static AuthenticatedUserDto toAuthenticatedUserDto(String serviceToken, User user) {
		
		return new AuthenticatedUserDto(serviceToken, toUserDto(user));
		
	}
}
