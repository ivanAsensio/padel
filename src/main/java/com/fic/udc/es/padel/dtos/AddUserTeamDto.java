package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class AddUserTeamDto {
	
public interface AllValidations {}
	
	private Long teamId;
	private Long userId;
	
	public AddUserTeamDto() {
		super();
	}

	public AddUserTeamDto(Long teamId, Long userId) {
		super();
		this.teamId = teamId;
		this.userId = userId;
	}

	@NotNull(groups={AllValidations.class})
	public Long getTeamId() {
		return teamId;
	}

	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}

	@NotNull(groups={AllValidations.class})
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}
