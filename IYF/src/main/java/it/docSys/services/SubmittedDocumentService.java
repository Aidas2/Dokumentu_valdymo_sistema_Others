package it.docSys.services;


import it.docSys.DTO.GetSubmittedDocumentDTO;
import it.docSys.DTO.PutSubmittedDocumentDTO;
import it.docSys.entities.SubmittedDocument;
import it.docSys.repository.SubmittedDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class SubmittedDocumentService {

    @Autowired
    private SubmittedDocumentRepository submittedDocumentRepository;


    public SubmittedDocumentService(SubmittedDocumentRepository submittedDocumentRepository) {
        this.submittedDocumentRepository = submittedDocumentRepository;
    }

    @Transactional
    public void create(PutSubmittedDocumentDTO putSubmittedDocumentDTO) {
        SubmittedDocument submittedDocument = new SubmittedDocument();
        submittedDocument.setAddressee(putSubmittedDocumentDTO.getAddressee());
        submittedDocument.setAttachments(putSubmittedDocumentDTO.getAttachments());
        submittedDocument.setAuthor(putSubmittedDocumentDTO.getAuthor());
        submittedDocument.setDescription(putSubmittedDocumentDTO.getDescription());
        submittedDocument.setName(putSubmittedDocumentDTO.getName());
        submittedDocument.setSubmissionDate(putSubmittedDocumentDTO.getSubmissionDate());
        submittedDocument.setType(putSubmittedDocumentDTO.getType());
        submittedDocumentRepository.save(submittedDocument);
    }


    @Transactional
    public GetSubmittedDocumentDTO get(Long id) {
        SubmittedDocument submittedDocument = submittedDocumentRepository.findById(id).orElse(null);
        if (submittedDocument != null) {
            return new GetSubmittedDocumentDTO(submittedDocument.getId(), submittedDocument.getAuthor(),
                    submittedDocument.getType(), submittedDocument.getName(),
                    submittedDocument.getDescription(), submittedDocument.getSubmissionDate(),
                    submittedDocument.getAddressee(), submittedDocument.getAttachments());
        }
        return null;
    }

    @Transactional
    public List<GetSubmittedDocumentDTO> listAll() {
        return submittedDocumentRepository.findAll().stream().map(submittedDocument ->
                new GetSubmittedDocumentDTO(submittedDocument.getId(), submittedDocument.getAuthor(),
                        submittedDocument.getType(), submittedDocument.getName(),
                        submittedDocument.getDescription(), submittedDocument.getSubmissionDate(),
                        submittedDocument.getAddressee(), submittedDocument.getAttachments())).
                collect(Collectors.toList());
    }


    @Transactional
    public void update(long id, PutSubmittedDocumentDTO putSubmittedDocumentDTO) {
        SubmittedDocument submittedDocument = submittedDocumentRepository.findById(id).orElse(null);
        if (submittedDocument != null){
            submittedDocument.setAddressee(putSubmittedDocumentDTO.getAddressee());
            submittedDocument.setAttachments(putSubmittedDocumentDTO.getAttachments());
            submittedDocument.setAuthor(putSubmittedDocumentDTO.getAuthor());
            submittedDocument.setDescription(putSubmittedDocumentDTO.getDescription());
            submittedDocument.setName(putSubmittedDocumentDTO.getName());
            submittedDocument.setSubmissionDate(putSubmittedDocumentDTO.getSubmissionDate());
            submittedDocument.setType(putSubmittedDocumentDTO.getType());
        }
    }

    @Transactional
    public void delete(long id) {
        submittedDocumentRepository.deleteById(id);
    }

}

