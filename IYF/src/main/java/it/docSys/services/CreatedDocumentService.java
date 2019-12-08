package it.docSys.services;


import it.docSys.DTO.GetCreatedDocumentDTO;
import it.docSys.DTO.PutCreatedDocumentDTO;
import it.docSys.entities.CreatedDocument;
import it.docSys.repository.CreatedDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class CreatedDocumentService {

    @Autowired
    private CreatedDocumentRepository createdDocumentRepository;


    public CreatedDocumentService(CreatedDocumentRepository createdDocumentRepository) {
        this.createdDocumentRepository = createdDocumentRepository;
    }

    @Transactional
    public void create(PutCreatedDocumentDTO putCreatedDocumentDTO) {
        CreatedDocument createdDocument = new CreatedDocument();
        createdDocument.setAddressee(putCreatedDocumentDTO.getAddressee());
        createdDocument.setAttachments(putCreatedDocumentDTO.getAttachments());
        createdDocument.setAuthor(putCreatedDocumentDTO.getAuthor());
        createdDocument.setDescription(putCreatedDocumentDTO.getDescription());
        createdDocument.setName(putCreatedDocumentDTO.getName());
        createdDocument.setType(putCreatedDocumentDTO.getType());
        createdDocumentRepository.save(createdDocument);
    }


    @Transactional
    public GetCreatedDocumentDTO get(Long id) {
        CreatedDocument createdDocument = createdDocumentRepository.findById(id).orElse(null);
        if (createdDocument != null) {
            return new GetCreatedDocumentDTO(createdDocument.getId(), createdDocument.getAuthor(),
                    createdDocument.getType(), createdDocument.getName(),
                    createdDocument.getDescription(), createdDocument.getAddressee(),
                    createdDocument.getAttachments());
        }
        return null;
    }

    @Transactional
    public List<GetCreatedDocumentDTO> listAll() {
        return createdDocumentRepository.findAll().stream().map(createdDocument ->
                new GetCreatedDocumentDTO(createdDocument.getId(), createdDocument.getAuthor(),
                        createdDocument.getType(), createdDocument.getName(),
                        createdDocument.getDescription(), createdDocument.getAddressee(),
                        createdDocument.getAttachments())).collect(Collectors.toList());
    }


    @Transactional
    public void update(long id, PutCreatedDocumentDTO putCreatedDocumentDTO) {
        CreatedDocument createdDocument = createdDocumentRepository.findById(id).orElse(null);
        if (createdDocument != null){
            createdDocument.setAddressee(putCreatedDocumentDTO.getAddressee());
            createdDocument.setAttachments(putCreatedDocumentDTO.getAttachments());
            createdDocument.setAuthor(putCreatedDocumentDTO.getAuthor());
            createdDocument.setDescription(putCreatedDocumentDTO.getDescription());
            createdDocument.setName(putCreatedDocumentDTO.getName());
            createdDocument.setType(putCreatedDocumentDTO.getType());
        }
    }

    @Transactional
    public void delete(long id) {
        createdDocumentRepository.deleteById(id);
    }

}

