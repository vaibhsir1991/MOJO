var userApp = angular.module("userApp",[])
.run(function($rootScope,$http,$location,$window){

	$rootScope.admin=true;	

});


userApp.controller('userController',function($scope,$rootScope,$filter,$http,$location,$window){

	$scope.showList = false;
	$scope.saveData={starter:'',mainCourse:'',date:'',starter_price:'',mainCourse_price:''};	
	$scope.selectedDate="";

	$scope.totalPrice=0;

	/*$scope.showPrice =function(){
		if($scope.starter && $scope.mainCourse)
			var starter = JSON.parse($scope.starter);
			var mainCourse = JSON.parse($scope.mainCourse)

			$scope.totalPrice = parseInt(mainCourse.price) + parseInt(starter.price);
		}
	}	
*/
	$scope.submit = function(){
		var starter = JSON.parse($scope.starter);
		var mainCourse = JSON.parse($scope.mainCourse)

		$scope.saveData.starter=starter.name;
		$scope.saveData.mainCourse=mainCourse.name;
		$scope.saveData.mainCourse_price=mainCourse.price;
		$scope.saveData.starter_price=starter.price;
		var dateStr = $(".modal-title").html()
		$scope.saveData.date=dateStr.substr(7,10);
		
		$http.post('/api/saveData',$scope.saveData).success(function(data){
			if(data.state == "success"){
				$scope.saveData = {};
				$window.alert(data.message);
			}else {
				$window.alert(data.message);
			};
		})
		.error(function(err){
			alert(err);
		});


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

