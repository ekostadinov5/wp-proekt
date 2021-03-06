package mk.ukim.finki.wp.proekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ConsultationSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private WeeklyConsultationTerm term;

    @ManyToOne
    @JsonBackReference
    private Professor professor;

    @ManyToOne
    @NotNull
    private Room room;

    @OneToMany(mappedBy = "consultationSlot", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonBackReference
    private List<StudentSlot> students;

    @FutureOrPresent
    @NotNull
    private LocalDate date;

    @Column(name = "from_time")
    @NotNull
    private LocalTime from;

    @Column(name = "to_time")
    @NotNull
    private LocalTime to;

    private boolean cancel;

}
