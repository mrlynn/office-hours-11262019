var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clusstreSchema = new Schema({
    "clusstreBasic": {
        "clusstreName": String,
        "memberDOBFrom": Number,
        "memberDOBTo": Number,
        "genders": [{
            type: String
        }],
      },
      "userUid": Number,
      "description": String,
      "tags": [
          {
              type: String
          }
      ],
      "places": [
          {
              type: String
          }
      ],
      "clusstreTypes": {
        "predefine": [{
            type: String
        }],
        "userdefine": [{
            type: String
        }]
      },
      "placeType": String,
      "posts": [{
          type: String
      }],
      "createdDate": { 
          "$date": Date
        },
      "lastModifiedDate": { 
        "$date": Date
      },
      "createdByUid": String,
      "lastModifiedByUid": String,
      "status": String,
      "uid": String,
      "_class": String
});
module.exports = mongoose.model('Clusstre',clusstreSchema);