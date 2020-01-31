package mk.ukim.finki.wp.proekt.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class ConsultationSlot {
    @Transient
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private static Long slotsCounter = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JsonBackReference
    private Professor professor;
    @ManyToOne
    @JsonIgnore
    private Room room;
    @ManyToMany(fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Student> students;
    private LocalDate date;
    private DayOfWeek dayOfWeek;
    @Column(name = "from_time")
    private LocalTime from;
    @Column(name = "to_time")
    private LocalTime to;

    private ConsultationSlot() {

    }

    public static synchronized ConsultationSlot createRecurringSlot(Professor professor, Room room, DayOfWeek dayOfWeek,
                                                                    LocalTime from, LocalTime to) {
        ConsultationSlot slot = new ConsultationSlot();
        slot.id = slotsCounter++;
        slot.professor = professor;
        slot.room = room;
        slot.dayOfWeek = dayOfWeek;
        slot.from = from;
        slot.to = to;
        return slot;
    }

    public static synchronized ConsultationSlot createOneTimeSlot(Professor professor, Room room, LocalDate date,
                                                                  LocalTime from, LocalTime to) {
        ConsultationSlot slot = new ConsultationSlot();
        slot.id = slotsCounter++;
        slot.professor = professor;
        slot.room = room;
        slot.date = date;
        slot.from = from;
        slot.to = to;
        return slot;
    }

}
