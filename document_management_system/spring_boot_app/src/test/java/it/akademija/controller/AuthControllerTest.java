package it.akademija.controller;

import org.apache.commons.lang3.RandomStringUtils;
import org.hamcrest.Matchers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;

import it.akademija.entity.User;
import it.akademija.payload.ApiResponse;
import it.akademija.payload.JwtAuthenticationResponse;
import it.akademija.payload.LoginRequest;
import it.akademija.payload.RequestUser;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import it.akademija.security.JwtTokenProvider;
import it.akademija.security.UserPrincipal;
import it.akademija.util.UserTestingUtils;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AuthControllerTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Mock
    private Authentication authentication;

    @Mock
    private AuthenticationManager authenticationManager;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private JwtTokenProvider tokenProvider;
    private PasswordEncoder passwordEncoder;

    private AuthController authController;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        tokenProvider = new JwtTokenProvider();
        ReflectionTestUtils.setField(tokenProvider, "jwtSecret", "JWTSuperSecretKey");
        ReflectionTestUtils.setField(tokenProvider, "jwtExpirationInMs", 604800000);
        passwordEncoder = new BCryptPasswordEncoder(10);
        authController = new AuthController(authenticationManager, userRepository, roleRepository, passwordEncoder,
                tokenProvider, groupRepository);
    }

    @Test
    public void shouldAuthenticateExistingUser() {
        LoginRequest login = login();
        mockExistingUser(login);
        ResponseEntity response = authController.authenticateUser(login);

        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());

        // JwtAuthenticationResponse received
        JwtAuthenticationResponse jwtResponse = (JwtAuthenticationResponse) response.getBody();
        Assert.assertThat(jwtResponse, Matchers.notNullValue());
        Assert.assertEquals("Bearer", jwtResponse.getTokenType());

        // check if token validates
        Assert.assertTrue(tokenProvider.validateToken(jwtResponse.getAccessToken()));
    }

    @Test
    public void shouldFailToAuthenticateWithNoUser() {
        LoginRequest login = login();
        mockNonExistingUser(login);

        expectedException.expect(AuthenticationException.class);

        authController.authenticateUser(login);
    }

    @Test
    public void shouldFailToRegisterUserWithTakenEmail() {
        User user = userRepository.save(UserTestingUtils.randomUser());
        RequestUser request = new RequestUser();
        request.setEmail(user.getEmail());

        ResponseEntity response = authController.registerUser(request);

        Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        ApiResponse apiResponse = (ApiResponse) response.getBody();
        Assert.assertThat(apiResponse, Matchers.notNullValue());

        Assert.assertFalse(apiResponse.getSuccess());
        Assert.assertEquals("User email is already taken!", apiResponse.getMessage());
    }

    @Test
    public void shouldFailToRegisterUserWithNonExistentGroup() {
        RequestUser request = UserTestingUtils.randomUserCreateRequest();
        request.setGroupName(RandomStringUtils.randomAlphabetic(5, 8));

        ResponseEntity response = authController.registerUser(request);

        Assert.assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        ApiResponse apiResponse = (ApiResponse) response.getBody();
        Assert.assertThat(apiResponse, Matchers.notNullValue());

        Assert.assertFalse(apiResponse.getSuccess());
        Assert.assertEquals("No such group exists " + request.getGroupName(), apiResponse.getMessage());
    }

    private LoginRequest login() {
        String email = UserTestingUtils.randomEmail();
        String password = RandomStringUtils.randomAlphanumeric(5,8);
        return login(email, password);
    }

    private LoginRequest login(String email, String password) {
        LoginRequest login = new LoginRequest();
        login.setEmail(email);
        login.setPassword(password);
        return login;
    }

    private void mockExistingUser(LoginRequest login) {
        mockExistingUser(login.getEmail(), login.getPassword());
    }

    private void mockNonExistingUser(LoginRequest login) {
        mockNonExistingUser(login.getEmail(), login.getPassword());
    }

    private void mockExistingUser(String email, String password) {
        Mockito.when(authenticationManager.authenticate(Mockito.argThat(a -> a.getPrincipal().equals(email) && a.getCredentials().equals(password))))
                .thenReturn(authentication);
        UserPrincipal userPrincipal = UserTestingUtils.randomUserPrincipalFrom(email, password);
        Mockito.when(authentication.getPrincipal()).thenReturn(userPrincipal);
    }

    private void mockNonExistingUser(String email, String password) {
        Mockito.when(authenticationManager.authenticate(Mockito.argThat(a -> a.getPrincipal().equals(email) && a.getCredentials().equals(password))))
                .thenThrow(new BadCredentialsException("BAD"));
    }

}
