package com.blueweabo.kitnaserver.orderedproduct;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class OrderedProductService {

    private final OrderedProductRepository repository;

    public OrderedProductService(OrderedProductRepository repository) {
        this.repository = repository;
    }

    public OrderedProduct saveOrderedProduct(OrderedProduct orderedProduct) {
        return repository.save(orderedProduct);
    }

    public List<OrderedProduct> getAllOrderedProducts() {
        return repository.findAll();
    }

    public void deleteOrderedProduct(OrderedProduct orderedProduct) {
        repository.delete(orderedProduct);
    }
}
