package mk.ukim.finki.wp.proekt.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ConsultationInProgressException extends RuntimeException {
}
