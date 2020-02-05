type Id : String(4);
using Laptops from './BagsInfo';
using Shops from './BagsInfo';

entity Bags {
    key bgid : Id;
    name : String(100);
    color : String(100);
    descr: String(100);

    toLaptops : association to many Laptops on toLaptops.bgid = bgid;
    toShops : association to one Shops on toShops.bgid = bgid;
};
