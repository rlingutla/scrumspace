import {sendXHRPromise, sendXHR} from '../index';

/**
 * Adds a new project to the database.
 */
export function serverPostNewProject(title, description,users,membersOnProj,cb) {

  return sendXHRPromise('POST', '/api/project/',{
    'title':title,
    'description' : description,
		'users':users
  }).then((response) => {
    // Return the new status update.
    return response;
  },(error) => {
		ErrorBanner('Could not create new project');
	});
}

export function serverUpdateProject(project_id,title,members){
	return sendXHRPromise('PUT', '/api/project/' + project_id, {
		'project_id': project_id,
		'title': title,
		'users': members
	}).then((response) => {
		return response;
	},(error) => {
		ErrorBanner('Could not update project, must have at least 1 field filled in');
	});
}

export function serverRemoveProject(project_id){
	return sendXHRPromise('DELETE', '/api/project/' + project_id).then((response) => {
		return response;
	},(error) => {
		ErrorBanner('Could not delete project');
	});
}
