package mk.ukim.finki.wp.proekt.service.impl;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.model.exceptions.InvalidBuildingNameException;
import mk.ukim.finki.wp.proekt.repository.JpaBuildingRepository;
import mk.ukim.finki.wp.proekt.service.BuildingService;
import org.springframework.stereotype.Service;

@Service
public class BuildingServiceImpl implements BuildingService {
    private final JpaBuildingRepository buildingRepository;

    public BuildingServiceImpl(JpaBuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    @Override
    public Building createBuilding(String name, String description) {
        Building building = new Building(name, description);
        return this.buildingRepository.save(building);
    }

    @Override
    public Building getBuilding(String name) {
        return this.buildingRepository.findById(name).orElseThrow(InvalidBuildingNameException::new);
    }

    @Override
    public Building updateBuilding(String oldName, String name, String description) {
        Building building = this.buildingRepository.findById(oldName).orElseThrow(InvalidBuildingNameException::new);
        building.setName(name);
        building.setDescriotion(description);
        return this.buildingRepository.save(building);
    }

    @Override
    public void deleteBuilding(String name) {
        this.buildingRepository.deleteById(name);
    }

}
