package teamBangan.competition.model;

import jakarta.persistence.*;

@Entity
@Table(name = "equipment")
public class constructionEquipmentTrackerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "equipment_name")
    private String name;

    @Column(name = "model_number")
    private String type;

    @Column(name = "status")
    private String status;

    public constructionEquipmentTrackerModel() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}