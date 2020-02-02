package mk.ukim.finki.wp.proekt.repository.jpa;

import mk.ukim.finki.wp.proekt.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface JpaRoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByOrderByNameAsc();

    @Query("SELECT r " +
            "FROM Room r JOIN r.building b " +
            "WHERE r.name LIKE %:term% OR r.description LIKE %:term% OR b.name LIKE %:term%")
    List<Room> searchRooms(@Param("term") String term);

    Optional<Room> findByName(String name);

    Optional<Room> findByNameAndBuilding_Id(String name, Long buildingId);

    List<Room> deleteAllByBuilding_Id(Long id);

}
