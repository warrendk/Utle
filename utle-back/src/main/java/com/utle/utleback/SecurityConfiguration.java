package com.utle.utleback;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // remove default login form and require/redirect http to https
        http.formLogin().disable();
        http.requiresChannel().anyRequest().requiresSecure();
        return http.build();
    }
}
