<template>
  <v-app>
    <v-app-bar app fixed color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Lab_4</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-content class="d-flex align-center">
            <v-list-item-icon class="mr-2">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    items: [
      { title: 'List', icon: 'mdi-format-list-checks', to: '/' },
      { title: 'About', icon: 'mdi-information', to: '/about' },
      { title: 'My Group', icon: 'mdi-account-group', to: '/my-group' },
    ],
  }),
}
</script>
