package it.akademija.wizards.services.auxiliary;

import it.akademija.wizards.entities.Document;
import it.akademija.wizards.entities.DocumentType;
import it.akademija.wizards.entities.User;
import it.akademija.wizards.exception.model.ResourceNotFoundException;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import it.akademija.wizards.repositories.UserGroupRepository;
import it.akademija.wizards.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResourceFinder {

    @Autowired
    private DocumentRepository documentRepository;
    @Autowired
    private DocumentTypeRepository documentTypeRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserGroupRepository userGroupRepository;

    public User getUser(String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) throw new ResourceNotFoundException("User", "username", username);
        else return user;
    }

    public DocumentType getDocType(String title) throws ResourceNotFoundException {
        DocumentType documentType = documentTypeRepository.findByTitle(title);
        if (documentType == null) throw new ResourceNotFoundException("Document type", "title", title);
        else return documentType;
    }

    public Document getDocument(String id) throws ResourceNotFoundException {
        return documentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Document", "id", id));
    }
}
