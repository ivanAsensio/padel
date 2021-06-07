package com.fic.udc.es.padel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@SpringBootApplication
public class PadelApplication {

	public static void main(String[] args) {
		System.setProperty("spring.devtools.restart.enabled", "false");
		SpringApplication.run(PadelApplication.class, args);
	}
	
	@Bean
    public BCryptPasswordEncoder passwordEncoder() {
    	return new BCryptPasswordEncoder();
    }
	
	@Bean
    public MessageSource messageSource() {
    	
        ReloadableResourceBundleMessageSource bean = new ReloadableResourceBundleMessageSource();
        
        bean.setBasename("classpath:messages");
        bean.setDefaultEncoding("UTF-8");
        
        return bean;
    }

}
