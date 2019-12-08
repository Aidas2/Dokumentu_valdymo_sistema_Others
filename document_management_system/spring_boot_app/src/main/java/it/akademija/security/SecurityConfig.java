package it.akademija.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import it.akademija.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers("/xxx/**").authenticated();
        http.authorizeRequests().anyRequest().permitAll();
//        http
//                .cors()
//                .and()
//                .csrf()
//                .disable()
//                .exceptionHandling()
//                .authenticationEntryPoint(unauthorizedHandler)
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .httpBasic()
//                .and()
//                .authorizeRequests()
//                .antMatchers("/v2/api-docs",
//                "/configuration/ui",
//                "/swagger-resources",
//                "/configuration/security",
//                "/swagger-ui.html",
//                "/webjars/**")
//                .permitAll()
//                .antMatchers("/",
//                        "/login",
////                        "/groups",
//                        "/register",
//                        "/favicon.ico",
//                        "/**/*.png",
//                        "/**/*.gif",
//                        "/**/*.svg",
//                        "/**/*.jpg",
//                        "/**/*.html",
//                        "/**/*.css",
//                        "/**/*.js")
//                .permitAll()
//
//                .antMatchers("/api/auth/login")
////                .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
//                .permitAll()
//                .antMatchers("/api/auth/newUser")
////                .hasAuthority("ROLE_ADMIN")
//                .permitAll()
//
////                .hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
//                .antMatchers("/console/**").permitAll()
//                .antMatchers("/swagger-ui.html#/").permitAll()
//                .antMatchers("/api/**")
//                .permitAll()
//                .antMatchers("/api/user/checkUsernameAvailability", "/api/user/checkEmailAvailability")
//                .permitAll()
//                .antMatchers(HttpMethod.GET, "/api/documents/**", "/api/users/**")
//                .permitAll()
//                .anyRequest()
//                .authenticated();

        http.headers().frameOptions().disable();// allow access to h2 console
        // Add our custom JWT security filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        http.csrf().disable();
    }
}