package it.akademija.service;

import it.akademija.entity.Document;
import it.akademija.entity.User;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class DocumentSpecificationsBuilder {


    private final List<DocumentSearchCriteria> params;

    public DocumentSpecificationsBuilder() {
        params = new ArrayList<>();
    }

    // API

    public final DocumentSpecificationsBuilder with(final String key, final String operation, final Object value, final String prefix, final String suffix) {
        return with(null, key, operation, value, prefix, suffix);
    }

    public final DocumentSpecificationsBuilder with(final String orPredicate, final String key, final String operation, final Object value, final String prefix, final String suffix) {
        SearchOperation op = SearchOperation.getSimpleOperation(operation.charAt(0));
        if (op != null) {
            if (op == SearchOperation.EQUALITY) { // the operation may be complex operation
                final boolean startWithAsterisk = prefix != null && prefix.contains(SearchOperation.ZERO_OR_MORE_REGEX);
                final boolean endWithAsterisk = suffix != null && suffix.contains(SearchOperation.ZERO_OR_MORE_REGEX);

                if (startWithAsterisk && endWithAsterisk) {
                    op = SearchOperation.CONTAINS;
                } else if (startWithAsterisk) {
                    op = SearchOperation.ENDS_WITH;
                } else if (endWithAsterisk) {
                    op = SearchOperation.STARTS_WITH;
                }
            }
            params.add(new DocumentSearchCriteria(orPredicate, key, op, value));
        }
        return this;
    }

    public Specification<Document> build() {
        if (params.size() == 0)
            return null;

        Specification<Document> result = new DocumentSearchSpecification(params.get(0));

        for (int i = 1; i < params.size(); i++) {
            result = params.get(i).isOrPredicate()
                    ? Specification.where(result).or(new DocumentSearchSpecification(params.get(i)))
                    : Specification.where(result).and(new DocumentSearchSpecification(params.get(i)));
        }

        return result;
    }

    public final DocumentSpecificationsBuilder with(DocumentSearchSpecification spec) {
        params.add(spec.getCriteria());
        return this;
    }

    public final DocumentSpecificationsBuilder with(DocumentSearchCriteria criteria) {
        params.add(criteria);
        return this;
    }
}
