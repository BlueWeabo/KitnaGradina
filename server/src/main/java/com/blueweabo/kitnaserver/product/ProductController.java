package com.blueweabo.kitnaserver.product;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("api/product")
public class ProductController {

    private final ProductService service;

    @Autowired
    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping("/save")
    public Product saveProduct(@RequestBody Product product) {
        return service.saveProduct(product);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts()  {
        return service.getAllProducts();
    }

    @GetMapping("/id/{id}")
    public Optional<Product> getProduct(@PathVariable("id") UUID id) {
        return service.getProductById(id);
    }

    @DeleteMapping("/delete")
    public void deleteProduct(@RequestBody Product product) {
        service.deleteProduct(product);
    }
}
