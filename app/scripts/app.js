var QAP = angular.module('QAP', ['ngRoute', 'QAP.QuestionControllers', 'QAP.AnswersControllers','ngCookies']);

function QAPRouteConfig($routeProvider) {
	$routeProvider
	.when('/', {
		controller: 'QuestionsListController',
		templateUrl: 'views/questions-list.html'
	})
	.when('/category/:id', {
		controller: 'QuestionsListController',
		templateUrl: 'views/questions-list.html'
	})
	.when('/q-details/:id', {
		controller: 'QuestionDetailsController',
		templateUrl: 'views/question-details.html'
	})
	.when('/ask-question', {
		controller: 'AskQuestionController',
		templateUrl: 'views/ask-question.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}

QAP.config(QAPRouteConfig);
QAP.currentUserId = 5;
QAP.cookies = {
	'answers': 'answers',
	'users': 'users',
	'questions': 'questions',
	'categories': 'categories'
};

QAP.controller('MainController', function ($scope, $location, $cookieStore, Questions, Answers, Users, Categories) {
	$scope.askQuestionPath = '#/ask-question';
	$scope.$location = $location;
	$scope.locationPath = $location.path();
	
	// CLEAR ALL COOKIES
	$scope.clearCookies = function () {
		for(var cookie in QAP.cookies) {
			$cookieStore.remove(cookie);
		}
	};
	
	// LOAD COOKIES
	Questions.query();
	Answers.query();
	Users.query();
	Categories.query();
});

QAP.controller('CategoriesListController', function ($scope, Categories, $rootScope) {
    // Category
    $scope.categoryList = Categories.query();


   	$rootScope.selectedCategory = '-1';

   	$scope.selectCategory = function(id) {
   		$rootScope.selectedCategory = id;
   	}
});

QAP.controller('UserController', function ($scope, Users, $rootScope) {
	$scope.currentUser = null;

	$scope.logined = function() {
		$scope.currentUser = Users.getCurrentUser()
		return $scope.currentUser == undefined ? false : true;
	} 
	$scope.logout = function() {
		Users.logout();
	}
});

QAP.controller('LoginController', function($scope, Users, $rootScope) {

	$scope.loginSuccessfull = false;
	$scope.loginClicked = false;
	$scope.loginUser = null;

	$scope.login = function() {
		if ($scope.loginForm.$valid) {
			$scope.loginClicked = true;
			var user = Users.login($scope.loginUser);
			if (user) {			
				$scope.loginSuccessfull = true;
				angular.element('#modal-login').modal('hide');
			} else {
				$scope.loginSuccessfull = false;
			}
		}
	}

});