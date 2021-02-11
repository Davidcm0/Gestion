package Lanzadora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class Lanzadora {

	public static void main(String[] args) throws Throwable {
		SpringApplicationBuilder builder = new SpringApplicationBuilder(Lanzadora.class);

		builder.headless(false);

		ConfigurableApplicationContext context = builder.run(args);
	}

}
