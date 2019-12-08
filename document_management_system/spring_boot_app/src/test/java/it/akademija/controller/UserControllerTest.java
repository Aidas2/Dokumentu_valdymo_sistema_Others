package it.akademija.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletResponse;

import it.akademija.service.UserSpecification;
import org.apache.commons.lang3.RandomStringUtils;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.dto.UserDTO;
import it.akademija.entity.Group;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.RequestUser;
import it.akademija.payload.UserIdentityAvailability;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.PagedUserRepository;
import it.akademija.repository.UserRepository;
import it.akademija.security.UserPrincipal;
import it.akademija.service.UserService;
import it.akademija.util.UserTestingUtils;

// Integration tests for UserController and UserService
@RunWith(SpringRunner.class)
@DataJpaTest
public class UserControllerTest {

    private static final String TEST_GROUP_ONE = "testGroupOne";
    private static final String TEST_GROUP_TWO = "testGroupTwo";

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PagedUserRepository pagedUserRepository;

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private UserService userService;
    private UserController userController;
    private PasswordEncoder passwordEncoder;
    private UserSpecification userSpecification;

    @Before
    public void setUp() {
        userSpecification = new UserSpecification();
        passwordEncoder = new BCryptPasswordEncoder(10);
        userService = new UserService(entityManager, userRepository, documentRepository, groupRepository, pagedUserRepository,
                passwordEncoder, userSpecification);
        userController = new UserController(userService, userRepository);

        // add preexisting user groups
        groupRepository.save(new Group(1L, TEST_GROUP_ONE));
        groupRepository.save(new Group(2L, TEST_GROUP_TWO));
    }

    @Test
    public void shouldFailIfEmailAlreadyTaken() {
        User user = createUser();

        UserIdentityAvailability result = userController.checkEmailAvailability(user.getEmail());
        Assert.assertFalse(result.getAvailable());
    }

    @Test
    public void shouldPassIfEmailNotTaken() {
        String nonExistingEmail = UserTestingUtils.randomEmail();

        UserIdentityAvailability result = userController.checkEmailAvailability(nonExistingEmail);
        Assert.assertTrue(result.getAvailable());
    }

    @Test
    public void shouldFindAllExistingUsers() {
        List<User> existingUsers = createUsers(10);

        List<UserDTO> foundUsers = userController.getAllUsers();
        Assert.assertTrue(foundUsers.size() == 10);

        boolean userMatch = UserTestingUtils.usersMatch(existingUsers, foundUsers);
        Assert.assertTrue(userMatch);
    }

    @Test
    public void shouldReturnAllUserEmails() {
        List<User> existingUsers = createUsers(10);

        List<String> foundEmails = userController.getAllUsersEmails().stream()
                .map(dto -> dto.getEmail())
                .collect(Collectors.toList());
        Assert.assertTrue(foundEmails.size() == 10);

        Assert.assertTrue(existingUsers.stream()
                .allMatch(user -> foundEmails.contains(user.getEmail())));
    }

    @Test
    public void shouldReturnExistingUser() {
        User existingUser = createUser();

        UserDTO userDTO = userController.getUser(existingUser.getEmail());

        Assert.assertTrue(UserTestingUtils.usersMatch(existingUser, userDTO));
    }

    @Test
    public void shouldFailToGetNonExistingUser() {
        String nonExistingEmail = UserTestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + nonExistingEmail + " does not exist!");

        userController.getUser(nonExistingEmail);
    }

    @Test
    public void shouldDeleteExistingUser() {
        User existingUser = createUser();

        userController.deleteUser(existingUser.getEmail());

        existingUser = userRepository.findByEmail(existingUser.getEmail());
        Assert.assertNull(existingUser);
    }

    @Test
    public void shouldFailToDeleteNonExistentUser() {
        String nonExistingEmail = UserTestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + nonExistingEmail + " does not exist!");

        userController.deleteUser(nonExistingEmail);
    }

    @Test
    public void shouldAddExistingGroupToExistingUser() {
        User existingUser = createUser();

        userController.addUserGroup(existingUser.getEmail(), TEST_GROUP_ONE);

        User loadedUser = userRepository.findByEmail(existingUser.getEmail());
        boolean containsGroup = loadedUser.getUserGroups().stream()
                .anyMatch(group -> group.getName().equals(TEST_GROUP_ONE));

        Assert.assertTrue(containsGroup);
    }

    @Test
    public void shouldRemoveExistingGroupFromExistingUser() {
        User user = createUserWithTestGroups();

        userController.removeGroupFromUser(user.getEmail(), TEST_GROUP_ONE);

        Set<Group> userGroups = userRepository.findByEmail(user.getEmail()).getUserGroups();
        Assert.assertThat(userGroups, Matchers.hasSize(1));
        Assert.assertThat(userGroups, Matchers.contains(groupRepository.findByname(TEST_GROUP_TWO)));
    }

    @Test
    public void shouldFailToRemoveGroupWithNullEmail() {
        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("Input of email of group name cannot be null.");

        userController.removeGroupFromUser(null, TEST_GROUP_ONE);
    }

    @Test
    public void shouldFailToRemoveGroupWithNullGroupName() {
        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("Input of email of group name cannot be null.");

        userController.removeGroupFromUser(UserTestingUtils.randomEmail(), null);
    }

    @Test
    public void shouldFailToRemoveExistingGroupFromNonExistingUser() {
        String email = UserTestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + email + " does not exist!");

        userController.removeGroupFromUser(email, TEST_GROUP_ONE);
    }

    @Test
    public void shouldFailToRemoveNonExistingGroupFromExistingUser() {
        User user = createUserWithTestGroups();
        String groupName = RandomStringUtils.randomAlphabetic(5);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("Group with name " + groupName + " does not exist!");

        userController.removeGroupFromUser(user.getEmail(), groupName);
    }

    @Test
    public void shouldFailToRemoveExistingGroupFromExistingUserWithNoGroupsAssigned() {
        User user = createUser();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("the group is not found");

        userController.removeGroupFromUser(user.getEmail(), TEST_GROUP_ONE);
    }

    @Test
    public void shouldFailToAddNonExistingGroupToExistingUser() {
        User existingUser = createUser();
        String nonExistingGroup = "nonExistingGroup";

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("Group with name " + nonExistingGroup + " does not exist!");

        userController.addUserGroup(existingUser.getEmail(), nonExistingGroup);
    }

    @Test
    public void shouldFailToAddExistingGroupToNonExistingUser() {
        String nonExistingEmail = UserTestingUtils.randomEmail();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + nonExistingEmail + " does not exist!");

        userController.addUserGroup(nonExistingEmail, TEST_GROUP_ONE);

    }

    @Test
    public void shouldSuccessfullyEditUser() {
        User existingUser = createUser();
        String email = existingUser.getEmail();

        RequestUser requestUser = UserTestingUtils.randomUserUpdateRequest(email);
        userController.updateUser(requestUser, email);

        User loadedUser = userRepository.findByEmail(email);

        Assert.assertTrue(UserTestingUtils.usersMatch(loadedUser, requestUser, email));
    }

    @Test
    public void shouldFailToEdiNonExistingUser() {
        String email = UserTestingUtils.randomEmail();
        RequestUser requestUser = UserTestingUtils.randomUserUpdateRequest(email);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + email + " does not exist!");

        userController.updateUser(requestUser, email);
    }

    @Test
    public void shouldUpdateOnlyPassedFields() {
        User existingUser = createUser();
        String email = existingUser.getEmail();

        RequestUser requestUser = UserTestingUtils.randomUserUpdateRequest(email);
        // fields not updated
        requestUser.setAdmin(null);
        requestUser.setName(null);

        userController.updateUser(requestUser, email);

        User loadedUser = userRepository.findByEmail(email);

        // fields not updated
        Assert.assertEquals(email, loadedUser.getEmail());
        Assert.assertEquals(existingUser.getAdmin(), loadedUser.getAdmin());
        Assert.assertEquals(existingUser.getName(), loadedUser.getName());
        // check updated fields
        Assert.assertTrue(UserTestingUtils.usersMatch(loadedUser, requestUser, email));
    }

    @Test
    public void shouldReturnPagedUsers() {
        createUsers(20);

        List<User> existingUsers = userRepository.findAll();
        existingUsers.sort(Comparator.comparing(User::getName));

        Page<UserDTO> pageOne = userController.pathParamUsers(PageRequest.of(0, 10, Sort.Direction.ASC, "name"));
        Page<UserDTO> pageTwo = userController.pathParamUsers(PageRequest.of(1, 10, Sort.Direction.ASC, "name"));
        Page<UserDTO> pageThree = userController.pathParamUsers(PageRequest.of(2, 10));

        // there should only be two pages worth of users
        Assert.assertTrue(pageOne.getTotalPages() == 2);
        Assert.assertEquals(pageOne.getTotalPages(), pageTwo.getTotalPages(), pageThree.getTotalPages());
        Assert.assertFalse(pageThree.hasContent());

        List<UserDTO> combinesPagedUsers = new ArrayList<>();
        combinesPagedUsers.addAll(pageOne.getContent());
        combinesPagedUsers.addAll(pageTwo.getContent());

        // make sure correct users are returned in the expected order
        Assert.assertTrue(UserTestingUtils.usersMatchInOrder(existingUsers, combinesPagedUsers));
    }

    @Test
    public void shouldReturnDtoOfCurrentUser() {
        UserPrincipal currentUser = UserTestingUtils.randomUserPrincipal();
        UserDTO currentUserDTO = userController.getCurrentUser(currentUser);

        Assert.assertTrue(UserTestingUtils.usersMatch(currentUser, currentUserDTO));
    }

    @Test
    public void shouldFailIfNoCurrentUserApparent() {
        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("No current user apparent");

        UserDTO currentUserDTO = userController.getCurrentUser(null);
    }

    @Test
    public void shouldDownloadCsvWithAllUsers() throws IOException {
        List<User> existingUsers = createUsers(10);

        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        Mockito.when(response.getWriter()).thenReturn(writer);

        userController.downloadCSV(response);
        writer.flush();

        String csvString = stringWriter.toString();
        assert existingUsers.stream()
                .allMatch(user -> csvString.contains(user.getName() + "," + user.getSurname() + "," + user.getEmail()));
    }

    @Test
    public void shouldDownloadEmptyCsvIfNoUsersPresent() throws IOException {
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        Mockito.when(response.getWriter()).thenReturn(writer);

        userController.downloadCSV(response);
        writer.flush();

        Assert.assertEquals("Name,Surname,Email\r\n", stringWriter.toString());
    }

    @Test
    public void shouldDownloadCsvOfSingleUserData() throws IOException {
        User user = createUserWithTestGroups();

        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);
        Mockito.when(response.getWriter()).thenReturn(writer);

        userController.downloadUserCSV(response, user.getEmail());
        writer.flush();

        String csvString = stringWriter.toString();
        Assert.assertTrue(csvString.contains(user.getName() + "\r\n" + user.getSurname() + "\r\n" + user.getEmail() + "\r\n"));
        Assert.assertTrue(csvString.contains(TEST_GROUP_ONE + "\r\n"));
        Assert.assertTrue(csvString.contains(TEST_GROUP_TWO + "\r\n"));
    }

    @Test
    public void shouldFailToDownloadCsvOfNonExistingUser() throws IOException {
        String email = UserTestingUtils.randomEmail();

        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("User with email " + email + " does not exist!");

        userController.downloadUserCSV(response, email);
    }

    @Test
    public void shouldFailToDownloadUserCsvIfNoEmailProvided() throws IOException {
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        StringWriter stringWriter = new StringWriter();
        PrintWriter writer = new PrintWriter(stringWriter);

        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("Passed email cannot be empty!");

        userController.downloadUserCSV(response, "");
    }

    private List<User> createUsers(int numberOfUsers) {
        List<User> users = new ArrayList<>();
        for (int i = 0; i < numberOfUsers; i++) {
            users.add(userRepository.save(UserTestingUtils.randomUser()));
        }
        return users;
    }

    private User createUser() {
        return userRepository.save(UserTestingUtils.randomUser());
    }

    private User createUserWithTestGroups() {
        User user = UserTestingUtils.randomUser();
        user.addGroup(groupRepository.findByname(TEST_GROUP_ONE));
        user.addGroup(groupRepository.findByname(TEST_GROUP_TWO));
        return userRepository.save(user);
    }

}
