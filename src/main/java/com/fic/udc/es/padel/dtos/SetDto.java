package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class SetDto {
	
	public interface AllValidations {}
	
	private int numberSet;
	private String result;
	
	public SetDto() {
		super();
	}
	
	public SetDto(int numberSet, String result) {
		super();
		this.numberSet = numberSet;
		this.result = result;
	}

	@NotNull(groups={AllValidations.class})
	public int getNumberSet() {
		return numberSet;
	}

	public void setNumberSet(int numberSet) {
		this.numberSet = numberSet;
	}

	@NotNull(groups={AllValidations.class})
	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
	
	

}
