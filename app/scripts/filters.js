var filters = angular.module('QAP.filters', []);

filters.filter('truncate', function() {
	return function(input, limit) {
		var finalText = "";
		var words = input.replace(/\s+/g, ' ').split(' ');
		var numberOfWords = words.length;
		var i=0;
		if(numberOfWords > limit)
		{
			for (i=0; i < limit; i++) {
				finalText = finalText+" "+ words[i];
			}
			return finalText+"...";
		}
		else return input;
	}
});

filters.filter('smartDateTime', function($filter) {
	return function (objDate) {
		
		var curDate = new Date(),
			curDay = $filter('date')(curDate, 'yyyy-MM-dd'),
			curTime = $filter('date')(curDate, 'hh:mm'),
			curHour = $filter('date')(curDate, 'hh'),
			curMinutes = $filter('date')(curDate, 'mm'),
			objDay = $filter('date')(objDate, 'yyyy-MM-dd'),
			objTime = $filter('date')(objDate, 'hh:mm'),
			objHour = $filter('date')(objDate, 'hh'),
			objMinutes = $filter('date')(objDate, 'mm');
			
		if ( objDay == curDay ) {
		
			if ( objHour == curHour ) {
				
				if ( objMinutes == curMinutes ) {
				
					return 'a few seconds ago';
				
				}
				
				return 'a few minutes ago';
			}
			
			return 'today ' + objTime;
		}
		
		return $filter('date')(objDate, 'yyyy-MM-dd hh:mm');
		
	};
})