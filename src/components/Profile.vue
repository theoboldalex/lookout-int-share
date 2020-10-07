<template>
  <div class="container">
    <div class="incidents">
      <h1>My Incidents</h1>
      <div class="form-group">
        <input
          type="text"
          placeholder="Search for an incident..."
          class="form-control mb-2"
          v-model="searchQuery"
        />
      </div>
      <div
        class="card mb-3"
        v-for="(incident, i) in filteredIncidents"
        :key="i"
      >
        <div class="card-body">
          <h4>{{ incident.headline }}</h4>
          <p>{{ incident.description }}</p>
          <router-link
            :to="{ name: 'EditIncident', params: { id: incident.id } }"
          >
            <button class="btn btn-warning">Edit</button>
          </router-link>
          <button @click="deleteIncident(incident, i)" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Profile",
  data() {
    return {
      profile: null,
      feedback: null,
      user: null,
      incidents: [],
      searchQuery: "",
    };
  },

  created() {
    let ref = db.collection("users");

    // get current user
    ref
      .where("user_id", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.user = doc.data();
        });
      });

    // profile data
    ref
      .doc(this.$route.params.id)
      .get()
      .then((user) => {
        this.profile = user.data();
      });

    // incidents
    db.collection("incidents")
      .where("user_id", "==", this.$route.params.id)
      .onSnapshot((snapshot) => {
        this.incidents = [];
        snapshot.forEach((doc) => {
          this.incidents.push({
            headline: doc.data().headline,
            description: doc.data().description,
            lat: doc.data().lat,
            lng: doc.data().lng,
            auditSource: doc.data().auditSource,
            id: doc.id,
          });
        });
      });
  },

  methods: {
    // delete an incident
    deleteIncident(incident, i) {
      db.collection("incidents")
        .doc(incident.id)
        .delete()
        .then(() => {
          console.log(`item ${incident.id} deleted.`);
          this.incidents = this.incidents.filter((inc) => {
            return inc.id != incident.id;
          });
        });
    },
  },
  computed: {
    // filter visible incidents on search input
    filteredIncidents() {
      return this.incidents.filter((incident) => {
        return incident.headline.toLowerCase().includes(this.searchQuery);
      });
    },
  },
};
</script>

<style scoped>
.incidents {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  font-family: var(--font);
}
</style>
