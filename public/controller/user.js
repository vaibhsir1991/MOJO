var userApp = angular.module("userApp",[])
.run(function($rootScope,$http,$location,$window){

	$rootScope.admin=true;	

});


userApp.controller('userController',function($scope,$rootScope,$filter,$http,$location,$window){

	$scope.submit = function(){
		console.log("THIS IS TEST : " + $scope.starter + $scope.mainCourse);
	}; 

	$scope.getList =  function(){
		$http.get('/api/getList').success(function(data){
			console.log("images" +  data.table[0]);
			$scope.images = data.table;
		});
	};	

	$scope.toggleNav = function(option){

		if(option == 'H'){

			var element = document.getElementById("invlist");
			element.classList.remove("active");

			var element = document.getElementById("home");
			element.classList.add("active");

			$scope.showList = false;	

		}else if(option == 'I'){
			var element = document.getElementById("home");
			element.classList.remove("active");

			var element = document.getElementById("invlist");
			element.classList.add("active");

			$scope.showList = true;

			$http.get('/api/getList').success(function(data){
				console.log("images" +  data.table[0]);
				$scope.images = data.table;
			});
			
		};

		
	};
	
  
});

