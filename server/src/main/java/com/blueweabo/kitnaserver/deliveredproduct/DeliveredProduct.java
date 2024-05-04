package com.blueweabo.kitnaserver.deliveredproduct;

import com.blueweabo.kitnaserver.order.Order;
import com.blueweabo.kitnaserver.product.Product;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

@Entity
@Table(name = "deliveredProduct")
public class DeliveredProduct {

    @EmbeddedId
    private DeliveredProductKey id;

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(name = "amount", precision = 5)
    private double amount;

    public DeliveredProduct() {}

    public DeliveredProductKey getId() {
        return id;
    }

    public Order getOrder() {
        return order;
    }

    public Product getProduct() {
        return product;
    }

    public double getAmount() {
        return amount;
    }

    public void setId(DeliveredProductKey id) {
        this.id = id;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

}
