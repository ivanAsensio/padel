package com.fic.udc.es.padel.dtos;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fic.udc.es.padel.model.entities.Schedule;

public class UserDto {
	
	public interface AllValidations {}
	
	public interface UpdateValidations {}

	private Long id;
	private String login;
	private String password;
	private String name;
	private String lastName1;
	private String lastName2;
	private float level;
	private String role;
	private String position;
	private boolean state;
	private String image;
	private Set<Schedule> schedules = new HashSet<>();

	public UserDto() {}


	public UserDto(Long id, String login, String password, String name, String lastName1, String lastName2, float level,
			String role, String position, boolean state, Set<Schedule> schedules, String image) {
		super();
		this.id = id;
		this.login = login;
		this.password = password;
		this.name = name;
		this.lastName1 = lastName1;
		this.lastName2 = lastName2;
		this.level = level;
		this.role = role;
		this.position = position;
		this.state = state;
		this.image = image;
		//this.schedules = schedules;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@NotNull(groups={AllValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class})
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login.trim();
	}

	@NotNull(groups={AllValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class})
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name.trim();
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
	public String getLastName1() {
		return lastName1;
	}

	public void setLastName1(String lastName1) {
		this.lastName1 = lastName1;
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	@Size(min=1, max=60, groups={AllValidations.class, UpdateValidations.class})
	public String getLastName2() {
		return lastName2;
	}

	public void setLastName2(String lastName2) {
		this.lastName2 = lastName2;
	}

	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	public float getLevel() {
		return level;
	}

	public void setLevel(float level) {
		this.level = level;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public boolean isState() {
		return state;
	}

	public void setState(boolean state) {
		this.state = state;
	}
	
	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public Set<Schedule> getSchedules() {
		return schedules;
	}


	public void setSchedules(Set<Schedule> schedules) {
		this.schedules = schedules;
	}
	
	

}