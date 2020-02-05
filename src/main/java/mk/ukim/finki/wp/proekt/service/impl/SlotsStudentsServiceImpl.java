package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import mk.ukim.finki.wp.proekt.model.Student;
import mk.ukim.finki.wp.proekt.model.exceptions.ConsultationInProgressException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidConsultationSlotIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidStudentIndexException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaConsultationSlotRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaStudentRepository;
import mk.ukim.finki.wp.proekt.service.SlotsStudentsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Service
public class SlotsStudentsServiceImpl implements SlotsStudentsService {
    private final JpaConsultationSlotRepository consultationSlotRepository;
    private final JpaStudentRepository studentRepository;

    public SlotsStudentsServiceImpl(JpaConsultationSlotRepository consultationSlotRepository,
                                    JpaStudentRepository studentRepository) {
        this.consultationSlotRepository = consultationSlotRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    @Transactional
    public void add(Long slotId, String studentIndex) {
        ConsultationSlot slot = this.consultationSlotRepository.findById(slotId)
                .orElseThrow(InvalidConsultationSlotIdException::new);
        LocalDate date = LocalDate.now();
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        LocalTime time = LocalTime.now();
        if((slot.getDayOfWeek() != null && slot.getDayOfWeek() == dayOfWeek
                && slot.getFrom().isBefore(time) && slot.getTo().isAfter(time))
            || (slot.getDate() != null && slot.getDate().isEqual(date)
                && slot.getFrom().isBefore(time) && slot.getTo().isAfter(time))) {
            throw new ConsultationInProgressException();
        }
        Student student = this.studentRepository.findById(studentIndex).orElseThrow(InvalidStudentIndexException::new);
        student.addSlot(slot);
        this.consultationSlotRepository.save(slot);
        this.studentRepository.save(student);
    }

    @Override
    @Transactional
    public void remove(Long slotId, String studentIndex) {
        ConsultationSlot slot = this.consultationSlotRepository.findById(slotId)
                .orElseThrow(InvalidConsultationSlotIdException::new);
        LocalDate date = LocalDate.now();
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        LocalTime time = LocalTime.now();
        if((slot.getDayOfWeek() != null && slot.getDayOfWeek() == dayOfWeek
                && slot.getFrom().isBefore(time) && slot.getTo().isAfter(time))
                || (slot.getDate() != null && slot.getDate().isEqual(date)
                && slot.getFrom().isBefore(time) && slot.getTo().isAfter(time))) {
            throw new ConsultationInProgressException();
        }
        Student student = this.studentRepository.findById(studentIndex).orElseThrow(InvalidStudentIndexException::new);
        student.removeSlot(slot);
        this.consultationSlotRepository.save(slot);
        this.studentRepository.save(student);
    }

    @Override
    public Page<Student> getStudents(Long slotId, int page, int pageSize) {
        return this.studentRepository.findStudentsBySlotsId(slotId, PageRequest.of(page, pageSize));
    }

}
