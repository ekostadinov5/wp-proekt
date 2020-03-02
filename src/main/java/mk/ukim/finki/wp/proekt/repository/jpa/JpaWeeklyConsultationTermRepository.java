package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.WeeklyConsultationTerm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaWeeklyConsultationTermRepository extends JpaRepository<WeeklyConsultationTerm, Long> {
}
