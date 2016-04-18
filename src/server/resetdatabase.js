var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = 'scrumspace';
// Put the initial mock objects here.
const xDaysAgoInUnixTime = (x) => {
	return Date.now() - 1000* 60 * 60 * 24 * x;
};

var initialData = {

	users: {
		0: {
      '_id': new ObjectID('000000000000000000000000'),
			'first_name': 'John',
			'last_name': 'Vilk',
			'email': 'jvilk@umass.edu',
			'display_name': 'VilkBot',
			'password': 'catinthehat',
			'avatar_url': 'https://avatars0.githubusercontent.com/u/1141042?v=3&s=460'
		},
		1: {
			'_id': new ObjectID('000000000000000000000001'),
			'first_name': 'Abhay',
			'last_name': 'Vatsa',
			'email': 'someemail',
			'display_name': 'Abhay Vatsa',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://www.abhayvatsa.com/img/abhay.png'
		},
		2: {
			'_id': new ObjectID('000000000000000000000002'),
			'first_name': 'Dylan',
			'last_name': 'Fischler',
			'email': 'dylanfischler@gmail.com',
			'display_name': 'Dylan Fischler',
			'password': 'password',
			'avatar_url': 'http://www.dylanfischler.com/includes/me_bw.jpg'
		},
		3: {
			'_id': new ObjectID('000000000000000000000003'),
			'first_name': 'Niha',
			'last_name': 'Venkatathri',
			'email': 'someemail',
			'display_name': 'Niha Venkatathri',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://umasscswomen.weebly.com/uploads/3/8/0/8/38087803/3410479.jpg?153'
		},
		4: {
			'_id': new ObjectID('000000000000000000000004'),
			'first_name': 'Ryan',
			'last_name': 'Jerue',
			'email': 'ryan@ryan.com',
			'display_name': 'Ryan Jerue',
			'password': 'ryan',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa7AAAAJGQ2NjlmY2MzLTgzYjctNGRhYy05ZmY2LTkxOGE3Mzg2NWU2MA.jpg'
		},
		5: {
			'_id': new ObjectID('000000000000000000000005'),
			'first_name': 'Supriya',
			'last_name': 'Kankure',
			'email': 'someemail',
			'display_name': 'Supriya Kankure',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa1AAAAJDRjMTU3ZTA2LTFkMTEtNDM1MS04YjQ0LWI0YzRlOTExODQ3NA.jpg'
		},
		6: {
			'_id': new ObjectID('000000000000000000000006'),
			'first_name': 'Rachana',
			'last_name': 'Lingutla',
			'email': 'someemail',
			'display_name': 'Rachana Lingutla',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://avatars.slack-edge.com/2016-02-07/20575719908_a1012b8fe4efe81099c3_72.png'
		}
	},
	'sprints': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			'name': 'V1 Release',
			'start_date':null,
			'duration': 14,
			'scrum_time': '09:00'
			// 'project_id': new ObjectID('000000000000000000000000')
		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			'name': 'V2 Release',
			'duration': 7,
			'start_date': null,
			'scrum_time': '09:00'
			// 'project_id': new ObjectID('000000000000000000000000')
		}
	],
	'tasks': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			// 'project_id': new ObjectID('000000000000000000000000'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [new ObjectID('000000000000000000000000'),new ObjectID('000000000000000000000001')],
			'description': 'Find a Designer',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			// 'project_id': new ObjectID('000000000000000000000000'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Make Mexico pay for it',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000002'),
			// 'project_id': new ObjectID('000000000000000000000000'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [new ObjectID('000000000000000000000000')],
			'description': 'Make Donald Drumpf again',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000003'),
			// 'project_id': new ObjectID('000000000000000000000000'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [],
			'description': 'Replace Donald\'s Toupee',
			'history': [],
			'attachments': null
		},
		{
			'_id': new ObjectID('000000000000000000000004'),
			// 'project_id': new ObjectID('000000000000000000000000'),
			'status': 'UNASSIGNED',
			'blocked_by': [],
			'assigned_to': [new ObjectID('000000000000000000000000')],
			'description': 'Beat hilldawg',
			'history': [],
			'attachments': null
		}
	],
	'stories': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			'title': 'Buy Hats',
			'description': 'Design Hats \nOrder Hats\nSell Hats',
			'sprint_id': new ObjectID('000000000000000000000000'),
			'tasks': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001'), new ObjectID('000000000000000000000002'), new ObjectID('000000000000000000000003')]
		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			'title': 'Win',
			'description': 'Win Win Win\nNo matter what',
			'sprint_id': new ObjectID('000000000000000000000000'),
			'tasks': [new ObjectID('000000000000000000000004')]
		}
	],
	'projects': [
		{
			'_id': new ObjectID('000000000000000000000000'),
			'title': 'Drumpf',
			'description': 'Make America Great Again',
			'users': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001'), new ObjectID('000000000000000000000002')],
			'status': 'sprint',
			'current_sprint': null,
			'sprints': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001')],
			'stories': [new ObjectID('000000000000000000000000'), new ObjectID('000000000000000000000001')],
			'avatar': 'http://static1.businessinsider.com/image/55ca4540371d22462c8bcb17/donald-trump-is-still-soaring-in-iowa--but-there-are-now-some-clear-warning-signs.jpg',
			'commits': [3,1,6,4,8],
			'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
			'membersOnProj':['Abhay', 'VilkBot'],
			'gCommits': [12,10],
			'color':'#'+Math.floor(Math.random()*16777215).toString(16)

		},
		{
			'_id': new ObjectID('000000000000000000000001'),
			'title': 'Feel the Bern',
			'description': 'Fight the Power',
			'users': [new ObjectID('000000000000000000000000')],
			'status': 'planning',
			'current_sprint': null,
			'sprints': [],
			'stories': [],
			'avatar': 'http://www.slate.com/content/dam/slate/articles/news_and_politics/politics/2015/07/150706_POL_Sanders.jpg.CROP.promo-xlarge2.jpg',
			'commits':[4,7,2,8,9],
			'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
			'membersOnProj':['VilkBot'],
			'gCommits':[15],
			'color':'#'+Math.floor(Math.random()*16777215).toString(16)
		}
	]
};


/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.

    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // 'for' loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;
  console.log('collections' + collections);

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error('Could not connect to database: ' + err);
    } else {
      console.log('Resetting database...');
      resetDatabase(db, function() {
        console.log('Database reset!');
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
