package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Student;
import org.springframework.data.domain.Page;

public interface SlotsStudentsService {

    void add(Long slotId, String studentIndex);

    void remove(Long slotId, String studentIndex);

    Page<Student> getStudents(Long slotId, int page, int pageSize);

}
