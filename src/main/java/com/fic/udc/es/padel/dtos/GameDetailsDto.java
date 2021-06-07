package com.fic.udc.es.padel.dtos;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fic.udc.es.padel.model.entities.User;

public class GameDetailsDto {
	
	private Long gameId;
	private Long millisInitDate;
	private Long millisFinalDate;
	private float minimunLevel;
	private float maximunLevel;
	private Long fieldId;
	private String typeGame;
	private List<UserDto> users = new ArrayList<>();
	private Set<SetDto> sets = new HashSet<>();
	private Set<TeamDto> teams = new HashSet<>();
	
	public GameDetailsDto() {
		super();
	}

	public GameDetailsDto(Long gameId, Long millisInitDate, Long millisFinalDate, float minimunLevel, float maximunLevel,
			Long fieldId, String typeGame, List<UserDto> users, Set<SetDto> sets, Set<TeamDto> teams) {
		super();
		this.gameId = gameId;
		this.millisInitDate = millisInitDate;
		this.millisFinalDate = millisFinalDate;
		this.minimunLevel = minimunLevel;
		this.maximunLevel = maximunLevel;
		this.fieldId = fieldId;
		this.typeGame = typeGame;
		this.users = users;
		this.sets = sets;
		this.teams = teams;
	}

	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

	public Long getMillisInitDate() {
		return millisInitDate;
	}

	public void setMillisInitDate(Long millisInitDate) {
		this.millisInitDate = millisInitDate;
	}

	public Long getMillisFinalDate() {
		return millisFinalDate;
	}

	public void setMillisFinalDate(Long millisFinalDate) {
		this.millisFinalDate = millisFinalDate;
	}

	public float getMinimunLevel() {
		return minimunLevel;
	}

	public void setMinimunLevel(float minimunLevel) {
		this.minimunLevel = minimunLevel;
	}

	public float getMaximunLevel() {
		return maximunLevel;
	}

	public void setMaximunLevel(float maximunLevel) {
		this.maximunLevel = maximunLevel;
	}

	public Long getFieldId() {
		return fieldId;
	}

	public void setFieldId(Long fieldId) {
		this.fieldId = fieldId;
	}

	public String getTypeGame() {
		return typeGame;
	}

	public void setTypeGame(String typeGame) {
		this.typeGame = typeGame;
	}
	

	public List<UserDto> getUsers() {
		return users;
	}

	public void setUsers(List<UserDto> users) {
		this.users = users;
	}

	public Set<SetDto> getSets() {
		return sets;
	}

	public void setSets(Set<SetDto> sets) {
		this.sets = sets;
	}

	public Set<TeamDto> getTeams() {
		return teams;
	}

	public void setTeams(Set<TeamDto> teams) {
		this.teams = teams;
	}
	
	

}
