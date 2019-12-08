package it.akademija.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import org.apache.commons.lang3.RandomStringUtils;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.dto.TypeDTO;
import it.akademija.entity.Group;
import it.akademija.entity.Type;
import it.akademija.entity.TypeGroup;
import it.akademija.entity.TypeGroupId;
import it.akademija.entity.User;
import it.akademija.exceptions.ResourceNotFoundException;
import it.akademija.payload.IncomingRequestBody;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.TypeGroupRepository;
import it.akademija.repository.TypeRepository;
import it.akademija.repository.UserRepository;
import it.akademija.service.TypeService;
import it.akademija.util.TypeTestingUtils;
import it.akademija.util.UserTestingUtils;

// Integration tests for TypeController and TypeService
@RunWith(SpringRunner.class)
@DataJpaTest
public class TypeControllerTest {

    private static final Random random = new Random();

    @Autowired
    private TypeRepository typeRepository;

    @Autowired
    private TypeGroupRepository typeGroupRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private UserRepository userRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private TypeService typeService;
    private TypeController typeController;

    @Before
    public void setup() {
        this.typeService = new TypeService(typeRepository, typeGroupRepository, groupRepository);
        this.typeController = new TypeController(typeService);
    }

    @Test
    public void shouldLoadAllTypes() {
        List<Type> preexistingTypes = types(10);
        List<TypeDTO> loadedTypes = typeController.getTypes();

        Assert.assertTrue(TypeTestingUtils.typesMatch(preexistingTypes, loadedTypes));
    }

    @Test
    public void shouldReturnEmptyIfNoTypesExist() {
        List<TypeDTO> loadedTypes = typeController.getTypes();

        Assert.assertThat(loadedTypes, Matchers.hasSize(0));
    }

    @Test
    public void shouldLoadAllTypeGroups() {
        List<Group> preexistingGroups = groupRepository.saveAll(groups(10));
        List<Type> preexistingTypes = typeRepository.saveAll(types(10));
        List<TypeGroup> preexistingManyToMany = typeGroupRepository.saveAll(randomManyToMany(preexistingTypes, preexistingGroups, 3));

        List<TypeGroup> loadedTypeGroups = typeController.getTypesByGroup();

        Assert.assertEquals(new HashSet<>(preexistingManyToMany), new HashSet<>(loadedTypeGroups));
    }

    @Test
    public void shouldReturnEmptyIfTypesNotPairedWithGroups() {
        List<Type> preexistingTypes = typeRepository.saveAll(types(10));

        List<TypeGroup> loadedTypeGroups = typeController.getTypesByGroup();

        Assert.assertThat(loadedTypeGroups, Matchers.hasSize(0));
    }

    @Test
    public void shouldFindTypeByTitle() {
        Type type = createType();

        TypeDTO result = typeController.getType(type.getTitle());

        Assert.assertEquals(type.getTitle(), result.getTitle());
    }

    @Test
    public void shouldFailToFindNonExistingType() {
        String nonExistentTitle = RandomStringUtils.randomAlphabetic(5,8);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such type exists: " + nonExistentTitle);

        typeController.getType(nonExistentTitle);
    }

    @Test
    public void shouldFindTypeGroupByTypeTitle() {
        Type type = createType();
        Group groupOne = createGroup();
        Group groupTwo = createGroup();
        TypeGroup typeGroupOne = createTypeGroup(type, groupOne);
        TypeGroup typeGroupTwo = createTypeGroup(type, groupTwo);

        TypeDTO result = typeController.getTypeGroups(type.getTitle());
        Assert.assertEquals(type.getTitle(), result.getTitle());
        Assert.assertEquals(new HashSet<>(Arrays.asList(typeGroupOne.getPrimaryKey(), typeGroupTwo.getPrimaryKey())),
                result.getTypeGroups().stream().map(TypeGroup::getPrimaryKey).collect(Collectors.toSet()));
    }

    @Test
    public void shouldFailToFindTypeGroupsOfNonExistingType() {
        String nonExistentTitle = RandomStringUtils.randomAlphabetic(5,8);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such type exists: " + nonExistentTitle);

        typeController.getTypeGroups(nonExistentTitle);
    }

    @Test
    public void shouldFailToCreateTypeWithExistingTitle() {
        Type existingType = createType();

        IncomingRequestBody request = new IncomingRequestBody();
        request.setTitle(existingType.getTitle());

        expectedException.expect(IllegalArgumentException.class);
        expectedException.expectMessage("Type already exists");

        typeController.createType(request);
    }

    @Test
    public void shouldCreateNewType() {
        Type type = TypeTestingUtils.randomType();

        IncomingRequestBody request = new IncomingRequestBody();
        request.setTitle(type.getTitle());

        typeController.createType(request);

        Type loadedType = typeRepository.findByTitle(type.getTitle());
        Assert.assertEquals(type.getTitle(), loadedType.getTitle());
    }

    @Test
    public void shouldFailToDeleteNonExistingType() {
        String nonExistentTitle = RandomStringUtils.randomAlphabetic(5,8);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such type exists: " + nonExistentTitle);

        typeController.deleteType(nonExistentTitle);
    }

    @Test
    public void shouldDeleteExistingType() {
        Type type = createType();
        Group groupOne = createGroup();
        Group groupTwo = createGroup();
        TypeGroup typeGroupOne = createTypeGroup(type, groupOne);
        TypeGroup typeGroupTwo = createTypeGroup(type, groupTwo);

        typeController.deleteType(type.getTitle());
        Assert.assertThat(typeRepository.findByTitle(type.getTitle()), Matchers.nullValue());
        // group mapping is gone too
        Assert.assertThat(typeService.getTypes(), Matchers.empty());
    }

    @Test
    public void shouldFailToEditNonExistingType() {
        String nonExistentTitle = RandomStringUtils.randomAlphabetic(5,8);
        IncomingRequestBody request = new IncomingRequestBody();
        request.setTitle(nonExistentTitle);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such type exists: " + nonExistentTitle);

        typeController.updateType(request, nonExistentTitle);
    }

    @Test
    public void shouldUpdateExistingType() {
        Type type = createType();
        IncomingRequestBody request = new IncomingRequestBody();
        request.setTitle(RandomStringUtils.randomAlphabetic(5, 8));

        typeController.updateType(request, type.getTitle());
        List<Type> loadedTypes = typeRepository.findAll();

        Assert.assertThat(loadedTypes, Matchers.hasSize(1));
        Assert.assertEquals(request.getTitle(), loadedTypes.get(0).getTitle());
    }

    @Test
    public void shouldFailToAddExistingGroupToNonExistingType() {
        Group group = createGroup();

        String nonExistingTypeTitle = RandomStringUtils.randomAlphabetic(5,8);
        IncomingRequestBody request = new IncomingRequestBody();
        request.setTitle(nonExistingTypeTitle);
        request.setGroupName(group.getName());

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such type exists: " + nonExistingTypeTitle);

        typeController.addUserGroup(nonExistingTypeTitle, request);
    }

    @Test
    public void shouldFailToAddNonExistingGroupToExistingType() {
        Type type = createType();

        String nonExistingGroupName = RandomStringUtils.randomAlphabetic(5,8);
        IncomingRequestBody request = new IncomingRequestBody();
        request.setTitle(type.getTitle());
        request.setGroupName(nonExistingGroupName);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such group exists: " + nonExistingGroupName);

        typeController.addUserGroup(type.getTitle(), request);
    }

    @Test
    public void shouldAddGroupToType() {
        Type existingType = createType();
        Group existingGroupOne = createGroup();
        Group existingGroupTwo = createGroup();
        TypeGroup existingTypeGroup = createTypeGroup(existingType, existingGroupOne);

        IncomingRequestBody request = new IncomingRequestBody();
        request.setGroupName(existingGroupTwo.getName());

        typeController.addUserGroup(existingType.getTitle(), request);

        Type loadedType = typeRepository.findByTitle(existingType.getTitle());
        Group loadedGroup = groupRepository.findByname(existingGroupOne.getName());
        List<TypeGroup> loadedTypeGroups = typeGroupRepository.findAll();

        // type and group exist
        Assert.assertThat(loadedType, Matchers.notNullValue());
        Assert.assertThat(loadedGroup, Matchers.notNullValue());
        // type <-> group mappings exist
        Assert.assertThat(loadedTypeGroups, Matchers.hasSize(2));
        Assert.assertThat(loadedType.getTypeGroups(), Matchers.hasSize(2));
        Assert.assertThat(loadedGroup.getTypeGroups(), Matchers.hasSize(1));

        // group two mapped to type
        assert loadedGroup.getTypeGroups().get(0).getType().getTitle().equals(existingType.getTitle());

        // previous group mapping still present
        assert loadedType.getTypeGroups().stream()
                .anyMatch(tg -> tg.getPrimaryKey().equals(existingTypeGroup.getPrimaryKey()));
        assert loadedTypeGroups.stream()
                .anyMatch(tg -> tg.getPrimaryKey().equals(existingTypeGroup.getPrimaryKey()));

        // new group mapping present
        assert loadedType.getTypeGroups().stream()
                .anyMatch(tg -> tg.getGroup().getName().equals(existingGroupTwo.getName()));
        assert loadedTypeGroups.stream()
                .anyMatch(tg -> tg.getGroup().getName().equals(existingGroupTwo.getName()));
    }

    @Test
    public void shouldNotAddSameGroupTwice() {
        Type existingType = createType();
        Group existingGroup = createGroup();
        TypeGroup existingTypeGroup = createTypeGroup(existingType, existingGroup);

        IncomingRequestBody request = new IncomingRequestBody();
        request.setGroupName(existingGroup.getName());

        typeController.addUserGroup(existingType.getTitle(), request);

        Type loadedType = typeRepository.findByTitle(existingType.getTitle());
        Group loadedGroup = groupRepository.findByname(existingGroup.getName());
        List<TypeGroup> loadedTypeGroups = typeGroupRepository.findAll();

        // type and group still exist
        Assert.assertThat(loadedType, Matchers.notNullValue());
        Assert.assertThat(loadedGroup, Matchers.notNullValue());

        // same type <-> group mappings exist
        Assert.assertThat(loadedTypeGroups, Matchers.hasSize(1));
        Assert.assertThat(loadedType.getTypeGroups(), Matchers.hasSize(1));
        Assert.assertThat(loadedGroup.getTypeGroups(), Matchers.hasSize(1));
    }

    @Test
    public void shouldRemoveGroupFromType() {
        Type existingType = createType();
        Group existingGroupOne = createGroup();
        Group existingGroupTwo = createGroup();
        TypeGroup existingTypeGroupOne = createTypeGroup(existingType, existingGroupOne);
        TypeGroup existingTypeGroupTwo = createTypeGroup(existingType, existingGroupTwo);

        typeController.removeUserGroup(existingType.getTitle(), existingGroupOne.getName());

        Type loadedType = typeRepository.findByTitle(existingType.getTitle());
        Group loadedGroupOne = groupRepository.findByname(existingGroupOne.getName());
        Group loadedGroupTwo = groupRepository.findByname(existingGroupTwo.getName());
        List<TypeGroup> loadedTypeGroups = typeGroupRepository.findAll();

        // type and group exist
        Assert.assertThat(loadedType, Matchers.notNullValue());
        Assert.assertThat(loadedGroupOne, Matchers.notNullValue());
        // type <-> group mappings adjusted accordingly
        Assert.assertThat(loadedTypeGroups, Matchers.hasSize(1));
        Assert.assertThat(loadedType.getTypeGroups(), Matchers.hasSize(1));
        Assert.assertThat(loadedGroupOne.getTypeGroups(), Matchers.hasSize(0));
        Assert.assertThat(loadedGroupTwo.getTypeGroups(), Matchers.hasSize(1));

        // single existing groupType maps type to group two
        Assert.assertEquals(existingType.getTitle(), loadedTypeGroups.get(0).getType().getTitle());
        Assert.assertEquals(existingGroupTwo.getName(), loadedTypeGroups.get(0).getGroup().getName());
        // type still mapped to group two
        Assert.assertEquals(existingGroupTwo.getName(), loadedType.getTypeGroups().get(0).getGroup().getName());
        // group two still mapped to type
        Assert.assertEquals(existingType.getTitle(), loadedGroupTwo.getTypeGroups().get(0).getType().getTitle());
    }

    @Test
    public void shouldFailToRemoveNonExistentGroupFromExistentType() {
        Type existingType = createType();
        String nonEsistentGroupName = RandomStringUtils.randomAlphabetic(5, 10);

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such group exists: " + nonEsistentGroupName);

        typeController.removeUserGroup(existingType.getTitle(), nonEsistentGroupName);
    }

    @Test
    public void shouldFailToRemoveExsitentGroupFromNonExistentType() {
        String nonExistingTypeTitle = RandomStringUtils.randomAlphabetic(5, 8);
        Group existingGroup = createGroup();

        expectedException.expect(ResourceNotFoundException.class);
        expectedException.expectMessage("No such type exists: " + nonExistingTypeTitle);

        typeController.removeUserGroup(nonExistingTypeTitle, existingGroup.getName());
    }

    private Type createType() {
        return typeRepository.save(TypeTestingUtils.randomType());
    }

    private Group createGroup() {
        return groupRepository.save(UserTestingUtils.randomGroup());
    }

    private TypeGroup createTypeGroup(Type type, Group group) {
        return typeGroupRepository.save(typeGroup(group, type));
    }

    private User createUser(Collection<Group> groups) {
        User user = UserTestingUtils.randomUser();
        user.setUserGroups(new HashSet<>(groups));
        return userRepository.save(user);
    }

    private List<Type> types(int numberOfTypes) {
        List<Type> types = new ArrayList<>();
        for(int i = 0; i < numberOfTypes; i++) {
            types.add(createType());
        }
        return types;
    }

    private List<Group> groups(int numberOfGroups) {
        List<Group> groups = new ArrayList<>();
        for(int i = 0; i < numberOfGroups; i++) {
            groups.add(createGroup());
        }
        return groups;
    }

    // rewrite to generate Map<User, Collection<GroupType>> ???
    private List<User> createUsersWithGroups(int numberOfUsers, List<Group> groups, int groupsPerUser) {
        List<User> users = new ArrayList<>();
        for(int i = 0; i < numberOfUsers; i++) {
            List<Group> randomGroupSubset = random.ints(0, groups.size())
                    .distinct()
                    .limit(groupsPerUser)
                    .mapToObj(groups::get)
                    .collect(Collectors.toList());
            users.add(createUser(randomGroupSubset));
        }
        return users;
    }

    private TypeGroup typeGroup(Group group, Type type) {
        TypeGroup typeGroup = new TypeGroup();
        TypeGroupId typeGroupId = new TypeGroupId();
        typeGroupId.setGroup(group);
        typeGroupId.setType(type);
        typeGroup.setPrimaryKey(typeGroupId);

        List<TypeGroup> temp = group.getTypeGroups();
        temp.add(typeGroup);
        group.setTypeGroups(temp);

        temp = type.getTypeGroups();
        temp.add(typeGroup);
        type.setTypeGroups(temp);

        return typeGroup;
    }

    private List<TypeGroup> randomManyToMany(List<Type> types, List<Group> groups, int mappingSize) {
        return types.stream()
                .flatMap(type -> random.ints(0, groups.size())
                        .distinct()
                        .limit(mappingSize)
                        .mapToObj(groups::get)
                        .map(group -> typeGroup(group, type)))
                .collect(Collectors.toList());
    }

}
