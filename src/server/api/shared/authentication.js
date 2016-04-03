//Database Fucntions
var database = require('../../database');
var readDocument = database.readDocument;
//Do not import write, the things in this are meant to be read only

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8'); //buffer is a node thing
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['_id']; //because we use _id instead of just id
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}
module.exports.getUserIdFromToken = getUserIdFromToken;

function checkAuthFromProject(fromUser, projectId){
	//fromUser is getUserIdFromToken(req.get('Authorization'))
	var project = readDocument('projects').find((e) => {
		return parseInt(e._id, 10) === parseInt(projectId, 10);
	});
	if(project.users.filter((e) => { return parseInt(e, 10) === parseInt(fromUser, 10); }).length > 0)
		return true;
	else
		return false;
}
module.exports.checkAuthFromProject = checkAuthFromProject;
