package com.fic.udc.es.padel.model.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

@Entity
public class Team {
	
	private Long teamId;
	private String resultMatch;
	private String name;
	private ProfessionalGame game;
	private Set<User> teamUsers = new HashSet<>();

	public Team() {
		super();
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getTeamId() {
		return teamId;
	}
	public void setTeamId(Long teamId) {
		this.teamId = teamId;
	}
	public String getResultMatch() {
		return resultMatch;
	}
	public void setResultMatch(String resultMatch) {
		this.resultMatch = resultMatch;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@ManyToOne(optional=false, fetch=FetchType.LAZY)
	@JoinColumn(name= "game_id")
	public ProfessionalGame getGame() {
		return game;
	}
	public void setGame(ProfessionalGame game) {
		this.game = game;
	}
	@ManyToMany
	@JoinTable(
			name = "team_user", 
			joinColumns = @JoinColumn(name = "teamId"), 
			inverseJoinColumns = @JoinColumn(name = "userId"))
	public Set<User> getTeamUsers() {
		return teamUsers;
	}
	public void setTeamUsers(Set<User> users) {
		this.teamUsers = users;
	}
	
	
}
