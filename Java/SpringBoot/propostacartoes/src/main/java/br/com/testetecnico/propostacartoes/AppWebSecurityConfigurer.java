package br.com.testetecnico.propostacartoes;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import javax.annotation.Resource;

/**
 * Configurador geral de segurança da API
 * @author joao.souza
 */
@Configuration
@EnableWebSecurity
public class AppWebSecurityConfigurer extends WebSecurityConfigurerAdapter {

    @Value("${spring.security.user.name}")
    private String USER_NAME;

    @Value("${spring.security.user.password}")
    private String PASSWORD;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser(USER_NAME).password("{noop}".concat(PASSWORD)).roles("ADMIN");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //HTTP Basic authentication
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/cadastro/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/cadastro").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/cadastro/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.PATCH, "/cadastro/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/cadastro/**").hasRole("ADMIN")
                .and()
                .csrf().disable()
                .formLogin().disable();
    }

}
