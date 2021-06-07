package com.fic.udc.es.padel.dtos;

public class SetDto {
	
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

	public int getNumberSet() {
		return numberSet;
	}

	public void setNumberSet(int numberSet) {
		this.numberSet = numberSet;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}
	
	
	

}
