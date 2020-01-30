package mk.ukim.finki.wp.proekt.repository;

import mk.ukim.finki.wp.proekt.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaBuildingRepository extends JpaRepository<Building, String> {
}
