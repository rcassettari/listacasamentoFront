(function () {
    'use strict';

    angular
        .module('app')
        .factory('PresenteService', PresenteService);

    PresenteService.$inject = ['$timeout', '$filter', '$q','$http'];
    function PresenteService($timeout, $filter, $q, $http) {    
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByIdUsuario = GetByIdUsuario;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
			
			// Ok https://listacasamentopresenterest.herokuapp.com/presente/findall/
           
            return $http.get('https://listacasamentopresenterest.herokuapp.com/presente/findall/').then(handleSuccess, handleError('Error getting all gifts'));
        }

        function GetById(id) {
			
			// Ok https://listacasamentopresenterest.herokuapp.com/presente/findId/59c40b392bce140a10731b20/
            
            return $http.get('https://listacasamentopresenterest.herokuapp.com/presente/findId/' + id + '/').then(handleSuccess, handleError('Error getting gift by id'));
        }

        function GetByIdUsuario(idUsuario) {
            
			// Ok https://listacasamentopresenterest.herokuapp.com/presente//findbyusuario/{idUsuario}/
           
            return $http.get('https://listacasamentopresenterest.herokuapp.com/presente/findbyusuario/' + idUsuario + "/").then(handleSuccess, handleError('Error getting gift by idUsuario'));
        }

		function loadAllPresentes() {

            UserService.GetByEmail($rootScope.globals.currentUser.username)
                .then(function (user) {
                    giftcontroller.user = user[0];
					
		            PresenteService.GetByIdUsuario(giftcontroller.user.id)
					.then(function (presentes) {
						giftcontroller.allPresentes = presentes;
					});
					
                });
		
        }
        
        function Create(presente,idUsuario) {

			var dataToSave = {
				descricao: presente.descricao,
				valor: presente.valor,
				linkWeb: presente.linkWeb,
				idUsuario: idUsuario,
				jaGanhei: presente.jaGanhei,
				dataGanhei: presente.dataGanhei,
				nomeComprador: presente.nomeComprador
			};	
		
			// Ok https://listacasamentopresenterest.herokuapp.com/presente/save/
            
            return $http.post('https://listacasamentopresenterest.herokuapp.com/presente/save/', dataToSave).then(handleSuccess, handleError('Error creating gift'));
        }
        
        function Update(presente) {
            
			// Ok https://listacasamentopresenterest.herokuapp.com/presente/update/
            
            return $http.post('https://listacasamentopresenterest.herokuapp.com/presente/update/', presente).then(handleSuccess, handleError('Error updating gift'));
        }

        function Delete(id) {
            
            // ok https://listacasamentopresenterest.herokuapp.com/presente/delete/59dbfe0b522c140004c2a77e/
            
            return $http.delete('https://listacasamentopresenterest.herokuapp.com/presente/delete/' + id + "/").then(handleSuccess, handleError('Error deleting gift'));
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
