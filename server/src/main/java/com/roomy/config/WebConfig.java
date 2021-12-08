package com.roomy.config;

import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
public class WebConfig implements WebMvcConfigurer {



    //실제 외부에서 접근할때 사용할 path (file:///c:/bizwork/uploads/)
    @Value("${real-path}")
    String realPath;
    // http://localhost:8080/uploads/ 형식
    @Value("${upload-path}")
    String vrPath ;


    @Override
    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")
//                .allowedOrigins("http://localhost:3000")
//                .allowedMethods("*");
    }


    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        WebMvcConfigurer.super.addArgumentResolvers(resolvers);
    }

    // client에서 vrPath인 /uploads 로 요청하면 file:///c:/bizwork/uploads 경로로 접근
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler(vrPath)
                    .addResourceLocations(realPath);

    }
}