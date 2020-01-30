package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Room;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidConsultationSlotIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidProfessorIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidRoomNameException;
import mk.ukim.finki.wp.proekt.repository.JpaConsultationSlotRepository;
import mk.ukim.finki.wp.proekt.repository.JpaProfessorRepository;
import mk.ukim.finki.wp.proekt.repository.JpaRoomRepository;
import mk.ukim.finki.wp.proekt.service.ConsultationSlotService;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

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
    public ConsultationSlot createSlot(String professorId, String roomName, DayOfWeek dayOfWeek, LocalDate date,
                                       LocalTime from, LocalTime to) {
        if(dayOfWeek == null && date == null) {
            throw new IllegalArgumentException();
        }
        ConsultationSlot slot;
        Professor professor = professorRepository.findById(professorId).orElseThrow(InvalidProfessorIdException::new);
        Room room = roomRepository.findById(roomName).orElseThrow(InvalidRoomNameException::new);
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
    public ConsultationSlot updateSlot(Long slotId, String professorId, String roomName, DayOfWeek dayOfWeek,
                                       LocalDate date, LocalTime from, LocalTime to) {
        ConsultationSlot slot = this.consultationSlotRepository.findById(slotId)
                .orElseThrow(InvalidConsultationSlotIdException::new);
        Professor professor = this.professorRepository.findById(professorId)
                .orElseThrow(InvalidProfessorIdException::new);
        Room room = this.roomRepository.findById(roomName).orElseThrow(InvalidRoomNameException::new);
        slot.setProfessor(professor);
        slot.setRoom(room);
        slot.setDayOfWeek(dayOfWeek);
        slot.setDate(date);
        slot.setFrom(from);
        slot.setTo(to);
        return this.consultationSlotRepository.save(slot);
    }

    @Override
    public void deleteSlot(Long slotId) {
        this.consultationSlotRepository.deleteById(slotId);
    }

}
