package mk.ukim.finki.wp.proekt.service;

import mk.ukim.finki.wp.proekt.model.ConsultationSlot;
import org.springframework.data.domain.Page;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ConsultationSlotService {

    ConsultationSlot createSlot(String professorId, String roomName, DayOfWeek dayOfWeek, LocalDate date,
                                LocalTime from, LocalTime to);

    ConsultationSlot getConsultationSlot(Long slotId);

    ConsultationSlot updateSlot(Long slotId, String professorId, String roomName, DayOfWeek dayOfWeek,
                                LocalDate date, LocalTime from, LocalTime to);

    void deleteSlot(Long slotId);

}
