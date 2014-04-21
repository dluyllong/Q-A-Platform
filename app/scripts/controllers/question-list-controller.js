var QuestionControllers = angular.module('QuestionControllers', ['services']);


QuestionControllers.controller('QuestionsListController', function($scope, Questions, $routeParams) {
	if($routeParams.id) {
		console.log($routeParams.id);
		// $scope.questions = Questions.queryByCategory();
	} else {
		$scope.questions = Questions.query();
	}
});


QuestionControllers.controller('AskQuestionController', function($scope, Questions, Categories) {
	$scope.newQuestion = {};
	$scope.selectedCategories = [];
	$scope.categoryList = Categories.query();


	$scope.selectCategory = function(item) {
		var idx = $scope.selectedCategories.indexOf(item);
		 if (idx > -1) {
	      $scope.selectedCategories.splice(idx, 1);
	  	}
	    else {
	      $scope.selectedCategories.push(item);
	    }
	}
	$scope.askQuestion = function() {
		$scope.newQuestion.categories = $scope.selectedCategories;
		$scope.newQuestion.date = "21-04-2014";
		Questions.askQuestion($scope.newQuestion);
	}

	$scope.getCategoryNames = function(ids) {
		var arr = [];
		for (var i = 0; i < ids.length; i ++) {
			arr.push(Categories.getCategoryNameByID(id));
		}
		return arr;
	}
});

QuestionControllers.controller('QuestionDetailsController', function($scope, $routeParams) {
	console.log('QuestionDetailsController');
	$scope.testID = $routeParams.id;
});
