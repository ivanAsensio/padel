package com.fic.udc.es.padel.dtos;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
	private String image;
	private boolean state;
	private UserStatisticsDto statistics;
	private Set<ScheduleDto> schedules = new HashSet<>();

	public UserDetailsDto() {}


	public UserDetailsDto(Long id, String login, String name, String lastName1, String lastName2, float level,
			String position, Set<ScheduleDto> schedules, String image, boolean state, UserStatisticsDto statistics) {
		super();
		this.id = id;
		this.login = login;
		this.name = name;
		this.lastName1 = lastName1;
		this.lastName2 = lastName2;
		this.level = level;
		this.position = position;
		this.image= image;
		this.schedules = schedules;
		this.state = state;
		this.statistics = statistics;
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

	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public void setPosition(String position) {
		this.position = position;
	}

	public Set<ScheduleDto> getSchedules() {
		return schedules;
	}


	public void setSchedules(Set<ScheduleDto> schedules) {
		this.schedules = schedules;
	}


	public boolean isState() {
		return state;
	}


	public void setState(boolean state) {
		this.state = state;
	}


	public UserStatisticsDto getStatistics() {
		return statistics;
	}


	public void setStatistics(UserStatisticsDto statistics) {
		this.statistics = statistics;
	}

}
