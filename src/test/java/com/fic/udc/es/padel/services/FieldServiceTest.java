package com.fic.udc.es.padel.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.annotation.Transactional;

import com.fic.udc.es.padel.model.entities.Field;
import com.fic.udc.es.padel.model.exceptions.InstanceNotFoundException;

@SpringBootTest
@ActiveProfiles("test")
@SpringJUnitConfig
@Rollback
@TestPropertySource(locations="classpath:application-test.properties")
@Transactional
public class FieldServiceTest {
	
	@Autowired
	private FieldService fieldService;
	
	@Test
	public void addFieldAndFindTest() {
		Field field = fieldService.addField("Field 1");
		List<Field> fields = fieldService.findAllFields();
		assertEquals(fields.get(0).getFieldId(), field.getFieldId());
	}
	
	@Test
	public void addFieldAndFindAllFieldsTest() {
		fieldService.addField("Field 1");
		fieldService.addField("Field 2");
		fieldService.addField("Field 3");
		fieldService.addField("Field 4");
		List<Field> fields = fieldService.findAllFields();
		assertEquals(fields.size(), 4);
	}
	
	@Test
	public void changeStateTest() throws InstanceNotFoundException {
		Field field = fieldService.addField("Field 1");
		fieldService.changeState(field.getFieldId(), true);
		Field fieldObtained = fieldService.findAllFields().get(0);
		assertEquals(true, fieldObtained.isState());
	}
	
	@Test
	public void changeStateInstanceNotFoundTest() throws InstanceNotFoundException {
		assertThrows(InstanceNotFoundException.class, () -> fieldService.changeState(Long.valueOf(-1), true));
	}
	
	@Test
	public void updateField() throws InstanceNotFoundException {
		Field field = fieldService.addField("Field 1");
		fieldService.updateField(field.getFieldId(), "Field 2");
		Field fieldObtained = fieldService.findAllFields().get(0);
		assertEquals(fieldObtained.equals("Field 2"), true);
	}
	
	@Test
	public void updateFieldInstanceNotFoundTest() throws InstanceNotFoundException {
		assertThrows(InstanceNotFoundException.class, () -> fieldService.updateField(Long.valueOf(-1), "Field 1"));
	}
	
	@Test
	public void deleteField() throws InstanceNotFoundException {
		Field field = fieldService.addField("Field 1");
		fieldService.deleteField(field.getFieldId());
		assertEquals(fieldService.findAllFields().size(), 0);
	}
	
	@Test
	public void deleteFieldInstanceNotFoundTest() throws InstanceNotFoundException {
		assertThrows(InstanceNotFoundException.class, () -> fieldService.deleteField(Long.valueOf(-1)));
	}

}
