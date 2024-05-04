package com.blueweabo.kitnaserver.address;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.blueweabo.kitnaserver.client.Client;

@Repository
public interface AddressRepository extends JpaRepository<Address, UUID> {

    List<Address> findAllByClients(Client clients);
}
