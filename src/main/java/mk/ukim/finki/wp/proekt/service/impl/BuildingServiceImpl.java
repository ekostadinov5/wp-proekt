package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidBuildingNameException;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaBuildingRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaConsultationSlotRepository;
import mk.ukim.finki.wp.proekt.repository.jpa.JpaRoomRepository;
import mk.ukim.finki.wp.proekt.service.BuildingService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BuildingServiceImpl implements BuildingService {
    private final JpaBuildingRepository buildingRepository;
    private final JpaRoomRepository roomRepository;

    public BuildingServiceImpl(JpaBuildingRepository buildingRepository, JpaRoomRepository roomRepository) {
        this.buildingRepository = buildingRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public List<Building> getAllBuildingsSorted() {
        return this.buildingRepository.findByOrderByNameAsc();
    }

    @Override
    public Building createBuilding(String name, String description) {
        Building building = new Building();
        building.setName(name);
        building.setDescription(description);
        return this.buildingRepository.save(building);
    }

    @Override
    public Building getBuilding(String name) {
        return this.buildingRepository.findById(name).orElseThrow(InvalidBuildingNameException::new);
    }

    @Override
    public Building updateBuilding(String name, String description) {
        Building building = this.buildingRepository.findById(name).orElseThrow(InvalidBuildingNameException::new);
        building.setDescription(description);
        return this.buildingRepository.save(building);
    }

    @Override
    @Transactional
    public void deleteBuilding(String name) {
        this.roomRepository.deleteAllByBuilding_Name(name);
        this.buildingRepository.deleteById(name);
    }

}
