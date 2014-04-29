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

Directives.directive('myBackToTop', function() {
    function link(scope, element, attrs) {
    	element.on('click', function() {
		    if(navigator.appName!='Opera'){
		    	$('html, body').animate({ scrollTop: 0 }, 1000)}
	 		else{$('html').animate({ scrollTop: 0 }, 1000)}
	    });
    }
    return {
      link: link
    };
});
window.onscroll = function (event) {
	var heightWindow = $(window).height();
	
	if($(this).scrollTop()>=heightWindow){
      	$('.btn-back-to-top').css('display','inline-block')
    }
	else{
		$('.btn-back-to-top').css('display','none')
	}
}