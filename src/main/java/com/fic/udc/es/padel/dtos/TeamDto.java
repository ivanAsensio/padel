package com.fic.udc.es.padel.dtos;

import java.util.ArrayList;
import java.util.List;

public class TeamDto {
	
	private Long id;
	private String name;
	private String resultMatch;
	private List<UserDto> users = new ArrayList<>();
	
	public TeamDto() {
		super();
	}

	public TeamDto(Long id, String name, List<UserDto> users, String resultMatch) {
		super();
		this.id = id;
		this.name = name;
		this.users = users;
		this.resultMatch = resultMatch;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getResultMatch() {
		return resultMatch;
	}

	public void setResultMatch(String resultMatch) {
		this.resultMatch = resultMatch;
	}

}
