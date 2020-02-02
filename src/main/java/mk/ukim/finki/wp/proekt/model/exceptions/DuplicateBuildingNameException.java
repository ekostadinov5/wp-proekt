package mk.ukim.finki.wp.proekt.model.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateBuildingNameException extends RuntimeException {
    @Override
    public String getMessage() {
        return "There is already a building with the same name!";
    }
}
