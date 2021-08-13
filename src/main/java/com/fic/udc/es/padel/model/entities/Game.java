package com.fic.udc.es.padel.model.entities;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
public class Game {
	
	private Long gameId;
	private LocalDateTime initDate;
	private LocalDateTime finalDate;
	private float minimunLevel;
	private float maximunLevel;
	private String gameType;
	private Field field;
	private Set<User> gameUsers = new HashSet<>();
	
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
	public String getGameType() {
		return gameType;
	}
	public void setGameType(String gameType) {
		this.gameType = gameType;
	}
	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name= "fieldId")
	public Field getField() {
		return field;
	}

	public void setField(Field field) {
		this.field = field;
	}

	@ManyToMany(fetch=FetchType.LAZY)
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((field == null) ? 0 : field.hashCode());
		result = prime * result + ((finalDate == null) ? 0 : finalDate.hashCode());
		result = prime * result + ((gameId == null) ? 0 : gameId.hashCode());
		result = prime * result + ((gameType == null) ? 0 : gameType.hashCode());
		result = prime * result + ((gameUsers == null) ? 0 : gameUsers.hashCode());
		result = prime * result + ((initDate == null) ? 0 : initDate.hashCode());
		result = prime * result + Float.floatToIntBits(maximunLevel);
		result = prime * result + Float.floatToIntBits(minimunLevel);
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Game other = (Game) obj;
		if (field == null) {
			if (other.field != null)
				return false;
		} else if (!field.equals(other.field))
			return false;
		if (finalDate == null) {
			if (other.finalDate != null)
				return false;
		} else if (!finalDate.equals(other.finalDate))
			return false;
		if (gameId == null) {
			if (other.gameId != null)
				return false;
		} else if (!gameId.equals(other.gameId))
			return false;
		if (gameType == null) {
			if (other.gameType != null)
				return false;
		} else if (!gameType.equals(other.gameType))
			return false;
		if (gameUsers == null) {
			if (other.gameUsers != null)
				return false;
		} else if (!gameUsers.equals(other.gameUsers))
			return false;
		if (initDate == null) {
			if (other.initDate != null)
				return false;
		} else if (!initDate.equals(other.initDate))
			return false;
		if (Float.floatToIntBits(maximunLevel) != Float.floatToIntBits(other.maximunLevel))
			return false;
		if (Float.floatToIntBits(minimunLevel) != Float.floatToIntBits(other.minimunLevel))
			return false;
		return true;
	}
	
	

}
