import React from 'react';
import ReactDOM from 'react-dom';

import initialData from './data';

// Modify with your startup's name!
var startupName = "scrumSpace";

// DISABLED UNTIL ABHAY FIXES SERVER SIDE RENDERING :(
// var data = JSON.parse(localStorage.getItem(startupName));
// if (data === null) {
//   data = JSONClone(initialData);
// }
// var data = JSONClone(initialData);

var data;

/**
* need to initialize data manually because of server side rendering
*/
export function initLocalStorage(){
  data = JSON.parse(localStorage.getItem(startupName));
  if (data === null) {
    data = JSONClone(initialData);
  }
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  if (id) return JSONClone(data[collection][id]);
  else return JSONClone(data[collection]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/**
 * Reset database button.
 */
export class ResetDatabase extends React.Component {
  render() {
    return (
      <button style={{width: 50+'px', height: 50+'px', overflow: 'hidden', fontSize: 12+'px', padding: 0}} className="btn btn-default" type="button" onClick={() => {
        resetDatabase(); //THIS NEEDS TO BE REMOVED!
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/resetdb');
        xhr.addEventListener('load', function() {
          window.alert("Database reset! Refreshing the page now...");
          document.location.reload(false);
        });
        xhr.send();
      }}>Reset Mock DB</button>
    );
  }
}
