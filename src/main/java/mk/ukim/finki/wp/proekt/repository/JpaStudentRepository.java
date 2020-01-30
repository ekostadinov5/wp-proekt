package mk.ukim.finki.wp.proekt.repository;

import mk.ukim.finki.wp.proekt.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface JpaStudentRepository extends JpaRepository<Student, String> {

    @Query("SELECT st " +
            "FROM Student st JOIN st.slots sl " +
            "WHERE sl.id = :slotId")
    Page<Student> findStudentsBySlotsId(@Param("slotId") Long slotId, Pageable pageable);

}
