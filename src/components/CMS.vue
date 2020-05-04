<template>
  <div>
    <gmap-map
      id="smallMap"
      :center="center"
      :zoom="2"
      :options="{
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        maxZoom: 15,
        minZoom: 2,
        styles: options
      }"
    >
      <gmap-marker
        id="marker"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="info(m, index)"
      ></gmap-marker>
    </gmap-map>
    <div class="container mt-3">
      <div class="form-group">
        <label for="search">Search:</label>
        <gmap-autocomplete
          @place_changed="setPlace"
          class="form-control"
          :options="{ fields: ['geometry'] }"
        ></gmap-autocomplete>
      </div>

      <form @submit="createAlert">
        <div class="row">
          <div class="col">
            <label for="lat">Latitude:</label>
            <input
              id="lat"
              type="text"
              placeholder="Latitude"
              class="form-control"
              v-model="this.center.lat"
            />
          </div>
          <div class="col">
            <label for="long">Longitude:</label>
            <input
              id="long"
              type="text"
              placeholder="Longitude"
              class="form-control"
              v-model="this.center.lng"
            />
          </div>
        </div>
        <div class="form-group mt-3">
          <label for="headline">Headline:</label>
          <input
            id="headline"
            type="text"
            placeholder="Headline"
            class="form-control"
            v-model="headline"
          />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <textarea
            cols="30"
            rows="10"
            placeholder="Describe the incident"
            class="form-control"
            v-model="description"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="url">Source:</label>
          <input
            id="url"
            type="text"
            placeholder="URL for more info"
            class="form-control"
            v-model="auditSource"
          />
        </div>
        <div class="form-group">
          <label for="incident-type">Incident type:</label>
          <select
            name="incident-type"
            id="incident-type"
            class="form-control"
            v-model="incidentType"
          >
            <option value="Select an incident type" selected disabled
              >Incident type</option
            >
            <option value="Accident">Accident</option>
            <option value="Firearms">Firearms</option>
            <option value="Terrorism">Terrorism</option>
            <option value="Health">Health</option>
            <option value="Conflict">Conflict</option>
            <option value="Political">Political</option>
            <option value="Crime">Crime</option>
            <option value="Weather">Weather</option>
          </select>
        </div>
        <div class="form-group">
          <label for="severity">Severity:</label>
          <select
            name="severity"
            id="severity"
            class="form-control"
            v-model="severity"
          >
            <option value="Select a threat level" selected disabled
              >Severity</option
            >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="form-group mb-5">
          <button
            id="create-incident"
            type="submit"
            class="btn btn-block btn-custom"
          >
            Create Alert
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import options from "@/options.js";
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "CMS",
  data() {
    return {
      center: { lat: 53, lng: 3 },
      options: options,
      markers: [],
      places: [],
      currentPlace: null,
      feedback: null,
      headline: "",
      description: "",
      auditSource: "",
      incidentType: "",
      severity: "",
      user_id: ""
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
      this.markers = [];
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
    createAlert() {
      db.collection("incidents")
        .add({
          lat: this.center.lat,
          lng: this.center.lng,
          headline: this.headline,
          description: this.description,
          auditSource: this.auditSource,
          incidentType: this.incidentType,
          severity: this.severity,
          timestamp: Date.now(),
          user_id: firebase.auth().currentUser.uid
        })
        .catch(err => {
          console.log(err);
        });
      (this.places = []),
        (this.lat = null),
        (this.lng = null),
        (this.headline = null),
        (this.description = null),
        (this.auditSource = null),
        (this.incidentType = null),
        (this.severity = null);
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style scoped>
#smallMap {
  height: 40vh;
}
</style>
