angular
  .module("shoppingListApp")
  .controller("listCtrl", listCtrl);

function listCtrl($scope) {
  $scope.products = [];
  $scope.list = [];
  $scope.list.count = 0;

  $scope.addProduct = function () {
    var itemNames = [];
    $scope.errorText = "";

    // add product names to temporary list to see if item exists
    angular.forEach($scope.products, function (value) {
      this.push(value.name);
    }, itemNames);

    if (itemNames.includes(capitalize($scope.product.name))) {
      $scope.errorText = "This item is already in your shopping list.";
    } else {
      if ($scope.product.quantity == undefined) { $scope.product.quantity = 1; }
      $scope.products.push({
        name: capitalize($scope.product.name),
        quantity: $scope.product.quantity
      });
      $scope.list.push({ items: $scope.products });
      $scope.list.count += $scope.product.quantity;

      // clear the form after adding product
      $scope.product.name = '';
      $scope.product.quantity = '';
    }
  }

  $scope.removeItem = function (productIndex) {
    $scope.errorText;
    $scope.list.count -= $scope.products[productIndex].quantity;
    $scope.products.splice(productIndex, 1);
  }

  function capitalize(string) {
    return string.replace(/\w\S*/g, function(newString) {
      return newString.charAt(0).toUpperCase() + newString.substr(1).toLowerCase();
    });
  }
};
