<template>
  <div>
    <v-toolbar />
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-divider dark v-if="item.divider" :key="i"></v-divider>
        <v-list-item ripple :to="item.action" :key="i" v-else>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-2"
              >{{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-divider />
    <v-container class="lang-select">
      <v-btn @click="switchLang('fr')" color="deep-purple">FR</v-btn>
      <v-btn @click="switchLang('en')" color="deep-purple">EN</v-btn>
    </v-container>
  </div>
</template>

<script>
import i18n from "../i18n";

export default {
  name: "NavDrawer",
  data() {
    return {
      items: [
        { icon: "mdi-home-outline", text: this.$t("home.title"), action: "/" },
        { icon: "mdi-help-circle-outline", text: this.$t("about.title"), action: "/about" },
        { icon: "mdi-bug-check-outline", text: "Test", action: "/test" },
      ],
    };
  },
  methods: {
    switchLang(lang) {
      i18n.locale = lang;
    },
  },
};
</script>

<style lang="scss" scoped></style>
