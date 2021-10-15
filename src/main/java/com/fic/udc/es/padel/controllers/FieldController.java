package com.fic.udc.es.padel.controllers;

import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fic.udc.es.padel.dtos.AddFieldDto;
import com.fic.udc.es.padel.dtos.ChangeStateDto;
import com.fic.udc.es.padel.dtos.FieldConversor;
import com.fic.udc.es.padel.dtos.FieldDto;
import com.fic.udc.es.padel.dtos.FieldIdDto;
import com.fic.udc.es.padel.dtos.UpdateFieldDto;
import com.fic.udc.es.padel.model.entities.Field;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;
import com.fic.udc.es.padel.rest.common.ErrorsDto;
import com.fic.udc.es.padel.services.FieldService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/fields")
public class FieldController {
	
	private final static String INSTANCE_NOT_FOUND_EXCEPTION_CODE = "project.exceptions.InstanceNotFoundException";

	
	@Autowired
	private MessageSource messageSource;
	
	@Autowired
	private FieldService fieldService;
	
	@ExceptionHandler(InstanceNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ResponseBody
	public ErrorsDto handleInstanceNotFoundException(InstanceNotFoundException exception, Locale locale) {
		
		String errorMessage = messageSource.getMessage(INSTANCE_NOT_FOUND_EXCEPTION_CODE, null,
				INSTANCE_NOT_FOUND_EXCEPTION_CODE, locale);

		return new ErrorsDto(errorMessage);
	}
	
	@GetMapping("")
	public List<FieldDto> getAllFields(){
		List<Field> fields = fieldService.findAllFields();
		return FieldConversor.toFieldDtos(fields);
	}
	
	@PostMapping("")
	public FieldDto addField(@Validated({AddFieldDto.AllValidations.class}) @RequestBody AddFieldDto params) {
		Field field = fieldService.addField(params.getName());
		return FieldConversor.toFieldDto(field);
	}
	
	@PutMapping("/{fieldId}")
	public FieldDto updateField(@PathVariable Long fieldId, @Validated({UpdateFieldDto.AllValidations.class}) @RequestBody UpdateFieldDto params) throws InstanceNotFoundException {
		Field field = fieldService.updateField(params.getFieldId(),params.getName());
		return FieldConversor.toFieldDto(field);
	}
	
	@DeleteMapping("/{fieldId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteField(@PathVariable Long fieldId) throws InstanceNotFoundException {
		fieldService.deleteField(fieldId);
	}
	
	@PutMapping("/{fieldId}/changeState")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void changeState(@PathVariable Long fieldId, @Validated({ChangeStateDto.AllValidations.class}) @RequestBody ChangeStateDto params) throws InstanceNotFoundException {
		fieldService.changeState(params.getId(),params.getState());
	}

}
