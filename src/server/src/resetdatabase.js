var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "scrumspace";
// Put the initial mock objects here.
var initialData = {
	loading: false,
	users: {
		0: {
      "_id": new ObjectID("000000000000000000000000"),
			'first_name': 'John',
			'last_name': 'Vilk',
			'email': 'jvilk@umass.edu',
			'display_name': 'VilkBot',
			'password': 'catinthehat',
			'avatar_url': 'https://avatars0.githubusercontent.com/u/1141042?v=3&s=460'
		},
		1: {
			'_id': 1,
			'first_name': 'Abhay',
			'last_name': 'Vatsa',
			'email': 'someemail',
			'display_name': 'Abhay Vatsa',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://www.abhayvatsa.com/img/abhay.png'
		},
		2: {
			'_id': 2,
			'first_name': 'Dylan',
			'last_name': 'Fischler',
			'email': 'someemail',
			'display_name': 'Dylan Fischler',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://www.dylanfischler.com/includes/me_bw.jpg'
		},
		3: {
			'_id': 3,
			'first_name': 'Niha',
			'last_name': 'Venkatathri',
			'email': 'someemail',
			'display_name': 'Niha Venkatathri',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'http://umasscswomen.weebly.com/uploads/3/8/0/8/38087803/3410479.jpg?153'
		},
		4: {
			'_id': 4,
			'first_name': 'Ryan',
			'last_name': 'Jerue',
			'email': 'someemail',
			'display_name': 'Ryan Jerue',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa7AAAAJGQ2NjlmY2MzLTgzYjctNGRhYy05ZmY2LTkxOGE3Mzg2NWU2MA.jpg'
		},
		5: {
			'_id': 5,
			'first_name': 'Supriya',
			'last_name': 'Kankure',
			'email': 'someemail',
			'display_name': 'Supriya Kankure',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAa1AAAAJDRjMTU3ZTA2LTFkMTEtNDM1MS04YjQ0LWI0YzRlOTExODQ3NA.jpg'
		},
		6: {
			'_id': 6,
			'first_name': 'Rachana',
			'last_name': 'Lingutla',
			'email': 'someemail',
			'display_name': 'Rachana Lingutla',
			'password': 'd4866854120e8bb207d6f8e11fce8b99',
			'avatar_url': 'https://avatars.slack-edge.com/2016-02-07/20575719908_a1012b8fe4efe81099c3_72.png'
		}
	},
	projects: [
	{
		'_id': 0,
		'title': 'Drumpf',
		'description': 'Make America Great Again',
		'users': [0, 1],
		'status': 'sprint',
		'current_sprint': null,
		'avatar': 'http://static1.businessinsider.com/image/55ca4540371d22462c8bcb17/donald-trump-is-still-soaring-in-iowa--but-there-are-now-some-clear-warning-signs.jpg',
		'sprints': [
			{
				'_id': 0,
				'name': 'V1 Release',
				'start_date':null,
				'duration': 14,
				'scrum_time': '09:00'
			},
			{
				'_id': 1,
				'name': 'V2 Release',
				'duration': 7,
				'start_date': null,
				'scrum_time': '09:00'
			}
		],
		'stories': [
			{
				'_id': 0,
				'title': 'Buy Hats',
				'description': 'Design Hats \nOrder Hats\nSell Hats',
				'sprint_id': 0,
				'tasks': [
					{
						'_id': 0,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [0,1],
						'description': 'Find a Designer',
						'history': [{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(2),
							modified_user : 0
						}],
						'attachments': null
					},
					{
						'_id': 1,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [],
						'description': 'Make Mexico pay for it',
						'history': [{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(4),
							modified_user : 0
						}],
						'attachments': null
					},
					{
						'_id': 2,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [0],
						'description': 'Make Donald Drumpf again',
						'history': [{
							from_status: 'UNASSIGNED',
							to_status: 'BLOCKED',
							modified_time: xDaysAgoInUnixTime(2),
							modified_user : 0
						},{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(1),
							modified_user : 0
						}],
						'attachments': null
					},
					{
						'_id': 3,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [],
						'description': 'Replace Donald\'s Toupee',
						'history': [{
							from_status: 'DOING',
							to_status: 'DONE',
							modified_time: xDaysAgoInUnixTime(1),
							modified_user : 0
						},{
							from_status: 'UNASSIGNED',
							to_status: 'DOING',
							modified_time: xDaysAgoInUnixTime(3),
							modified_user : 0
						},{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(5),
							modified_user : 0
						}],
						'attachments': null
					}
				]
			},
			{
				'_id': 1,
				'title': 'Win',
				'description': 'Win Win Win\nNo matter what',
				'sprint_id': 0,
				'tasks': [
					{
						'_id': 0,
						'status': 'UNASSIGNED',
						'blocked_by': [],
						'assigned_to': [0],
						'description': 'Beat hilldawg',
						'history': [{
							from_status: null,
							to_status: 'UNASSIGNED',
							modified_time: xDaysAgoInUnixTime(3),
							modified_user : 0
						}],
						'attachments': null
					}
				]
			}
		],
		'commits': [3,1,6,4,8],
		'timeFrame':['Mon','Tues','Wed','Thurs','Fri'],
		'membersOnProj':['Abhay', 'VilkBot'],
		'gCommits': [12,10],
		'color':'#'+Math.floor(Math.random()*16777215).toString(16)

	},
	{
		'_id': 1,
		'title': 'Feel the Bern',
		'description': 'Fight the Power',
		'users': [0],
		'status': 'planning',
		'current_sprint': null,
		'avatar': 'http://www.slate.com/content/dam/slate/articles/news_and_politics/politics/2015/07/150706_POL_Sanders.jpg.CROP.promo-xlarge2.jpg',
		'sprints': [],
		'stories': [],
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
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

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
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
