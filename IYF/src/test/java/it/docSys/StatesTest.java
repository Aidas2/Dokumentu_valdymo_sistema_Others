package it.docSys;

import it.docSys.enums.States;

public class StatesTest {

    States states;

        public StatesTest(States states) {
            this.states = states;
        }

        public void reaction() {
            switch (states) {
                case PATEIKTAS:
                    System.out.println("Laukiam laikiam...");
                    break;

                case PRIIMTAS:
                    System.out.println("Valioo - atostogos!");
                    break;

                case ATMESTAS:
                    System.out.println("Ech - vel i ta darba!!!");
                    break;

                default:
                    System.out.println("Paprasta rutina ");
                    break;
            }
        }

        public static void main(String[] args) {
            StatesTest pateikiau = new StatesTest(States.PATEIKTAS);
            pateikiau.reaction();
            StatesTest prieme = new StatesTest(States.PRIIMTAS);
            prieme.reaction();
            StatesTest atmete = new StatesTest(States.ATMESTAS);
            atmete.reaction();

        }
    }

