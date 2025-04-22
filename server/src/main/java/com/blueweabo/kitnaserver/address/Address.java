package com.blueweabo.kitnaserver.address;

import java.util.Set;
import java.util.UUID;

import com.blueweabo.kitnaserver.clientaddress.ClientAddress;
import com.blueweabo.kitnaserver.order.Order;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name="address")
    private String address;

    @OneToMany(mappedBy = "address")
    @JsonIgnore
    private Set<ClientAddress> clients;

    @OneToMany(mappedBy = "address")
    @JsonIgnore
    private Set<Order> orders;

    public Address() {}

    public UUID getId() {
        return id;
    }

    public String getAddress() {
        return address;
    }

    public Set<ClientAddress> getClients() {
        return clients;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setClients(Set<ClientAddress> clients) {
        this.clients = clients;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

}
