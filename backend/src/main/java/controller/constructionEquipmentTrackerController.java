package controller;

import teamBangan.competition.model.constructionEquipmentTrackerModel;
import repository.constructionEquipmentTrackerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class constructionEquipmentTrackerController {

    @Autowired
    private constructionEquipmentTrackerRepository repository;

    @GetMapping
    public List<constructionEquipmentTrackerModel> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public constructionEquipmentTrackerModel add(@RequestBody constructionEquipmentTrackerModel equipment) {
        if (equipment == null) {
            throw new IllegalArgumentException("equipment body is required");
        }
        return repository.save(equipment);
    }
}

