package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class ChangeLevelParamsDto {
	
	private float level;
	
	public ChangeLevelParamsDto() {}

	@NotNull
	public float getLevel() {
		return level;
	}

	public void setLevel(float level) {
		this.level = level;
	}


}