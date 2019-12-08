package it.akademija.wizards.exception;

import it.akademija.wizards.exception.model.BadRequestException;
import it.akademija.wizards.exception.model.ResourceNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ExceptionFactory {

    private ExceptionFactory() {
    }

    public final ResourceNotFoundException resourceNotFoundException(String message) {
        throw new ResourceNotFoundException(message);
    }

    public final BadRequestException badRequestException(String message) {
        throw new BadRequestException(message);
    }
}
