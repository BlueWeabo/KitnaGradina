package com.blueweabo.kitnaserver.deliveredproduct;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blueweabo.kitnaserver.order.OrderService;

@RestController
@RequestMapping("api/deliveredproduct")
public class DeliveredProductController {

    private final DeliveredProductService service;

    public DeliveredProductController(DeliveredProductService service, OrderService orderService) {
        this.service = service;
    }

    @PostMapping("/save")
    public DeliveredProduct saveDeliveredProduct(@RequestBody DeliveredProduct deliveredproduct) {
        return service.saveDeliveredProduct(deliveredproduct);
    }

    @GetMapping("/all")
    public List<DeliveredProduct> getAllOrders() {
        return service.getAllDeliveredProducts();
    }

    @DeleteMapping("/delete")
    public void deleteDeliveredProduct(@RequestBody DeliveredProduct deliveredproduct) {
        service.deleteDeliveredProduct(deliveredproduct);
    }
}
