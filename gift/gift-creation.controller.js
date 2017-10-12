(function () {
    'use strict';

    angular
        .module('app')
        .controller('GiftCreationController', GiftCreationController);

    GiftCreationController.$inject = ['UserService','PresenteService', '$rootScope','$location','$scope'];
    function GiftCreationController(UserService,PresenteService, $rootScope, $location, $scope) {
        var giftcreationcontroller = this;

        giftcreationcontroller.user = null;
        
        giftcreationcontroller.createNewGift = createNewGift;
		
        function createNewGift() {
            
            UserService.GetByEmail($rootScope.globals.currentUser.username)
                .then(function (user) {
                    giftcreationcontroller.user = user[0];
                
                    PresenteService.Create($scope.presente,giftcreationcontroller.user.id);
                
                    $location.path('/gift-list');
					
            });
            
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

    }

})();

