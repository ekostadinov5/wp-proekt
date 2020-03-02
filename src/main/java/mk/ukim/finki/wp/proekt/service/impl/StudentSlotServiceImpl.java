package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import mk.ukim.finki.wp.proekt.model.Student;
import mk.ukim.finki.wp.proekt.model.StudentSlot;
import mk.ukim.finki.wp.proekt.model.Subject;
import mk.ukim.finki.wp.proekt.model.exceptions.*;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaConsultationSlotRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaStudentRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaStudentSlotRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaSubjectRepository;
import mk.ukim.finki.wp.proekt.service.StudentSlotService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class StudentSlotServiceImpl implements StudentSlotService {
    private final JpaConsultationSlotRepository consultationSlotRepository;
    private final JpaStudentRepository studentRepository;
    private final JpaSubjectRepository subjectRepository;
    private final JpaStudentSlotRepository studentSlotRepository;

    public StudentSlotServiceImpl(JpaConsultationSlotRepository consultationSlotRepository,
                                  JpaStudentRepository studentRepository, JpaSubjectRepository subjectRepository,
                                  JpaStudentSlotRepository studentSlotRepository) {
        this.consultationSlotRepository = consultationSlotRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.studentSlotRepository = studentSlotRepository;
    }

    @Override
    @Transactional
    public StudentSlot add(Long slotId, String studentIndex, Long subjectId, String note) {
        Optional<StudentSlot> temp = this.studentSlotRepository
                .findByConsultationSlot_IdAndStudent_Index(slotId, studentIndex);
        if(temp.isPresent()) {
            throw new DuplicateStudentSlotException();
        }

        ConsultationSlot slot = this.consultationSlotRepository.findById(slotId)
                .orElseThrow(InvalidConsultationSlotIdException::new);
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        if(slot.getDate().isEqual(date) && slot.getFrom().isBefore(time) && slot.getTo().isAfter(time)) {
            throw new ConsultationsInProgressException();
        }
        Student student = this.studentRepository.findById(studentIndex).orElseThrow(InvalidStudentIndexException::new);
        Subject subject = null;
        if(subjectId != 0) {
            subject = this.subjectRepository.findById(subjectId).orElseThrow(InvalidSubjectIdException::new);
        }

        StudentSlot studentSlot = new StudentSlot();
        studentSlot.setStudent(student);
        studentSlot.setConsultationSlot(slot);
        studentSlot.setSubject(subject);
        studentSlot.setNote(note);

        slot.getStudents().add(studentSlot);
        student.getSlots().add(studentSlot);

        this.consultationSlotRepository.save(slot);
        this.studentRepository.save(student);
        return this.studentSlotRepository.save(studentSlot);
    }

    @Override
    @Transactional
    public void remove(Long slotId, String studentIndex) {
        StudentSlot studentSlot = this.studentSlotRepository
                .findByConsultationSlot_IdAndStudent_Index(slotId, studentIndex)
                .orElseThrow(InvalidStudentSlotException::new);
        ConsultationSlot slot = studentSlot.getConsultationSlot();
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        if(slot.getDate().isEqual(date) && slot.getFrom().isBefore(time) && slot.getTo().isAfter(time)) {
            throw new ConsultationsInProgressException();
        }
        Student student = studentSlot.getStudent();

        slot.getStudents().remove(studentSlot);
        student.getSlots().remove(studentSlot);

        this.consultationSlotRepository.save(slot);
        this.studentRepository.save(student);
        this.studentSlotRepository.delete(studentSlot);
    }

    @Override
    public Page<Student> getStudents(Long slotId, int page, int pageSize) {
        return this.studentRepository.findStudentsBySlotsId(slotId, PageRequest.of(page, pageSize));
    }

}
