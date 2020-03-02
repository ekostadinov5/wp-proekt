package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Room;
import mk.ukim.finki.wp.proekt.model.WeeklyConsultationTerm;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidConsultationSlotTimeInterval;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidProfessorIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidRoomIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidWeeklyConsultationTermIdException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaConsultationSlotRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaProfessorRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaRoomRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaWeeklyConsultationTermRepository;
import mk.ukim.finki.wp.proekt.service.WeeklyConsultationTermService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class WeeklyConsultationTermServiceImpl implements WeeklyConsultationTermService {
    private final JpaWeeklyConsultationTermRepository weeklyConsultationTermRepository;
    private final JpaProfessorRepository professorRepository;
    private final JpaRoomRepository roomRepository;
    private final JpaConsultationSlotRepository consultationSlotRepository;

    public WeeklyConsultationTermServiceImpl(JpaWeeklyConsultationTermRepository weeklyConsultationTermRepository,
                                             JpaProfessorRepository professorRepository,
                                             JpaRoomRepository roomRepository,
                                             JpaConsultationSlotRepository consultationSlotRepository) {
        this.weeklyConsultationTermRepository = weeklyConsultationTermRepository;
        this.professorRepository = professorRepository;
        this.roomRepository = roomRepository;
        this.consultationSlotRepository = consultationSlotRepository;
    }

    @Override
    @Transactional
    public WeeklyConsultationTerm createTerm(String professorId, Long roomId, DayOfWeek dayOfWeek, LocalTime from,
                                             LocalTime to) {
        if(!from.isBefore(to)) {
            throw new InvalidConsultationSlotTimeInterval();
        }
        Professor professor = this.professorRepository.findById(professorId)
                .orElseThrow(InvalidProfessorIdException::new);
        Room room = this.roomRepository.findById(roomId).orElseThrow(InvalidRoomIdException::new);
        WeeklyConsultationTerm weeklyConsultationTerm = new WeeklyConsultationTerm();
        weeklyConsultationTerm.setProfessor(professor);
        weeklyConsultationTerm.setRoom(room);
        weeklyConsultationTerm.setDayOfWeek(dayOfWeek);
        weeklyConsultationTerm.setFrom(from);
        weeklyConsultationTerm.setTo(to);
        weeklyConsultationTerm.setSlots(new ArrayList<>());

        LocalDateTime dateTime = LocalDateTime.now();
        if(dateTime.getDayOfWeek() != dayOfWeek) {
            while(dateTime.getDayOfWeek() != dayOfWeek) {
                dateTime = dateTime.plusDays(1);
            }
        } else {
            if(from.isBefore(dateTime.toLocalTime())) {
                dateTime = dateTime.plusDays(7);
            }
        }
        for(int i = 0; i < 3; i++, dateTime = dateTime.plusDays(7)) {
            ConsultationSlot slot = new ConsultationSlot();
            slot.setTerm(weeklyConsultationTerm);
            slot.setRoom(room);
            slot.setDate(dateTime.toLocalDate());
            slot.setFrom(from);
            slot.setTo(to);
            slot.setCancel(false);
            weeklyConsultationTerm.getSlots().add(slot);
        }

        this.consultationSlotRepository.saveAll(weeklyConsultationTerm.getSlots());
        weeklyConsultationTerm = this.weeklyConsultationTermRepository.save(weeklyConsultationTerm);
        return weeklyConsultationTerm;
    }

    @Override
    public WeeklyConsultationTerm getWeeklyConsultationTerm(Long termId) {
        return this.weeklyConsultationTermRepository.findById(termId)
                .orElseThrow(InvalidWeeklyConsultationTermIdException::new);
    }

    @Override
    public WeeklyConsultationTerm updateTerm(Long termId, Long roomId, DayOfWeek dayOfWeek,
                                             LocalTime from, LocalTime to) {
        if(!from.isBefore(to)) {
            throw new InvalidConsultationSlotTimeInterval();
        }
        Room room = this.roomRepository.findById(roomId).orElseThrow(InvalidRoomIdException::new);
        WeeklyConsultationTerm weeklyConsultationTerm = this.weeklyConsultationTermRepository.findById(termId)
                .orElseThrow(InvalidWeeklyConsultationTermIdException::new);
        weeklyConsultationTerm.setRoom(room);
        weeklyConsultationTerm.setDayOfWeek(dayOfWeek);
        weeklyConsultationTerm.setFrom(from);
        weeklyConsultationTerm.setTo(to);

        LocalDateTime dateTime = LocalDateTime.now();
        if(dateTime.getDayOfWeek() != dayOfWeek) {
            while(dateTime.getDayOfWeek() != dayOfWeek) {
                dateTime = dateTime.plusDays(1);
            }
        } else {
            if(from.isBefore(dateTime.toLocalTime())) {
                dateTime = dateTime.plusDays(7);
            }
        }
        for(int i = 0; i < 3; i++, dateTime = dateTime.plusDays(7)) {
            ConsultationSlot slot = weeklyConsultationTerm.getSlots().get(i);
            slot.setRoom(room);
            slot.setDate(dateTime.toLocalDate());
            slot.setFrom(from);
            slot.setTo(to);
            slot.setCancel(false);
            this.consultationSlotRepository.save(slot);
        }

        return this.weeklyConsultationTermRepository.save(weeklyConsultationTerm);
    }

    @Override
    public void deleteTerm(Long termId) {
        this.weeklyConsultationTermRepository.deleteById(termId);
    }

    @Override
    public void createNewTermSlots() {
        this.weeklyConsultationTermRepository.findAll().stream()
                .filter(t -> t.getSlots().size() != 3)
                .forEach(t -> {
                    List<ConsultationSlot> slots = t.getSlots();

                    LocalDateTime dateTime = LocalDateTime.now();
                    if(dateTime.getDayOfWeek() != t.getDayOfWeek()) {
                        while(dateTime.getDayOfWeek() != t.getDayOfWeek()) {
                            dateTime = dateTime.plusDays(1);
                        }
                    } else {
                        if(t.getFrom().isBefore(dateTime.toLocalTime())) {
                            dateTime = dateTime.plusDays(7);
                        }
                    }
                    for(int i = 0; i < 3; i++, dateTime = dateTime.plusDays(7)) {
                        if(slots.size() == i) {
                            ConsultationSlot slot = new ConsultationSlot();
                            slot.setTerm(t);
                            slot.setRoom(t.getRoom());
                            slot.setDate(dateTime.toLocalDate());
                            slot.setFrom(t.getFrom());
                            slot.setTo(t.getTo());
                            slot.setCancel(false);
                            slots.add(slot);
                        }
                    }

                    this.consultationSlotRepository.saveAll(t.getSlots());
                    this.weeklyConsultationTermRepository.save(t);
                });
    }

}
