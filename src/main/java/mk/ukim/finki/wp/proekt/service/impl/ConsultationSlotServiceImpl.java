package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Room;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidConsultationSlotIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidConsultationSlotTimeInterval;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidProfessorIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidRoomIdException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaConsultationSlotRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaProfessorRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaRoomRepository;
import mk.ukim.finki.wp.proekt.service.ConsultationSlotService;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultationSlotServiceImpl implements ConsultationSlotService {
    private final JpaConsultationSlotRepository consultationSlotRepository;
    private final JpaProfessorRepository professorRepository;
    private final JpaRoomRepository roomRepository;

    public ConsultationSlotServiceImpl(JpaConsultationSlotRepository consultationSlotRepository,
                                       JpaProfessorRepository professorRepository, JpaRoomRepository roomRepository) {
        this.consultationSlotRepository = consultationSlotRepository;
        this.professorRepository = professorRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public ConsultationSlot createSlot(String professorId, Long roomId, DayOfWeek dayOfWeek, LocalDate date,
                                       LocalTime from, LocalTime to) {
        if(!from.isBefore(to)) {
            throw new InvalidConsultationSlotTimeInterval();
        }
        if(dayOfWeek == null && date == null) {
            throw new IllegalArgumentException();
        }
        ConsultationSlot slot;
        Professor professor = professorRepository.findById(professorId).orElseThrow(InvalidProfessorIdException::new);
        Room room = roomRepository.findById(roomId).orElseThrow(InvalidRoomIdException::new);
        if(dayOfWeek != null) {
            slot = ConsultationSlot.createRecurringSlot(professor, room, dayOfWeek, from, to);
        } else {
            slot = ConsultationSlot.createOneTimeSlot(professor, room, date, from, to);
        }
        return this.consultationSlotRepository.save(slot);
    }

    @Override
    public ConsultationSlot getConsultationSlot(Long slotId) {
        return this.consultationSlotRepository.findById(slotId).orElseThrow(InvalidConsultationSlotIdException::new);
    }

    @Override
    public ConsultationSlot updateSlot(Long slotId, String professorId, Long roomId, DayOfWeek dayOfWeek,
                                       LocalDate date, LocalTime from, LocalTime to) {
        if(!from.isBefore(to)) {
            throw new InvalidConsultationSlotTimeInterval();
        }
        if(dayOfWeek == null && date == null) {
            throw new IllegalArgumentException();
        }
        ConsultationSlot slot = this.consultationSlotRepository.findById(slotId)
                .orElseThrow(InvalidConsultationSlotIdException::new);
        Professor professor = this.professorRepository.findById(professorId)
                .orElseThrow(InvalidProfessorIdException::new);
        Room room = this.roomRepository.findById(roomId).orElseThrow(InvalidRoomIdException::new);
        slot.setProfessor(professor);
        slot.setRoom(room);
        slot.setDayOfWeek(dayOfWeek);
        slot.setCancel(false);
        slot.setDate(date);
        slot.setFrom(from);
        slot.setTo(to);
        return this.consultationSlotRepository.save(slot);
    }

    @Override
    public void deleteSlot(Long slotId) {
        this.consultationSlotRepository.deleteById(slotId);
    }

    @Override
    public void cancelSlot(Long slotId) {
        ConsultationSlot slot = this.consultationSlotRepository.findById(slotId)
                .orElseThrow(InvalidConsultationSlotIdException::new);
        if(slot.getDayOfWeek() != null) {
            slot.setCancel(true);
            this.consultationSlotRepository.save(slot);
        }
    }

    @Override
    public void uncancelSlot(Long slotId) {
        ConsultationSlot slot = this.consultationSlotRepository.findById(slotId)
                .orElseThrow(InvalidConsultationSlotIdException::new);
        if(slot.getDayOfWeek() != null) {
            slot.setCancel(false);
            this.consultationSlotRepository.save(slot);
        }
    }

    @Override
    public void cleanFinishedDateSlots(LocalDate date, LocalTime time) {
        List<ConsultationSlot> consultationSlotsForDeleting = this.consultationSlotRepository.findAll().stream()
                .filter(cs -> (cs.getDate() != null &&
                        (cs.getDate().isBefore(date) ||
                                (cs.getDate().isEqual(date) && cs.getTo().isBefore(LocalTime.now().plusMinutes(7)))
                        )
                ))
                .collect(Collectors.toList());
        this.consultationSlotRepository.deleteAll(consultationSlotsForDeleting);
    }

    @Override
    public void cleanStudentsFromWeeklySlots(DayOfWeek dayOfWeek, LocalTime time) {
        List<ConsultationSlot> consultationSlotsForClearing = this.consultationSlotRepository.findAll().stream()
                .filter(cs -> (cs.getDayOfWeek() != null && cs.getDayOfWeek() == dayOfWeek
                        && cs.getTo().minusMinutes(7).isBefore(time) && cs.getTo().isAfter(time)))
                .collect(Collectors.toList());
        consultationSlotsForClearing.forEach(cs -> {
            cs.setStudents(new ArrayList<>());
            cs.setCancel(false);
        });
        this.consultationSlotRepository.saveAll(consultationSlotsForClearing);
    }

}
