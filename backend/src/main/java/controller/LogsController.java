package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import teamBangan.competition.model.AuditLogModel;
import repository.AuditLogRepository;

import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogsController {

    @Autowired
    private AuditLogRepository repository;

    @GetMapping
    public List<AuditLogModel> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public AuditLogModel add(@RequestBody AuditLogModel log) {
        return repository.save(log);
    }
}

