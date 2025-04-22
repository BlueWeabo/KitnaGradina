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
import com.blueweabo.kitnaserver.deliveredproduct.DeliveredProduct;
import com.blueweabo.kitnaserver.deliveredproduct.DeliveredProductKey;
import com.blueweabo.kitnaserver.deliveredproduct.DeliveredProductService;
import com.blueweabo.kitnaserver.orderedproduct.OrderedProduct;
import com.blueweabo.kitnaserver.orderedproduct.OrderedProductKey;
import com.blueweabo.kitnaserver.orderedproduct.OrderedProductService;
import com.blueweabo.kitnaserver.product.Product;
import com.blueweabo.kitnaserver.product.ProductService;

@RestController
@RequestMapping("api/order")
public class OrderController {

    private final OrderService service;
    private final OrderedProductService orderedPService;
    private final DeliveredProductService deliveredPService;
    private final ProductService pservice;

    public OrderController(OrderService service, OrderedProductService orderedPService, DeliveredProductService deliveredPService, ProductService pservice) {
        this.service = service;
        this.orderedPService = orderedPService;
        this.deliveredPService = deliveredPService;
        this.pservice = pservice;
    }

    @PostMapping("/save")
    public Order saveOrder(@RequestBody Order order) {
        if (order.getId() != null) {
            Order existing = service.getOrderById(order.getId()).get();
            existing.setClient(order.getClient());
            existing.setAddress(order.getAddress());
            existing.setDeliveryDate(order.getDeliveryDate());
            for (int i = 0; i < order.getOrderedProducts().size(); i++) {
                OrderedProduct orderedP = order.getOrderedProducts().get(i);
                Product product = pservice.getProductById(orderedP.getProduct().getId()).get();
                orderedP.setProduct(product);
                if (existing.getOrderedProducts().size() > i) {
                    OrderedProduct existingOP = existing.getOrderedProducts().get(i);
                    orderedPService.deleteOrderedProduct(existingOP);
                    orderedP.setOrder(existing);
                    orderedP.setId(new OrderedProductKey());
                    orderedPService.saveOrderedProduct(orderedP);
                    existing.getOrderedProducts().set(i, orderedP);
                    continue;
                }
                orderedP.setOrder(existing);
                orderedP.setId(new OrderedProductKey());
                OrderedProduct savedOP = orderedPService.saveOrderedProduct(orderedP);
                existing.getOrderedProducts().add(savedOP);
            }
            for (int i = 0; i < order.getDeliveredProducts().size(); i++) {
                DeliveredProduct deliveredP = order.getDeliveredProducts().get(i);
                Product product = pservice.getProductById(deliveredP.getProduct().getId()).get();
                deliveredP.setProduct(product);
                if (existing.getDeliveredProducts().size() > i) {
                    DeliveredProduct existingDP = existing.getDeliveredProducts().get(i);
                    deliveredPService.deleteDeliveredProduct(existingDP);
                    deliveredP.setOrder(existing);
                    deliveredP.setId(new DeliveredProductKey());
                    deliveredPService.saveDeliveredProduct(deliveredP);
                    existing.getDeliveredProducts().set(i, deliveredP);
                    continue;
                }
                deliveredP.setOrder(existing);
                deliveredP.setId(new DeliveredProductKey());
                DeliveredProduct savedDP = deliveredPService.saveDeliveredProduct(deliveredP);
                existing.getDeliveredProducts().add(savedDP);
            }
            return service.saveOrder(existing);
        }
        Order orderSaved = service.saveOrder(order);
        for (int i = 0; i < order.getOrderedProducts().size(); i++) {
            OrderedProduct orderedP = order.getOrderedProducts().get(i);
            orderedP.setId(new OrderedProductKey());
            orderedP.setOrder(orderSaved);
            OrderedProduct savedOP = orderedPService.saveOrderedProduct(orderedP);
            orderSaved.getOrderedProducts().set(i, savedOP);
        }
        for (int i = 0; i < order.getDeliveredProducts().size(); i++) {
            DeliveredProduct deliveredP = order.getDeliveredProducts().get(i);
            deliveredP.setId(new DeliveredProductKey());
            deliveredP.setOrder(orderSaved);
            DeliveredProduct savedDP = deliveredPService.saveDeliveredProduct(deliveredP);
            orderSaved.getDeliveredProducts().set(i, savedDP);
        }
        return service.saveOrder(orderSaved);
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
        Order existing = service.getOrderById(order.getId()).get();
        existing.getDeliveredProducts().forEach(dp -> deliveredPService.deleteDeliveredProduct(dp));
        existing.getOrderedProducts().forEach(op -> orderedPService.deleteOrderedProduct(op));
        service.deleteOrder(existing);
    }
}
