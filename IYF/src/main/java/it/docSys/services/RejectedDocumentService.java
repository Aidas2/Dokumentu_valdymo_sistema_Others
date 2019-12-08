package it.docSys.services;



import it.docSys.DTO.GetRejectedDocumentDTO;
import it.docSys.DTO.PutRejectedDocumentDTO;
import it.docSys.entities.RejectedDocument;
import it.docSys.repository.RejectedDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class RejectedDocumentService {

    @Autowired
    private RejectedDocumentRepository rejectedDocumentRepository;


    public RejectedDocumentService (RejectedDocumentRepository rejectedDocumentRepository) {
        this.rejectedDocumentRepository = rejectedDocumentRepository;
    }

    @Transactional
    public void create(PutRejectedDocumentDTO putRejectedDocumentDTO) {
        RejectedDocument rejectedDocument = new RejectedDocument();
        rejectedDocument.setAddressee(putRejectedDocumentDTO.getAddressee());
        rejectedDocument.setAttachments(putRejectedDocumentDTO.getAttachments());
        rejectedDocument.setAuthor(putRejectedDocumentDTO.getAuthor());
        rejectedDocument.setDescription(putRejectedDocumentDTO.getDescription());
        rejectedDocument.setName(putRejectedDocumentDTO.getName());
        rejectedDocument.setRejectionDate(putRejectedDocumentDTO.getRejectionDate());
        rejectedDocument.setRejectionReason(putRejectedDocumentDTO.getRejectionReason());
        rejectedDocument.setSubmissionDate(putRejectedDocumentDTO.getSubmissionDate());
        rejectedDocument.setType(putRejectedDocumentDTO.getType());
        rejectedDocumentRepository.save(rejectedDocument);
    }


    @Transactional
    public GetRejectedDocumentDTO get(Long id) {
        RejectedDocument rejectedDocument = rejectedDocumentRepository.findById(id).orElse(null);
        if (rejectedDocument != null) {
            return new GetRejectedDocumentDTO(rejectedDocument.getId(), rejectedDocument.getAuthor(),
                    rejectedDocument.getType(), rejectedDocument.getName(),
                    rejectedDocument.getDescription(), rejectedDocument.getSubmissionDate(),
                    rejectedDocument.getRejectionDate(), rejectedDocument.getRejectionReason(),
                    rejectedDocument.getAddressee(), rejectedDocument.getAttachments());
        }
        return null;
    }

    @Transactional
    public List<GetRejectedDocumentDTO> listAll() {
        return rejectedDocumentRepository.findAll().stream().map(rejectedDocument ->
                new GetRejectedDocumentDTO(rejectedDocument.getId(), rejectedDocument.getAuthor(),
                        rejectedDocument.getType(), rejectedDocument.getName(),
                        rejectedDocument.getDescription(), rejectedDocument.getSubmissionDate(),
                        rejectedDocument.getRejectionDate(), rejectedDocument.getRejectionReason(),
                        rejectedDocument.getAddressee(), rejectedDocument.getAttachments())).
                collect(Collectors.toList());
    }


    @Transactional
    public void update(long id, PutRejectedDocumentDTO putRejectedDocumentDTO) {
        RejectedDocument rejectedDocument = rejectedDocumentRepository.findById(id).orElse(null);
        if (rejectedDocument != null){
            rejectedDocument.setAddressee(putRejectedDocumentDTO.getAddressee());
            rejectedDocument.setAttachments(putRejectedDocumentDTO.getAttachments());
            rejectedDocument.setAuthor(putRejectedDocumentDTO.getAuthor());
            rejectedDocument.setDescription(putRejectedDocumentDTO.getDescription());
            rejectedDocument.setName(putRejectedDocumentDTO.getName());
            rejectedDocument.setRejectionDate(putRejectedDocumentDTO.getRejectionDate());
            rejectedDocument.setRejectionReason(putRejectedDocumentDTO.getRejectionReason());
            rejectedDocument.setSubmissionDate(putRejectedDocumentDTO.getSubmissionDate());
            rejectedDocument.setType(putRejectedDocumentDTO.getType());
        }
    }

    @Transactional
    public void delete(long id) {
        rejectedDocumentRepository.deleteById(id);
    }

}

