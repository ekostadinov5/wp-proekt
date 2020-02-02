package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaBuildingRepository extends JpaRepository<Building, Long> {

    List<Building> findByOrderByNameAsc();

    Optional<Building> findByName(String name);

}
