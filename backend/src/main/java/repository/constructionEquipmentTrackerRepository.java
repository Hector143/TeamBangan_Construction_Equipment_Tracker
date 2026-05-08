package repository; // Just the folder name

<<<<<<< HEAD
// You MUST import the model from the teamBangan path
=======
package repository;

>>>>>>> f1e76bc (Database Schema added)
import teamBangan.competition.model.constructionEquipmentTrackerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface constructionEquipmentTrackerRepository extends JpaRepository<constructionEquipmentTrackerModel, Long> {
}