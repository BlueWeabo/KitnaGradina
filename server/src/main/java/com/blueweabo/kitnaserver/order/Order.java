package com.blueweabo.kitnaserver.order;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import com.blueweabo.kitnaserver.address.Address;
import com.blueweabo.kitnaserver.client.Client;
import com.blueweabo.kitnaserver.deliveredproduct.DeliveredProduct;
import com.blueweabo.kitnaserver.orderedproduct.OrderedProduct;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name="client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name="address_id", nullable = false)
    private Address address;

    @Column(name="delivery_date")
    private Timestamp deliveryDate;

    @OneToMany(mappedBy = "order")
    private List<OrderedProduct> orderedProducts;

    @OneToMany(mappedBy = "order")
    private List<DeliveredProduct> deliveredProducts;

    private int priority;

    public Order() {}

    public UUID getId() {
        return id;
    }

    public Client getClient() {
        return client;
    }

    public Address getAddress() {
        return address;
    }

    public Timestamp getDeliveryDate() {
        return deliveryDate;
    }

    public List<OrderedProduct> getOrderedProducts() {
        return orderedProducts;
    }

    public List<DeliveredProduct> getDeliveredProducts() {
        return deliveredProducts;
    }

    public int getPriority() {
        return priority;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public void setDeliveryDate(Timestamp deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public void setOrderedProducts(List<OrderedProduct> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }

    public void setDeliveredProducts(List<DeliveredProduct> deliveredProducts) {
        this.deliveredProducts = deliveredProducts;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

}
