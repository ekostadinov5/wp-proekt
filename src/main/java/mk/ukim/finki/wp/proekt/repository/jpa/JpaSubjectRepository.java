package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaSubjectRepository extends JpaRepository<Subject, Long> {

    Optional<Subject> findByName(String name);

}
