package mk.ukim.finki.wp.proekt.repository;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface JpaConsultationSlotRepository extends JpaRepository<ConsultationSlot, Long> {
}
