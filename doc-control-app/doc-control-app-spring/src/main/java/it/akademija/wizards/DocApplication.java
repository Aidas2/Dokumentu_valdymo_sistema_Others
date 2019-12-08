package it.akademija.wizards;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@EnableSwagger2
@SpringBootApplication
@ImportResource("classpath*:application-context.xml")
@EntityScan(basePackageClasses = {
		DocApplication.class,
		Jsr310JpaConverters.class
})
public class DocApplication {

	@PostConstruct
	void init() {
		TimeZone.setDefault(TimeZone.getTimeZone("GMT+2"));
	}

	public static void main(String[] args) {
		SpringApplication.run(DocApplication.class, args);
	}

	@Bean
	public Docket swaggerDocket(){
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.basePackage("it.akademija.wizards"))
				.build();
	}

	private ApiInfo apiInfo(){
		return new ApiInfoBuilder()
				.title("Doc controller REST documentation")
				.version("0.0.1-SNAPSHOT")
				.build();
	}

}

