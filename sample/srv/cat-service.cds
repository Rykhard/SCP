using my.bookshop as my from '../db/cds/data-model';

service BagsService {
 @Capabilities : {
        Insertable : true,
        Updatable  : true,
        Deletable  : true
    }

 entity Bags as projection on my.Bags

 actions {
          action status(status: Boolean);
        }

 @Capabilities : {
                Insertable : true,
                Updatable  : true,
                Deletable  : true
            }


 entity Shops as projection on my.Shops




 actions {
          function countBags() returns Integer;
        };
 function hasStatusFalse(id: String) returns Boolean;       
 }
 