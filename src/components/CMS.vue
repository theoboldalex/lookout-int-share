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
    <div class="container">
      <gmap-autocomplete
        @place_changed="setPlace"
        class="form-field searchBar"
      ></gmap-autocomplete>

      <form @submit="createAlert">
        <input
          type="text"
          placeholder="Latitude"
          class="form-field form-split"
          v-model="this.center.lat"
        />
        <input
          type="text"
          placeholder="Longitude"
          class="form-field form-split"
          v-model="this.center.lng"
        />

        <input
          type="text"
          placeholder="Headline"
          class="form-field"
          v-model="headline"
        />
        <textarea
          cols="30"
          rows="10"
          placeholder="Describe the incident"
          class="form-field"
          v-model="description"
        ></textarea>
        <input
          type="text"
          placeholder="URL for more info"
          class="form-field"
          v-model="auditSource"
        />
        <select
          name="incident-type"
          id="incident-type"
          class="form-field"
          v-model="incidentType"
        >
          <option value="Select an incident type" selected disabled
            >Incident type</option
          >
          <option value="Accident">Accident</option>
        </select>
        <select
          name="severity"
          id="severity"
          class="form-field"
          v-model="severity"
        >
          <option value="Select a threat level" selected disabled
            >Severity</option
          >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button id="create-incident" type="submit" class="form-button">
          Create Alert
        </button>
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
      center: { lat: null, lng: null },
      options: options,
      markers: [],
      places: [],
      currentPlace: null,
      feedback: null,
      headline: "",
      description: "",
      auditSource: "",
      incidentType: ""
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
          timestamp: Date.now()
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

<style>
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

#smallMap {
  height: 40vh;
}

.searchBar {
  width: 40%;
}

.container {
  margin: 0 10%;
}

.form-field {
  margin-top: 20px;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  border-radius: 4px;
  border: 2px solid #f0f0f0;
}

form select {
  font-size: 16px;
  /* padding: 20px; */
  width: 100%;
  border-radius: 4px;
  border: 2px solid #f0f0f0;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: none;
}

.form-button {
  cursor: pointer;
  background: #3498db;
  border: 2px solid #3498db;
  border-radius: 4px;
  color: #fff;
  display: block;
  font-size: 16px;
  padding: 10px;
  margin: 20px 0;
  width: 100%;
  transition: 0.3s ease-in-out;
}

.form-button:hover {
  filter: brightness(80%);
}
</style>
