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

import com.blueweabo.kitnaserver.address.Address;
import com.blueweabo.kitnaserver.address.AddressService;
import com.blueweabo.kitnaserver.clientaddress.ClientAddress;
import com.blueweabo.kitnaserver.clientaddress.ClientAddressKey;
import com.blueweabo.kitnaserver.clientaddress.ClientAddressService;

import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/client")
public class ClientController {

    private final ClientService service;
    private final ClientAddressService caService;
    private final AddressService aService;

    @Autowired
    public ClientController(ClientService service, ClientAddressService caService, AddressService aService) {
        this.service = service;
        this.caService = caService;
        this.aService = aService;
    }

    @PostMapping("/save")
    public Client saveClient(@RequestBody Client client) {
        if (client.getId() != null) {
            Client existing = service.getClientById(client.getId()).get();
            existing.setName(client.getName());;
            existing.setNotes(client.getNotes());
            existing.setTelephone(client.getTelephone());
            for (int i = 0; i < client.getAddresses().size(); i++) {
                ClientAddress clientAddress = client.getAddresses().get(i);
                Address address = aService.getAddressById(clientAddress.getAddress().getId()).get();
                clientAddress.setAddress(address);
                if (existing.getAddresses().size() > i) {
                    ClientAddress existingOP = existing.getAddresses().get(i);
                    caService.deleteClientAddress(existingOP);
                    clientAddress.setClient(existing);
                    clientAddress.setId(new ClientAddressKey());
                    caService.saveClientAddress(clientAddress);
                    existing.getAddresses().set(i, clientAddress);
                    continue;
                }
                clientAddress.setClient(existing);
                clientAddress.setId(new ClientAddressKey());
                ClientAddress savedOP = caService.saveClientAddress(clientAddress);
                existing.getAddresses().add(savedOP);
            }
            return service.saveClient(existing);
        }
        Client orderSaved = service.saveClient(client);
        for (int i = 0; i < client.getAddresses().size(); i++) {
            ClientAddress clientAddress = client.getAddresses().get(i);
            clientAddress.setId(new ClientAddressKey());
            clientAddress.setClient(orderSaved);
            ClientAddress savedOP = caService.saveClientAddress(clientAddress);
            orderSaved.getAddresses().set(i, savedOP);
        }
        return service.saveClient(client);
    }

    @GetMapping("/id/{id}")
    public Optional<Client> getClientById(@PathVariable("id") UUID id) {
        return service.getClientById(id);
    }

    @GetMapping("/all")
    public List<Client> getAllClients() {
        return service.getAllClients();
    }

    @DeleteMapping("/delete")
    public void deleteClient(@RequestBody Client client) {
        Client existing = service.getClientById(client.getId()).get();
        existing.getAddresses().forEach(ca -> caService.deleteClientAddress(ca));
        service.deleteClient(existing);
    }
}
