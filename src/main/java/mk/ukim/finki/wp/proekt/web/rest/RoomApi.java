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

    @GetMapping("/ordered")
    public List<Room> getAllRoomsOrdered() {
        return this.roomService.getAllRoomsOrdered();
    }

    @GetMapping(params = "term")
    public List<Room> searchRooms(@RequestParam String term) {
        return this.roomService.searchRooms(term);
    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable Long id) {
        return this.roomService.getRoom(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Room createRoom(@RequestParam String name,
                           @RequestParam Long buildingId,
                           @RequestParam String description,
                           HttpServletResponse response,
                           UriComponentsBuilder builder) {
        Room room = this.roomService.createRoom(name, buildingId, description);
        response.setHeader("Location", builder
                .path("/api/rooms/{id}")
                .buildAndExpand(room.getId())
                .toUriString());
        return room;
    }

    @PatchMapping("/{id}")
    public Room updateRoom(@PathVariable Long id,
                           @RequestParam String name,
                           @RequestParam Long buildingId,
                           @RequestParam String description) {
        return this.roomService.updateRoom(id, name, buildingId, description);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Long id) {
        this.roomService.deleteRoom(id);
    }

}
