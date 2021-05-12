package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class FieldIdDto {

	public interface AllValidations {}
	
	private Long fieldId;
	
	public FieldIdDto() {}

	public FieldIdDto(Long fieldId) {
		this.fieldId = fieldId;
	}
	
	@NotNull(groups={AllValidations.class})
	public Long getFieldId() {
		return fieldId;
	}

	public void setFieldId(Long fieldId) {
		this.fieldId = fieldId;
	}
}
