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
    private final JpaBuildingRepository buildingRepository;
    private final JpaRoomRepository roomRepository;
    private final JpaStudentRepository studentRepository;
    private final JpaProfessorRepository professorRepository;
    private final JpaConsultationSlotRepository consultationSlotRepository;

    public static final List<Building> buildings = new ArrayList<>();
    public static final List<Room> rooms = new ArrayList<>();
    public static final List<Student> students = new ArrayList<>();
    public static final List<Professor> professors = new ArrayList<>();
    public static final List<ConsultationSlot> slots = new ArrayList<>();

    public DataHolder(JpaBuildingRepository buildingRepository, JpaRoomRepository roomRepository, JpaStudentRepository studentRepository, JpaProfessorRepository professorRepository, JpaConsultationSlotRepository consultationSlotRepository) {
        this.buildingRepository = buildingRepository;
        this.roomRepository = roomRepository;
        this.studentRepository = studentRepository;
        this.professorRepository = professorRepository;
        this.consultationSlotRepository = consultationSlotRepository;
    }

    @PostConstruct
    public void init() {

        String loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";


        Building tmf = new Building(null, "Технолошко-металуршки факултет", loremIpsum);
        Building mf = new Building(null, "Машински факултет", loremIpsum);
        Building b = new Building(null, "Бараки", loremIpsum);
        Building l = new Building(null, "Лаборатории", loremIpsum);

        buildings.add(tmf);
        buildings.add(mf);
        buildings.add(b);
        buildings.add(l);


        rooms.add(new Room(null, "117", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "114", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "115", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "116", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "201", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "203", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "2xx", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "315", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "301", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "302", tmf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "АМФ", tmf, new ArrayList<>(), loremIpsum));

        rooms.add(new Room(null, "123 (Ф)", mf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "112 (Ф)", mf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "223 (М)", mf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "225 (М)", mf, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "АМФ (М)", mf, new ArrayList<>(), loremIpsum));

        rooms.add(new Room(null, "B1", b, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "B2.1", b, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "B2.2", b, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "B3.1", b, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "B3.2", b, new ArrayList<>(), loremIpsum));

        rooms.add(new Room(null, "138", l, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "200АБ", l, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "200В", l, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "215", l, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "Л2", l, new ArrayList<>(), loremIpsum));
        rooms.add(new Room(null, "Л3", l, new ArrayList<>(), loremIpsum));


        students.add(new Student("170000", "Андреа", "Павлеска", new ArrayList<>()));
        students.add(new Student("170001", "Петко", "Петковски", new ArrayList<>()));
        students.add(new Student("170002", "Марко", "Нолев", new ArrayList<>()));
        students.add(new Student("170003", "Здравко", "Марковски", new ArrayList<>()));
        students.add(new Student("170010", "Марта", "Петрова", new ArrayList<>()));
        students.add(new Student("170004", "Кирил", "Здравковски", new ArrayList<>()));
        students.add(new Student("170005", "Мартин", "Мартиновски", new ArrayList<>()));
        students.add(new Student("170006", "Илија", "Здравковски", new ArrayList<>()));
        students.add(new Student("170007", "Бојан", "Јованов", new ArrayList<>()));
        students.add(new Student("170011", "Теодора", "Јованова", new ArrayList<>()));
        students.add(new Student("170008", "Јован", "Петковски", new ArrayList<>()));
        students.add(new Student("170009", "Кристијан", "Ефтимов", new ArrayList<>()));
        students.add(new Student("170012", "Ана", "Поповска", new ArrayList<>()));
        students.add(new Student("170013", "Кристина", "Јорданова", new ArrayList<>()));
        students.add(new Student("170014", "Владимир", "Ивкоски", new ArrayList<>()));
        students.add(new Student("170015", "Елена", "Младеновска", new ArrayList<>()));


        Professor dt = new Professor("dimitar.trajanov", "проф. д-р", "Димитар", "Трајанов", new ArrayList<>());
        Professor rs = new Professor("riste.stojanov", "доц. д-р", "Ристе", "Стојанов", new ArrayList<>());
        Professor km = new Professor("kostadin.mishev", "м-р", "Костадин", "Мишев", new ArrayList<>());

        professors.add(dt);
        professors.add(rs);
        professors.add(km);

        professors.add(new Professor("ljupcho.kocarev", "Академик д-р", "Љупчо", "Коцарев", new ArrayList<>()));
        professors.add(new Professor("marijan.gushev", "д-р", "Маријан", "Гушев", new ArrayList<>()));
        professors.add(new Professor("dancho.davchev", "д-р", "Данчо", "Давчев", new ArrayList<>()));
        professors.add(new Professor("katerina.zdravkova", "д-р", "Катерина", "Здравкова", new ArrayList<>()));
        professors.add(new Professor("suzana.loshkovska", "д-р", "Сузана", "Лошковска", new ArrayList<>()));
        professors.add(new Professor("zhaneta.popeska", "д-р", "Жанета", "Попеска", new ArrayList<>()));
        professors.add(new Professor("kosta.mitreski", "д-р", "Коста", "Митрески", new ArrayList<>()));
        professors.add(new Professor("verica.bakjeva", "д-р", "Љупчо", "Коцарев", new ArrayList<>()));
        professors.add(new Professor("vladimir.trajkovikj", "д-р", "Владимир", "Трајковиќ", new ArrayList<>()));
        professors.add(new Professor("ana.madevska.bogdanova", "д-р", "Ана", "Мадевска Богданова", new ArrayList<>()));
        professors.add(new Professor("dejan.gjorgjevikj", "д-р", "Дејан", "Ѓорѓевиќ", new ArrayList<>()));
        professors.add(new Professor("andrea.kulakov", "д-р", "Андреа", "Кулаков", new ArrayList<>()));
        professors.add(new Professor("ljupcho.antovski", "д-р", "Љупчо", "Антовски", new ArrayList<>()));
        professors.add(new Professor("marija.mihova", "д-р", "Марија", "Михова", new ArrayList<>()));
        professors.add(new Professor("slobodan.kalajdziski", "д-р", "Слободан", "Калајџиски", new ArrayList<>()));
        professors.add(new Professor("nevena.ackovska", "д-р", "Невена", "Ацковска", new ArrayList<>()));
        professors.add(new Professor("goran.velinov", "д-р", "Горан", "Велинов", new ArrayList<>()));
        professors.add(new Professor("anastas.mishev", "д-р", "Анастас", "Мишев", new ArrayList<>()));
        professors.add(new Professor("sonja.filiposka", "д-р", "Соња", "Филипоска", new ArrayList<>()));
        professors.add(new Professor("ivan.chorbev", "д-р", "Иван", "Чорбев", new ArrayList<>()));
        professors.add(new Professor("lasko.basnarkov", "д-р", "Ласко", "Баснарков", new ArrayList<>()));
        professors.add(new Professor("boro.jakimovski", "д-р", "Боро", "Јакимовски", new ArrayList<>()));
        professors.add(new Professor("vesna.dimitrova", "д-р", "Весна", "Димитрова", new ArrayList<>()));
        professors.add(new Professor("goce.armenski", "д-р", "Гоце", "Арменски", new ArrayList<>()));
        professors.add(new Professor("danilo.gligoroski", "д-р", "Данило", "Глигороски", new ArrayList<>()));
        professors.add(new Professor("gjorgji.filipov", "д-р", "Ѓорѓи", "Филипов", new ArrayList<>()));
        professors.add(new Professor("stevo.bozhinovski", "д-р", "Стево", "Божиновски", new ArrayList<>()));
        professors.add(new Professor("sonja.gievska", "д-р", "Соњљ", "Гиевска", new ArrayList<>()));
        professors.add(new Professor("dejan.spasov", "д-р", "Дејан", "Спасов", new ArrayList<>()));
        professors.add(new Professor("ivica.dimitrovski", "д-р", "Ивица", "Димитровски", new ArrayList<>()));
        professors.add(new Professor("igor.mishkovski", "д-р", "Игор", "Мишковски", new ArrayList<>()));
        professors.add(new Professor("gjorgji.madzarov", "д-р", "Ѓорѓи", "Маџаров", new ArrayList<>()));
        professors.add(new Professor("smilka.janeska.sarkanjac", "д-р", "Смилка", "Јанеска-Саркањац", new ArrayList<>()));
        professors.add(new Professor("sashko.ristov", "д-р", "Сашко", "Ристов", new ArrayList<>()));
        professors.add(new Professor("vangel.ajanovski", "д-р", "Вангел", "Ајановски", new ArrayList<>()));
        professors.add(new Professor("vesna.dimitrievska.ristovska", "д-р", "Весна", "Димитриевска Ристовска", new ArrayList<>()));
        professors.add(new Professor("mile.jovanov", "д-р", "Миле", "Јованов", new ArrayList<>()));
        professors.add(new Professor("biljana.stojkoska", "д-р", "Билјана", "Стојкоска", new ArrayList<>()));
        professors.add(new Professor("kire.trivodaliev", "д-р", "Кире", "Триводалиев", new ArrayList<>()));
        professors.add(new Professor("sasho.gramatikov", "д-р", "Сашо", "Граматиков", new ArrayList<>()));
        professors.add(new Professor("miroslav.mircev", "д-р", "Мирослав", "Мирчев", new ArrayList<>()));
        professors.add(new Professor("georgina.mirceva", "д-р", "Георгина", "Мирчева", new ArrayList<>()));
        professors.add(new Professor("magdalena.kostoska", "д-р", "Магдалена", "Костоска", new ArrayList<>()));
        professors.add(new Professor("aleksandra.popovska.mitrovikj", "д-р", "Александра", "Поповска Митровиќ", new ArrayList<>()));
        professors.add(new Professor("biljana.tojtovska", "д-р", "Билјана", "Тојтовска", new ArrayList<>()));
        professors.add(new Professor("natasha.ilievska", "д-р", "Наташа", "Илиевска", new ArrayList<>()));
        professors.add(new Professor("simona.samardziska", "д-р", "Симона", "Самарџиска", new ArrayList<>()));
        professors.add(new Professor("milosh.jovanovikj", "д-р", "Милош", "Јовановиќ", new ArrayList<>()));
        professors.add(new Professor("jasen.markovski", "д-р", "Јасен", "Марковски", new ArrayList<>()));
        professors.add(new Professor("ana.sokolova", "д-р", "Ана", "Соколова", new ArrayList<>()));
        professors.add(new Professor("andreja.naumoski", "д-р", "Андреја", "Наумоски", new ArrayList<>()));
        professors.add(new Professor("panche.ribarski", "д-р", "Панче", "Рибарски", new ArrayList<>()));
        professors.add(new Professor("hristina.mihajloska", "д-р", "Христина", "Михајлоска", new ArrayList<>()));
        professors.add(new Professor("ivan.kitanovski", "д-р", "Иван", "Китановски", new ArrayList<>()));
        professors.add(new Professor("eftim.zdravevski", "д-р", "Ефтим", "Здравевски", new ArrayList<>()));
        professors.add(new Professor("petre.lameski", "д-р", "Петре", "Ламески", new ArrayList<>()));
        professors.add(new Professor("katerina.trojachanec.dineva", "д-р", "Катерина", "Тројачанец Динева", new ArrayList<>()));
        professors.add(new Professor("vladimir.zdraveski", "д-р", "Владимир", "Здравески", new ArrayList<>()));
        professors.add(new Professor("bojana.koteska", "д-р", "Бојана", "Котеска", new ArrayList<>()));
        professors.add(new Professor("metodija.jancheski", "д-р", "Методија", "Јанчески", new ArrayList<>()));
        professors.add(new Professor("aleksandra.kanevche", "д-р", "Александра", "Каневче", new ArrayList<>()));
        professors.add(new Professor("aleksandra.dedinec", "д-р", "Александра", "Дединец", new ArrayList<>()));
        professors.add(new Professor("igor.kulev", "д-р", "Игор", "Кулев", new ArrayList<>()));
        professors.add(new Professor("igor.trajkovski", "д-р", "Игор", "Трајковски", new ArrayList<>()));
        professors.add(new Professor("vancho.kusakatov", "д-р", "Ванчо", "Кусакатов", new ArrayList<>()));
        professors.add(new Professor("dragan.mihajlov", "д-р", "Драган", "Михајлов", new ArrayList<>()));
        professors.add(new Professor("emil.stankov", "м-р", "Емил", "Станков", new ArrayList<>()));
        professors.add(new Professor("boban.joksimoski", "м-р", "Бобан", "Јоксимоски", new ArrayList<>()));
        professors.add(new Professor("ilinka.ivanoska", "м-р", "Илинка", "Иваноска", new ArrayList<>()));
        professors.add(new Professor("aleksandar.tenev", "м-р", "Александар", "Тенев", new ArrayList<>()));
        professors.add(new Professor("vesna.kirandziska", "м-р", "Весна", "Киранџиска", new ArrayList<>()));
        professors.add(new Professor("bojan.ilijoski", "м-р", "Бојан", "Илијоски", new ArrayList<>()));
        professors.add(new Professor("monika.simjanoska", "м-р", "Моника", "Симјаноска", new ArrayList<>()));
        professors.add(new Professor("aleksandar.stojmenski", "м-р", "Александар", "Стојменски", new ArrayList<>()));
        professors.add(new Professor("aleksandra.bogojeska", "м-р", "Александра", "Богојеска", new ArrayList<>()));
        professors.add(new Professor("goran.velkoski", "м-р", "Горан", "Велкоски", new ArrayList<>()));
        professors.add(new Professor("tomche.delev", "м-р", "Томче", "Делев", new ArrayList<>()));
        professors.add(new Professor("vlatko.nikolovski", "спец.", "Влатко", "Николовски", new ArrayList<>()));        professors.add(new Professor("ljupcho.kocarev", "Академик д-р", "Љупчо", "Коцарев", new ArrayList<>()));
        professors.add(new Professor("stefan.andonov", "спец.", "Стефан", "Андонов", new ArrayList<>()));
        professors.add(new Professor("nenad.anchev", "спец.", "Ненад", "Анчев", new ArrayList<>()));
        professors.add(new Professor("jovan.davchev", "спец.", "Јован", "Давчев", new ArrayList<>()));
        professors.add(new Professor("nasi.jofce", "спец.", "Наси", "Јофче", new ArrayList<>()));
        professors.add(new Professor("jovan.kalajdzieski", "спец.", "Јован", "Калајџиески", new ArrayList<>()));
        professors.add(new Professor("sasho.najdov", "спец.", "Сашо", "Најдов", new ArrayList<>()));
        professors.add(new Professor("petar.sekuloski", "спец.", "Петар", "Секулоски", new ArrayList<>()));
        professors.add(new Professor("vlatko.spasev", "спец.", "Влатко", "Спасев", new ArrayList<>()));
        professors.add(new Professor("frosina.stojanovska", "спец.", "Фросина", "Стојановска", new ArrayList<>()));
        professors.add(new Professor("martina.toshevska", "спец.", "Мартина", "Тошевска", new ArrayList<>()));
        professors.add(new Professor("vojdan.kjorvezirovski", "спец.", "Војдан", "Ќорвезировски", new ArrayList<>()));


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
        students.get(1).addSlot(s1);
        students.get(2).addSlot(s1);
        students.get(3).addSlot(s1);
        students.get(4).addSlot(s1);
        students.get(5).addSlot(s1);
        students.get(6).addSlot(s1);
        students.get(7).addSlot(s1);
        students.get(8).addSlot(s1);
        students.get(9).addSlot(s1);
        students.get(10).addSlot(s1);
        students.get(11).addSlot(s1);
        students.get(12).addSlot(s1);
        students.get(13).addSlot(s1);
        students.get(14).addSlot(s1);
        students.get(15).addSlot(s1);

        students.get(0).addSlot(s2);
        students.get(1).addSlot(s2);
        students.get(2).addSlot(s2);
        students.get(3).addSlot(s2);
        students.get(4).addSlot(s2);
        students.get(5).addSlot(s2);
        students.get(6).addSlot(s2);

        students.get(7).addSlot(s3);
        students.get(8).addSlot(s3);
        students.get(9).addSlot(s3);
        students.get(10).addSlot(s3);
        students.get(11).addSlot(s3);

        students.get(13).addSlot(s5);
        students.get(14).addSlot(s5);
        students.get(15).addSlot(s5);

        students.get(3).addSlot(s6);
        students.get(4).addSlot(s6);
        students.get(5).addSlot(s6);
        students.get(6).addSlot(s6);
        students.get(7).addSlot(s6);
        students.get(8).addSlot(s6);
        students.get(9).addSlot(s6);
        students.get(10).addSlot(s6);
        students.get(11).addSlot(s6);
        students.get(12).addSlot(s6);



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
