package mk.ukim.finki.wp.proekt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Room {
    @Id
    private String name;
    @ManyToOne
    private Building building;
    @OneToMany(mappedBy = "room")
    private List<ConsultationSlot> slots;
    private String description;

}
