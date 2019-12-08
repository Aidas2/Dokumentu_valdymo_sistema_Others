package it.akademija.wizards.exception.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class ErrorDetails {

    private String type;
    private String message;
    private String stacktrace;
}
