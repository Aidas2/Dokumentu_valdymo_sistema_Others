package it.docSys.services;


import it.docSys.DTO.GetApprovedDocumentDTO;
import it.docSys.DTO.PutApprovedDocumentDTO;
import it.docSys.entities.ApprovedDocument;
import it.docSys.repository.ApprovedDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ApprovedDocumentService {

    @Autowired
    private ApprovedDocumentRepository approvedDocumentRepository;


    public ApprovedDocumentService(ApprovedDocumentRepository approvedDocumentRepository) {
        this.approvedDocumentRepository = approvedDocumentRepository;
    }

    @Transactional
    public void create(PutApprovedDocumentDTO putApprovedDocumentDTO) {
        ApprovedDocument approvedDocument = new ApprovedDocument();
        approvedDocument.setAddressee(putApprovedDocumentDTO.getAddressee());
        approvedDocument.setApprovingDate(putApprovedDocumentDTO.getApprovingDate());
        approvedDocument.setAttachments(putApprovedDocumentDTO.getAttachments());
        approvedDocument.setAuthor(putApprovedDocumentDTO.getAuthor());
        approvedDocument.setDescription(putApprovedDocumentDTO.getDescription());
        approvedDocument.setName(putApprovedDocumentDTO.getName());
        approvedDocument.setSubmissionDate(putApprovedDocumentDTO.getSubmissionDate());
        approvedDocument.setType(putApprovedDocumentDTO.getType());
        approvedDocumentRepository.save(approvedDocument);
    }


    @Transactional
    public GetApprovedDocumentDTO get(Long id) {
        ApprovedDocument approvedDocument = approvedDocumentRepository.findById(id).orElse(null);
        if (approvedDocument != null) {
            return new GetApprovedDocumentDTO(approvedDocument.getId(), approvedDocument.getAuthor(),
                    approvedDocument.getType(), approvedDocument.getName(),
                    approvedDocument.getDescription(), approvedDocument.getSubmissionDate(),
                    approvedDocument.getApprovingDate(), approvedDocument.getAddressee(),
                    approvedDocument.getAttachments());
        }
        return null;
    }

    @Transactional
    public List<GetApprovedDocumentDTO> listAll() {
        return approvedDocumentRepository.findAll().stream().map(approvedDocument ->
                new GetApprovedDocumentDTO(approvedDocument.getId(), approvedDocument.getAuthor(),
                        approvedDocument.getType(), approvedDocument.getName(),
                        approvedDocument.getDescription(), approvedDocument.getSubmissionDate(),
                        approvedDocument.getApprovingDate(), approvedDocument.getAddressee(),
                        approvedDocument.getAttachments())).
                collect(Collectors.toList());
    }


    @Transactional
    public void update(long id, PutApprovedDocumentDTO putApprovedDocumentDTO) {
        ApprovedDocument approvedDocument = approvedDocumentRepository.findById(id).orElse(null);
        if (approvedDocument != null){
            approvedDocument.setAddressee(putApprovedDocumentDTO.getAddressee());
            approvedDocument.setApprovingDate(putApprovedDocumentDTO.getApprovingDate());
            approvedDocument.setAttachments(putApprovedDocumentDTO.getAttachments());
            approvedDocument.setAuthor(putApprovedDocumentDTO.getAuthor());
            approvedDocument.setDescription(putApprovedDocumentDTO.getDescription());
            approvedDocument.setName(putApprovedDocumentDTO.getName());
            approvedDocument.setSubmissionDate(putApprovedDocumentDTO.getSubmissionDate());
            approvedDocument.setType(putApprovedDocumentDTO.getType());
        }
    }

    @Transactional
    public void delete(long id) {
        approvedDocumentRepository.deleteById(id);
    }

}

