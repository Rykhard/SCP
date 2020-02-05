package com.leverx.sample.handlers;

import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.sap.cds.services.handler.EventHandler;
import com.sap.cds.services.handler.annotations.On;
import com.sap.cds.services.handler.annotations.After;
import com.sap.cds.services.handler.annotations.Before;
import com.sap.cds.services.handler.annotations.ServiceName;
import com.sap.cds.services.ErrorStatuses;
import com.sap.cds.services.ServiceException;
import com.sap.cds.services.EventContext;
import com.sap.cds.services.cds.CdsCreateEventContext;
import com.sap.cds.services.cds.CdsService;
import com.sap.cds.ql.cqn.CqnSelect;

import my.bookshop.Bags;
import my.bookshop.Shops;

import com.leverx.sample.context.BagsShopEventContext;
import com.leverx.sample.context.HasStatusFalseContext;
import com.leverx.sample.service.BagsService;

import bagsservice.BagsService_;
import bagsservice.Bags_;
import bagsservice.Shops_;

@Component
@ServiceName(BagsService_.CDS_NAME)
public class BagsServiceHandler implements EventHandler {
	
	@Autowired
	BagsService bagsService;
	
	@On(event = "status", entity = Bags_.CDS_NAME)
	public void setStatus(EventContext context) {
		bagsService.setBagsStatus((CqnSelect)context.get("cqn"), (boolean)context.get("status"));
		context.setCompleted();
	}
	
	@On(event = "countBags", entity = Shops_.CDS_NAME)
	  public void countBags(BagsShopEventContext context) {
	    int numberOfBags = bagsService.getNumberOfBags((CqnSelect)context.getCqn());
	    context.setResult(numberOfBags);
	    context.setCompleted();
	  }
	  
	  @On(event = "hasStatusFalse")
	  public void hasStatusFalse(HasStatusFalseContext context) {
	    boolean hasStatusFalse = bagsService.hasStatusFalse(context.getShopId());
	    context.setResult(hasStatusFalse);
	    context.setCompleted();
	  }

	
}
