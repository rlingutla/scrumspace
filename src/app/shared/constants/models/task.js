import user from './user';


let schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "definitions": {
    "user": user,
    "history": {
      "type": "object",
      "properties": {
        "historyType": { "enum": ["MOVED", "CREATED", "TAKEN"]},
        "fromStatus": { "type": "string" },
        "toStatus": { "type": "string" },
        "userTaken": { "type": "string" },
        "modifiedTime": { "type": "number" },
        "modifiedUser": { "type": "string" }
      },
      "required": ["modifiedTime","modifiedUser"]
    }
  },
  "id": "/",
  "type": "object",
  "properties": {
    "_id": {
      "id": "_id",
      "type": "integer"
    },
    "status": {
      "id": "status",
      "type": "string"
    },
    "assignedTo": {
      "id": "assignedTo",
      "type": "array",
      "items": { "$ref": "#/definitions/address" },
      "additionalItems": false
    },
    "description": {
      "id": "description",
      "type": "string"
    },
    "history": {
      "id": "history",
      "type": "array",
      "items": {
        "id": "0",
        "type": "string"
      },
      "additionalItems": false
    },
    "attachments": {
      "id": "attachments",
      "type": "null"
    }
  },
  "additionalProperties": false,
  "required": [
    "_id",
    "status",
    "assignedTo",
    "description",
    "history",
    "attachments"
  ]
}