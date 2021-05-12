package com.fic.udc.es.padel.dtos;

import javax.validation.constraints.NotNull;

public class UpdateFieldDto {
	
	public interface AllValidations {}
	
	private Long fieldId;
	private String name;
	
	public UpdateFieldDto() {}

	public UpdateFieldDto(Long fieldId, String name) {
		this.fieldId = fieldId;
		this.name = name;
	}
	
	@NotNull(groups={AllValidations.class})
	public Long getFieldId() {
		return fieldId;
	}

	public void setFieldId(Long fieldId) {
		this.fieldId = fieldId;
	}

	@NotNull(groups={AllValidations.class})
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
