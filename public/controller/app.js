var app = angular.module("mojoApp",['ngRoute','ngAnimate'])
.run(function($rootScope,$http,$location,$window){

	$rootScope.admin=true;	

});

app.config(function($routeProvider){
	$routeProvider

		.when('/',{
			templateUrl: '/html/login.html',
			controller: 'loginController'
		})
		.when('/admin',{
			templateUrl: '/html/admin.html',
			controller: 'adminController'
		});


});

app.directive('slider', function($timeout) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      images: '='
    },
    link: function(scope, elem, attrs) {},
    templateUrl: '/html/admin.html'
  };
});

app.controller('loginController' , function($scope,$rootScope,$filter,$http,$location,$window){

	$scope.username="";
	$scope.password="";

	console.log($scope.repeatDiv);

	$scope.login=function(){

		if($scope.validateCredentials()){
			if($scope.username=="admin" && $scope.password=="admin"){
				$rootScope.admin=true;
				window.location = '#admin';
			}else
			{
				$rootScope.admin=false;
				window.location = 'user.html';
			}
		}else{

			$window.alert("Please enter credentials")
		}
	};

	$scope.validateCredentials = function(){
		if(!$scope.username || !$scope.password){
			return false;
		}else{
			return true;
		}

	};

	
});	

app.controller('adminController' , function($scope,$rootScope,$filter,$http,$location,$window){

	$scope.showDiv=false;
	$scope.repeatDiv = [];
	$scope.admin=$rootScope.admin;
	$scope.inventoryList=[];

	$scope.uploadFiles = function(){

		console.log("IN UPLOAD");
	}

	$scope.setSize =function(){
		$scope.showDiv=true;
		$scope.repeatDiv.length=$scope.arraySize;
	}

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

app.controller('SliderController', function($scope) {
  $scope.images = $rootScope.images;
});

