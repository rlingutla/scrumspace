import React from 'react';
import ReactDOM from 'react-dom';

var token = "";

export function stateTree(userId){
  //client ready to render
  token = localStorage.scrumToken;

	return sendXHRPromise('get', `/api/init/${userId}`).then((response) => {
		return response;
	});
}

// var token = 'eyJfaWQiOjB9'; // <-- Put your base64'd JSON token here
// var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOjAsImV4cCI6MTQ2MDY1MzgyMTk3OX0.SSw4FitS_uyx2NRrJnKwx3VlsEXKgEeSzb2EaR4OVcY';
// var token = localStorage.scrumToken || "";
/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
export function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)

  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning
      // the error.
      var responseText = xhr.responseText;
      var error = 'Could not ' + verb + " " + resource + ": Received " + statusCode + " " + statusText + ": " + responseText;
      logger(error);
      ErrorBanner(error);
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener('error', function() {
  	var error = "Could not " + verb + " " + resource + ": Could not connect to the server.";
	ErrorBanner(error); // This is in the global namespace.
    logger(error);
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener('timeout', function() {
    var error = 'Could not ' + verb + " " + resource + ": Request timed out.";
    ErrorBanner(error);
    logger(error);
  });

  switch (typeof(body)) {
    case 'undefined':
      // No body to send.
      xhr.send();
      break;
    case 'string':
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case 'object':
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error('Unknown body type: ' + typeof(body));
  }
}

/*
 * This function makes use of promises instead of callbacks
 */
export function sendXHRPromise(verb, resource, body) {
  return new Promise((resolve, reject) => {
  	var xhr = new XMLHttpRequest();
  	xhr.open(verb, resource);
  	xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  	// Response received from server. It could be a failure, though!
  	xhr.addEventListener('load', function() {
  	  var statusCode = xhr.status;
  	  var statusText = xhr.statusText;
  	  if (statusCode >= 200 && statusCode < 300) {
  	    // Success: Status code is in the [200, 300) range.
  	    // Call the callback with the final XHR object.
  	    resolve(JSON.parse(xhr.responseText));
  	  } else {
  	    // Client or server error.
  	    // The server may have included some response text with details concerning
  	    // the error.
  	    var responseText = xhr.responseText;
  	    let error = `Could not ${verb} ${resource}: Received ${statusCode} ${statusText}: ${responseText}`;

  	    reject(error);
        ErrorBanner(error);
  	  }
  	});

  	// Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  	xhr.timeout = 60000;

  	// Network failure: Could not connect to server.
  	xhr.addEventListener('error', function() {
  		let error = `Could not ${verb} ${resource}: Could not connect to the server.`;
		ErrorBanner(error); // This is in the global namespace.
		logger(error);
		reject(error);
  	});

  	// Network failure: request took too long to complete.
  	xhr.addEventListener('timeout', function() {
  		let error = `Could not ${verb} ${resource}: Request timed out.`;
  		ErrorBanner(error);
		logger(error);
		reject(error);
  	});

  	switch (typeof(body)) {
  	  case 'undefined':
  	    // No body to send.
  	    xhr.send();
  	    break;
  	  case 'string':
  	    // Tell the server we are sending text.
  	    xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
  	    xhr.send(body);
  	    break;
  	  case 'object':
  	    // Tell the server we are sending JSON.
  	    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  	    // Convert body into a JSON string.
  	    xhr.send(JSON.stringify(body));
  	    break;
  	  default:
  	    throw new Error('Unknown body type: ' + typeof(body));
  	}
  });
}


function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Reset database button.
 */
export class ResetDatabase extends React.Component {
  render() {
    return (
      <button style={{borderRadius: '5px', width: 50+'px', height: 50+'px', overflow: 'hidden', fontSize: 12+'px', padding: 0}} className="btn btn-default" type="button" onClick={() => {
        sendXHRPromise('POST', '/api/resetdb').then((response) => {
          window.alert("Database reset! Refreshing the page now...");
          window.location.href = '/';
        });


      }}>Reset DB</button>
    );
  }
}

function getCurrentUser(){
	return 0;
}

function serverLog(...msg){
	logger('SERVER MESSAGE:', ...msg);
}
