import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { HTTP } from 'meteor/http'
import { Session } from "meteor/session"

export const getFBevents = new ValidatedMethod({
  name: 'getFBevents',
  validate: null,
  run(){
    console.log("me tai weando?")
    var url = "http://localhost:4000/events"
    var options = {
        'headers': {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        },
    'params': {

            lat: 40.710803,
            lng: -73.964040,
            distance: 666,
            sort: 'venue',
            access_token: Meteor.settings.public.favebookApiKey,
        }
    };

    HTTP.get(url, options, function(err, result) {
        console.dir(result);
        console.dir(err);
          Session.set('searchResults', result);
    });
  }
});
