package com.fic.udc.es.padel.rest.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtGenerator jwtGenerator;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.cors().and().csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.addFilter(new JwtFilter(authenticationManager(), jwtGenerator))
			.authorizeRequests()
			.antMatchers("/users/signUp").permitAll()	
			.antMatchers("/users/login").permitAll()
			.antMatchers("/users/loginFromServiceToken").permitAll()
			.antMatchers("/users/*/changePassword").permitAll()
			.antMatchers("/users/*").permitAll()
			.antMatchers("/users").permitAll()
			.antMatchers("/users/*/*").permitAll()
			.antMatchers("/users/*/changeLevel").hasRole("ADMIN")
			.antMatchers("/fields/fields").permitAll()
			.antMatchers("/fields/addField").hasRole("ADMIN")
			.antMatchers("/fields/updateField").hasRole("ADMIN")
			.antMatchers("/fields/deleteField").hasRole("ADMIN")
			.antMatchers("/fields/changeState").hasRole("ADMIN")
			.antMatchers("/games/addGame").permitAll()
			.antMatchers("/games/*").permitAll()
			.antMatchers("/games/scoreGame/*").hasRole("ADMIN")
			.antMatchers("/games/deleteScoreGame/*").hasRole("ADMIN")
			.antMatchers("/games/deleteGame/*").permitAll()
			.antMatchers("/games/removeFromGame").permitAll()
			.antMatchers("/games/user/*").permitAll()
			.antMatchers("/games/users/*/*").permitAll()
			.anyRequest().hasRole("USER");

	}
	
//	@Bean
//	public CorsConfigurationSource corsConfigurationSource() {
//		
//		CorsConfiguration config = new CorsConfiguration();
//	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		
//		config.setAllowCredentials(true);
//	    config.addAllowedOrigin("*");
//	    config.addAllowedHeader("*");
//	    config.addAllowedMethod("*");
//	    
//	    source.registerCorsConfiguration("/**", config);
//	    
//	    return source;
//	    
//	 }

}