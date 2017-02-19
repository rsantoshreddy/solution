'use strict';

var app = angular.module('contactsManager', ['contactsManager.directives', 'contactsManager.services', 'ngRoute']
);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/contact', {
        controller: 'ContactListCtrl',
        resolve: {
            contacts: ["ContactlistLoader", function(ContactlistLoader) {
                return ContactlistLoader();
            }]
        },
        templateUrl: '/views/contact-list.html'
    }).when('/contacts/add', {
        controller: 'NewContactCtrl',
        templateUrl: '/views/contact-form.html'
    }).when('/contacts/edit/:id', {
        controller: 'editContactCtrl',
        resolve: {
            contact: ["getContact", "$route", function(getContact, $route) {
                return getContact($route.current.params.id);
            }]
        },
        templateUrl: '/views/contact-form.html'
    }).otherwise({ redirectTo: '/contact' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.controller('ContactListCtrl', ['$scope', '$location', 'deleteContact', 'contacts', function($scope, $location, deleteContact, contacts) {
    $scope.contacts = contacts;
    $scope.deleteContact = function(id) {
        deleteContact(id, function() {
            $location.path('/');
        });
    }
}]);

app.controller('NewContactCtrl', ['$scope', '$location', 'CreateContact', function($scope, $location, CreateContact) {
    // $scope.contacts = contacts;

    $scope.updateForm = false;

    $scope.postForm = {
        name: "",
        email: "",
        tel: ""
    };


    $scope.createContact = function(formData) {
        CreateContact(formData, function() {
            $location.path('/');
        })
    }

}]);

app.controller('editContactCtrl', ['$scope', '$route', '$location', 'contact', 'UpdateContact', function($scope, $route, $location, contact, UpdateContact) {
    var currentUserId = $route.current.params.id;
    $scope.updateForm = true;

    $scope.postForm = contact;



    $scope.createContact = function(formData) {
        UpdateContact(currentUserId, formData, function() {
            $location.path('/');
        })
    }

}]);
