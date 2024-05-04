package com.blueweabo.kitnaserver.client;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/client")
public class ClientController {

    private final ClientService service;

    @Autowired
    public ClientController(ClientService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public Client saveClient(@RequestBody Client client) {
        return service.saveClient(client);
    }

    @GetMapping("/id/{id}")
    public Optional<Client> getClientById(UUID id) {
        return service.getClientById(id);
    }

    @GetMapping("/all")
    public List<Client> getAllClients() {
        return service.getAllClients();
    }

    @DeleteMapping("/delete")
    public void deleteClient(@RequestBody Client client) {
        service.deleteClient(client);
    }
}
