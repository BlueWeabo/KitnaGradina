package com.blueweabo.kitnaserver.deliveredproduct;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class DeliveredProductService {

    private final DeliveredProductRepository repository;

    public DeliveredProductService(DeliveredProductRepository repository) {
        this.repository = repository;
    }

    public DeliveredProduct saveDeliveredProduct(DeliveredProduct deliveredProduct) {
        return repository.save(deliveredProduct);
    }

    public List<DeliveredProduct> getAllDeliveredProducts() {
        return repository.findAll();
    }

    public void deleteDeliveredProduct(DeliveredProduct deliveredProduct) {
        repository.delete(deliveredProduct);
    }
}
