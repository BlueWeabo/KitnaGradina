package com.blueweabo.kitnaserver.orderedproduct;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class OrderedProductKey implements Serializable {

    @Column(name="order_id")
    private UUID orderId;

    @Column(name="product_id")
    private UUID productId;

    public OrderedProductKey() {}

    public UUID getOrderId() {
        return orderId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public void setProductId(UUID productId) {
        this.productId = productId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((orderId == null) ? 0 : orderId.hashCode());
        result = prime * result + ((productId == null) ? 0 : productId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
        return true;
        if (obj == null)
        return false;
        if (getClass() != obj.getClass())
        return false;
        OrderedProductKey other = (OrderedProductKey) obj;
        if (orderId == null) {
            if (other.orderId != null)
            return false;
        } else if (!orderId.equals(other.orderId))
        return false;
        if (productId == null) {
            if (other.productId != null)
            return false;
        } else if (!productId.equals(other.productId))
        return false;
        return true;
    }

}
