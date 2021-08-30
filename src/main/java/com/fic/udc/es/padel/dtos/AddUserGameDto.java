package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class AddUserGameDto {
	
	public interface AllValidations {}
	
	private Long gameId;
	private Long userId;
	
	public AddUserGameDto() {
		super();
	}

	public AddUserGameDto(Long gameId, Long userId) {
		super();
		this.gameId = gameId;
		this.userId = userId;
	}

	@NotNull(groups={AllValidations.class})
	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	
}
