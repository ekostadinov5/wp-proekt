package mk.ukim.finki.wp.proekt.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Student {
    @Id
    @Column(name = "student_index")
    private String index;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    @OneToMany(mappedBy = "student", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<StudentSlot> slots;

    @ManyToMany(fetch = FetchType.EAGER)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Professor> following;

}
