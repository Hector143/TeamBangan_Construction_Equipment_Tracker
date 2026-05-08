package teamBangan.competition;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"teamBangan.competition", "controller", "repository"})
public class CompetitionApplication {
    public static void main(String[] args) {
        SpringApplication.run(CompetitionApplication.class, args);
    }
}