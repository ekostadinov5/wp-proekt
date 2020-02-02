package mk.ukim.finki.wp.proekt.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateRoomNameException extends RuntimeException {

    @Override
    public String getMessage() {
        return "There is already a room in the building with the same name!";
    }
}
