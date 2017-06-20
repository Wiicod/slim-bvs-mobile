/**
 * Created by Ets Simon on 03/06/2017.
 */
resources

    .factory('Products',function(API){
        return API.service('products');
    })
    .factory('Bills',function(API){
        return API.service('bills');
    })
    .factory('BillProducts',function(API){
        return API.service('bill_products');
    })
    .factory('Categories',function(API){
        return API.service('categories');
    })
    .factory('Customers',function(API){
        return API.service('customers');
    })
    .factory('PaymentMethods',function(API){
        return API.service('paymentmethods');
    })
    .factory('Stocks',function(API){
        return API.service('stocks');
    })
    .factory('DepotSaletypes',function(API){
        return API.service('depot_saletypes');
    })
    .factory('Depots',function(API){
        return API.service('depots');
    })