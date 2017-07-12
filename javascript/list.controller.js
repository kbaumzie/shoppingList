angular
  .module("shoppingListApp")
  .controller("listCtrl", listCtrl);

function listCtrl() {
  var vm = this;

  var locals = vm.locals = {};
  vm.products = [];
  vm.count = 0;

  vm.addProduct = function (product) {
    var itemNames = [];
    vm.errorText = "";

    // add product names to temporary list to see if item exists
    angular.forEach(vm.products, function (value) {
      this.push(value.name);
    }, itemNames);

    if (itemNames.includes(capitalize(product.name))) {
      vm.errorText = "This item is already in your shopping list.";
    } else {
      if (product.quantity == undefined) { product.quantity = 1; }
      vm.products.push({
        name: capitalize(product.name),
        quantity: product.quantity
      });
      vm.count += product.quantity;

      // clear the form after adding product
      product.name = '';
      product.quantity = '';
    }
  }

  vm.removeItem = function (productIndex) {
    vm.errorText;
    vm.count -= vm.products[productIndex].quantity;
    vm.products.splice(productIndex, 1);
  }

  vm.removeAll = function () {
    vm.products = [];
    vm.count = 0;
  }

  var capitalize = locals.capitalize = function (string) {
    return string.replace(/\w\S*/g, function(newString) {
      return newString.charAt(0).toUpperCase() + newString.substr(1).toLowerCase();
    });
  }
};
