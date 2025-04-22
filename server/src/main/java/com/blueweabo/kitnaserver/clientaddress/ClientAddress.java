package com.blueweabo.kitnaserver.clientaddress;

import com.blueweabo.kitnaserver.address.Address;
import com.blueweabo.kitnaserver.client.Client;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="client_addresses")
public class ClientAddress {

    @EmbeddedId
    ClientAddressKey id;

    @ManyToOne
    @MapsId("clientId")
    @JoinColumn(name = "client_id")
    @JsonIgnore
    Client client;

    @ManyToOne
    @MapsId("addressId")
    @JoinColumn(name = "address_id")
    Address address;

    public ClientAddress() {}

    public ClientAddressKey getId() {
        return id;
    }

    public Client getClient() {
        return client;
    }

    public Address getAddress() {
        return address;
    }

    public void setId(ClientAddressKey id) {
        this.id = id;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

}
