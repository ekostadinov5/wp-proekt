package mk.ukim.finki.wp.proekt.bootstrap;

import lombok.Getter;
import mk.ukim.finki.wp.proekt.model.*;
import mk.ukim.finki.wp.proekt.repository.jpa.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final JpaSubjectRepository subjectRepository;
    private final JpaBuildingRepository buildingRepository;
    private final JpaRoomRepository roomRepository;
    private final JpaStudentRepository studentRepository;
    private final JpaProfessorRepository professorRepository;
    private final JpaConsultationSlotRepository consultationSlotRepository;
    private final JpaWeeklyConsultationTermRepository weeklyConsultationTermRepository;
    private final JpaStudentSlotRepository studentSlotRepository;
    private final JpaApplicationUserRepository applicationUserRepository;
    private final JpaRoleRepository roleRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public static final List<Subject> subjects = new ArrayList<>();
    public static final List<Building> buildings = new ArrayList<>();
    public static final List<Room> rooms = new ArrayList<>();
    public static final List<Student> students = new ArrayList<>();
    public static final List<Professor> professors = new ArrayList<>();
    public static final List<ConsultationSlot> slots = new ArrayList<>();
    public static final List<WeeklyConsultationTerm> terms = new ArrayList<>();
    public static final List<StudentSlot> studentSlots = new ArrayList<>();
    public static final List<Role> roles = new ArrayList<>();
    public static final List<ApplicationUser> users = new ArrayList<>();

    public DataHolder(JpaSubjectRepository subjectRepository,
                      JpaBuildingRepository buildingRepository,
                      JpaRoomRepository roomRepository,
                      JpaStudentRepository studentRepository,
                      JpaProfessorRepository professorRepository,
                      JpaConsultationSlotRepository consultationSlotRepository,
                      JpaStudentSlotRepository studentSlotRepository,
                      JpaApplicationUserRepository applicationUserRepository,
                      JpaRoleRepository roleRepository,
                      BCryptPasswordEncoder bCryptPasswordEncoder,
                      JpaWeeklyConsultationTermRepository weeklyConsultationTermRepository) {
        this.subjectRepository = subjectRepository;
        this.buildingRepository = buildingRepository;
        this.roomRepository = roomRepository;
        this.studentRepository = studentRepository;
        this.professorRepository = professorRepository;
        this.consultationSlotRepository = consultationSlotRepository;
        this.studentSlotRepository = studentSlotRepository;
        this.applicationUserRepository = applicationUserRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.weeklyConsultationTermRepository = weeklyConsultationTermRepository;
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


        students.add(new Student("170000", "Андреа", "Павлеска", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170001", "Петко", "Петковски", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170002", "Марко", "Нолев", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170003", "Здравко", "Марковски", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170010", "Марта", "Петрова", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170004", "Кирил", "Здравковски", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170005", "Мартин", "Мартиновски", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170006", "Илија", "Здравковски", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170007", "Бојан", "Јованов", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170011", "Теодора", "Јованова", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170008", "Јован", "Петковски", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170009", "Кристијан", "Ефтимов", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170012", "Ана", "Поповска", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170013", "Кристина", "Јорданова", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170014", "Владимир", "Ивкоски", new ArrayList<>(), new ArrayList<>()));
        students.add(new Student("170015", "Елена", "Младеновска", new ArrayList<>(), new ArrayList<>()));


        Professor dt = new Professor("dimitar.trajanov", "проф. д-р", "Димитар", "Трајанов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>());
        Professor rs = new Professor("riste.stojanov", "доц. д-р", "Ристе", "Стојанов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>());
        Professor km = new Professor("kostadin.mishev", "м-р", "Костадин", "Мишев", new ArrayList<>(), new ArrayList<>(), new ArrayList<>());


        professors.add(dt);
        professors.add(rs);
        professors.add(km);

        professors.add(new Professor("ljupcho.kocarev", "Академик д-р", "Љупчо", "Коцарев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("marijan.gushev", "д-р", "Маријан", "Гушев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("dancho.davchev", "д-р", "Данчо", "Давчев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("katerina.zdravkova", "д-р", "Катерина", "Здравкова", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("suzana.loshkovska", "д-р", "Сузана", "Лошковска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("zhaneta.popeska", "д-р", "Жанета", "Попеска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("kosta.mitreski", "д-р", "Коста", "Митрески", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("verica.bakjeva", "д-р", "Љупчо", "Коцарев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vladimir.trajkovikj", "д-р", "Владимир", "Трајковиќ", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("ana.madevska.bogdanova", "д-р", "Ана", "Мадевска Богданова", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("dejan.gjorgjevikj", "д-р", "Дејан", "Ѓорѓевиќ", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("andrea.kulakov", "д-р", "Андреа", "Кулаков", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("ljupcho.antovski", "д-р", "Љупчо", "Антовски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("marija.mihova", "д-р", "Марија", "Михова", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("slobodan.kalajdziski", "д-р", "Слободан", "Калајџиски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("nevena.ackovska", "д-р", "Невена", "Ацковска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("goran.velinov", "д-р", "Горан", "Велинов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("anastas.mishev", "д-р", "Анастас", "Мишев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("sonja.filiposka", "д-р", "Соња", "Филипоска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("ivan.chorbev", "д-р", "Иван", "Чорбев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("lasko.basnarkov", "д-р", "Ласко", "Баснарков", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("boro.jakimovski", "д-р", "Боро", "Јакимовски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vesna.dimitrova", "д-р", "Весна", "Димитрова", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("goce.armenski", "д-р", "Гоце", "Арменски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("danilo.gligoroski", "д-р", "Данило", "Глигороски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("gjorgji.filipov", "д-р", "Ѓорѓи", "Филипов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("stevo.bozhinovski", "д-р", "Стево", "Божиновски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("sonja.gievska", "д-р", "Соња", "Гиевска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("dejan.spasov", "д-р", "Дејан", "Спасов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("ivica.dimitrovski", "д-р", "Ивица", "Димитровски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("igor.mishkovski", "д-р", "Игор", "Мишковски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("gjorgji.madzarov", "д-р", "Ѓорѓи", "Маџаров", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("smilka.janeska.sarkanjac", "д-р", "Смилка", "Јанеска-Саркањац", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("sashko.ristov", "д-р", "Сашко", "Ристов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vangel.ajanovski", "д-р", "Вангел", "Ајановски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vesna.dimitrievska.ristovska", "д-р", "Весна", "Димитриевска Ристовска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("mile.jovanov", "д-р", "Миле", "Јованов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("biljana.stojkoska", "д-р", "Билјана", "Стојкоска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("kire.trivodaliev", "д-р", "Кире", "Триводалиев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("sasho.gramatikov", "д-р", "Сашо", "Граматиков", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("miroslav.mircev", "д-р", "Мирослав", "Мирчев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("georgina.mirceva", "д-р", "Георгина", "Мирчева", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("magdalena.kostoska", "д-р", "Магдалена", "Костоска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("aleksandra.popovska.mitrovikj", "д-р", "Александра", "Поповска Митровиќ", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("biljana.tojtovska", "д-р", "Билјана", "Тојтовска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("natasha.ilievska", "д-р", "Наташа", "Илиевска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("simona.samardziska", "д-р", "Симона", "Самарџиска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("milosh.jovanovikj", "д-р", "Милош", "Јовановиќ", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("jasen.markovski", "д-р", "Јасен", "Марковски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("ana.sokolova", "д-р", "Ана", "Соколова", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("andreja.naumoski", "д-р", "Андреја", "Наумоски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("panche.ribarski", "д-р", "Панче", "Рибарски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("hristina.mihajloska", "д-р", "Христина", "Михајлоска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("ivan.kitanovski", "д-р", "Иван", "Китановски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("eftim.zdravevski", "д-р", "Ефтим", "Здравевски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("petre.lameski", "д-р", "Петре", "Ламески", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("katerina.trojachanec.dineva", "д-р", "Катерина", "Тројачанец Динева", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vladimir.zdraveski", "д-р", "Владимир", "Здравески", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("bojana.koteska", "д-р", "Бојана", "Котеска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("metodija.jancheski", "д-р", "Методија", "Јанчески", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("aleksandra.kanevche", "д-р", "Александра", "Каневче", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("aleksandra.dedinec", "д-р", "Александра", "Дединец", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("igor.kulev", "д-р", "Игор", "Кулев", new ArrayList<>(), new ArrayList<>(),new ArrayList<>()));
        professors.add(new Professor("igor.trajkovski", "д-р", "Игор", "Трајковски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vancho.kusakatov", "д-р", "Ванчо", "Кусакатов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("dragan.mihajlov", "д-р", "Драган", "Михајлов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("emil.stankov", "м-р", "Емил", "Станков", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("boban.joksimoski", "м-р", "Бобан", "Јоксимоски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("ilinka.ivanoska", "м-р", "Илинка", "Иваноска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("aleksandar.tenev", "м-р", "Александар", "Тенев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vesna.kirandziska", "м-р", "Весна", "Киранџиска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("bojan.ilijoski", "м-р", "Бојан", "Илијоски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("monika.simjanoska", "м-р", "Моника", "Симјаноска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("aleksandar.stojmenski", "м-р", "Александар", "Стојменски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("aleksandra.bogojeska", "м-р", "Александра", "Богојеска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("goran.velkoski", "м-р", "Горан", "Велкоски", new ArrayList<>(), new ArrayList<>(),new ArrayList<>()));
        professors.add(new Professor("tomche.delev", "м-р", "Томче", "Делев", new ArrayList<>(), new ArrayList<>(),new ArrayList<>()));
        professors.add(new Professor("vlatko.nikolovski", "спец.", "Влатко", "Николовски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("stefan.andonov", "спец.", "Стефан", "Андонов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("nenad.anchev", "спец.", "Ненад", "Анчев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("jovan.davchev", "спец.", "Јован", "Давчев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("nasi.jofce", "спец.", "Наси", "Јофче", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("jovan.kalajdzieski", "спец.", "Јован", "Калајџиески", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("sasho.najdov", "спец.", "Сашо", "Најдов", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("petar.sekuloski", "спец.", "Петар", "Секулоски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vlatko.spasev", "спец.", "Влатко", "Спасев", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("frosina.stojanovska", "спец.", "Фросина", "Стојановска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("martina.toshevska", "спец.", "Мартина", "Тошевска", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));
        professors.add(new Professor("vojdan.kjorvezirovski", "спец.", "Војдан", "Ќорвезировски", new ArrayList<>(),new ArrayList<>(), new ArrayList<>()));


        Subject wp = new Subject(null, "Веб програмирање", "ВП");
        Subject eimt = new Subject(null, "Електронска и мобилна трговија", "ЕиМТ");
        Subject os = new Subject(null, "Оперативни системи", "ОС");

        subjects.add(wp);
        subjects.add(eimt);
        subjects.add(os);
        subjects.add(new Subject(null, "Вештачка интелигенција", "ВИ"));
        subjects.add(new Subject(null, "Структурно програмирање", "СП"));
        subjects.add(new Subject(null, "Објектно-ориентирано програмирање", "ООП"));
        subjects.add(new Subject(null, "Архитектура и организација на компјутери", "АОК"));
        subjects.add(new Subject(null, "Софтверско инженерство", "СИ"));
        subjects.add(new Subject(null, "Роботика", "РБ"));
        subjects.add(new Subject(null, "Иновации во ИКТ", "ИвИКТ"));
        subjects.add(new Subject(null, "Бизнис и менаџмент", "БиМ"));
        subjects.add(new Subject(null, "Калкулус 1", "К1"));
        subjects.add(new Subject(null, "Дискретна математика 1", "ДМ1"));
        subjects.add(new Subject(null, "Калкулус 2", "К2"));
        subjects.add(new Subject(null, "Дискретна математика 2", "ДМ2"));
        subjects.add(new Subject(null, "Калкулус 3", "К3"));


        professors.get(0).getSubjects().add(wp);
        professors.get(1).getSubjects().add(wp);
        professors.get(2).getSubjects().add(wp);
        professors.get(0).getSubjects().add(eimt);
        professors.get(1).getSubjects().add(eimt);
        professors.get(2).getSubjects().add(eimt);
        professors.get(0).getSubjects().add(os);

        ConsultationSlot s5 = new ConsultationSlot(null, null, dt, rooms.get(1), new ArrayList<>(), LocalDate.now().plusDays(7), LocalTime.parse("10:00"), LocalTime.parse("12:00"), false);

        s5.setStudents(new ArrayList<>());

        slots.add(s5);


        WeeklyConsultationTerm t1 = new WeeklyConsultationTerm(null, km, rooms.get(1), DayOfWeek.TUESDAY, LocalTime.parse("10:00"), LocalTime.parse("12:00"), new ArrayList<>());
        WeeklyConsultationTerm t2 = new WeeklyConsultationTerm(null, km, rooms.get(1), DayOfWeek.THURSDAY, LocalTime.parse("19:00"), LocalTime.parse("21:00"), new ArrayList<>());
        WeeklyConsultationTerm t3 = new WeeklyConsultationTerm(null, rs, rooms.get(1), DayOfWeek.TUESDAY, LocalTime.parse("10:00"), LocalTime.parse("12:00"), new ArrayList<>());
        WeeklyConsultationTerm t4 = new WeeklyConsultationTerm(null, rs, rooms.get(1), DayOfWeek.THURSDAY, LocalTime.parse("19:00"), LocalTime.parse("21:00"), new ArrayList<>());
        WeeklyConsultationTerm t6 = new WeeklyConsultationTerm(null, dt, rooms.get(1), DayOfWeek.THURSDAY, LocalTime.parse("19:00"), LocalTime.parse("21:00"), new ArrayList<>());

        terms.add(t1);
        terms.add(t2);
        terms.add(t3);
        terms.add(t4);
        terms.add(t6);
        terms.add(new WeeklyConsultationTerm(null, km, rooms.get(1), DayOfWeek.SUNDAY, LocalTime.parse("19:00"), LocalTime.parse("20:25"), new ArrayList<>()));


        StudentSlot ss1 = new StudentSlot(null, students.get(0), s5, wp, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
        students.get(0).getSlots().add(ss1);
        s5.getStudents().add(ss1);
        StudentSlot ss2 = new StudentSlot(null, students.get(1), s5, eimt, "");
        students.get(1).getSlots().add(ss2);
        s5.getStudents().add(ss2);
        StudentSlot ss3 = new StudentSlot(null, students.get(2), s5, wp, "");
        students.get(2).getSlots().add(ss3);
        s5.getStudents().add(ss3);
        StudentSlot ss4 = new StudentSlot(null, students.get(3), s5, eimt, "");
        students.get(3).getSlots().add(ss4);
        s5.getStudents().add(ss4);
        StudentSlot ss5 = new StudentSlot(null, students.get(4), s5, wp, "");
        students.get(4).getSlots().add(ss5);
        s5.getStudents().add(ss5);
        StudentSlot ss6 = new StudentSlot(null, students.get(5), s5, eimt, "");
        students.get(5).getSlots().add(ss6);
        s5.getStudents().add(ss6);
        StudentSlot ss7 = new StudentSlot(null, students.get(6), s5, wp, "");
        students.get(6).getSlots().add(ss7);
        s5.getStudents().add(ss7);
        StudentSlot ss8 = new StudentSlot(null, students.get(7), s5, eimt, "");
        students.get(7).getSlots().add(ss8);
        s5.getStudents().add(ss8);

        StudentSlot ss9 = new StudentSlot(null, students.get(0), s5, eimt, loremIpsum);
        students.get(0).getSlots().add(ss9);
        s5.getStudents().add(ss9);
        StudentSlot ss10 = new StudentSlot(null, students.get(1), s5, wp, "");
        students.get(1).getSlots().add(ss10);
        s5.getStudents().add(ss10);

        studentSlots.add(ss1);
        studentSlots.add(ss2);
        studentSlots.add(ss3);
        studentSlots.add(ss4);
        studentSlots.add(ss5);
        studentSlots.add(ss6);
        studentSlots.add(ss7);
        studentSlots.add(ss8);
        studentSlots.add(ss9);
        studentSlots.add(ss10);


        students.get(6).getFollowing().add(rs);
        students.get(6).getFollowing().add(km);

        Role admin = new Role(null, "admin");
        Role professor = new Role(null, "professor");
        Role student = new Role(null, "student");
        roles.add(admin);
        roles.add(professor);
        roles.add(student);


        String password = bCryptPasswordEncoder.encode("password");
        List<Role> adminRoles = new ArrayList<>();
        adminRoles.add(admin);
        List<Role> professorRoles = new ArrayList<>();
        professorRoles.add(professor);
        List<Role> studentRoles = new ArrayList<>();
        studentRoles.add(student);
        users.add(new ApplicationUser(null, "admin", password, adminRoles));
        users.add(new ApplicationUser(null, "kostadin.mishev", password, professorRoles));
        users.add(new ApplicationUser(null, "170005", password, studentRoles));


        // Initial save of all objects in relational database
        if (this.consultationSlotRepository.count() == 0) {
            this.roleRepository.saveAll(roles);
            this.applicationUserRepository.saveAll(users);
            this.subjectRepository.saveAll(subjects);
            this.buildingRepository.saveAll(buildings);
            this.roomRepository.saveAll(rooms);
            this.professorRepository.saveAll(professors);
            this.studentRepository.saveAll(students);
            this.consultationSlotRepository.saveAll(slots);
            this.weeklyConsultationTermRepository.saveAll(terms);
            this.studentSlotRepository.saveAll(studentSlots);
        }
    }
}
