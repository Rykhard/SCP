namespace my.bookshop;



entity Bags {
  key ID : String not null;
  brand  : String not null;
  color  : Integer not null;
  cost   : Integer not null;
  status : Boolean default true;
  shop   : Association to Shops ;
}

entity Shops {
  key ID  : String not null;
  name 	  : String not null;
  address : String not null;
  bags 	  : Association to many Bags on bags.shop = $self;
   }

