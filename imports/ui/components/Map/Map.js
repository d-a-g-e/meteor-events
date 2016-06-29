import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './Map.html';
// import '../../methods.html';
// import {
//   getFBevents,
// } from '../../../api/methods.js';



Template.Map.onCreated(function () {
  this.map = new ReactiveVar();
  // this.places = new ReactiveVar([]);

  // automatically search places if query has changed
  // this.autorun(() => {
  //   const map = this.map.get();
  //   console.log(map)

  //   if (map) {
  //     // query.bounds = map.instance.getBounds();
  //     // searchNearby(map, query);
  //     // const { query } = Template.currentData();
  //     let query = {
  //       location: map.options.center,
  //       radius: 1000,
  //       type: 'bar'
  //     };
  //     console.log("paso el if map")
  //     searchNearby(map, query, this.places);
  //   }else{
  //     console.log("no paso el if map")
  //   }
  // });

  // automatically add markers to map when places have changed
  // let markers = [];
  // this.autorun(() => {
  //   const map = this.map.get();
  //   const places = this.places.get();
  //   // remove old markers from map before adding new ones
  //   markers.forEach((marker) => removeMarker(marker));
  //   markers = places.map((place) => addMarker(map, place));
  // });
})


Template.Map.onRendered(function() {
  GoogleMaps.load({
    key: Meteor.settings.public.googleApiKey
    // libraries: 'places'
  });

  GoogleMaps.ready('map', (map) => {
    this.map.set(map);

    const mimapa = this.map.get()
    const mimarker = yoAddMarker(mimapa)

    google.maps.event.addListener(map.instance, 'dragend', function(event) {
      // cuando se mueve el mapa
      // recibo las nuevas cordenadas
      options = {
        lat: map.instance.getCenter().lat(),
        lng: map.instance.getCenter().lng(),
      }
      //
      yoAddMarker(map);

      Meteor.call("facebookEvents", options, function(err,res){
        if (err) {
          console.log("error", error)
        } else {
          console.log("respuesta del call", res.data.events)
          res.data.events.forEach((evento) => {
            console.log("mimapa.instance",mimapa.instance)
            console.log("map.instance",map.instance)
            // TODO agrupar los eventos por dueño y mostrar
            marker = {
              title: evento.venueName + " - " + evento.eventName,
              lat: evento.venueLocation.latitude,
              lng: evento.venueLocation.longitude,
              map: mimapa.instance
            }
            eventAddMarker(marker);
          });
        }
      });
    });
  });
});

Template.Map.helpers({
  mapOptions() {
    const { center, zoom } = Template.currentData();
    console.log(Template.currentData())
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(center.lat, center.lng),
        zoom: zoom
      };
    }
  }
})

// function searchNearby(map, query, places) {
//   const service = new google.maps.places.PlacesService(map.instance);
//   service.nearbySearch(query, (results, status, pagination) => {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//       console.log(results)
//       places.set(results)
//     } else {
//       console.log(status)
//     }
//   });
// }



function eventMarker(options){
  console.log("creo un marcador")
  let latlng = new google.maps.LatLng(options.lat, options.lng);
  let marker = new google.maps.Marker({
    position: latlng,
    title: options.title,
  });
  console.log("marcador", marker)
  return marker
}

function eventAddMarker(options) {
  marker = eventMarker(options);
  console.log("lo agrego al maopa",options.map)
  marker.setMap(options.map);
  return marker;
}



function yoMarker(map) {
  // removeMarker(map);
  return new google.maps.Marker({
    position: map.instance.getCenter(),
    title: 'yo',
    draggable: true,
    icon: 'https://maxcdn.icons8.com/iOS7/PNG/50/Cinema/comet-50.png'
    // icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
  });
}

function yoAddMarker(map) {
  marker = yoMarker(map);
  marker.setMap(map.instance);
  // removeMarker =
  return marker;
}


// // Creates a marker from a place, but doesn't add it to a map
// function createMarker(place) {
//   console.log("place location :", place)
//   return new google.maps.Marker({
//     position: place.geometry.location,
//     title: place.name,
//   });
// }

// // Adds a marker to the given map
// function addMarker(map, marker) {
//   if (!(marker instanceof google.maps.Marker)) {
//     marker = createMarker(marker);
//   }
//   marker.setMap(map.instance);

//   return marker;
// }

// Removes a marker from a map
function removeMarker(marker) {
  marker.setMap(null);
}
