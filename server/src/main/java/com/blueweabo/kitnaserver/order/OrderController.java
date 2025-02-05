package com.blueweabo.kitnaserver.order;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import com.blueweabo.kitnaserver.client.Client;

@RestController
@RequestMapping("api/order")
public class OrderController {

    private final OrderService service;

    public OrderController(OrderService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public Order saveOrder(@RequestBody Order order) {
        return service.saveOrder(order);
    }

    @GetMapping("/clientorder")
    public List<Order> getOrdersByClient(@RequestBody Client client) {
        return service.getAllOrdersForClient(client);
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/id/{id}")
    public Optional<Order> getOrderById(@PathVariable("id") UUID id) {
        return service.getOrderById(id);
    }

    @DeleteMapping("/delete")
    public void deleteOrder(@RequestBody Order order) {
        service.deleteOrder(order);
    }
}
