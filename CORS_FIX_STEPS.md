# Fix CORS Error in Java Backend

## Problem
- CORS policy blocking requests from localhost:5173 to https://swapam-backend.onrender.com
- Missing Access-Control-Allow-Origin header
- 403 Forbidden error

## Solution Steps

### 1. Add CORS Configuration Class
```java
// src/main/java/com/flexisaf/Swapam/config/CorsConfig.java
@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:3000",
                    "http://localhost:5173", 
                    "https://your-frontend-domain.com"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

### 2. Update SecurityConfig.java
```java
// Add to SecurityConfig.java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}

// Update SecurityFilterChain
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.cors().configurationSource(corsConfigurationSource())
        .and()
        .csrf().disable()
        // ... rest of config
}
```

### 3. Add Controller-Level CORS
```java
// Add to each controller
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    // ... controller methods
}
```

### 4. Check application.properties
```properties
# Add these if missing
server.port=8080
spring.web.cors.allowed-origins=http://localhost:5173,http://localhost:3000
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
```

### 5. Redeploy to Render
1. Commit changes to Git
2. Push to repository
3. Render will auto-deploy
4. Test endpoints

## Quick Test
```bash
curl -H "Origin: http://localhost:5173" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: X-Requested-With" \
     -X OPTIONS \
     https://swapam-backend.onrender.com/api/health
```