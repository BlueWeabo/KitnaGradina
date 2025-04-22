package com.blueweabo.kitnaserver.deliveredproduct;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveredProductRepository extends JpaRepository<DeliveredProduct, DeliveredProductKey> {

}
