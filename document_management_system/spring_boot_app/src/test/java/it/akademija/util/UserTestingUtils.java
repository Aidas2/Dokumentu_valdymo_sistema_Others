package it.akademija.util;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.payload.RequestUser;
import it.akademija.security.UserPrincipal;

/**
 * Common utils to be used in unit/integration tests
 */
public class UserTestingUtils {

    private static final Random random = new Random();
    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

    private UserTestingUtils() {}

    public static Group randomGroup() {
        Group group = new Group();
        group.setName(RandomStringUtils.randomAlphabetic(5, 10));
        group.setId(random.nextLong());
        return group;
    }

    /**
     * @return {@link User} with generated random name, surname, email, password and admin boolean
     */
    public static User randomUser() {
        String name = RandomStringUtils.randomAlphabetic(10);
        String surname = RandomStringUtils.randomAlphabetic(10);
        String email = randomEmail();
        String password = RandomStringUtils.randomAlphanumeric(8);
        User user = new User(name, surname, email, password, random.nextBoolean());
        user.setId(random.nextLong());

        return user;
    }

    public static UserPrincipal randomUserPrincipal() {
        return UserPrincipal.create(randomUser());
    }

    public static UserPrincipal randomUserPrincipalFrom(String email, String password) {
        User user = randomUser();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        return UserPrincipal.create(user);
    }

    public static String randomEmail() {
        return RandomStringUtils.randomAlphabetic(4) + "@" + RandomStringUtils.randomAlphabetic(4) + ".com";
    }

    public static RequestUser randomUserUpdateRequest(String email) {
        String name = RandomStringUtils.randomAlphabetic(10);
        String surname = RandomStringUtils.randomAlphabetic(10);
        String password = RandomStringUtils.randomAlphanumeric(8);
        RequestUser requestUser = new RequestUser(name, surname, email, null, new Random().nextBoolean());
        requestUser.setPassword(password);
        return requestUser;
    }

    public static RequestUser randomUserCreateRequest() {
        String email = RandomStringUtils.randomAlphabetic(4) + "@" + RandomStringUtils.randomAlphabetic(4) + ".com";
        return randomUserUpdateRequest(email);
    }

    public static boolean usersMatch(User user, UserDTO userDTO) {
        return user.getEmail().equals(userDTO.getEmail()) &&
                user.getName().equals(userDTO.getName()) &&
                user.getSurname().equals(userDTO.getSurname()) &&
                user.getAdmin() == userDTO.getAdmin();
    }

    public static boolean usersMatch(UserPrincipal user, UserDTO userDTO) {
        return user.getEmail().equals(userDTO.getEmail()) &&
                user.getName().equals(userDTO.getName()) &&
                user.getSurname().equals(userDTO.getSurname()) &&
                user.getAdmin() == userDTO.getAdmin();
    }

    public static boolean usersMatch(User user, RequestUser requestUser, String originalEmail) {
        return user.getEmail().equals(originalEmail) &&
                (requestUser.getAdmin() == null || user.getAdmin() == requestUser.getAdmin()) &&
                (StringUtils.isEmpty(requestUser.getName()) || user.getName().equals(requestUser.getName())) &&
                (StringUtils.isEmpty(requestUser.getSurname()) || user.getSurname().equals(requestUser.getSurname())) &&
                (StringUtils.isEmpty(requestUser.getPassword()) || passwordEncoder.matches(requestUser.getPassword(), user.getPassword()));
    }

    public static boolean usersMatch(Collection<User> users, Collection<UserDTO> dtos) {
        return dtos.stream()
                .allMatch(userDTO -> {
                    Optional<User> possibleMatch = users.stream()
                            .filter(user -> user.getEmail().equals(userDTO.getEmail()))
                            .findFirst();

                    if (!possibleMatch.isPresent()) {
                        return false;
                    }
                    User match = possibleMatch.get();

                    return usersMatch(match, userDTO);
                });
    }

    public static boolean usersMatchInOrder(List<User> users, List<UserDTO> dtos) {
        if (users.size() != dtos.size()) {
            return false;
        }

        boolean match = true;
        for (int i=0; i < users.size(); i++) {
            if (!usersMatch(users.get(i), dtos.get(i))) {
                match = false;
            }
        }

        return match;
    }

}
