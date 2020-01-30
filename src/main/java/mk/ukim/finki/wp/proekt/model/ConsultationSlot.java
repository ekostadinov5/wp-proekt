package mk.ukim.finki.wp.proekt.model;

import lombok.Data;

import javax.persistence.*;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class ConsultationSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Professor professor;
    @ManyToOne
    private Room room;
    @ManyToMany
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
        slot.professor = professor;
        slot.room = room;
        slot.date = date;
        slot.from = from;
        slot.to = to;
        return slot;
    }

}
