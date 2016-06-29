import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { HTTP } from 'meteor/http'

Meteor.methods({
  'facebookEvents'(options) {
    const result = HTTP.call( 'GET', 'http://localhost:4000/events', {
      params: {
        "lat": options.lat,
        "lng": options.lng,
        "distance": 1000,
        "access_token": Meteor.settings.public.favebookApiKey,
        "sort": "venue"
        }
      });
    console.log("resultados:" ,result.data.events)
    return result
  },
});
