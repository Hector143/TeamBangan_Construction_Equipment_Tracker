package teamBangan.competition;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
// This tells Spring to look in the teamBangan folder AND the root folder for your packages
@ComponentScan(basePackages = {"teamBangan.competition.model", "controller", "repository"})
public class CompetitionApplication {

    public static void main(String[] args) {
        SpringApplication.run(CompetitionApplication.class, args);
    }
}