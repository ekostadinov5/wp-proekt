package mk.ukim.finki.wp.proekt.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Student {
    @Id
    @Column(name = "student_index")
    private String index;
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @ManyToMany(mappedBy = "students")
    @NotFound(action = NotFoundAction.IGNORE)
    @JsonManagedReference
    private List<ConsultationSlot> slots;

    public void addSlot(ConsultationSlot slot) {
        this.slots.add(slot);
        slot.getStudents().add(this);
    }

    public void removeSlot(ConsultationSlot slot) {
        this.slots.remove(slot);
        slot.getStudents().remove(this);
    }

}
