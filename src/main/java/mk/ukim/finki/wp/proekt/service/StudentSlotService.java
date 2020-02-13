package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Student;
import mk.ukim.finki.wp.proekt.model.StudentSlot;
import org.springframework.data.domain.Page;

public interface StudentSlotService {

    StudentSlot add(Long slotId, String studentIndex, Long subjectId, String note);

    void remove(Long slotId, String studentIndex);

    Page<Student> getStudents(Long slotId, int page, int pageSize);

}
