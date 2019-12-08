package it.akademija.wizards.services;

import it.akademija.wizards.models.stats.StatsGetTypeCommand;
import it.akademija.wizards.models.stats.StatsGetUserCommand;
import it.akademija.wizards.models.stats.TypeUserStats;
import it.akademija.wizards.repositories.DocumentRepository;
import it.akademija.wizards.repositories.DocumentTypeRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StatsService {

    private DocumentRepository documentRepository;
    private DocumentTypeRepository documentTypeRepository;

    public StatsService(final DocumentRepository documentRepository, final DocumentTypeRepository documentTypeRepository) {
        this.documentRepository = documentRepository;
        this.documentTypeRepository = documentTypeRepository;
    }

    @Transactional
    public List<StatsGetTypeCommand> getDocumentTypesStats(List<String> docTypeList, Date dateFrom, Date dateTo) {
        if (docTypeList == null) {
            throw new NullPointerException("Document Type List Is Not Provided");
        }
        Date startDate = dateFrom == null ? new Date(0) : dateFrom;
        Date endDate = dateTo == null ? new Date() : dateTo;
        return documentRepository.getDocumentTypesStats(docTypeList, startDate, endDate);
    }

    public List<StatsGetUserCommand> getTopSubmittingUsersForDocType(List<String> documentTypes, Integer usersPerType) {
        if (documentTypes == null) {
            throw new NullPointerException("Document types are not provided");
        }
        if (usersPerType == null || usersPerType == 0) {
            throw new NullPointerException("No user per doc type number provided or zero");
        }
        List<StatsGetUserCommand> userPerTypeStats = documentTypes.stream().map(documentTypeId -> {
            Pageable pageable = PageRequest.of(0, usersPerType);
            List<TypeUserStats> topUsers = documentRepository.getTopSubmittingUsersForDocType(documentTypeId, pageable);
            String title = documentTypeRepository.findById(documentTypeId).get().getTitle();
            return new StatsGetUserCommand(title, topUsers);
        }).collect(Collectors.toList());

        return userPerTypeStats;
    }
}
