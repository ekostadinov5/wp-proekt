package mk.ukim.finki.wp.proekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WeeklyConsultationTerm {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @NotNull
    private Professor professor;

    @ManyToOne
    @NotNull
    private Room room;

    private DayOfWeek dayOfWeek;

    @Column(name = "from_time")
    @NotNull
    private LocalTime from;

    @Column(name = "to_time")
    @NotNull
    private LocalTime to;

    @OneToMany(mappedBy = "term", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    private List<ConsultationSlot> slots;

}
