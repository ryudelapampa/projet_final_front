<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            {{ $t("cal.today") }}
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> &lt; </v-icon> <!-- flèche gauche -->
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> &gt; </v-icon> <!-- flèche droite -->
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ $t(typeToLabel[type]) }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>{{ $t("cal.day") }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>{{ $t("cal.week") }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>{{ $t("cal.month") }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>{{ $t("cal.4days") }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="eventList"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @dayclick="dayClicked"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedEvent.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click="selectedOpen = false">
                {{ $t("btn.cancel") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: "CongesCal",
  data: () => ({
    selectedDay: null,
    today: new Date().toISOString().substr(0, 10),
    focus: "",
    type: "month",
    typeToLabel: {
      month: "cal.month",
      week: "cal.week",
      day: "cal.day",
      "4day": "cal.4days",
    },
    name: null,
    start: null,
    motif: null,
    status: null,
    details: null,
    color: "#1976D2",
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    dialog: false,
  }),
  mounted() {
    this.$store.dispatch("getCollab")
  },
  computed: {
    eventList() {
      let ev = [];
      let data = this.$store.state.client.collaborateur.absences
      for (let el of data) {
        ev.push({
          id : el.id,
          name: el.type,
          start: new Date(el.dateJour),
          details: "motif : " + el.motif,
          type: el.type,
        });
      }
      return ev ;
    } 
    
  },
  methods: {
    dayClicked(day) {
      this.selectedDay = day;
    },
    getEventColor(event) {
      switch(event.type) {
        case "CONGE_PAYE":
          return event.color = "blue";
        case "CONGE_SANS_SOLDE":
          return event.color = "indigo";
        case "RTT_EMPLOYE":
          return event.color = "green";
        case "RTT_EMPLOYEUR":
          return event.color = "deep-purple";
        default:
          return event.color = "grey darken-1";
      }
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        );
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style lang="scss" scoped></style>
