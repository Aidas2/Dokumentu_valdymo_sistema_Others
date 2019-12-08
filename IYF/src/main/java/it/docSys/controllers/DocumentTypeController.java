package it.docSys.controllers;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import it.docSys.DTO.DocTypeGetDTO;
import it.docSys.DTO.DocTypePutDTO;
import it.docSys.DTO.GetDocumentDTO;
import it.docSys.DTO.GroupGetDTO;
import it.docSys.services.DocTypeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@Api(value = "Document Type Controller")
@RequestMapping(value = "/api/documents/types")
public class DocumentTypeController {

    @Autowired
    private DocTypeService docTypeServ;

    public DocumentTypeController(DocTypeService docTypeServ) {
        this.docTypeServ = docTypeServ;
    }

    private static Logger logger = LoggerFactory.getLogger(DocumentTypeController.class);




    @GetMapping
    @ApiOperation(value = "Get all documentType types")
    public List<DocTypeGetDTO> getAllDocTypes () {
        logger.info("All existing types of documents were found and returned");
        return docTypeServ.getAllDocTypes();
    }



    @GetMapping("/api/documents/types/{id}")
    @ApiOperation(value = "Get document type by id")
    public DocTypeGetDTO getById (
            @ApiParam(value = "id", required = true)
            @PathVariable long id) {
        return docTypeServ.getById(id);
    }



    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @ApiOperation(value = "Create new document type")
    public void saveDocType (@ApiParam(value="Doc type data", required = true)
                                 @RequestBody final DocTypePutDTO putDTO) {
        docTypeServ.createDocType(putDTO);
        logger.info("New type of document was created. New type is {}", putDTO.getTitle());
    }



    @DeleteMapping("/{title}")
    @ApiOperation(value ="Delete documentType type")
    public void deleteDocType(@PathVariable final String title) {
        docTypeServ.deleteDocType(title);
        logger.info("Document type {} was deleted", title);
    }



    @PutMapping ("/{title}")
    @ApiOperation(value = "Update documentType type")
    public void updateDocType (@PathVariable final String title, @RequestBody DocTypePutDTO putDTO) {
        docTypeServ.updateDocType(title, putDTO);
        logger.info("Document type {} was updated", title);
    }


    @GetMapping("/{dt_title}")
    @ApiOperation(value = "Gets all documents assigned to particular document type")
    public List<GetDocumentDTO> documents (@PathVariable final String dt_title) {
        return docTypeServ.getDocuments(dt_title);
    }



    @GetMapping("/{title}/groups")
    @ApiOperation(value = "Get all groups assigned to a particular document type")
    public List<GroupGetDTO> docGroups (@PathVariable final String title) {
        return docTypeServ.getGroupsOfDocType(title);
    }


    @PutMapping ("/{dt_title}/{g_title}")
    @ApiOperation(value = "Assign group to a document type")
    public void asignGroupToDocTypeByTitle(@PathVariable final String dt_title, @PathVariable final String g_title) {
        docTypeServ.assignGroupToDocTypeByTitle(dt_title, g_title);
    }


    @DeleteMapping("/{dt_title}/{g_title}")
    @ApiOperation(value = "Remove group from document type")
    public void deleteGroupFromDocType (@PathVariable final String dt_title, @PathVariable final String g_title) {
        docTypeServ.deleteGroupFromDocType(dt_title, g_title);
    }


}
