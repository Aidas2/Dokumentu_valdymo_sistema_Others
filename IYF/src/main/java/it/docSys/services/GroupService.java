package it.docSys.services;


import it.docSys.DTO.DocTypeGetDTO;
import it.docSys.entities.GroupEntity;
import it.docSys.DTO.GroupGetDTO;
import it.docSys.DTO.GroupPutDTO;
import it.docSys.repository.DocTypeRepo;
import it.docSys.repository.GroupRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class GroupService {

    @Autowired
    private GroupRepo groupRepo;

    @Autowired
    private DocTypeRepo docTypeRepo;

    public GroupService(GroupRepo groupRepo, DocTypeRepo docTypeRepo) {
        this.groupRepo = groupRepo;
        this.docTypeRepo = docTypeRepo;
    }

    @Transactional
    public List<GroupGetDTO> getAllGroups() {
        return groupRepo.findAll().stream().map(groupEntity ->
                new GroupGetDTO(groupEntity.getId(), groupEntity.getTitle())).collect(Collectors.toList());
    }


    @Transactional
    public GroupGetDTO getGroupById (Long id) {
        GroupEntity group = groupRepo.getOne(id);
        if (group != null) {
            return new GroupGetDTO(group.getId(), group.getTitle());
        }
        return null;
    }


    @Transactional
    public GroupGetDTO getGroupByTitle (String title) {
        GroupEntity group = groupRepo.getByTitle(title);
        if (group != null) {
            return new GroupGetDTO(group.getId(), group.getTitle());
        }
        return null;
    }


    @Transactional
    public void saveGroup (GroupPutDTO putDTO) {
        GroupEntity groupEntity = new GroupEntity();
        groupEntity.setTitle(putDTO.getTitle());
        groupRepo.save(groupEntity);
    }


    @Transactional
    public void deleteGroup(String title) { //kai istrini grupa, neturi dingti juseriai is DB.
        groupRepo.deleteByTitle(title);
    }


    @Transactional
    public void updateGroup(String title, GroupPutDTO putDTO) {
        GroupEntity groupEntity = groupRepo.getByTitle(title);
        if (groupEntity != null) {
            groupEntity.setTitle(putDTO.getTitle());
        }
    }


    @Transactional
    public List<DocTypeGetDTO> getGroupDocTypes (String title) {
        GroupEntity group = groupRepo.getByTitle(title);
        if (group != null) {
            return group.getDocTypes().stream().map(docType ->
                    new DocTypeGetDTO(docType.getId(), docType.getTitle())).collect(Collectors.toList());
        }
        return  null;
    }


}
