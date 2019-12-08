package it.akademija.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import it.akademija.dto.UserDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import it.akademija.FileStorageProperties;
import it.akademija.dto.DocumentDTO;
import it.akademija.entity.Document;
import it.akademija.entity.File;
import it.akademija.entity.Type;
import it.akademija.entity.User;
import it.akademija.entity.UserDocument;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestDocument;
import it.akademija.payload.RequestMessage;
import it.akademija.payload.RequestUser;
import it.akademija.repository.DBFileRepository;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.FileRepository;
import it.akademija.repository.PagedDocumentRepository;
import it.akademija.repository.TypeRepository;
import it.akademija.repository.UserDocumentRepository;
import it.akademija.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DocumentService {


    private final DocumentRepository documentRepository;
    private final PagedDocumentRepository pagedDocumentRepository;
    private final TypeRepository typeRepository;
    private final UserRepository userRepository;
    private final UserDocumentRepository userDocumentRepository;
    private final DBFileRepository dbFileRepository;
    private final FileRepository fileRepository;
    private final FileStorageService fileStorageService;
    private final FileStorageProperties fileStorageProperties;
    private final EntityManager entityManager;

    @Autowired
    public DocumentService(DocumentRepository documentRepository, PagedDocumentRepository pagedDocumentRepository, TypeRepository typeRepository,
            UserRepository userRepository, UserDocumentRepository userDocumentRepository, DBFileRepository dbFileRepository, FileRepository fileRepository,
            FileStorageService fileStorageService, FileStorageProperties fileStorageProperties, EntityManager entityManager) {
        this.documentRepository = documentRepository;
        this.pagedDocumentRepository = pagedDocumentRepository;
        this.typeRepository = typeRepository;
        this.userRepository = userRepository;
        this.userDocumentRepository = userDocumentRepository;
        this.dbFileRepository = dbFileRepository;
        this.fileRepository = fileRepository;
        this.fileStorageService = fileStorageService;
        this.fileStorageProperties = fileStorageProperties;
        this.entityManager = entityManager;
    }

    @Autowired
    private DocumentAndTypeSpecification specification;


    @Transactional
    public int returnUserSubmittedDocumentCountByTypeGroupDateRange(String email, Date startDate, Date endDate, String title, String name){
        return documentRepository.findSubmittedUserDocumentCountByGroupTypeDateRange(email, startDate, endDate, title, name);
    }

    @Transactional
    public int returnUserConfirmedDocumentCountByTypeGroupDateRange(String email, Date startDate, Date endDate, String title, String name){
        return documentRepository.findConfirmedUserDocumentCountByGroupTypeDateRange(email, startDate, endDate, title, name);
    }

    @Transactional
    public int returnUserRejectedDocumentCountByTypeGroupDateRange(String email, Date startDate, Date endDate, String title, String name){
        return documentRepository.findRejectedUserDocumentCountByGroupTypeDateRange(email, startDate, endDate, title, name);
    }

    @Transactional
    public Page<DocumentDTO> findDocumentsByNumberOrStatus(DocumentListRequest request, Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findAll(specification.getFilter(request), pageable);
        final Page<DocumentDTO> documentDTOPage = documentPage.map(this::convertToDocumentDto);

        return documentDTOPage;
    }

    @Transactional
    public Page<DocumentDTO> findByType(String title, Pageable pageable ){
        Page<Document> documentPage = pagedDocumentRepository.findAllDocumentsByType(title, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> findUserDocumentByDateRange(String email, Date startDate, Date endDate, Pageable pageable ){
        Page<Document> documentPage = pagedDocumentRepository.findAllUserDocumentsDateRangePage(email, startDate, endDate, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> findByDateRange(Date startDate, Date endDate, Pageable pageable ){
        Page<Document> documentPage = pagedDocumentRepository.getAllBetweenDates(startDate, endDate, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> findUserDocumentBytTitle(String email, String title, Pageable pageable ){
        Page<Document> documentPage = pagedDocumentRepository.findAllUserDocumentsByTitle(email, title, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> findUserReceivedDocumentsBytTitle(String email, String title, Pageable pageable ){
        Page<Document> documentPage = pagedDocumentRepository.findAllUserReceivedDocumentsByTitle(email, title, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> findUserReceivedDocumentByDateRange(String email, Date startDate, Date endDate, Pageable pageable ){
        Page<Document> documentPage = pagedDocumentRepository.findAllUserReceivedDocumentsDateRange(email, startDate, endDate, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> listByPage(Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findAll(pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }


    @Transactional
    public Page<DocumentDTO> pagedAllUserDocuments(String email, Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findAllUserDocumentsPage(email, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> pagedUserSubmittedDocuments(String email, Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findAllUserSubmittedDocumentsPage(email, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> pagedUserConfirmedDocuments(String email, Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findAllUserConfirmedDocumentsPage(email, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> pagedUserNotSubmittedDocuments(String email, Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findAllUserNotSubmittedDocumentsPage(email, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> pagedUserRejectedDocuments(String email, Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findAllUserRejectedDocumentsPage(email, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    @Transactional
    public Page<DocumentDTO> pagedUserReceivedDocuments(String email, Pageable pageable) {
        Page<Document> documentPage = pagedDocumentRepository.findReceivedUserDocumentsPage(email, pageable);
        final Page<DocumentDTO> documentDtoPage = documentPage.map(this::convertToDocumentDto);
        return documentDtoPage;
    }

    private DocumentDTO convertToDocumentDto(final Document document) {
        final DocumentDTO documentDTO = new DocumentDTO(
                document.getTitle(),
                document.getUniqueNumber(),
                document.getDescription(),
                document.getCreatedDate(),
                document.getSubmittedDate(),
                document.getConfirmedDate(),
                document.getRejectedDate(),
                document.getType(),
                document.getUserDocuments(),
                document.getDbFiles()
        );
        return documentDTO;
    }

    @Transactional
    public int returnAllUserDocumentCount(String email){
        return documentRepository.getUserDocumentCount(email);
    }

    @Transactional
    public int returnSubmittedlUserDocumentCount(String email){
        return documentRepository.getUserSubmittedDocumentCount(email);
    }

    @Transactional
    public int returnConfirmedUserDocumentCount(String email){
        return documentRepository.getUserConfirmedDocumentCount(email);
    }

    @Transactional
    public int returnRejectedUserDocumentCount(String email){
        return documentRepository.getUserRejectedDocumentCount(email);
    }

    @Transactional
    public Long returnCount(){
        Long count = pagedDocumentRepository.findCount();
        System.out.println("count " + count);
        return count;
    }


    @Transactional
    public List<DocumentDTO> getAll(){
        return documentRepository.findAll().stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getSubmittedDate(),
                        document.getConfirmedDate(),
                        document.getRejectedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

    }

    @Transactional
    public void createDocument(RequestDocument requestDocument){
        Type type = typeRepository.findByTitle(requestDocument.getTypeTitle());
        User user = userRepository.findByEmail(requestDocument.getEmail());
        File file = fileRepository.findByFileName(requestDocument.getFileName());

        UserDocument userDocument= new UserDocument();
        Document document = new Document(
                new Long(1),
                requestDocument.getUniqueNumber(),
                requestDocument.getTitle(),
                requestDocument.getDescription(),
                new Date()
        );
        document.setType(type);
        log.info(document.getTitle() + "type set");

//        document.addDbFile(file);
        document.getDbFiles().add(file);
        log.info(document.getDbFiles().add(file) + "file added");
        file.setDocument(document);

        documentRepository.save(document);
        log.info(document.getTitle() + "has been saved");

//        file.setDocument(documentRepository.findByuniqueNumber(requestDocument.getUniqueNumber()));

        userDocument.setUser(user);//ok

        userDocument.setDocument(documentRepository.findByuniqueNumber(requestDocument.getUniqueNumber()));//jei sutampa pavadinimas jpa nesupranta pagal kuri ieskoti, pakiesi i findbyunuique numbet

        userDocumentRepository.save(userDocument);

    }

    @Transactional
    public void additionalFile(String uniqueNumber,RequestDocument requestDocument){
        Document document = documentRepository.findByuniqueNumber(uniqueNumber);
        File file = fileRepository.findByFileName(requestDocument.getFileName());
        List<File> files = document.getDbFiles();

        file.setDocument(document);

//        document.addDbFile(file);

        fileRepository.save(file);

        ListIterator<File> listIterator = files.listIterator();
        listIterator.add(file);

        document.setDbFiles(files);
        documentRepository.save(document);
    }

    @Transactional
    public DocumentDTO getDocumentByTitle(String uniqueNumber){
        Document document = getExisting(uniqueNumber);

        DocumentDTO documentDTO = new DocumentDTO(
                document.getTitle(),
                document.getUniqueNumber(),
                document.getDescription(),
                document.getCreatedDate(),
                document.getSubmittedDate(),
                document.getConfirmedDate(),
                document.getRejectedDate(),
                document.getType(),
                document.getUserDocuments(),
                document.getDbFiles()
        );
        return documentDTO;
    }

    @Transactional
    public List<DocumentDTO> getAllUserDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getSubmittedDate(),
                        document.getConfirmedDate(),
                        document.getRejectedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }

    @Transactional
    public List<DocumentDTO> getAllUserSubmittedDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserSubmittedDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getSubmittedDate(),
                        document.getConfirmedDate(),
                        document.getRejectedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }


    @Transactional
    public List<DocumentDTO> getAllUserRejectedDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findAllUserRejectedDocumentsl(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getSubmittedDate(),
                        document.getConfirmedDate(),
                        document.getRejectedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }

    @Transactional
    public List<DocumentDTO> getAllUserReceivedDocuments(String email){
        List<DocumentDTO> documents = documentRepository.findReceivedUserDocuments(email).stream()
                .map(document -> new DocumentDTO(
                        document.getTitle(),
                        document.getUniqueNumber(),
                        document.getDescription(),
                        document.getCreatedDate(),
                        document.getSubmittedDate(),
                        document.getConfirmedDate(),
                        document.getRejectedDate(),
                        document.getType(),
                        document.getUserDocuments(),
                        document.getDbFiles()
                ))
                .collect(Collectors.toList());

        return documents;
    }

    @Transactional
    public void updateDocument(RequestDocument requestDocument, String uniqueNumber){
        Document document = documentRepository.findByuniqueNumber(uniqueNumber);
//        Type type = typeRepository.findByTitle(requestDocument.getTypeTitle());

                document.setTitle(requestDocument.getTitle());
                document.setDescription(requestDocument.getDescription());
//                document.setType(type);

                documentRepository.save(document);
    }

    @Transactional
    public void deleteDocument(String uniqueNumber){
        Document document = documentRepository.findByuniqueNumber(uniqueNumber);
        document.setType(null);

        List<File> dbFiles = document.getDbFiles();


        for (Iterator<File> iterator = dbFiles.iterator(); iterator.hasNext(); ) {

            File value = iterator.next();

            String fileName = value.getFileName();
            Resource resource = fileStorageService.loadFileAsResource(fileName);

            try {
                resource.getFile().delete();
            } catch (IOException e) {
                e.printStackTrace();
            }
            iterator.remove();
            }

        documentRepository.delete(document);
    }

    @Transactional
    public void submitDocument(String number, String email){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(email);

        document.setSubmittedDate(new Date());
        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocument.setSubmitted(true);

        userDocumentRepository.save(userDocument);
    }


    @Transactional
    public void confirmDocument(String number, String email){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(email);

        document.setConfirmedDate(new Date());
        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocument.setSubmitted(true);
        userDocument.setConfirmed(true);

        userDocumentRepository.save(userDocument);

    }

    @Transactional
    public void rejectDocument(String number, String email, RequestMessage request){
        Document document = documentRepository.findByuniqueNumber(number);
        User user = userRepository.findByEmail(email);
        document.setRejectedDate(new Date());

        UserDocument userDocument = new UserDocument();

        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocument.setRejected(true);
        userDocument.setSubmitted(true);
        userDocument.setMessage(request.getMessage());

        userDocumentRepository.save(userDocument);

    }

    @Transactional
    public void removeUser(String title, RequestUser request){
        Document document = documentRepository.findByTitle(title);
        User user = userRepository.findByEmail(request.getEmail());

        UserDocument userDocument = new UserDocument();
        userDocument.setUser(user);
        userDocument.setDocument(document);

        userDocumentRepository.delete(userDocument);

        document.getUserDocuments().remove(userDocument);
        user.getUserDocuments().remove(userDocument);
    }

    private Document getExisting(String number) {
        return Optional.ofNullable(documentRepository.findByuniqueNumber(number))
                .orElseThrow(() -> new ResourceNotFoundException("No document exists with unique number " + number));
    }

}
