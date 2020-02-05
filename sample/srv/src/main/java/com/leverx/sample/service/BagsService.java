package com.leverx.sample.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sap.cds.ql.cqn.CqnSelect;

import my.bookshop.Bags;
import my.bookshop.Shops;
import com.leverx.sample.repository.bags.BagsRepository;
import com.leverx.sample.repository.shops.ShopsRepository;

@Service
public class BagsService {
	
	private static final int RICH_BAGS_COUNT = 4;
	

	
	@Autowired
	BagsRepository bagsRepository;
	
	@Autowired
	ShopsRepository shopsRepository;
	
		public boolean isvalidBrand(Stream<Bags> bags) {
		List<String> brandList = bags.map(Bags :: getBrand).collect(Collectors.toList());
		List<Bags> bagsList = bagsRepository.getBagsByName(brandList);
		boolean validBrand = false;
		if (brandList.isEmpty()) {
			validBrand = true;
		}
		return validBrand;
	}
	
	public void setBagsStatus(CqnSelect query, boolean status) {
		List<Bags> bagsList = bagsRepository.runSelect(query);
		if (!bagsList.isEmpty()) {
			Bags bags = bagsList.get(0);
			bagsRepository.setSingleAttrById(bags.getId(), "status", status);
		}
	}

	public int getNumberOfBags(CqnSelect query) {
	    Shops shops = shopsRepository.runSelectSingle(query);
	    List<Bags> shopsBags = shopsRepository.getBagsByShopsId(shops.getId());
	    return shopsBags.size();
	  }
	  
	  

	public boolean hasStatusFalse(String shopId) {
	
		return !shopsRepository.getStatusBag(shopId).isEmpty();
	}

	
}
