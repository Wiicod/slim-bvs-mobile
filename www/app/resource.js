/**
 * Created by Ets Simon on 03/06/2017.
 */
resources

    .factory('Bills',function(API){
        return API.service('bills');
    })
    .factory('BillProductSaleTypes',function(API){
        return API.service('bill_product_saletypes');
    })
    .factory('Categories',function(API){
        return API.service('categories');
    })
    .factory('Customers',function(API){
        return API.service('customers');
    })
    .factory('Diaries',function(API){
        return API.service('diaries').withHttpConfig({ cache: true});
    })
    .factory('Depots',function(API){
        return API.service('depots');
    })
    .factory('DepotSaletypes',function(API){
        return API.service('depot_saletypes');
    })
    .factory('PaymentMethods',function(API){
        return API.service('paymentmethods');
    })
    .factory('Products',function(API){
        return API.service('products');
    })
    .factory('SaleTargets',function(API){
        return API.service('saletargets');
    })
    .factory('Stocks',function(API){
        return API.service('stocks');
    })
    .factory('Suggestions',function(API){
        return API.service('suggestions');
    })