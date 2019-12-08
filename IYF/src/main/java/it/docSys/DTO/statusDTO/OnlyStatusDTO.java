package it.docSys.DTO.statusDTO;

import it.docSys.enums.States;

public class OnlyStatusDTO {

    private States state;

    public OnlyStatusDTO(States state) {
        this.state = state;
    }

    public States getState() {
        return state;
    }

    public void setState(States state) {
        this.state = state;
    }
}
