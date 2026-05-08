package repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import teamBangan.competition.model.SiteModel;

@Repository
public interface SiteRepository extends JpaRepository<SiteModel, Integer> {
}

