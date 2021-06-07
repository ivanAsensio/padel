package com.fic.udc.es.padel.dtos;

import java.util.ArrayList;
import java.util.List;

public class TeamDto {
	
	private String name;
	private List<UserDto> users = new ArrayList<>();
	
	public TeamDto() {
		super();
	}

	public TeamDto(String name, List<UserDto> users) {
		super();
		this.name = name;
		this.users = users;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<UserDto> getUsers() {
		return users;
	}

	public void setUsers(List<UserDto> users) {
		this.users = users;
	}
	
	

}
