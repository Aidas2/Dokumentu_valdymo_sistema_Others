package it.akademija.service;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import it.akademija.entity.DBFile;
import it.akademija.exceptions.FileStorageException;
import it.akademija.exceptions.MyFileNotFoundException;
import it.akademija.repository.DBFileRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DBFileStorageService {

    @Autowired
    private DBFileRepository dbFileRepository;

    public DBFile storeFile(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                //log.info("File: "+ fileName+ " filename validation");
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());

            return dbFileRepository.save(dbFile);
        } catch (IOException ex) {
            //log.info("File:" + fileName+ " storage validation");
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public DBFile getFile(String fileId) {
        return dbFileRepository.findById(fileId)
                .orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
    }

    public List<DBFile> getUserFiles(String email) {
       return dbFileRepository.findAllUserFiles(email).stream().collect(Collectors.toList());

    }

    public List<String> getUserFileNames(String email) {
        //log.info("Returns user's {} files' names", email);
       List<DBFile> dbFiles = dbFileRepository.findAllUserFiles(email);
       List<String> filenames = new ArrayList<>();

       for(DBFile dBfile : dbFiles){
           filenames.add(dBfile.getFileName());
       }

       return filenames;

    }

    public byte[] getUserFileData(String email) {

       byte[] bytes = dbFileRepository.findAllUserFilesData(email);

        return bytes;

    }



    public InputStream getCompressed(InputStream is )
            throws IOException
    {
        byte data[] = new byte[2048];
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ZipOutputStream zos = new ZipOutputStream( bos );
        BufferedInputStream entryStream = new BufferedInputStream( is, 2048);
        ZipEntry entry = new ZipEntry( "" );
        zos.putNextEntry( entry );
        int count;
        while ( ( count = entryStream.read( data, 0, 2048) ) != -1 )
        {
            zos.write( data, 0, count );
        }
        entryStream.close();
        zos.closeEntry();
        zos.close();

        return new ByteArrayInputStream( bos.toByteArray() );
    }


}
