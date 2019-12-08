package it.akademija.service;

import java.util.Optional;
import java.util.Random;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import it.akademija.entity.User;
import it.akademija.repository.UserRepository;
import it.akademija.util.UserTestingUtils;


public class CustomUserDetailsServiceTest {

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @Mock
    private UserRepository userRepository;

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldFailToFindByIdIfNoUserExists() {
        Mockito.when(userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());

        Long randomId = new Random().nextLong();

        expectedException.expect(UsernameNotFoundException.class);
        expectedException.expectMessage("User not found with id : " + randomId);

        customUserDetailsService.loadUserById(randomId);
    }

    @Test
    public void shouldFailToFindByEmailIfNoUserExists() {
        Mockito.when(userRepository.findByEmail(Mockito.anyString())).thenReturn(null);

        String randomEmail = UserTestingUtils.randomEmail();

        expectedException.expect(UsernameNotFoundException.class);
        expectedException.expectMessage("User not found with email : " + randomEmail);

        customUserDetailsService.loadUserByUsername(randomEmail);
    }

    @Test
    public void shouldSucceedIfUserWasFoundById() {
        User existingUser = UserTestingUtils.randomUser();
        Long existingUserId = existingUser.getId();
        Mockito.when(userRepository.findById(existingUserId)).thenReturn(Optional.of(existingUser));

        UserDetails userPrincipal = customUserDetailsService.loadUserById(existingUserId);

        Assert.assertEquals(existingUser.getEmail(), userPrincipal.getUsername());
        Assert.assertEquals(existingUser.getPassword(), userPrincipal.getPassword());
    }

    @Test
    public void shouldSucceedIfUserWasFoundByEmail() {
        User existingUser = UserTestingUtils.randomUser();
        String existingEmail = existingUser.getEmail();
        Mockito.when(userRepository.findByEmail(existingEmail)).thenReturn(existingUser);

        UserDetails userPrincipal = customUserDetailsService.loadUserByUsername(existingEmail);

        Assert.assertEquals(existingUser.getEmail(), userPrincipal.getUsername());
        Assert.assertEquals(existingUser.getPassword(), userPrincipal.getPassword());
    }

}
