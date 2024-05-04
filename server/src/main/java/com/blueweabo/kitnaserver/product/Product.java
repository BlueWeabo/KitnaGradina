package com.blueweabo.kitnaserver.product;

import java.util.Set;
import java.util.UUID;

import com.blueweabo.kitnaserver.deliveredproduct.DeliveredProduct;
import com.blueweabo.kitnaserver.orderedproduct.OrderedProduct;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name="unit", nullable = false)
    private String unit;

    @Column(name="pricePerUnit", nullable = false, precision = 2 )
    private double pricePerUnit;

    @OneToMany(mappedBy = "product")
    private Set<OrderedProduct> orderedProducts;

    @OneToMany(mappedBy = "product")
    private Set<DeliveredProduct> deliveredProducts;

    public Product() {}

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUnit() {
        return unit;
    }

    public double getPricePerUnit() {
        return pricePerUnit;
    }

    public Set<OrderedProduct> getOrderedProducts() {
        return orderedProducts;
    }

    public Set<DeliveredProduct> getDeliveredProducts() {
        return deliveredProducts;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setPricePerUnit(double pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public void setOrderedProducts(Set<OrderedProduct> orderedProducts) {
        this.orderedProducts = orderedProducts;
    }

    public void setDeliveredProducts(Set<DeliveredProduct> deliveredProducts) {
        this.deliveredProducts = deliveredProducts;
    }

}
