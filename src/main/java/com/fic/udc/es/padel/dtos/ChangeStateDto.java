package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class ChangeStateDto {
	
	public interface AllValidations {}
	
	private Long id;
	private boolean state;
	
	public ChangeStateDto() {}

	public ChangeStateDto(Long id, boolean state) {
		this.id = id;
		this.state = state;
	}
	
	@NotNull(groups={AllValidations.class})
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@NotNull(groups={AllValidations.class})
	public boolean getState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}

}
