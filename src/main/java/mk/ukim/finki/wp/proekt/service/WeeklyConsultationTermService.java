package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.WeeklyConsultationTerm;

import java.time.DayOfWeek;
import java.time.LocalTime;

public interface WeeklyConsultationTermService {

    WeeklyConsultationTerm createTerm(String professorId, Long roomId, DayOfWeek dayOfWeek, LocalTime from,
                                      LocalTime to);

    WeeklyConsultationTerm getWeeklyConsultationTerm(Long termId);

    WeeklyConsultationTerm updateTerm(Long termId, Long roomId, DayOfWeek dayOfWeek, LocalTime from,
                                      LocalTime to);

    void deleteTerm(Long termId);

    void createNewTermSlots();

}
