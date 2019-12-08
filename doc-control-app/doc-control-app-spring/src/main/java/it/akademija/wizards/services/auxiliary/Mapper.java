package it.akademija.wizards.services.auxiliary;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.enums.DocumentState;
import it.akademija.wizards.models.document.DocumentCreateCommand;
import it.akademija.wizards.models.document.DocumentGetCommand;
import it.akademija.wizards.models.document.DocumentUpdateCommand;
import it.akademija.wizards.models.user.UserGetCommand;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class Mapper {

    @Autowired
    private ResourceFinder resourceFinder;

    public DocumentGetCommand entityToGetCommand(Document document) {
        DocumentGetCommand documentGetCommand = new DocumentGetCommand();
        BeanUtils.copyProperties(document, documentGetCommand);
        UserGetCommand author = this.userEntityToGetCommand(document.getAuthor());
        documentGetCommand.setAuthor(author);
        if (document.getReviewer() != null) {
            UserGetCommand reviewer = this.userEntityToGetCommand(document.getReviewer());
            documentGetCommand.setReviewer(reviewer);
        }
        documentGetCommand.setDocumentTypeTitle(document.getDocumentType().getTitle());
        return documentGetCommand;
    }

    public Document createCommandToEntity(String username, DocumentCreateCommand documentCreateCommand) {
        Document document = new Document();
        DocumentType documentType = resourceFinder.getDocType(documentCreateCommand.getDocumentTypeTitle());
        User author = resourceFinder.getUser(username);
        BeanUtils.copyProperties(documentCreateCommand, document);
        document.setDocumentState(DocumentState.CREATED);
        document.setCreationDate(new Date());
        document.setDocumentType(documentType);
        document.setAuthor(author);
        document.setPrefix();
        return document;
    }

    public Document updateCommandToEntity(DocumentUpdateCommand documentUpdateCommand, Document document) {
        DocumentType documentType = resourceFinder.getDocType(documentUpdateCommand.getDocumentTypeTitle());
        BeanUtils.copyProperties(documentUpdateCommand, document);
        document.setDocumentType(documentType);
        return document;
    }

    public UserGetCommand userEntityToGetCommand(User user) {
        UserGetCommand userGetCommand = new UserGetCommand();
        BeanUtils.copyProperties(user, userGetCommand);
        return userGetCommand;
    }

}
