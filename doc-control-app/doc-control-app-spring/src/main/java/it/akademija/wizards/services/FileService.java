package it.akademija.wizards.services;

import it.akademija.wizards.configs.MediaTypeUtils;
import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.services.auxiliary.Auth;
import it.akademija.wizards.services.auxiliary.ResourceFinder;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.attribute.PosixFilePermission;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Service
@Slf4j
public class FileService {

    private static final String pathName = "documents";
    @Autowired
    private ResourceFinder resourceFinder;
    @Autowired
    private ServletContext servletContext;

    private List<String> allowedFileTypes = new ArrayList<>(Arrays.asList("application/pdf", "image/png",
            "image/jpg"));

    // DELETE ADDITIONAL FILES BY FILENAME
    @Transactional
    public ResponseEntity<String> deleteFilesByFileName(
            Document document,
            String[] fileNames) {
        for (String fileName :
                fileNames
        ) {
            deleteAdditionalFiles(document, fileName);
        }
        return new ResponseEntity<>("Files deleted.", HttpStatus.ACCEPTED);
    }

//    // DOWNLOAD DOCUMENT MAIN FILE
//    @Transactional
//    public ResponseEntity downloadMainFile(String documentId) throws FileNotFoundException {
//        Document document = resourceFinder.getDocument(documentId);
//        String originalFileName = document.getPath();
//        MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, originalFileName);
//        File file = new File(getDocumentFolder(document).getPath()
//                + File.separator
//                + document.getPath());
//        if (file.exists()) {
//            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
//            HttpHeaders headers = new HttpHeaders();
//            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + originalFileName + "\"");
//            headers.add("Access-Control-Expose-Headers",
//                    HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
//            headers.setContentType(mediaType);
//            return ResponseEntity.ok().headers(headers).
//                    body(resource);
//        }
//        return ResponseEntity.notFound().build();
//    }

    //    DOWNLOAD DOCUMENT FILE
    @Transactional
    public ResponseEntity downloadFile(String documentId, String filePath) throws FileNotFoundException {
        Document document = resourceFinder.getDocument(documentId);
//      DOWNLOAD MAIN FILE
        if (filePath.equals(document.getPath())) {
            File file = new File(getDocumentFolder(document).getPath()
                    + File.separator
                    + document.getPath());
            if (file.exists()) {
                MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, filePath);
                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath + "\"");
                headers.add("Access-Control-Expose-Headers",
                        HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
                headers.setContentType(mediaType);
                return ResponseEntity.ok().headers(headers).
                        body(resource);
            }
            log.error("Vartotojas '" + Auth.getUsername() + "'. Atsisiuntimui failo '" + file.getName() + "' nėra.");
        } else if (document.getAdditionalFilePaths().contains(filePath)) {
//            DOWNLAOD ADDITIONAL FILE
            File file = new File(getDocumentFolder(document).getPath()
                    + File.separator
                    + filePath);
            if (file.exists()) {
                MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, filePath);
                InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath + "\"");
                headers.add("Access-Control-Expose-Headers",
                        HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
                headers.setContentType(mediaType);
                return ResponseEntity.ok().headers(headers).
                        body(resource);
            }
            log.error("Vartotojas '" + Auth.getUsername() + "'. Atsisiuntimui failo '" + file.getName() + "' nėra.");
        }
//        FILE NOT FOUND
        return ResponseEntity.notFound().build();

    }

    // DOWNLOAD ARCHIVE OF FILES
    @Transactional
    public ResponseEntity downloadAllDocuments(String username) throws IOException {
        long time1 = System.currentTimeMillis();
        User user = resourceFinder.getUser(username);
        String csvFilePath = pathName
                + File.separator
                + user.getUsername()
                + File.separator
                + user.getUsername()
                + ".csv";
        File csvFile = createCsv(user);
        List<Document> documents = user.getDocuments();
        if (documents.isEmpty()) {
            return new ResponseEntity<>("Neturite dokumentų.", HttpStatus.BAD_REQUEST);
        } else {

            if (new File(pathName +
                    File.separator +
                    username +
                    File.separator +
                    "dokumentai.zip").exists()) {
                boolean delete = new File(pathName +
                        File.separator +
                        username +
                        File.separator +
                        "dokumentai.zip").delete();
            }
            File file = new File(pathName +
                    File.separator +
                    username +
                    File.separator +
                    "dokumentai.zip");

            FileOutputStream fos = new FileOutputStream(file);
            ZipOutputStream zs = new ZipOutputStream(fos);

            for (Document d :
                    documents) {
                File documentFile = getDocumentFolder(d);
                try {
                    addDirToZipArchive(zs, documentFile, "");
                } catch (Exception e) {
                    log.error("Vartotojas '" + Auth.getUsername() + "'. Nepavyko suformuoti dokumentų archyvo.");
                    return new ResponseEntity<>("Archiving failed", HttpStatus.BAD_REQUEST);
                }
            }
            try {
                addDirToZipArchive(zs, csvFile, "");
            } catch (Exception e) {
                log.error("Vartotojas '" + Auth.getUsername() + "'. Nepavyko suformuoti dokumentų archyvo.");
                log.error("Error message: " + e);
                return new ResponseEntity<>("Archiving CSV failed", HttpStatus.BAD_REQUEST);
            }
            zs.flush();
            fos.flush();
            zs.close();
            fos.close();
            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));
            HttpHeaders headers = new HttpHeaders();

            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + username + ".zip" + "\"");
            headers.add("Access-Control-Expose-Headers",
                    HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
            long time2 = System.currentTimeMillis();
            System.out.println(time2 - time1);
            log.info("Vartotojas '" + Auth.getUsername() + "' atsisiuntė savo dokumentų archyvą csv formatu kartu su pridėtais failais.");
            return ResponseEntity.ok().headers(headers).body(resource);
        }

    }

    //    @Transactional
//    public void uploadMainFile(Document document, MultipartFile multipartFile) throws IOException {
//        File folder = getDocumentFolder(document);
//
//        boolean mkdirs = folder.mkdirs();
//        String originalFileName = multipartFile.getOriginalFilename();
//        document.setPath(originalFileName);
//        byte[] buf = new byte[1024];
//        assert originalFileName != null;
//        File file = new File(folder.getPath(), originalFileName);
//        try (InputStream inputStream = multipartFile.getInputStream();
//             FileOutputStream fileOutputStream = new FileOutputStream(file)) {
//            int numRead;
//            while ((numRead = inputStream.read(buf)) >= 0) {
//                fileOutputStream.write(buf, 0, numRead);
//            }
//        }
//        Set<PosixFilePermission> perms = new HashSet<>();
//        // add owners permission
//        perms.add(PosixFilePermission.OWNER_READ);
//        perms.add(PosixFilePermission.OWNER_WRITE);
//        perms.add(PosixFilePermission.GROUP_READ);
//        perms.add(PosixFilePermission.GROUP_WRITE);
//        // add others permissions
//        perms.add(PosixFilePermission.OTHERS_READ);
//        Files.setPosixFilePermissions(Paths.get(file.toString()), perms);
//    }
    @Transactional
    public void uploadAdditionalFiles(Document document, MultipartFile[] multipartFiles) throws IOException {
        File folder = getDocumentFolder(document);
        boolean mkdirs = folder.mkdirs();
        for (MultipartFile multipartFile :
                multipartFiles) {
            String originalFileName = multipartFile.getOriginalFilename();
            List<String> additionalFilePaths = document.getAdditionalFilePaths();
            additionalFilePaths.add(originalFileName);
            document.setAdditionalFilePaths(additionalFilePaths);
            byte[] buf = new byte[1024];
            assert originalFileName != null;
            File file = new File(folder.getPath(), originalFileName);
            try (InputStream inputStream = multipartFile.getInputStream();
                 FileOutputStream fileOutputStream = new FileOutputStream(file)) {
                int numRead;
                while ((numRead = inputStream.read(buf)) >= 0) {
                    fileOutputStream.write(buf, 0, numRead);
                }
            }
            Set<PosixFilePermission> perms = new HashSet<>();
            // add owners permission
            perms.add(PosixFilePermission.OWNER_READ);
            perms.add(PosixFilePermission.OWNER_WRITE);
            perms.add(PosixFilePermission.GROUP_READ);
            perms.add(PosixFilePermission.GROUP_WRITE);
            // add others permissions
            perms.add(PosixFilePermission.OTHERS_READ);
            Files.setPosixFilePermissions(Paths.get(file.toString()), perms);
        }
    }

    //    Uploads Main File (always first in an array when creating document) and Additional Files
    @Transactional
    public void uploadFiles(Document document, MultipartFile[] multipartFile) throws IOException {
        File folder = getDocumentFolder(document);
        if (!folder.exists()) {
            boolean mkdirs = folder.mkdirs();
        }
        File path = new File(pathName
                + File.separator
                + document.getAuthor().getUsername()
                + File.separator
                + formatLocalDateTime(convertToLocalDateTimeViaMilisecond(document.getCreationDate())));

        for (int i = 0; i < multipartFile.length; i++) {
            String originalFileName = multipartFile[i].getOriginalFilename();
            if (i == 0) {
                document.setPath(originalFileName);
            } else {
                document.getAdditionalFilePaths().add(originalFileName);
            }

            byte[] buf = new byte[1024];
            assert originalFileName != null;
            File file = new File(path.getPath(), originalFileName);
            try (InputStream inputStream = multipartFile[i].getInputStream();
                 FileOutputStream fileOutputStream = new FileOutputStream(file)) {
                int numRead = 0;
                while ((numRead = inputStream.read(buf)) >= 0) {
                    fileOutputStream.write(buf, 0, numRead);
                }
            }
            Set<PosixFilePermission> perms = new HashSet<>();
            // add owners permission
            perms.add(PosixFilePermission.OWNER_READ);
            perms.add(PosixFilePermission.OWNER_WRITE);
            perms.add(PosixFilePermission.GROUP_READ);
            perms.add(PosixFilePermission.GROUP_WRITE);
            // add others permissions
            perms.add(PosixFilePermission.OTHERS_READ);
            Files.setPosixFilePermissions(Paths.get(file.toString()), perms);
        }
    }
//    @Transactional
//    public Map<String, String> getDocumentFileInfo(Document document) {
//        Map<String, String> map = new HashMap<>();
//        String username = document.getAuthor().getUsername();
//        String documentPath = getDocumentFolder(document).getPath();
//        map.put(document.getPath(), formatFileSize(new File(documentPath
//                + File.separator
//                + document.getPath()).length()));
//        for (String pathName :
//                document.getAdditionalFilePaths()) {
//            map.put(pathName,formatFileSize(new File(documentPath
//                    + File.separator
//                    + pathName).length()));
//        }
//        System.out.println(map);
//        return map;
//    }
    @Transactional
    public Map<String, Long> getDocumentFileInfo(Document document) {
        Map<String, Long> map = new HashMap<>();
        String username = document.getAuthor().getUsername();
        String documentPath = getDocumentFolder(document).getPath();
        map.put(document.getPath(),new File(documentPath
                + File.separator
                + document.getPath()).length());
        for (String pathName :
                document.getAdditionalFilePaths()) {
            map.put(pathName,new File(documentPath
                    + File.separator
                    + pathName).length());
        }
        System.out.println(map);
        return map;
    }


    //    DELETES ONLY CREATED DOCUMENT FILES
    @Transactional
    public void deleteAllFiles(Document document) {
        document.setAdditionalFilePaths(null);
        document.setPath(null);
        File folder = getDocumentFolder(document);
        deleteFolder(folder);
    }

    @Transactional
    public void deleteMainFile(Document document) {
        File folder = getDocumentFolder(document);
        File file = new File(folder.getPath()
                + File.separator
                + document.getPath());
        boolean delete = file.delete();
        if (Objects.requireNonNull(folder.list()).length == 0) {
            deleteFolder(folder);
        }
    }

    @Transactional
    public void deleteAdditionalFiles(Document document, String fileName) {
        if (document.getAdditionalFilePaths() != null) {
            File folder = getDocumentFolder(document);
            File files = new File(folder.getPath()
                    + File.separator
                    + fileName);
            boolean delete = files.delete();
            document.getAdditionalFilePaths().remove(fileName);
            if (Objects.requireNonNull(folder.list()).length == 0) {
                deleteFolder(folder);
            }
            log.info("Vartotojas '" + Auth.getUsername() + "' dokumentui, kurio id '" + document.getId() + "', ištrynė pridėtą failą '" + fileName + "'.");
        } else {
            throw new IllegalArgumentException("There is no attachment named \"" + fileName + "\".");
        }
    }

    @Transactional
    public File getDocumentFolder(Document document) {
        return new File(pathName
                + File.separator
                + document.getAuthor().getUsername()
                + File.separator
                + formatLocalDateTime(
                convertToLocalDateTimeViaMilisecond(document.getCreationDate()
                )
        ));
    }

    @Transactional
    public ResponseEntity downloadCSV(User user) {
        if (!user.getDocuments().isEmpty()) {
            try {
                File file = createCsv(user);
                MediaType mediaType = MediaTypeUtils.getMediaTypeForFile(this.servletContext, file.getPath());
                InputStreamResource resource = new InputStreamResource(new FileInputStream(file.getPath()));
                HttpHeaders headers = new HttpHeaders();
                headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + user.getUsername() + ".csv" + "\"");
                headers.add("Access-Control-Expose-Headers",
                        HttpHeaders.CONTENT_DISPOSITION + "," + HttpHeaders.CONTENT_LENGTH);
                headers.setContentType(mediaType);
                log.info("Vartotojas '" + Auth.getUsername() + "' atsisiuntė savo dokumentų archyvą csv formatu.");
                return ResponseEntity.ok().headers(headers).
                        body(resource);
            } catch (IOException ex) {
                System.out.println(ex);
                log.error("Vartotojas '" + Auth.getUsername() + "'. Negalima sukurti csv failo.");
                return new ResponseEntity<>("Could not create csv file", HttpStatus.EXPECTATION_FAILED);
            }
        } else {
            return new ResponseEntity<>("User does not have any documents.", HttpStatus.NOT_FOUND);
        }
    }

    //  Create CSV
    private File createCsv(User user) {

        File folder = new File(pathName
                + File.separator
                + user.getUsername()
                + File.separator);
        if (!folder.exists()) {
            boolean mkdirs = folder.mkdirs();
        }
        String csvFilePath = pathName
                + File.separator
                + user.getUsername()
                + File.separator
                + user.getUsername()
                + ".csv";
        File file = new File(csvFilePath);

        List<Document> documents = user.getDocuments();
        try (
                BufferedWriter writer = Files.newBufferedWriter(Paths.get(csvFilePath));
                CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.DEFAULT
                        .withHeader(
                                "Autorius",
                                "Pavadinimas",
                                "Aprašymas",
                                "Sukūrimo data",
                                "Dokumento tipas",
                                "Dokumento būsena",
                                "Išsiuntimo data",
                                "Peržiūrėjo",
                                "Patvirtinimo data",
                                "Atmėtimo data",
                                "Atmetimo priežastis"
                        )
                )
        ) {
            for (Document doc : documents) {
                User reviewer = doc.getReviewer();
                String reviewerFullName = "";
                if (reviewer != null) {
                    reviewerFullName = reviewer.getFirstname() + " " + reviewer.getLastname();
                }
                String documentState = "";

                switch (doc.getDocumentState()) {
                    case CREATED:
                        documentState = "Sukurtas";
                        break;
                    case SUBMITTED:
                        documentState = "Išsiųstas";
                        break;
                    case ACCEPTED:
                        documentState = "Priimtas";
                        break;
                    case REJECTED:
                        documentState = "Atmestas";
                        break;
                    default:
                        break;
                }


                csvPrinter.printRecord(
                        doc.getAuthor().getFirstname() + " " + doc.getAuthor().getLastname(),
                        doc.getTitle(),
                        doc.getDescription(),
                        doc.getCreationDate(),
                        doc.getDocumentType().getTitle(),
                        documentState,
                        doc.getSubmissionDate(),
                        reviewerFullName,
                        doc.getApprovalDate(),
                        doc.getRejectionDate(),
                        doc.getRejectionReason()
                );
            }


            csvPrinter.flush();
        } catch (IOException e) {
            log.error("Vartotojas '" + Auth.getUsername() + "'. Negalima sukurti csv failo.");
            e.printStackTrace();
        }
        return new File(csvFilePath);
    }


    //    Zip folders
    private void addDirToZipArchive(ZipOutputStream zos, File fileToZip, String parentDirectoryName) throws Exception {
        if (fileToZip == null || !fileToZip.exists()) {
            log.error("Vartototas '" + Auth.getUsername() + "'. Generuojant dokumentų archyvą nerasta direktorija '" + fileToZip + "'.");
            return;
        }

        String zipEntryName = fileToZip.getName();
        if (parentDirectoryName != null && !parentDirectoryName.isEmpty()) {
            zipEntryName = parentDirectoryName + File.separator + fileToZip.getName();
        }

        if (fileToZip.isDirectory()) {
            System.out.println(zipEntryName);
            for (File file : Objects.requireNonNull(fileToZip.listFiles())) {
                addDirToZipArchive(zos, file, zipEntryName);
            }
        } else {
            System.out.println("   " + zipEntryName);
            byte[] buffer = new byte[1024];
            FileInputStream fis = new FileInputStream(fileToZip);
            zos.putNextEntry(new ZipEntry(zipEntryName));
            int length;
            while ((length = fis.read(buffer)) > 0) {
                zos.write(buffer, 0, length);
            }
            zos.closeEntry();
            fis.close();
        }
    }

    private void deleteFolder(File folder) {
        if (folder.exists()) {
            for (String s : Objects.requireNonNull(folder.list())) {
                File currentFile = new File(folder.getPath(), s);
                boolean delete = currentFile.delete();
            }
            boolean delete = folder.delete();
        } else {
            log.error("Bandyta ištrinti neegzistuojantį aplanką pavadinimu "
                    + folder.getAbsolutePath());
        }
    }

    //    Date TO LocalDateTime CONVERTER
    private LocalDateTime convertToLocalDateTimeViaMilisecond(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

    //    Date format
    private String formatLocalDateTime(LocalDateTime localDateTime) {
        DateTimeFormatter dataTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH:mm:ss", Locale.US);
        return localDateTime.format(dataTimeFormatter);
    }
    //    Check file extensions


    //  Validates additionalFiles.
    boolean validateFiles(MultipartFile[] multipartFiles) {
        List<String> fileNames = getFileNames(multipartFiles);
        return validateMainFileType(multipartFiles[0]) && validaFileNamesCreateDocument(fileNames) && validateAdditionalFileTypes(multipartFiles);
    }

    //  Validates only additional Files
    public boolean validateAdditionalFiles(MultipartFile[] multipartFile) {
        List<String> fileNames = getFileNames(multipartFile);
        return validaFileNamesCreateDocument(fileNames) && validateAdditionalFileTypes(multipartFile);
    }

    //  Validates Main file.
    boolean validateMainFileType(MultipartFile multipartFile) {
        return Objects.equals(multipartFile.getContentType(), "application/pdf");
    }

    //  Adds all file names to a List
    private List<String> getFileNames(MultipartFile[] multipartFiles) {
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile multipartFile :
                multipartFiles) {
            fileNames.add(multipartFile.getOriginalFilename());
        }
        return fileNames;
    }

    //  Returns false if files are of invalid type.
    boolean validateAdditionalFileTypes(MultipartFile[] multipartFiles) {
        for (MultipartFile multipartFile :
                multipartFiles) {
            if (!this.allowedFileTypes.contains(multipartFile.getContentType())) {
                return false;
            }
        }
        return true;
    }

    //  Returns false if there are duplicate file names.
    private boolean validaFileNamesCreateDocument(List<String> fileNames) {
        Set<String> names = new HashSet<>();
        for (String name :
                fileNames) {
            if (names.contains(name)) {
                return false;
            }
            names.add(name);
        }
        return true;
    }

    //  When updating main file, checks for duplicates
    boolean validateFileNamesMainUpdate(MultipartFile[] multipartFiles,
                                        List<String> additionalFilePaths,
                                        String[] additionalFilePathsToDelete) {
        List<String> fileNames = new ArrayList<>(additionalFilePaths);
        fileNames.removeAll(Arrays.asList(additionalFilePathsToDelete));
        fileNames.addAll(getFileNames(multipartFiles));
        Set<String> names = new HashSet<>();
        for (String name :
                fileNames) {
            if (names.contains(name)) {
                return false;
            }
            names.add(name);
        }
        return true;
    }

    //  When updating only additional files, checks for duplicates
    boolean validateFileNamesAdditionalUpdate(MultipartFile[] multipartFiles,
                                              List<String> additionalFilePaths,
                                              String[] additionalFilePathsToDelete,
                                              String mainFilePath) {
        List<String> fileNames = new ArrayList<>(additionalFilePaths);
        fileNames.removeAll(Arrays.asList(additionalFilePathsToDelete));
        fileNames.addAll(getFileNames(multipartFiles));
        fileNames.add(mainFilePath);
        Set<String> names = new HashSet<>();
        for (String name :
                fileNames) {
            if (names.contains(name)) {
                return false;
            }
            names.add(name);
        }
        return true;
    }


//        public String formatFileSize(Long bytes) {
//            String[] dictionary = { "bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };
//            int index = 0;
//            for (index = 0; index < dictionary.length; index++) {
//                if (bytes < 1000) {
//                    break;
//                }
//                bytes = bytes / 1000;
//            }
//            return String.format( "%d", bytes) + " " +  dictionary[index];
//        }
}
