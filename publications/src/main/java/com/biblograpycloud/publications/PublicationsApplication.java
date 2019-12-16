package com.biblograpycloud.publications;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class PublicationsApplication {

    public static void main(String[] args) {
        SpringApplication.run(PublicationsApplication.class, args);
    }

    @Bean
    public Docket produceApi() {
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.bibiograpycloud.publications.api")).build();
    }


    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Hotel Management Rest APIs")
                .description("This page lists all the rest apis for Hotel Management App.")
                .version("1.0-SNAPSHOT")
                .build();
    }

}
