package rabo.statementprocessor.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource

@Configuration
class CorsConfig {

    @Bean
    fun corsConfigurationSource(): UrlBasedCorsConfigurationSource {
        val configuration = CorsConfiguration()

        configuration.allowedOrigins = listOf("http://localhost:5173") // Replace with specific origin for production
        configuration.allowCredentials = true
        configuration.allowedMethods = listOf("GET")
        configuration.allowedHeaders = listOf("Authorization", "Content-Type")
        // Apply CORS to all paths
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)

        return source
    }
}