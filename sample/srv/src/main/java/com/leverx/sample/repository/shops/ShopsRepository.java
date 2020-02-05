package com.leverx.sample.repository.shops;


import java.util.List;
import java.util.Map;

import my.bookshop.Shops;
import my.bookshop.Bags;
import com.leverx.sample.repository.Repository;
import com.sap.cds.ql.cqn.CqnSelect;

public interface ShopsRepository extends Repository<Shops, String> {	


	public void setSingleAttrById(String string, String prop, Object value);
	
	public Shops createShops(Shops shops);


	public List<Bags> getBagsByShopsId(String id);
	
	public Shops runSelectSingle(CqnSelect query);

	public List<Bags> getStatusBag(String Id);

	

	
}
