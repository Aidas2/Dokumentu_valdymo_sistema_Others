package it.akademija.controller;

import io.swagger.models.Response;
import it.akademija.util.BinaryOutputWrapper;
import it.akademija.util.FileUtil;
import it.akademija.entity.File;
import it.akademija.payload.UploadFileResponse;
import it.akademija.repository.FileRepository;
import it.akademija.service.FileStorageService;
import jdk.nashorn.internal.ir.RuntimeNode;
import lombok.extern.slf4j.Slf4j;
import org.h2.util.IOUtils;
import org.hibernate.engine.jdbc.StreamUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

@Slf4j
@RestController
@RequestMapping(value = "/api/file")
public class FileController {



    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private FileUtil fileUtil;

    private static final String OUTPUT_FOLDER = "./uploads";

    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

       File dbFile = new File(
               new String(),
               file.getOriginalFilename()
       );

       fileRepository.save(dbFile);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        log.info("File "+ fileName+ " has been aploaded");

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFile(file))
                .collect(Collectors.toList());
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {

        Resource resource = fileStorageService.loadFileAsResource(fileName);

        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            log.info("Could not determine file type.");
        }

        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @GetMapping("/downloadZip/{email}")
    public void downloadFile(@PathVariable String email, HttpServletResponse response) {

        response.setContentType("application/zip");
        response.setHeader("Content-Disposition", "attachment;filename=download.zip");
        response.setStatus(HttpServletResponse.SC_OK);

        List<String> fileNames = fileRepository.findAllUserFilesNames(email);

        try (ZipOutputStream zippedOut = new ZipOutputStream(response.getOutputStream()))
        {
            for (String file : fileNames) {

                Resource resource = fileStorageService.loadFileAsResource(file);

                ZipEntry e = new ZipEntry(resource.getFilename());
                // Configure the zip entry, the properties of the file
                e.setSize(resource.contentLength());
                e.setTime(System.currentTimeMillis());
                zippedOut.putNextEntry(e);
                // And the content of the resource:
                StreamUtils.copy(resource.getInputStream(), zippedOut);
                zippedOut.closeEntry();
            }
            zippedOut.finish();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/zip/{email}")
    public ResponseEntity<?> generateZip(@PathVariable String email) {
        BinaryOutputWrapper output = new BinaryOutputWrapper();
        List<String> fileNames = fileRepository.findAllUserFilesNames(email);
        try {
            output = fileUtil.prepDownloadAsZIP(fileNames);
        } catch (IOException e) {
            e.printStackTrace();

        }
        return new ResponseEntity<>(output.getData(), output.getHeaders(), HttpStatus.OK);
    }

}
