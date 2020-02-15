package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import mk.ukim.finki.wp.proekt.service.ConsultationSlotService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/consultations", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class ConsultationSlotApi {
    private final ConsultationSlotService consultationSlotService;

    public ConsultationSlotApi(ConsultationSlotService consultationSlotService) {
        this.consultationSlotService = consultationSlotService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ConsultationSlot createConsultationSlot(@RequestParam("professorId") String professorId,
                                                   @RequestParam("roomId") Long roomId,
                                                   @RequestParam(name = "dayOfWeek", required = false) String dayOfWeek,
                                                   @RequestParam(name = "date", required = false) String date,
                                                   @RequestParam("from")
                                                       @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime from,
                                                   @RequestParam("to")
                                                       @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime to,
                                                   HttpServletResponse response,
                                                   UriComponentsBuilder builder) {
        LocalDate localDate = null;
        if(date != null) {
            localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        }
        ConsultationSlot slot = this.consultationSlotService
                .createSlot(professorId, roomId, (dayOfWeek != null) ? DayOfWeek.valueOf(dayOfWeek) : null, localDate, from, to);
        response.setHeader("Location",
                builder.path("/api/consultations/${slotId}").buildAndExpand(slot.getId()).toUriString());
        return slot;
    }

    @GetMapping("/{slotId}")
    public ConsultationSlot getConsultationSlot(@PathVariable Long slotId) {
        return this.consultationSlotService.getConsultationSlot(slotId);
    }

    @PatchMapping("/{slotId}")
    public ConsultationSlot updateConsultationSlot(@PathVariable Long slotId,
                                                   @RequestParam("professorId") String professorId,
                                                   @RequestParam("roomId") Long roomId,
                                                   @RequestParam(name = "dayOfWeek", required = false) String dayOfWeek,
                                                   @RequestParam(name = "date", required = false) String date,
                                                   @RequestParam("from")
                                                       @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime from,
                                                   @RequestParam("to")
                                                       @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime to) {
        LocalDate localDate = null;
        if(date != null) {
            localDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        }
        return this.consultationSlotService
                .updateSlot(slotId, professorId, roomId, (dayOfWeek != null) ? DayOfWeek.valueOf(dayOfWeek) : null, localDate, from, to);
    }

    @DeleteMapping("/{slotId}")
    public void deleteConsultationSlot(@PathVariable Long slotId) {
        this.consultationSlotService.deleteSlot(slotId);
    }

}
