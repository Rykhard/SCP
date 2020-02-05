using Bags from './Bags';
using Id from './Bags';

		entity Laptops {
		    key lpid : Id;
		    bgid : String(4);
		    name : String(100);
		    screen : String(100);
		 		};

		entity Shops {
		    key shid : Id;
		    bgid : String(4);
		    name : String(100);
		    cost : String(100);

    		toBags : association to one Bags on toBags.bgid = bgid;
		};
