package com.blueweabo.kitnaserver.address;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueweabo.kitnaserver.client.Client;

@RestController
@RequestMapping("api/address")
public class AddressController {

    private final AddressService service;

    public AddressController(AddressService service) {
        this.service = service;
    }

    @GetMapping("/id/{id}")
    public Optional<Address> getAddressById(UUID id) {
        return service.getAddressById(id);
    }

    @GetMapping("/all")
    public List<Address> getAllAddresses() {
        return service.getAllAddresses();
    }

    @GetMapping("/allclient")
    public List<Address> getAllAddressesByClient(@RequestBody Client client) {
        return service.getAllAddressesByClient(client);
    }

    @PostMapping("/save")
    public Address saveAddress(@RequestBody Address address) {
        return service.saveAddress(address);
    }

    @DeleteMapping("/delete")
    public void deleteAddress(@RequestBody Address address) {
        service.deleteAddress(address);
    }
}
