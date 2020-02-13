package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.StudentSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaStudentSlotRepository extends JpaRepository<StudentSlot, Long> {

    Optional<StudentSlot> findByConsultationSlot_IdAndStudent_Index(Long slotId, String studentIndex);

}
