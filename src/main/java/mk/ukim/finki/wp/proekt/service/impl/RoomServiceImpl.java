package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.model.Room;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidBuildingNameException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidRoomNameException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaBuildingRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaRoomRepository;
import mk.ukim.finki.wp.proekt.service.RoomService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    private final JpaRoomRepository roomRepository;
    private final JpaBuildingRepository buildingRepository;

    public RoomServiceImpl(JpaRoomRepository roomRepository, JpaBuildingRepository buildingRepository) {
        this.roomRepository = roomRepository;
        this.buildingRepository = buildingRepository;
    }

    @Override
    public Room createRoom(String name, String buildingName, String description) {
        Room room = new Room();
        Building building = this.buildingRepository.findById(buildingName)
                .orElseThrow(InvalidBuildingNameException::new);
        room.setName(name);
        room.setBuilding(building);
        room.setDescription(description);
        return this.roomRepository.save(room);
    }

    @Override
    public List<Room> getAllRooms() {
        return this.roomRepository.findAll();
    }

    @Override
    public List<Room> searchRooms(String term) {
        return this.roomRepository.searchRooms(term);
    }

    @Override
    public Room getRoom(String name) {
        return this.roomRepository.findById(name).orElseThrow(InvalidRoomNameException::new);
    }

    @Override
    public Room updateRoom(String oldName, String name, String buildingName, String description) {
        Room room = this.roomRepository.findById(oldName).orElseThrow(InvalidRoomNameException::new);
        Building building = this.buildingRepository.findById(buildingName)
                .orElseThrow(InvalidBuildingNameException::new);
        room.setName(name);
        room.setBuilding(building);
        room.setDescription(description);
        return this.roomRepository.save(room);
    }

    @Override
    public void deleteRoom(String name) {
        this.roomRepository.deleteById(name);
    }

}
