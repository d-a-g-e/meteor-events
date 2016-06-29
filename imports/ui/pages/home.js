import { Template } from 'meteor/templating';

import './home.html';

Template.home.helpers({
  mapCenter() {
    return { lat: -33.449467, lng: -70.673203 }
  },

  defaultZoom() {
    return 14
  }
})
