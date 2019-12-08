package it.akademija.util;

import org.h2.util.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@Component
public class FileUtil {


    public BinaryOutputWrapper prepDownloadAsPDF(String filename) throws IOException {
        Path fileLocation = Paths.get(filename);
        byte[] data = Files.readAllBytes(fileLocation);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/pdf"));
        String outputFilename = "output.pdf";
        headers.setContentDispositionFormData(outputFilename, outputFilename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        return new BinaryOutputWrapper(data, headers);
    }

    public BinaryOutputWrapper prepDownloadAsZIP(List<String> filenames) throws IOException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/zip"));
        String outputFilename = "documents.zip";
        headers.setContentDispositionFormData(outputFilename, outputFilename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");

        ByteArrayOutputStream byteOutputStream = new ByteArrayOutputStream();
        ZipOutputStream zipOutputStream = new ZipOutputStream(byteOutputStream);

        for(String filename: filenames) {
            File file = new File("./uploads" + filename);
            zipOutputStream.putNextEntry(new ZipEntry(filename));
            FileInputStream fileInputStream = new FileInputStream(file);
            IOUtils.copy(fileInputStream, zipOutputStream);
            fileInputStream.close();
            zipOutputStream.closeEntry();
        }
        zipOutputStream.close();
        return new BinaryOutputWrapper(byteOutputStream.toByteArray(), headers);
    }
}
