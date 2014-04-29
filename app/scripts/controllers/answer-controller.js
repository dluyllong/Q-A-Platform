var AnswersControllers = angular.module('QAP.AnswersControllers', ['QAP.services','QAP.filters','ngCookies']);

// ANSWER OF QUESTION DETAIL
AnswersControllers.controller('AnswerItemController', function ($rootScope, $scope, $filter, Answers, Users, $routeParams) {

	$scope.questionId = $routeParams.id;
	$scope.answer = Answers.getAnswerById($scope.questionId, $scope.answer.id);
	$scope.answerUser = Users.getUserById($scope.answer.userID);
	
	$scope.rateAvai = function() {
		var currentUser = $rootScope.rootCurrentUser;

		if (currentUser)
			return $scope.answer.userID != currentUser.id && $scope.answer.ratedBy.indexOf(currentUser.id) < 0;
		return false;
	} 

	// LIKE OR DISLIKE ANSWER
	$scope.rate = function (point) {

		if ( $scope.rateAvai() ) {
			var currentUserId = $rootScope.rootCurrentUser.id;
			Answers.rateAnswer($scope.questionId,$scope.answer.id,point,currentUserId);
			$scope.answerUser.point+=point;
			Users.save();
		}
		return false;
	};
});

// ADD YOUR ANSWER
AnswersControllers.controller('AddAnswerController', function($rootScope, $scope, $filter, Answers, Users, $routeParams) {


	$scope.questionId = $routeParams.id;
	$scope.newAnswerContent = null;
	
	$scope.addAnswer = function () {
		$scope.newAnswer = {
			'id': null,
			'date': null,
			'userID': $rootScope.rootCurrentUser.id,
			'content': null,
			'point': 0,
			'ratedBy': []
		};
		var currentDate = $filter('date')(new Date(), 'yyyy-MM-ddThh:mm:ssZ');
		$scope.newAnswer.date = currentDate;
		$scope.newAnswer.content = $scope.newAnswerContent;
		$scope.newAnswerContent = '';
		Answers.insertAnswer($scope.questionId, $scope.newAnswer);
		return false;
	};
	
	$scope.resetAnswer = function () {
		$scope.newAnswerContent = '';
		return false;
	};

});