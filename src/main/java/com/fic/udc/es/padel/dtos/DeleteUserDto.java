package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class DeleteUserDto {

	public interface AllValidations {}
	
	private Long userId;
	
	public DeleteUserDto() {}

	public DeleteUserDto(Long userId) {
		this.userId = userId;
	}
	
	@NotNull(groups={AllValidations.class})
	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
