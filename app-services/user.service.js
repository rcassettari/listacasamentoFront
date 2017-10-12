(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q','$http'];
    function UserService($timeout, $filter, $q, $http) {    
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByEmail = GetByEmail;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            // ok - https://listacasamentosaasusuariorest.herokuapp.com/usuario/findall/
            
            return $http.get('https://listacasamentosaasusuariorest.herokuapp.com/usuario/findall/').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            // ok - https://listacasamentosaasusuariorest.herokuapp.com/usuario/findId/59c3f5db2bce141b6cce366f/
            
            return $http.get('https://listacasamentosaasusuariorest.herokuapp.com/usuario/findId/' + id + '/').then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByEmail(email) {
            
            // ok - https://listacasamentosaasusuariorest.herokuapp.com/usuario/findbymail/antonio@gmail.com/
            
            return $http.get('https://listacasamentosaasusuariorest.herokuapp.com/usuario/findbymail/' + email + "/").then(handleSuccess, handleError('Error getting user by email'));
        }

        function Create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByEmail(user.email)
                    .then(function (duplicateUser) {
                        if (duplicateUser !== null && duplicateUser.length > 0) {
                            deferred.resolve({ success: false, message: 'Usuário com o e-mail "' + user.email + '" já está em uso' });
                        } else {
                            $http.post('https://listacasamentosaasusuariorest.herokuapp.com/usuario/save/', user).then(handleSuccess, handleError('Error creating user'));
                            
                            deferred.resolve({ success: true });
                        }
                    });
            }, 1000);

            return deferred.promise;
        }
        
        function Update(user) {
            
            // nok - https://listacasamentosaasusuariorest.herokuapp.com/usuario/update/
            // return $http.put('/api/users/' , user).then(handleSuccess, handleError('Error updating user'));
            
            return $http.post('https://listacasamentosaasusuariorest.herokuapp.com/usuario/update/', user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            
            // ok - https://listacasamentosaasusuariorest.herokuapp.com/usuario/delete/59dacbb14b8ef000043a65e5/
            
            return $http.delete('https://listacasamentosaasusuariorest.herokuapp.com/usuario/delete/' + id + "/").then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
