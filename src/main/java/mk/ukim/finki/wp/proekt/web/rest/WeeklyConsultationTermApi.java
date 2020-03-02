package mk.ukim.finki.wp.proekt.web.rest;

import mk.ukim.finki.wp.proekt.model.WeeklyConsultationTerm;
import mk.ukim.finki.wp.proekt.service.WeeklyConsultationTermService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.time.DayOfWeek;
import java.time.LocalTime;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "/api/terms", produces = MimeTypeUtils.APPLICATION_JSON_VALUE)
public class WeeklyConsultationTermApi {
    private final WeeklyConsultationTermService weeklyConsultationTermService;

    public WeeklyConsultationTermApi(WeeklyConsultationTermService weeklyConsultationTermService) {
        this.weeklyConsultationTermService = weeklyConsultationTermService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WeeklyConsultationTerm createWeeklyConsultationTerm(@RequestParam("professorId") String professorId,
                                                               @RequestParam("roomId") Long roomId,
                                                               @RequestParam(name = "dayOfWeek", required = false)
                                                                           String dayOfWeek,
                                                               @RequestParam("from")
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
                                                                           LocalTime from,
                                                               @RequestParam("to")
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
                                                                           LocalTime to,
                                                               HttpServletResponse response,
                                                               UriComponentsBuilder builder) {
        WeeklyConsultationTerm  term = this.weeklyConsultationTermService
                .createTerm(professorId, roomId, DayOfWeek.valueOf(dayOfWeek), from, to);
        response.setHeader("Location",
                builder.path("/api/terms/${termId}").buildAndExpand(term.getId()).toUriString());
        return term;
    }

    @GetMapping("/{termId}")
    public WeeklyConsultationTerm getWeeklyConsultationTerm(@PathVariable Long termId) {
        return this.weeklyConsultationTermService.getWeeklyConsultationTerm(termId);
    }

    @PatchMapping("/{termId}")
    public WeeklyConsultationTerm updateWeeklyConsultationTerm(@PathVariable Long termId,
                                                               @RequestParam("roomId") Long roomId,
                                                               @RequestParam(name = "dayOfWeek", required = false)
                                                                           String dayOfWeek,
                                                               @RequestParam("from")
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
                                                                           LocalTime from,
                                                               @RequestParam("to")
                                                                   @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
                                                                           LocalTime to) {
        return this.weeklyConsultationTermService.updateTerm(termId, roomId, DayOfWeek.valueOf(dayOfWeek), from ,to);
    }

    @DeleteMapping("/{termId}")
    public void deleteWeeklyConsultationTerm(@PathVariable Long termId) {
        this.weeklyConsultationTermService.deleteTerm(termId);
    }

}
