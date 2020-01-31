package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaProfessorRepository extends JpaRepository<Professor, String> {

    @Query("SELECT p " +
            "FROM Professor p " +
            "WHERE p.firstName LIKE %:term% OR p.lastName LIKE %:term% OR p.title LIKE %:term%")
    List<Professor> searchProfessors(@Param("term") String term);

}
