package it.akademija.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.io.IOException;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.akademija.dto.GroupDTO;
import it.akademija.payload.RequestGroup;
import it.akademija.service.GroupService;

@RunWith(MockitoJUnitRunner.Silent.class)
public class GroupControllerTest {

    @Mock
    private GroupService service;

    private MockMvc mockMvc;

    @Autowired
    WebApplicationContext webApplicationContext;

    @Spy
    @InjectMocks
    private GroupController controller = new GroupController(service);

    @Before
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    protected String mapToJson(Object obj) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(obj);
    }

    protected <T> T mapFromJson(String json, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, clazz);
    }

    @Test
    public void testGetGroup() {
        GroupDTO group = new GroupDTO();
        group.setName(RequestGroup.class.getName());
        Mockito.when(service.getGroupByName(Mockito.anyString())).thenReturn(group);
        try {
            mockMvc.perform(MockMvcRequestBuilders.get("/api/group/{name}")).andExpect(status().is(200))
                    .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(1L));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Test
    public void testDeleteGroup() {
        GroupDTO groupDTO = new GroupDTO();
        groupDTO.setName("example");
        Mockito.when(service.getGroupByName(Mockito.anyString())).thenReturn(groupDTO);
        Mockito.doNothing().when(service).deleteGroup(Mockito.anyString());
        try {
            mockMvc.perform(MockMvcRequestBuilders.delete("/api/group/{name}")).andExpect(status().is(200));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void testUpdateGroup() {
        GroupDTO group = new GroupDTO();
        group.setName("example");
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        try {
            jsonString = mapper.writeValueAsString(group);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        Mockito.when(service.getGroupByName(Mockito.anyString())).thenReturn(group);
        Mockito.doNothing().when(service).editGroup(Mockito.any(RequestGroup.class), Mockito.anyString());
        try {
            mockMvc.perform(
                    MockMvcRequestBuilders.put("/api/group/{example}/edit").content(jsonString).contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().is(200));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}