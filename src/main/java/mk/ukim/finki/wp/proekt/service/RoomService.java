package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.model.Room;

import java.util.List;

public interface RoomService {

    Room createRoom(String name, Long buildingId, String description);

    List<Room> getAllRooms();

    List<Room> getAllRoomsOrdered();

    List<Room> searchRooms(String term);

    Room getRoom(Long id);

    Room updateRoom(Long id, String name, Long buildingId, String description);

    void deleteRoom(Long id);

}
