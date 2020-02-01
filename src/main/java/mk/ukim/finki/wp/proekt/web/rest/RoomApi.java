package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.Room;
import mk.ukim.finki.wp.proekt.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/rooms", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class RoomApi {
    private final RoomService roomService;

    public RoomApi(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return this.roomService.getAllRooms();
    }

    @GetMapping(params = "term")
    public List<Room> searchRooms(@RequestParam String term) {
        return this.roomService.searchRooms(term);
    }

    @GetMapping("/{name}")
    public Room getRoom(@PathVariable String name) {
        return this.roomService.getRoom(name);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Room createRoom(@RequestParam String name,
                           @RequestParam String buildingName,
                           @RequestParam String description,
                           HttpServletResponse response,
                           UriComponentsBuilder builder) {
        Room room = this.roomService.createRoom(name, buildingName, description);
        response.setHeader("Location", builder
                .path("/api/rooms/{name}")
                .buildAndExpand(room.getName())
                .toUriString());
        return room;
    }

    @PatchMapping("/{name}")
    public Room updateRoom(@PathVariable String name,
                           @RequestParam String buildingName,
                           @RequestParam String description) {
        return this.roomService.updateRoom(name, buildingName, description);
    }

    @DeleteMapping("/{name}")
    public void deleteRoom(@PathVariable String name) {
        this.roomService.deleteRoom(name);
    }

}
