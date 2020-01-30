package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.model.Room;

import java.util.List;

public interface RoomService {

    Room createRoom(String name, String buildingName, String description);

    List<Room> getAllRooms();

    List<Room> searchRooms(String term);

    Room getRoom(String name);

    Room updateRoom(String oldName, String name, String buildingName, String description);

    void deleteRoom(String name);

}
