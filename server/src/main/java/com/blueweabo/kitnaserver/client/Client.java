package com.blueweabo.kitnaserver.client;

import java.util.Set;
import java.util.UUID;

import com.blueweabo.kitnaserver.address.Address;
import com.blueweabo.kitnaserver.clientaddress.ClientAddress;
import com.blueweabo.kitnaserver.order.Order;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "telephone", nullable = false, unique = true)
    private String telephone;

    @Column(name = "notes", nullable = true)
    private String notes;

    @OneToMany(mappedBy = "client")
    private Set<ClientAddress> addresses;

    @OneToMany(mappedBy = "client")
    private Set<Order> orders;

    public Client() {}

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getTelephone() {
        return telephone;
    }

    public Set<ClientAddress> getAddresses() {
        return addresses;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public void setAddresses(Set<ClientAddress> addresses) {
        this.addresses = addresses;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}

