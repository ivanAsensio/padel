package com.fic.udc.es.padel.model.entities;

import java.time.LocalDateTime;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class Game {
	
	private Long gameId;
	private LocalDateTime initDate;
	private LocalDateTime finalDate;
	private float minimunLevel;
	private float maximunLevel;
	private Set<User> gameUsers;
	
	public Game() {
		super();
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getGameId() {
		return gameId;
	}
	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}
	public LocalDateTime getInitDate() {
		return initDate;
	}
	public void setInitDate(LocalDateTime initDate) {
		this.initDate = initDate;
	}
	public LocalDateTime getFinalDate() {
		return finalDate;
	}
	public void setFinalDate(LocalDateTime finalDate) {
		this.finalDate = finalDate;
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
	@ManyToMany
	@JoinTable(
			name = "game_user", 
			joinColumns = @JoinColumn(name = "gameId"), 
			inverseJoinColumns = @JoinColumn(name = "userId"))
	public Set<User> getGameUsers() {
		return gameUsers;
	}
	public void setGameUsers(Set<User> users) {
		this.gameUsers = users;
	}
	
	
	

}
