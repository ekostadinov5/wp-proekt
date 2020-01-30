package mk.ukim.finki.wp.proekt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Professor {
    @Id
    private String id;
    private String title;
    private String firstName;
    private String lastName;
    @OneToMany(mappedBy = "professor")
    private List<ConsultationSlot> slots;

}
