package teamBangan.competition.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")


public class constructionEquipmentTrackerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "equipment_name", nullable = false)
    private String equipmentName;

    @Column(name = "asset_id", nullable = false, unique = true)
    private String assetId;

    @Column(name = "type", nullable = false)
    private String type;

    @Column(name = "status")
    private String status;

    @Column(name = "site_id")
    private Integer siteId;

    public constructionEquipmentTrackerModel() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEquipmentName() { return equipmentName; }
    public void setEquipmentName(String equipmentName) { this.equipmentName = equipmentName; }
    public String getAssetId() { return assetId; }
    public void setAssetId(String assetId) { this.assetId = assetId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getSiteId() { return siteId; }
    public void setSiteId(Integer siteId) { this.siteId = siteId; }
}