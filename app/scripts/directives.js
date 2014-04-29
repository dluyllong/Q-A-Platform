// var Directives = angular.module('directives', []);

// Directives.directive('myCarousel', function() {
// return {
//   template: '<div></div>',
//   controller: function($scope) {

// }
// });

var Directives = angular.module('QAP.directives', ['QAP.filters']);

Directives.directive('smarttime', [ '$timeout', '$filter', function ($timeout, $filter) {
	return function(scope, element, attrs) {
        var type = attrs.smarttime,
			intervalLength = 1000,
			filter = $filter('smartDateTime');
			
        function updateTime() {
			element.text(filter(scope[type].date));
        }

        function updateLater() {
			timeoutId = $timeout(function() {
				updateTime();
				updateLater();
			}, intervalLength);
        }

        element.bind('$destroy', function() {
			$timeout.cancel(timeoutId);
        });

        updateTime();
        updateLater();
	};
}]);