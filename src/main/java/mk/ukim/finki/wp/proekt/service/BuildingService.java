package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.Building;

public interface BuildingService {

    Building createBuilding(String name, String description);

    Building getBuilding(String name);

    Building updateBuilding(String oldName, String name, String description);

    void deleteBuilding(String name);

}
