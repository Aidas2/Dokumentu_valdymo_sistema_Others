package it.akademija.wizards.services;

import it.akademija.wizards.DocApplication;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT, classes= {DocApplication.class})
public class UserServiceTest {
//USEFUL FOR CONTROLLER TESTS
//    private static final String URI = "/users";
//    @Autowired
//    private TestRestTemplate rest;

    @Autowired
    private UserService userService;

    @Ignore
    @Test
    public void shouldCorrectlyCheckIfUserCanSubmitDocuments() {
        boolean isJuliusAllowed = userService.isActionAllowed("julius", "submit");
        boolean isMigleAllowed = userService.isActionAllowed("migle", "submit");
        Assert.assertTrue(isJuliusAllowed);
        Assert.assertTrue(isMigleAllowed);
    }

    @Ignore
    @Test
    public void shouldCorrectlyCheckIfUserCanReviewDocuments() {
        boolean isJuliusAllowed = userService.isActionAllowed("julius", "review");
        boolean isMigleAllowed = userService.isActionAllowed("migle", "review");
        Assert.assertFalse(isJuliusAllowed);
        Assert.assertTrue(isMigleAllowed);
    }
}