<template>
  <div>
    <GmapMap
      id="map_canvas"
      :center="center"
      :zoom="zoom"
      :options="{
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        maxZoom: 15,
        minZoom: 2,
        styles: options,
      }"
    >
      <GmapMarker
        id="marker"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="info(m, index)"
      />

      <GmapInfoWindow
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      />
    </GmapMap>
  </div>
</template>

<script>
import options from "@/options.js";
import firebase from "firebase";
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      center: {
        lat: 30,
        lng: 3,
      },
      zoom: 2,
      options: options,
      markers: [],
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        content: "",
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
    };
  },

  mounted() {
    this.listMarkers();
  },

  methods: {
    // create markers from db and add to data prop
    listMarkers() {
      db.collection("incidents")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.markers.push({
              position: { lat: doc.data().lat, lng: doc.data().lng },
              headline: doc.data().headline,
              description: doc.data().description,
              url: doc.data().auditSource,
              incidentType: doc.data().incidentType,
              severity: doc.data().severity,
            });
          });
        });
    },
    // open info window and display data
    info(m, i) {
      this.center = m.position;
      this.zoom = 6;
      this.infoWindowPos = m.position;
      this.infoOptions.content = `<h2>${m.headline}</h2>
                                  <p>${m.description}<p>
                                  <div class="d-flex flex-column">
                                  <small class="text-secondary mb-1">
                                  ${m.incidentType}</small>
                                  <small class="mb-1">Threat: ${
                                    m.severity.charAt(0).toUpperCase() +
                                    m.severity.slice(1)
                                  }</small>
                                  <a href="${
                                    m.url
                                  }" target="_blank" class="btn btn-sm btn-block btn-custom">Read more</a>
                                  </div>
                                  `;

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == i) {
        this.infoWinOpen = !this.infoWinOpen;
        this.zoom = 2;
        this.center = { lat: 30, lng: 3 };
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = i;
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

#map_canvas {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.btn-info {
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 5px;
  text-align: center;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  transition: 0.3s ease-in-out;
  margin: 10px;
}

.btn-info:hover {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 1px solid #fff;
}

.grey-text {
  color: rgba(0, 0, 0, 0.5);
}

.green {
  color: green;
}

small {
  display: block;
}
</style>
