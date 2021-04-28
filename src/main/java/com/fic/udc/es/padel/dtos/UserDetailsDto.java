package com.fic.udc.es.padel.dtos;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fic.udc.es.padel.dtos.UserDto.AllValidations;
import com.fic.udc.es.padel.dtos.UserDto.UpdateValidations;
import com.fic.udc.es.padel.model.entities.Schedule;

public class UserDetailsDto {
	
public interface AllValidations {}
	
	public interface UpdateValidations {}

	private Long id;
	private String login;
	private String name;
	private String lastName1;
	private String lastName2;
	private float level;
	private String position;
	private Set<Schedule> schedules = new HashSet<>();

	public UserDetailsDto() {}


	public UserDetailsDto(Long id, String login, String name, String lastName1, String lastName2, float level,
			String position, Set<Schedule> schedules) {
		super();
		this.id = id;
		this.login = login;
		this.name = name;
		this.lastName1 = lastName1;
		this.lastName2 = lastName2;
		this.level = level;
		this.position = position;
		this.schedules = schedules;
	}


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Size(min=1, max=60, groups={AllValidations.class})
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login.trim();
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
	
	@NotNull(groups={AllValidations.class, UpdateValidations.class})
	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public Set<Schedule> getSchedules() {
		return schedules;
	}


	public void setSchedules(Set<Schedule> schedules) {
		this.schedules = schedules;
	}

}
