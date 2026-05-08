package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import teamBangan.competition.model.SiteModel;
import repository.SiteRepository;

import java.util.List;

@RestController
@RequestMapping("/api/sites")
public class SitesController {

    @Autowired
    private SiteRepository repository;

    @GetMapping
    public List<SiteModel> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public SiteModel add(@RequestBody SiteModel site) {
        return repository.save(site);
    }
}

