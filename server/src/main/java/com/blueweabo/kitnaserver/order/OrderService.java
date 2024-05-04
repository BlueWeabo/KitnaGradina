package com.blueweabo.kitnaserver.order;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.blueweabo.kitnaserver.client.Client;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public Order saveOrder(Order order) {
        return repository.save(order);
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public List<Order> getAllOrdersForClient(Client client) {
        return repository.findAllByClient(client);
    }

    public Optional<Order> getOrderById(UUID id) {
        return repository.findById(id);
    }

    public void deleteOrder(Order order) {
        repository.delete(order);
    }
}
