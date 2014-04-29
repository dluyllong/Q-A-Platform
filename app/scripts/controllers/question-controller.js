var QuestionControllers = angular.module('QAP.QuestionControllers', ['QAP.services','QAP.filters','ngCookies','QAP.directives', 'ngRoute']);

// RENDER QUESTION LIST
QuestionControllers.controller('QuestionsListController', function($rootScope, $scope, Questions, Categories, $routeParams, Answers) {
	$scope.showCarousel = true;
	$scope.predicate = 'date';

	if($routeParams.id) {
		$scope.questions = Questions.queryByCategory($routeParams.id);
		$scope.showCarousel = false;
	} else {
		$rootScope.selectedCategory = '-1';
		$scope.questions = Questions.query();
	}

	$scope.featuredQuestions = Questions.getFeaturedQuestions();
	angular.element('#featuredCarousel').carousel({interval: 3000});
	$scope.getPredicate = function(q) {
		return $scope.predicate == 'date' ? q.date : Answers.getAnswersLengthByQuestionId(q.id);
	};
	$scope.changePredicate = function(newPredicate) {
		$scope.predicate = newPredicate;
	};
});

// HANDLE QUESTION ITEM IN LIST
QuestionControllers.controller('QuestionsListItemController', function($scope, Answers, Users, Categories, $rootScope) {
	$scope.answersLength = Answers.getAnswersLengthByQuestionId($scope.question.id);
	$scope.statusLabelClass = $scope.answersLength > 0 ? 'label-success':'label-default';
	$scope.categories = Categories.getCategoriesByIDs($scope.question.categoryIDs);
	$scope.askedUser = Users.getUserById($scope.question.userID);
	$scope.changeCategory = function (id) {
		$rootScope.selectedCategory = id;
	}
});

// CREATE NEW QUESTION
QuestionControllers.controller('AskQuestionController', function($scope, $filter, $location, $rootScope, Questions, Categories, Users) {


	$scope.newQuestion = {
		id: null,
		title: null,
		description: null,
		userID: $rootScope.rootCurrentUser.id,
		date: null,
		categoryIDs: []
	};
	
	$scope.selectedCategories = [];
	$scope.categoryList = Categories.query();

	$scope.selectCategory = function(item) {
		var idx = $scope.selectedCategories.indexOf(item);
		if (idx > -1) {
			$scope.selectedCategories.splice(idx, 1);
	  	} else {
			$scope.selectedCategories.push(item);
	    }
	};
	
	$scope.askQuestion = function () {
		$scope.newQuestion.categoryIDs = $scope.selectedCategories;
		var currentDate = $filter('date')(new Date(), 'yyyy-MM-ddThh:mm:ssZ');
		$scope.newQuestion.date = currentDate;
		Questions.askQuestion($scope.newQuestion);
		Categories.change($scope.newQuestion.categoryIDs);
		$location.path("#/");
	};
});

// QUESTION DETAIL
QuestionControllers.controller('QuestionDetailsController', function($scope, $filter, Questions, Categories, Answers, Users, $routeParams) {
	$scope.questionId = $routeParams.id;
	$scope.question = Questions.getQuestionDetail($scope.questionId);
	$scope.questionOwner = Users.getUserById($scope.question.userID);
	$scope.categories = Categories.getCategoriesByIDs($scope.question.categoryIDs);
	$scope.answersForThis = Answers.getAnswersByQuestionId($scope.questionId);

});

