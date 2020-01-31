package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.Room;
import mk.ukim.finki.wp.proekt.service.RoomService;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;

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

}
