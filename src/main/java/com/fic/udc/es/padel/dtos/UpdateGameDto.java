package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class UpdateGameDto {
	
	public interface AllValidations {}

	private Long gameId;
	private Long millisInitDate;
	private Long millisFinalDate;
	private float minimunLevel;
	private float maximunLevel;
	private Long fieldId;
	
	public UpdateGameDto() {
		super();
	}

	public UpdateGameDto(Long gameId, Long millisInitDate, Long millisFinalDate, float minimunLevel, float maximunLevel,
			Long fieldId) {
		super();
		this.millisInitDate = millisInitDate;
		this.millisFinalDate = millisFinalDate;
		this.minimunLevel = minimunLevel;
		this.maximunLevel = maximunLevel;
		this.fieldId = fieldId;
	}
	
	@NotNull(groups={AllValidations.class})
	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

	@NotNull(groups={AllValidations.class})
	public Long getMillisInitDate() {
		return millisInitDate;
	}

	public void setMillisInitDate(Long millisInitDate) {
		this.millisInitDate = millisInitDate;
	}

	@NotNull(groups={AllValidations.class})
	public Long getMillisFinalDate() {
		return millisFinalDate;
	}

	public void setMillisFinalDate(Long millisFinalDate) {
		this.millisFinalDate = millisFinalDate;
	}

	@NotNull(groups={AllValidations.class})
	public float getMinimunLevel() {
		return minimunLevel;
	}

	public void setMinimunLevel(float minimunLevel) {
		this.minimunLevel = minimunLevel;
	}

	@NotNull(groups={AllValidations.class})
	public float getMaximunLevel() {
		return maximunLevel;
	}

	public void setMaximunLevel(float maximunLevel) {
		this.maximunLevel = maximunLevel;
	}

	@NotNull(groups={AllValidations.class})
	public Long getFieldId() {
		return fieldId;
	}

	public void setFieldId(Long fieldId) {
		this.fieldId = fieldId;
	}
	
}
