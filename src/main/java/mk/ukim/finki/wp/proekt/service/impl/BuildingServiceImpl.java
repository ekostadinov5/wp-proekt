package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.model.exceptions.DuplicateBuildingNameException;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidBuildingNameException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaBuildingRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaConsultationSlotRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaRoomRepository;
import mk.ukim.finki.wp.proekt.service.BuildingService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class BuildingServiceImpl implements BuildingService {
    private final JpaBuildingRepository buildingRepository;
    private final JpaRoomRepository roomRepository;

    public BuildingServiceImpl(JpaBuildingRepository buildingRepository, JpaRoomRepository roomRepository) {
        this.buildingRepository = buildingRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public List<Building> getAllBuildings() {
        return this.buildingRepository.findAll();
    }

    @Override
    public List<Building> getAllBuildingsOrdered() {
        return this.buildingRepository.findByOrderByNameAsc();
    }

    @Override
    public Building createBuilding(String name, String description) {
        if(this.buildingRepository.findByName(name).isPresent()) {
            throw new DuplicateBuildingNameException();
        }
        Building building = new Building();
        building.setName(name);
        building.setDescription(description);
        return this.buildingRepository.save(building);
    }

    @Override
    public Building getBuilding(Long id) {
        return this.buildingRepository.findById(id).orElseThrow(InvalidBuildingNameException::new);
    }

    @Override
    public Building updateBuilding(Long id, String name, String description) {
        Optional<Building> temp;
        if((temp = this.buildingRepository.findByName(name)).isPresent() && temp.get().getId() != id) {
            throw new DuplicateBuildingNameException();
        }
        Building building = this.buildingRepository.findById(id).orElseThrow(InvalidBuildingNameException::new);
        building.setName(name);
        building.setDescription(description);
        return this.buildingRepository.save(building);
    }

    @Override
    @Transactional
    public void deleteBuilding(Long id) {
        this.roomRepository.deleteAllByBuilding_Id(id);
        this.buildingRepository.deleteById(id);
    }

}
