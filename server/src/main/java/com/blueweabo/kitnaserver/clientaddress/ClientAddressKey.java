package com.blueweabo.kitnaserver.clientaddress;

import java.io.Serializable;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class ClientAddressKey implements Serializable {

    @Column(name = "client_id")
    private UUID clientId;

    @Column(name = "address_id")
    private UUID addressId;

    public ClientAddressKey() {}

    public UUID getClientId() {
        return clientId;
    }

    public UUID getAddressId() {
        return addressId;
    }

    public void setClientId(UUID clientId) {
        this.clientId = clientId;
    }

    public void setAddressId(UUID addressId) {
        this.addressId = addressId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((clientId == null) ? 0 : clientId.hashCode());
        result = prime * result + ((addressId == null) ? 0 : addressId.hashCode());
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
        ClientAddressKey other = (ClientAddressKey) obj;
        if (clientId == null) {
            if (other.clientId != null)
                return false;
        } else if (!clientId.equals(other.clientId))
            return false;
        if (addressId == null) {
            if (other.addressId != null)
                return false;
        } else if (!addressId.equals(other.addressId))
            return false;
        return true;
    }

}
