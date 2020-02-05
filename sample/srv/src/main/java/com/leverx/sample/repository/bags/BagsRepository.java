
package com.leverx.sample.repository.bags;

import java.util.List;
import java.util.Optional;
import com.sap.cds.ql.cqn.CqnSelect;

import my.bookshop.Bags;

import com.leverx.sample.repository.Repository;

public interface BagsRepository extends Repository<Bags, String> {

    public void setSingleAttrById(String id, String prop, Object value);

    public List<Bags> getBagsByName(List<String> nameList);

	Optional<Bags> findById(String id);

	public List<Bags> runSelect(CqnSelect query);

}
