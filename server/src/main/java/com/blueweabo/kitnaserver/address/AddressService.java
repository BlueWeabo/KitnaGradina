package com.blueweabo.kitnaserver.address;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blueweabo.kitnaserver.client.Client;

@Service
public class AddressService {

    private final AddressRepository repository;

    @Autowired
    public AddressService(AddressRepository repository) {
        this.repository = repository;
    }

    public Address saveAddress(Address address) {
        return repository.save(address);
    }

    public Optional<Address> getAddressById(UUID id) {
        return repository.findById(id);
    }

    public List<Address> getAllAddresses() {
        return repository.findAll();
    }

    public List<Address> getAllAddressesByClient(Client client) {
        return repository.findAllByClients(client);
    }

    public void deleteAddress(Address address) {
        repository.delete(address);
    }
}
