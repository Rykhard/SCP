using Bags as _Bags from '../db/Bags';
using Laptops as _Laptops from '../db/BagsInfo';
using Shops as _Shops from '../db/BagsInfo';

service odata {

  entity Bags@(
		title: 'Bags',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Bags;

  entity Laptops@(
		title: 'Laptops',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Laptops;

    entity Shops@(
		title: 'Shops',
		Capabilities: {
			InsertRestrictions: {Insertable: false},
			UpdateRestrictions: {Updatable: false},
			DeleteRestrictions: {Deletable: false}
		}
	) as projection on _Shops;

}
