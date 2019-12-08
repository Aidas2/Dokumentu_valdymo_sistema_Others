package it.docSys.DTO;

public class TestDocDTO {


        private Long id;
        private String author;
        private String type;
        private String title;



        public TestDocDTO(Long id, String author, String type, String title) {
            this.id = id;
            this.author = author;
            this.type = type;
            this.title = title;
        }

        public TestDocDTO() {}


        public void setId(Long id) {
            this.id = id;
        }

        public Long getId() {
            return id;
        }

        public String getAuthor() {
            return author;
        }

        public void setAuthor(String author) {
            this.author = author;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

    }

