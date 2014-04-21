var ServicesModule = angular.module('services', []);


ServicesModule.factory('Questions',function() {
	var data = [{
		id: '01',
		title: 'Oldest daughter cast in local TV sitcom The Gellers Wants to be actress?',
		description: "",
		user: "Adam Johnson",
		date: '20-04-2014',
		anwsers: 2,
		categoryIDs: ['01']
	}, {
		id: '02',
		title: 'Why international public opinion did not support the Hungarian Revolution of 1956?',
		description: 'Why why why why ?',
		user: "Tu4n",
		date: '20-04-2014',
		anwsers: 3,
		categoryIDs: ['01','10']
	}, {
		id: '03',
		title: 'How long do you think it would take the average person to be able to learn to draw from a living?',
		description: 'I want to draw good enough that I can make a living from it and Im starting my drawing training today although I have been drawing(hundreds of drawings) since last year but not as serious as Im about to get now as I need to be good enough to make a living at it. Im curious as to what you think about this. Im a young adult by the way.',
		user: "user 3",
		date: '20-04-2014',
		anwsers: 1,
		categoryIDs: ['01']
	}, {
		id: '04',
		title: 'When will be Germany and Austria available in Google Street View?',
		description: 'Almost all others country are already available, but Germany and Austria still not. I dont understand why...:-(',
		user: "Jaloslav",
		date: '20-04-2014',
		anwsers: 4,
		categoryIDs: ['05']
	}, {
		id: '05',
		title: 'Download flappy bird?',
		description: 'Is it still available anywhere? or is it gone forever because I accidentally deleted...',
		user: "Joe",
		date: '20-04-2014',
		anwsers: 2,
		categoryIDs: ['05']
	}, {
		id: '06',
		title: 'How to fix dissapeared text and folders in window 7?',
		description: 'I accedently sitched off my pc directly through ups! after that my pc recoverd automatically! after that i cant see any text under folders and icons in desktop! my start menu dosent open,...',
		user: "cammy",
		date: '20-04-2014',
		anwsers: 7,
		categoryIDs: ['05, 10']
	}, {
		id: '07',
		title: 'What are your top ten Disney movies?',
		description: 'Hi I was thinking \'bout having a Disney movie marathon and I was wondering if you could give me your top ten...',
		user: "Rick",
		date: '20-04-2014',
		anwsers: 2,
		categoryIDs: ['09']
	}, {
		id: '08',
		title: 'Why do we lose our interest for a song?',
		description: 'So i might find a song i love to pieces, and upon hearing it i feel like my life is complete. But after listening to it over and over it gets old and don\'t enjoy it...',
		user: "Nicky",
		date: '20-04-2014',
		anwsers: 0,
		categoryIDs: ['09']
	}, {
		id: '09',
		title: 'Do you know what song this is?',
		description: 'youtube.com/watch?v=HoYA68W0dcY Bum ba la bum - can\'t get it out of my head and need more :3',
		user: "Shao",
		date: '20-04-2014',
		anwsers: 0,
		categoryIDs: ['01']
	}, {
		id: '10',
		title: 'The Walking Dead Comics?',
		description: 'I have read all of The Walking Dead comics online so far. But I want to start getting a copy and reading them.',
		user: "Psycho",
		date: '20-04-2014',
		anwsers: 12,
		categoryIDs: ['05', '10', '09']
	}];
	var Questions = {
		query: function() {
			return data;
		},
		askQuestion: function(question) {
			_.extend(question, {id: data.length + 1, answers: 0});
			return data.push(question); //return the length of data
		}
	}
	return Questions;
});

ServicesModule.factory('Categories', function() {
	var data = {
        	'01': {'id': '01', 'name': 'Arts & Humanities'}, 
        	'02': {'id': '02', 'name': 'Beauty & Style'},
        	'03': {'id': '03', 'name': 'Business & Finance'},
        	'04': {'id': '04', 'name': 'Cars & Transportation'}, 
        	'05': {'id': '05', 'name': 'Computers & Internet'},
        	'06': {'id': '06', 'name': 'Dining Out'},
        	'07': {'id': '07', 'name': 'Consumer Electronics'},
        	'08': {'id': '08', 'name': 'Máy tính và Internet'},
        	'09': {'id': '09', 'name': 'Entertainment & Music'},
        	'10': {'id': '10', 'name': 'Education & Reference'}
       	};
   	var Categories = {
   		query: function() {
   			return data;
   		},
   		getCategoryNameByID: function(id) {
   			return data[id][name];
   		}
   	};
	return Categories;
});