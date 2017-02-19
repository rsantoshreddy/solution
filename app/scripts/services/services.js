'use strict';

var services = angular.module('contactsManager.services', ['ngResource']);

services.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.actions.update = {
        method: 'PUT'
    };
}]);

services.factory('ContactService', ['$resource',
    function($resource) {
        return $resource('/contacts/:id', { id: '@id' });
    }
]);

services.factory('ContactlistLoader', ['ContactService', '$q',
    function(ContactService, $q) {
        return function() {
            var delay = $q.defer();
            ContactService.query(function(ContactServices) {
                delay.resolve(ContactServices);
            }, function() {
                delay.reject('Unable to fetch ContactServices');
            });
            return delay.promise;
        };
    }
]);


services.factory('CreateContact', ['ContactService',
    function(ContactService) {
        return function(formdata, fn) {
            ContactService.save(formdata, function() {
                fn();
            })
        }
    }
]);

services.factory('deleteContact', ['ContactService',
    function(ContactService) {
        return function(id, fn) {
            ContactService.delete({ id: id }, function(d, e, h) {
                console.log(d, e, h)
                fn();
            })
        }
    }
]);

services.factory('getContact', ["$q", 'ContactService',
    function($q, ContactService) {
        return function(id) {
            var delay = $q.defer();
            ContactService.get({ id: id }, function(contact) {
                delay.resolve(contact);
            }, function() {
                delay.reject('Unable to fetch contact details for userid', id);
            });

            return delay.promise;
        }
    }
]);

services.factory('UpdateContact', ['ContactService',
    function(ContactService) {
        return function(id, formdata, fn) {
            ContactService.update({ id: id }, formdata, function() {
                fn();
            })
        }
    }
]);


// angular.module('contactsManager.services')
//     .factory(ContactService)
//     .factory(ContactlistLoader);

// ContactService.$inject = ['$resource'];

// function ContactService($resource) {
//     console.log($resource);
//     return $resource('/contacts/:id', { id: '@id' });
// }



// ContactlistLoader.$inject = ['$q', 'ContactService'];

// function ContactlistLoader($q, ContactService) {
//     return function() {
//         var defered = $q.defer();
//         console.log(ContactService);
//         window.bb = ContactService;
//         ContactService.query(function(contacts) {
//             defered.resolve(contacts);
//         }, function() {
//             defered.reject('Unable to fetch ContactServices');
//         });
//         return defered.promise;
//     };
// }

// services.factory('ContactService', ['$resource',
//     function($resource) {
//         return $resource('/contacts/:id', { id: '@id' });
//     }
// ]);
// services.factory('ContactServiceLoader', ['ContactService', '$route', '$q',
//     function(ContactService, $route, $q) {
//         return function() {
//             var delay = $q.defer();
//             ContactService.get({ id: $route.current.params.ContactServiceId }, function(ContactService) {
//                 delay.resolve(ContactService);
//             }, function() {
//                 delay.reject('Unable to fetch ContactService ' + $route.current.params.ContactServiceId);
//             });
//             return delay.promise;
//         };
//     }
// ]);
