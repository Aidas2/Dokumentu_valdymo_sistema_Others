package it.akademija.service;

import it.akademija.entity.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.ListJoin;

import java.text.SimpleDateFormat;
import java.util.Date;

import static org.springframework.data.jpa.domain.Specification.where;


@Component
public class DocumentAndTypeSpecification  extends BaseSpecification<Document, DocumentListRequest>{

    @Override
    public Specification<Document> getFilter(DocumentListRequest request) {
        return (root, query, cb) -> {
            query.distinct(true); //Important because of the join in the addressAttribute specifications
            return where(
                    where(uniqueNumberContains(request.search))

            )
                    .and(submittedStatusEquals(request.submitted)).or(confirmedStatusEquals(request.confirmed))
                    .toPredicate(root, query, cb);
        };

    }

    private Specification<Document> uniqueNumberContains(String uniqueNumber) {
        return documentAttributeContains("uniqueNumber", uniqueNumber);
    }


    private Specification<Document> documentAttributeContains(String attribute, String value) {
        return (root, query, cb) -> {
            if(value == null) {
                return null;
            }

            return cb.like(
                    cb.lower(root.get(attribute)),
                    containsLowerCase(value)
            );
        };
    }

    private Specification<Document> submittedStatusEquals(boolean submitted ) {
        return addressAttributeContains("submitted", submitted);
    }

    private Specification<Document> confirmedStatusEquals(boolean confirmed) {
        return addressAttributeContains("confirmed", confirmed);
    }

    private Specification<Document> addressAttributeContains(String attribute, boolean value) {
        return (root, query, cb) -> {
            Boolean testvar = null;
            if(testvar == null) {
                return null;
            }
            ListJoin<Document, UserDocument> userDocumentListJoin = root.joinList("userDocuments", JoinType.INNER);
            return cb.isTrue(userDocumentListJoin.get(attribute));
        };
    }
}
