package mk.ukim.finki.wp.proekt.bootstrap;

import lombok.Getter;
import mk.ukim.finki.wp.proekt.model.*;
import mk.ukim.finki.wp.proekt.repository.jpa.*;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
@Getter
public class DataHolder {

    public static final List<Building> buildings = new ArrayList<>();

    public static final List<Room> rooms = new ArrayList<>();

    public static final List<Student> students = new ArrayList<>();

    public static final List<Professor> professors = new ArrayList<>();

    public static final List<ConsultationSlot> slots = new ArrayList<>();

    public final JpaBuildingRepository buildingRepository;

    public final JpaRoomRepository roomRepository;

    public final JpaStudentRepository studentRepository;

    public final JpaProfessorRepository professorRepository;

    public final JpaConsultationSlotRepository consultationSlotRepository;

    public DataHolder(JpaBuildingRepository buildingRepository, JpaRoomRepository roomRepository, JpaStudentRepository studentRepository, JpaProfessorRepository professorRepository, JpaConsultationSlotRepository consultationSlotRepository) {
        this.buildingRepository = buildingRepository;
        this.roomRepository = roomRepository;
        this.studentRepository = studentRepository;
        this.professorRepository = professorRepository;
        this.consultationSlotRepository = consultationSlotRepository;
    }

    @PostConstruct
    public void init() {

        Building tmf = new Building("TMF", "Простории за држење на настава на ТМФ");
        Building mf = new Building("MF", "Простории за држење настава во зградата на МФ и ФЕИТ");
        Building b = new Building("B", "Бараки - простории на западната страна на кампусот");
        Building l = new Building("L", "Компјутерски училници");

        buildings.add(tmf);
        buildings.add(mf);
        buildings.add(b);
        buildings.add(l);

        rooms.add(new Room("117", tmf, new ArrayList<>(), "на приземје, ходник десно од главниот влез, последна врата од лево (просторијата каде се вршеше запишувањето на ФИНКИ)"));
        rooms.add(new Room("114", tmf, new ArrayList<>(), "на приземје, ходник десно од главниот влез, простории од десна страна"));
        rooms.add(new Room("115", tmf, new ArrayList<>(), "на приземје, ходник десно од главниот влез, простории од десна страна"));
        rooms.add(new Room("116", tmf, new ArrayList<>(), "на приземје, ходник десно од главниот влез, простории од десна страна"));
        rooms.add(new Room("201", tmf, new ArrayList<>(), "први спрат, десно од скалите, па повторно десно"));
        rooms.add(new Room("203", tmf, new ArrayList<>(), "први спрат, десно од скалите, па повторно десно"));
        rooms.add(new Room("2xx", tmf, new ArrayList<>(), "први спрат, лево од скалите, па повторно лево"));
        rooms.add(new Room("315", tmf, new ArrayList<>(), "втори спрат, лево од скалите, па повторно лево"));
        rooms.add(new Room("301", tmf, new ArrayList<>(), "втори кат, десно од скалите, па повторно десно"));
        rooms.add(new Room("302", tmf, new ArrayList<>(), "втори кат, десно од скалите, па повторно десно"));
        rooms.add(new Room("123(Ф)", mf, new ArrayList<>(), "прв спрат, десно од скалите"));
        rooms.add(new Room("112(Ф)", mf, new ArrayList<>(), "прв спрат, десно од скалите"));
        rooms.add(new Room("223(М)", mf, new ArrayList<>(), "втор спрат, лево од скалите"));
        rooms.add(new Room("225(М)", mf, new ArrayList<>(), "втор спрат, десно од скалите"));
        rooms.add(new Room("B1", b, new ArrayList<>(), ""));
        rooms.add(new Room("B2.1", b, new ArrayList<>(), ""));
        rooms.add(new Room("B2.2", b, new ArrayList<>(), ""));
        rooms.add(new Room("B3.1", b, new ArrayList<>(), ""));
        rooms.add(new Room("B3.2", b, new ArrayList<>(), ""));

        students.add(new Student("170001", "Petko", "Petkovski", new ArrayList<>()));
        students.add(new Student("170002", "Petko", "Petkovski", new ArrayList<>()));
        students.add(new Student("170003", "Petko", "Petkovski", new ArrayList<>()));
        students.add(new Student("170004", "Petko", "Petkovski", new ArrayList<>()));
        students.add(new Student("170005", "Petko", "Petkovski", new ArrayList<>()));
        students.add(new Student("170006", "Petko", "Petkovski", new ArrayList<>()));

        Professor dt = new Professor("dimitar.trajanov", "проф. д-р", "Димитар", "Трајанов", new ArrayList<>());
        Professor rs = new Professor("riste.stojanov", "доц. д-р", "Ристе", "Стојанов", new ArrayList<>());
        Professor km = new Professor("kostadin.mishev", "м-р", "Костадин", "Мишев", new ArrayList<>());

        professors.add(dt);
        professors.add(rs);
        professors.add(km);

        ConsultationSlot s1 = ConsultationSlot.createRecurringSlot(dt, rooms.get(1), DayOfWeek.TUESDAY, LocalTime.parse("10:00"), LocalTime.parse("12:00"));
        ConsultationSlot s2 = ConsultationSlot.createRecurringSlot(dt, rooms.get(1), DayOfWeek.THURSDAY, LocalTime.parse("19:00"), LocalTime.parse("21:00"));
        ConsultationSlot s3 = ConsultationSlot.createRecurringSlot(rs, rooms.get(1), DayOfWeek.TUESDAY, LocalTime.parse("10:00"), LocalTime.parse("12:00"));
        ConsultationSlot s4 = ConsultationSlot.createRecurringSlot(rs, rooms.get(1), DayOfWeek.THURSDAY, LocalTime.parse("19:00"), LocalTime.parse("21:00"));
        ConsultationSlot s5 = ConsultationSlot.createOneTimeSlot(km, rooms.get(1), LocalDate.now().plusDays(7), LocalTime.parse("10:00"), LocalTime.parse("12:00"));
        ConsultationSlot s6 = ConsultationSlot.createRecurringSlot(km, rooms.get(1), DayOfWeek.THURSDAY, LocalTime.parse("19:00"), LocalTime.parse("21:00"));

        s1.setStudents(new ArrayList<>());
        s2.setStudents(new ArrayList<>());
        s3.setStudents(new ArrayList<>());
        s4.setStudents(new ArrayList<>());
        s5.setStudents(new ArrayList<>());
        s6.setStudents(new ArrayList<>());

        slots.add(s1);
        slots.add(s2);
        slots.add(s3);
        slots.add(s4);
        slots.add(s5);
        slots.add(s6);

        students.get(0).addSlot(s1);
        students.get(0).addSlot(s2);
        students.get(1).addSlot(s1);
        students.get(2).addSlot(s1);
        students.get(3).addSlot(s2);
        students.get(3).addSlot(s4);
        students.get(4).addSlot(s5);
        students.get(5).addSlot(s5);
        students.get(5).addSlot(s6);

        // Initial save of all objects in relational database
        if (this.consultationSlotRepository.count() == 0) {
            this.buildingRepository.saveAll(buildings);
            this.roomRepository.saveAll(rooms);
            this.professorRepository.saveAll(professors);
            this.studentRepository.saveAll(students);
            this.consultationSlotRepository.saveAll(slots);
        }
    }

}
