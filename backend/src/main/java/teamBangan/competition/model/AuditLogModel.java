package teamBangan.competition.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLogModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "equipment_name", nullable = false)
    private String equipmentName;

    @Column(name = "asset_id", nullable = false)
    private String assetId;

    @Column(name = "action_type", nullable = false)
    private String actionType;

    @Column(name = "log_date")
    private LocalDateTime logDate;

    @Column(name = "status_at_time")
    private String statusAtTime;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "equipment_id")
    private Integer equipmentId;

    public AuditLogModel() {}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public String getActionType() {
        return actionType;
    }

    public void setActionType(String actionType) {
        this.actionType = actionType;
    }

    public LocalDateTime getLogDate() {
        return logDate;
    }

    public void setLogDate(LocalDateTime logDate) {
        this.logDate = logDate;
    }

    public String getStatusAtTime() {
        return statusAtTime;
    }

    public void setStatusAtTime(String statusAtTime) {
        this.statusAtTime = statusAtTime;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getEquipmentId() {
        return equipmentId;
    }

    public void setEquipmentId(Integer equipmentId) {
        this.equipmentId = equipmentId;
    }
}

