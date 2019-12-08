package it.docSys.security;

public class AuthResponse {

        private String theToken;
        private String typeOfTOken = "Bearer ";

        public AuthResponse(String theToken) {
            this.theToken = theToken;
        }

        public String getTheToken() {
            return theToken;
        }

        public void setTheToken(String theToken) {
            this.theToken = theToken;
        }

        public String getTypeOfTOken() {
            return typeOfTOken;
        }

        public void setTypeOfTOken(String typeOfTOken) {
            this.typeOfTOken = typeOfTOken;
        }
}
