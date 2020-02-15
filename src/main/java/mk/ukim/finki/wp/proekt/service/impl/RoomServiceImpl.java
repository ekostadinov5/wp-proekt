package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.model.Room;
import mk.ukim.finki.wp.proekt.model.exceptions.DuplicateRoomNameException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidBuildingIdException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidRoomIdException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaBuildingRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaRoomRepository;
import mk.ukim.finki.wp.proekt.service.RoomService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {
    private final JpaRoomRepository roomRepository;
    private final JpaBuildingRepository buildingRepository;

    public RoomServiceImpl(JpaRoomRepository roomRepository, JpaBuildingRepository buildingRepository) {
        this.roomRepository = roomRepository;
        this.buildingRepository = buildingRepository;
    }

    @Override
    public Room createRoom(String name, Long buildingId, String description) {
        Building building = this.buildingRepository.findById(buildingId)
                .orElseThrow(InvalidBuildingIdException::new);
        if(this.roomRepository.findByNameAndBuilding_Id(name, buildingId).isPresent()) {
            throw new DuplicateRoomNameException();
        }
        Room room = new Room();
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
    public List<Room> getAllRoomsOrdered() {
        return this.roomRepository.findByOrderByNameAsc();
    }

    @Override
    public List<Room> searchRooms(String term) {
        return this.roomRepository.searchRooms(term);
    }

    @Override
    public Room getRoom(Long id) {
        return this.roomRepository.findById(id).orElseThrow(InvalidRoomIdException::new);
    }

    @Override
    public Room updateRoom(Long id, String name, Long buildingId, String description) {
        Building building = this.buildingRepository.findById(buildingId)
                .orElseThrow(InvalidBuildingIdException::new);
        Optional<Room> temp;
        if((temp = this.roomRepository.findByNameAndBuilding_Id(name, buildingId)).isPresent()
                && !temp.get().getId().equals(id)) {
            throw new DuplicateRoomNameException();
        }
        Room room = this.roomRepository.findById(id).orElseThrow(InvalidRoomIdException::new);
        room.setName(name);
        room.setBuilding(building);
        room.setDescription(description);
        return this.roomRepository.save(room);
    }

    @Override
    public void deleteRoom(Long id) {
        this.roomRepository.deleteById(id);
    }

}
