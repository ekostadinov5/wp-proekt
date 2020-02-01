package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.Building;
import mk.ukim.finki.wp.proekt.service.BuildingService;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/buildings", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class BuildingApi {
    private final BuildingService buildingService;

    public BuildingApi(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    @GetMapping
    public List<Building> getAllBuildings() {
        return this.buildingService.getAllBuildingsSorted();
    }

    @GetMapping("/{name}")
    public Building getBuilding(@PathVariable String name) {
        return this.buildingService.getBuilding(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Building createBuilding(@RequestParam String name,
                                   @RequestParam String description,
                                   HttpServletResponse response,
                                   UriComponentsBuilder builder) {
        Building building = this.buildingService.createBuilding(name, description);
        response.setHeader("Location", builder
                .path("/api/buildings/{name}")
                .buildAndExpand(building.getName())
                .toUriString());
        return building;
    }

    @PatchMapping("/{name}")
    public Building updateBuilding(@PathVariable String name,
                                   @RequestParam String description) {
        return this.buildingService.updateBuilding(name, description);
    }

    @DeleteMapping("/{name}")
    public void deleteBuilding(@PathVariable String name) {
        this.buildingService.deleteBuilding(name);
    }

}
