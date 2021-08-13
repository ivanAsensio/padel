package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class DeleteScheduleDto {

	public interface AllValidations {}
	
	private Long scheduleId;
	
	public DeleteScheduleDto() {}

	public DeleteScheduleDto(Long scheduleId) {
		this.scheduleId = scheduleId;
	}
	
	@NotNull(groups={AllValidations.class})
	public Long getScheduleId() {
		return scheduleId;
	}

	public void setScheduleId(Long scheduleId) {
		this.scheduleId = scheduleId;
	}
}
