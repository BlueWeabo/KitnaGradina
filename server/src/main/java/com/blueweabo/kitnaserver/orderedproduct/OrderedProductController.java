package com.blueweabo.kitnaserver.orderedproduct;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/orderedproduct")
public class OrderedProductController {

    private final OrderedProductService service;

    public OrderedProductController(OrderedProductService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public OrderedProduct saveOrderedProduct(@RequestBody OrderedProduct orderedproduct) {
        return service.saveOrderedProduct(orderedproduct);
    }

    @GetMapping("/all")
    public List<OrderedProduct> getAllOrderedProducts() {
        return service.getAllOrderedProducts();
    }

    @DeleteMapping("/delete")
    public void deleteOrderedProduct(@RequestBody OrderedProduct orderedproduct) {
        service.deleteOrderedProduct(orderedproduct);
    }
}
