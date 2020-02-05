/*package com.leverx.sample.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import my.bookshop.Bags;
import my.bookshop.Shops;
import com.leverx.sample.repository.shops.ShopsRepositoryImpl;

@RestController
public class ShopsController {
	
	@Autowired
	private ShopsRepositoryImpl shopsRepository;
	
	@PostMapping("/shops")
	public Shops createOwner(@RequestBody Shops shops) {
		return shopsRepository.createShops(shops);
	}
	
	@GetMapping("/shops/{id}/bags")
	public List<Bags> getS(@PathVariable String id) {
		return shopsRepository.getBagsByShopsId(id);
	}
	
	@GetMapping("/shops")
	public List<Shops> getAllShops() {
		return shopsRepository.findAll();
	}
	
}
*/