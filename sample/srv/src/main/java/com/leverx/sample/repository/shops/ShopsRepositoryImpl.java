package com.leverx.sample.repository.shops;

import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import my.bookshop.Shops;
import my.bookshop.Shops_;
import my.bookshop.Bags;
import my.bookshop.Bags_;
import com.sap.cds.ql.Insert;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnInsert;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpdate;
import com.sap.cds.services.persistence.PersistenceService;

@Repository
public class ShopsRepositoryImpl implements ShopsRepository{

	@Autowired
	private PersistenceService persistenceService;


	@Override
	public Optional<Shops> findById(String id) {
		CqnSelect query = Select.from(Shops_.class).distinct().byId(id);
		return Optional.of(persistenceService.run(query).single().as(Shops.class));
	}

	@Override
	public List<Shops> findAll() {
		CqnSelect query = Select.from(Shops_.class);
		return persistenceService.run(query).listOf(Shops.class);
	}

	@Override
	public List<Bags> getBagsByShopsId(String id) {
		CqnSelect query = Select.from(Bags_.class).where(bags->bags.shop_ID().eq(id));
		return persistenceService.run(query).listOf(Bags.class);
	}

	@Override
	public void setSingleAttrById(String id, String prop, Object value) {
		CqnUpdate query = Update.entity(Shops_.class).byId(id).data(prop, value);
		persistenceService.run(query);
	}

	@Override
	public Shops createShops(Shops shops) {
		CqnInsert query = Insert.into(Shops_.class).entry(shops);
		return persistenceService.run(query).single().as(Shops.class);
	}

	@Override
	public Shops runSelectSingle(CqnSelect query) {
		return persistenceService.run(query).single().as(Shops.class);
	}

	@Override
	public List<Bags> getStatusBag(String Id) {
		CqnSelect query = Select.from(Bags_.class).byId(Id).where(bag -> bag.status().eq(false));
		return persistenceService.run(query).listOf(Bags.class);
	}



}

