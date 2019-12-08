package it.akademija.util;

import java.util.Collection;
import java.util.Random;

import org.apache.commons.lang3.RandomStringUtils;

import it.akademija.dto.TypeDTO;
import it.akademija.entity.Type;

public class TypeTestingUtils {

    private static final Random random = new Random();

    private TypeTestingUtils() {}

    public static Type randomType() {
        Type type = new Type();
        type.setId(random.nextLong());
        type.setTitle(RandomStringUtils.randomAlphabetic(5, 10));
        return type;
    }

    public static boolean typesMatch(Type type, TypeDTO dto) {
        return type.getTitle().equals(dto.getTitle());
    }

    public static boolean typesMatch(Collection<Type> types, Collection<TypeDTO> dtos) {
        return dtos.stream()
                .allMatch(dto -> types.stream()
                        .filter(type -> type.getTitle().equals(dto.getTitle()))
                        .findFirst()
                        .filter(type -> typesMatch(type, dto))
                        .isPresent());
    }

}
