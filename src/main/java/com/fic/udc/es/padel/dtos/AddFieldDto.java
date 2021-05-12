package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class AddFieldDto {

	public interface AllValidations {}
	
	private String name;
	
	public AddFieldDto() {}

	public AddFieldDto(String name) {
		this.name = name;
	}

	@NotNull(groups={AllValidations.class})
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	

}
