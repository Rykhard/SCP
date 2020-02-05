
package com.leverx.sample.repository.bags;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import my.bookshop.Bags;
import my.bookshop.Bags_;
import com.sap.cds.ql.Select;
import com.sap.cds.ql.Update;
import com.sap.cds.ql.cqn.CqnSelect;
import com.sap.cds.ql.cqn.CqnUpdate;
import com.sap.cds.services.persistence.PersistenceService;

@Repository
public class BagsRepositoryImpl implements BagsRepository{
	
	@Autowired
	private PersistenceService persistenceService;
	
	
	@Override
	public Optional<Bags> findById(String id) {
		CqnSelect query = Select.from(Bags_.class).distinct().byId(id);
		return Optional.of(persistenceService.run(query).single().as(Bags.class));
	}

	
	@Override
	public List<Bags> findAll() {
		CqnSelect query = Select.from(Bags_.class);
		return persistenceService.run(query).listOf(Bags.class);
	}
	
	@Override
	public void setSingleAttrById(String id, String prop, Object value) {
		CqnUpdate query = Update.entity(Bags_.class).byId(id).data(prop, value);
		persistenceService.run(query);
	}
	
	@Override
	public List<Bags> getBagsByName(List<String> nameList) {
		CqnSelect query = Select.from(Bags_.class).where(bags -> bags.brand().in(nameList.stream().toArray(String[]::new)));
		return persistenceService.run(query).listOf(Bags.class);
	}
	
	@Override
	public List<Bags> runSelect(CqnSelect query) {
		System.out.println(query);
		System.out.println(persistenceService);
		return persistenceService.run(query).listOf(Bags.class);
	}
	
	
	
}


