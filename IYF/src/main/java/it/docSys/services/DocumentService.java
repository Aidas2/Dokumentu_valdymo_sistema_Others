package it.docSys.services;


import it.docSys.DTO.GetDocumentDTO;
import it.docSys.DTO.PutDocumentDTO;
import it.docSys.entities.DocType;
import it.docSys.entities.Document;
import it.docSys.repository.DocTypeRepo;
import it.docSys.repository.DocumentRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private DocTypeRepo docTypeRepo;


    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }

    @Transactional
    public void create(PutDocumentDTO putDocumentDTO) {
        Document document = new Document();
        document.setAttachments(putDocumentDTO.getAttachments());
        document.setAuthor(putDocumentDTO.getAuthor());
        document.setDescription(putDocumentDTO.getDescription());
        document.setTitle(putDocumentDTO.getTitle());
        document.setType(putDocumentDTO.getType());
        document.setState(putDocumentDTO.getState());



        documentRepository.save(document);
    }


    @Transactional
    public GetDocumentDTO get(Long id) {
        Document document = documentRepository.getOne(id);
        if (document != null) {
            return new GetDocumentDTO(document.getId(),
                    document.getAuthor(), document.getType(),
                    document.getTitle(), document.getDescription(),
                    document.getAttachments()
                    , document.getState()
            );
        }
        return null;
    }

    @Transactional
    public List<GetDocumentDTO> listAll() {
        return documentRepository.findAll().stream().map(document ->
                new GetDocumentDTO(document.getId(), document.getAuthor(), document.getType(),
                        document.getTitle(), document.getDescription(),
                        document.getAttachments()
                        , document.getState()
                )).collect(Collectors.toList());
    }




    @Transactional
    public void update(long id, PutDocumentDTO putDocumentDTO) {
        Document document = documentRepository.getOne(id);
        if (document != null) {
            document.setAttachments(putDocumentDTO.getAttachments());
            document.setAuthor(putDocumentDTO.getAuthor());
            document.setDescription(putDocumentDTO.getDescription());
            document.setTitle(putDocumentDTO.getTitle());
            document.setType(putDocumentDTO.getType());
            documentRepository.save(document);

        }
    }




    @Transactional
    public void delete(long id) {
        documentRepository.deleteById(id);
    }


    @Transactional
    public void assignDocTypeToDocument(Long d_id, String dt_title) {
        DocType docType = docTypeRepo.getByTitle(dt_title);
        Document document = documentRepository.findById(d_id).orElse(null);
        if (docType != null) {
            docType.getDocuments().add(document);
        }
    }

    @Transactional
    public void deleteDocTypeFromDocument(Long d_id, String dt_title) {
        DocType docType = docTypeRepo.getByTitle(dt_title);
        Document document = documentRepository.findById(d_id).orElse(null);
        if (docType != null) {
            docType.getDocuments().remove(document);
        }
    }


}