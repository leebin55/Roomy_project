package com.roomy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@EnableCaching// 설정해놓은 cache를 사용하겠다는 정의
@SpringBootApplication
public class RoomyApplication {

	public static void main(String[] args) {

		SpringApplication.run(RoomyApplication.class, args);

	}


//	WebConfig 에 있음
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//		return new WebMvcConfigurer() {
//			@Override
//			public void addCorsMappings(CorsRegistry registry) {
//				registry.addMapping("/**")
//						.allowedOrigins("http://localhost:3000");
//			}
//		};
//	}

}
