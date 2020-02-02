package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Building;

import java.util.List;

public interface BuildingService {

    List<Building> getAllBuildings();

    List<Building> getAllBuildingsOrdered();

    Building createBuilding(String name, String description);

    Building getBuilding(Long id);

    Building updateBuilding(Long id, String name, String description);

    void deleteBuilding(Long id);

}
