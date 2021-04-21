package com.fic.udc.es.padel.model.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class PadelSet {

	private Long setId;
	private int numberSet;
	private String result;
	private ProfessionalGame game;
	
	public PadelSet() {
		super();
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getSetId() {
		return setId;
	}
	
	public void setSetId(Long setId) {
		this.setId = setId;
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
	
	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name= "gameId")
	public ProfessionalGame getGame() {
		return game;
	}

	public void setGame(ProfessionalGame game) {
		this.game = game;
	}
		
}
