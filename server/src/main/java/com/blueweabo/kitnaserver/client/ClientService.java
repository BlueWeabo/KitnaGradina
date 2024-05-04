package com.blueweabo.kitnaserver.client;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    private final ClientRepository repository;

    @Autowired
    public ClientService(ClientRepository repository) {
        this.repository = repository;
    }

    public Client saveClient(Client client) {
        return repository.save(client);
    }

    public Optional<Client> getClientById(UUID id) {
        return repository.findById(id);
    }

    public List<Client> getAllClients() {
        return repository.findAll();
    }

    public void deleteClient(Client client) {
        repository.delete(client);
    }
}
