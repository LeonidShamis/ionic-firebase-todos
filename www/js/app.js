// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.factory('Todos', ['$firebaseArray', function($firebaseArray) {
  var todosRef = new Firebase('https://ionic-firebase-todos.firebaseio.com/todos');
  return $firebaseArray(todosRef);
}])

.controller('ListCtrl', function($scope, $ionicListDelegate, Todos) {

  $scope.todos = Todos;

  $scope.addTodo = function() {
    var name = prompt('Please type another TODO item');
    if (name) {
      $scope.todos.$add({
        'name': name
      });
    }
  };

  $scope.completeTodo = function(todo) {
    var todoRef = new Firebase('https://ionic-firebase-todos.firebaseio.com/todos/' + todo.$id);
    todoRef.child('status').set('completed');
    $ionicListDelegate.closeOptionButtons();
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
