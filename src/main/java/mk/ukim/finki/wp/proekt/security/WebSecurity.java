package mk.ukim.finki.wp.proekt.security;

import mk.ukim.finki.wp.proekt.service.impl.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    private final UserDetailsServiceImpl userDetailsService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public WebSecurity(UserDetailsServiceImpl userDetailsService, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userDetailsService = userDetailsService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()

                .antMatchers(HttpMethod.POST, "/api/buildings", "/api/rooms").hasAuthority("admin")
                .antMatchers(HttpMethod.PATCH, "/api/buildings/**", "/api/rooms/**").hasAuthority("admin")
                .antMatchers(HttpMethod.DELETE, "/api/buildings/**", "/api/rooms/**").hasAuthority("admin")

                .antMatchers(HttpMethod.POST, "/api/consultations").hasAuthority("professor")
                .antMatchers(HttpMethod.PATCH, "/api/consultations/**").hasAuthority("professor")
                .antMatchers(HttpMethod.DELETE, "/api/consultations/**").hasAuthority("professor")

                .antMatchers("/api/students/add", "/api/students/remove", "/api/students/follow",
                        "/api/students/unfollow").hasAuthority("student")

                .antMatchers("/users/**").permitAll()
                .antMatchers("/login").permitAll()

                .antMatchers(HttpMethod.GET).permitAll()

                .anyRequest().authenticated()

                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), this.userDetailsService))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), this.userDetailsService))
                // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.applyPermitDefaultValues();
        corsConfig.setAllowedMethods(List.of("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        corsConfig.addExposedHeader(SecurityConstants.HEADER_STRING);
        corsConfig.addExposedHeader(SecurityConstants.ROLE_HEADER);
        corsConfig.addExposedHeader(SecurityConstants.IDENTIFIER_HEADER);
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }

}
