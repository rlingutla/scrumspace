import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

/*
	skipping use of emulateServerReturn
	in the future, the initial state tree will be populated on server render (not via API call)
*/
export function stateTree(userId, cb){
	var userObj = readDocument("users", userId);
	var projects = readDocument("projects");
	var stateTree = {
		user: userObj[userId],
		projects
	};

	emulateServerReturn(stateTree, cb);
};