import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';

Meteor.methods({
  'getEvents'({ lat, lng }) {
    HTTP.call( 'GET', 'http://localhost:4000/events', {
      params: {
        "lat": -33.448889699999995,
        "lng": -70.6692655,
        "distance": 1000,
        "access_token": "EAADdpueRFgABAO3PfOOIYl6XtvEe9yEZACaolQThDZAUb1eZCOmGvJrtz37L0NnSRwWi1wpxogGDEYoCMER2j599oZBZAiM4klZCB75yvqJXktf84B5PBH5SZBHBgnOp3yhIO8ZA4PmZBnMZBfMe9zqZBhInGG6WWVw8J50x2SQO9tqAgZDZD",
        "sort": "venue"
        }
      },
      function( error, response ) {
        if ( error ) {
          console.log( error );
        } else {
          console.dir( response );
          /*
           This will return the HTTP response object that looks something like this:
           {
             content: "String of content...",
             data: [{
               "body": "The body of the post with the ID 5."
               "id": 5,
               "title": "The title of the post with the ID 5.",
               "userId": 1
             }],
             headers: {  Object containing HTTP response headers }
             statusCode: 200
           }
          */
      }
    });

  }
});

Meteor.startup(() => {
  // code to run on server at startup

});
