(function () {
    'use strict';

    angular
        .module('app')
        .controller('GiftController', GiftController);

    GiftController.$inject = ['UserService','PresenteService', '$rootScope','$location'];
    function GiftController(UserService, PresenteService, $rootScope,$location) {
        var giftcontroller = this;
        var users = [];
		
        giftcontroller.user = null;
        giftcontroller.allPresentes = [];
        giftcontroller.deletePresente = deletePresente;
		giftcontroller.createNewGift = createNewGift;

        initController();

        function initController() {
            loadCurrentUser();
            loadAllPresentes();
        }
		
        function loadCurrentUser() {
            UserService.GetByEmail($rootScope.globals.currentUser.username)
                .then(function (user) {
                    giftcontroller.user = user[0];
                });
        }

		/*
        function loadAllPresentes() {
			
            PresenteService.GetAll()
                .then(function (presentes) {
                    giftcontroller.allPresentes = presentes;
                });
        }
		*/
		
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
		

        function deletePresente(id) {
            PresenteService.Delete(id)
            .then(function () {
                loadAllPresentes();
            });
        }
		
        // callback for ng-click 'createGift':
        function createNewGift() {
            $location.path('/gift-creation');
        };

    }

})();