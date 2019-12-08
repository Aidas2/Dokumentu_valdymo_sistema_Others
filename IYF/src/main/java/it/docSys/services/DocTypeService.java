package it.docSys.services;

import it.docSys.DTO.GetDocumentDTO;
import it.docSys.DTO.GroupGetDTO;
import it.docSys.entities.DocType;
import it.docSys.DTO.DocTypeGetDTO;
import it.docSys.DTO.DocTypePutDTO;
import it.docSys.entities.GroupEntity;
import it.docSys.repository.DocTypeRepo;
import it.docSys.repository.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocTypeService {

    @Autowired
    private DocTypeRepo docTypeRepo;

    @Autowired
    private GroupRepo groupRepo;

    public DocTypeService(DocTypeRepo docTypeRepo, GroupRepo groupRepo) {
        this.docTypeRepo = docTypeRepo;
        this.groupRepo = groupRepo;
    }


    @Transactional(readOnly = true)
    public List<DocTypeGetDTO> getAllDocTypes () {
        return docTypeRepo.findAll().stream().map((doc) ->
                new DocTypeGetDTO (doc.getId(), doc.getTitle())).collect(Collectors.toList());

    }

    @Transactional
    public DocTypeGetDTO getById(Long id) {
        DocType docType = docTypeRepo.getOne(id);
        if (docType != null) {
            return new DocTypeGetDTO(docType.getId(), docType.getTitle());
        }
        return null;
    }



    @Transactional
    public void createDocType (DocTypePutDTO putDTO) {
        DocType docType = new DocType();
        docType.setTitle(putDTO.getTitle());
        docTypeRepo.save(docType);
    }


    @Transactional
    public void deleteDocType(String title) {
        docTypeRepo.deleteByTitle(title);

    }

    @Transactional
    public void updateDocType (String title, DocTypePutDTO putDTO) {
        if (docTypeRepo.existsByTitle(title)) {
            DocType docType = docTypeRepo.getByTitle(title);
            if (docType != null) {
                docType.setTitle(putDTO.getTitle());
            }
        } else return;
    }




    @Transactional
    public List<GetDocumentDTO> getDocuments (String dt_title) {
        DocType docType = docTypeRepo.getByTitle(dt_title);
        if (docType != null) {
            return docType.getDocuments().stream().map(document ->
                    new GetDocumentDTO(document.getId(), document.getAuthor(), document.getType(),
                            document.getTitle(),
                            document.getDescription(),
                            document.getAttachments()
                            , document.getState()
                    )).collect(Collectors.toList());
        }
        return null;
    }


    @Transactional
    public List<GroupGetDTO> getGroupsOfDocType (String title) {
        DocType docType = docTypeRepo.getByTitle(title);
        if (docType != null) {
            return docType.getGroups().stream().map(group ->
                    new GroupGetDTO(group.getId(), group.getTitle())).collect(Collectors.toList());
        }
        return null;
    }



    @Transactional
    public void assignGroupToDocTypeByTitle (String dt_title, String g_title) {
        GroupEntity groupEntity = groupRepo.getByTitle(g_title);
        DocType docType = docTypeRepo.getByTitle(dt_title);
        if (groupEntity != null) {
            groupEntity.getDocTypes().add(docType);
        }
    }


    @Transactional
    public void deleteGroupFromDocType (String dt_title, String g_title) {
        GroupEntity groupEntity = groupRepo.getByTitle(g_title);
        DocType docType = docTypeRepo.getByTitle(dt_title);
        if (groupEntity != null) {
            groupEntity.getDocTypes().remove(docType);
        }
    }



}
