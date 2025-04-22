package com.blueweabo.kitnaserver.clientaddress;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ClientAddressService {

    private final ClientAddressRepository repository;

    public ClientAddressService(ClientAddressRepository repository) {
        this.repository = repository;
    }

    public ClientAddress saveClientAddress(ClientAddress orderedProduct) {
        return repository.save(orderedProduct);
    }

    public List<ClientAddress> getAllClientAddresses() {
        return repository.findAll();
    }

    public void deleteClientAddress(ClientAddress orderedProduct) {
        repository.delete(orderedProduct);
    }
}
