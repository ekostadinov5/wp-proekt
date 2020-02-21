package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.Professor;
import mk.ukim.finki.wp.proekt.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaSubjectRepository extends JpaRepository<Subject, Long> {

    Optional<Subject> findByName(String name);

    @Query("SELECT s " +
            "FROM Subject s " +
            "WHERE s.shortName = :shortName")
    Optional<Subject> findByShortName(@Param("shortName") String shortName);

    @Query("SELECT s " +
            "FROM Subject s " +
            "WHERE s.name LIKE %:term% OR s.shortName LIKE %:term% " +
            "ORDER BY s.name")
    List<Subject> searchSubjects(@Param("term") String term);

    @Query("SELECT p " +
            "FROM Professor p JOIN p.subjects s " +
            "WHERE s.id = :id")
    List<Professor> findProfessors(@Param("id") Long id);

}
