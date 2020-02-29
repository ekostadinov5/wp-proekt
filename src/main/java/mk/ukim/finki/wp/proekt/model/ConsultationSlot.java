package mk.ukim.finki.wp.proekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Data
public class ConsultationSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @NotNull
    private Professor professor;

    @ManyToOne
    @NotNull
    private Room room;

    @OneToMany(mappedBy = "consultationSlot", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
    @JsonBackReference
    private List<StudentSlot> students;

    @FutureOrPresent
    private LocalDate date;

    private DayOfWeek dayOfWeek;

    private boolean cancel;

    @Column(name = "from_time")
    @NotNull
    private LocalTime from;

    @Column(name = "to_time")
    @NotNull
    private LocalTime to;


    private ConsultationSlot() {

    }

    public static synchronized ConsultationSlot createRecurringSlot(Professor professor, Room room, DayOfWeek dayOfWeek,
                                                                    LocalTime from, LocalTime to) {
        ConsultationSlot slot = new ConsultationSlot();
        slot.professor = professor;
        slot.room = room;
        slot.dayOfWeek = dayOfWeek;
        slot.cancel = false;
        slot.from = from;
        slot.to = to;
        return slot;
    }

    public static synchronized ConsultationSlot createOneTimeSlot(Professor professor, Room room, LocalDate date,
                                                                  LocalTime from, LocalTime to) {
        ConsultationSlot slot = new ConsultationSlot();
        slot.professor = professor;
        slot.room = room;
        slot.date = date;
        slot.from = from;
        slot.to = to;
        return slot;
    }

}
