package mk.ukim.finki.wp.proekt.web.scheduled;

import mk.ukim.finki.wp.proekt.service.ConsultationSlotService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class CleanFinishedTerms {
    private ConsultationSlotService consultationSlotService;

    public CleanFinishedTerms(ConsultationSlotService consultationSlotService) {
        this.consultationSlotService = consultationSlotService;
    }

    @Scheduled(cron = "0 0/5 * 1/1 * ?")
    public void cleanFinishedDateTerms() {
        this.consultationSlotService.cleanFinishedDateSlots(LocalDate.now(), LocalTime.now());
    }

    @Scheduled(cron = "0 0/5 * 1/1 * ?")
    public void cleanStudentsFromWeeklySlots() {
        this.consultationSlotService.cleanStudentsFromWeeklySlots(LocalDate.now().getDayOfWeek(), LocalTime.now());
    }

}
