package mk.ukim.finki.wp.proekt.web.scheduled;

import mk.ukim.finki.wp.proekt.service.ConsultationSlotService;
import mk.ukim.finki.wp.proekt.service.WeeklyConsultationTermService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;

@Component
public class ManageConsultations {
    private final ConsultationSlotService consultationSlotService;
    private final WeeklyConsultationTermService weeklyConsultationTermService;

    public ManageConsultations(ConsultationSlotService consultationSlotService,
                               WeeklyConsultationTermService weeklyConsultationTermService) {
        this.consultationSlotService = consultationSlotService;
        this.weeklyConsultationTermService = weeklyConsultationTermService;
    }

    @Scheduled(cron = "0 0/5 * 1/1 * ?")
    public void cleanFinishedDateTerms() {
        this.consultationSlotService.cleanFinishedDateSlots(LocalDate.now(), LocalTime.now());
    }

    @Scheduled(cron = "0 0/15 * 1/1 * ?")
    public void createNewTermSlots() {
        this.weeklyConsultationTermService.createNewTermSlots();
    }

}
