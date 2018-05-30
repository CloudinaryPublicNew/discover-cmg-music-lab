# Getting started

To follow this tutorial you’ll need to have a prior knowledge of Vue.js and NodeJs. You should have Node and NPM installed on your PC before you begin.

## Setup
We’ll be using the following tools for this project:

* Vue.js
* Cloudinary
* Express
* Lodash
* Vuetify

We’ll be using the Vue CLI to bootstrap our project. Install the CLI by running the following command in a terminal.

`npm install -g @vue/cli`

To initialize a project using the CLI, run `vue create vuesic`. Follow the CLI prompts and select the default config.

## App shell
For our project, we’ll be using Vuetify, the material design component framework built using Vue.js. Install Vuetify to add it as a plugin for our application by running the following command:

```javascript
npm install vuetify

npm install vue-cli-plugin-vuetify --save-dev
```

To make Vue use Vuetify as a plugin, create folder called `plugins` in the `src` folder of your project. Then create a file called `vuetify.js` in the `plugins` folder. Open the `vuetify.js` folder and copy the code below into it.

```javascript
// /src/plugins/vuetify.js

import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify, {
  theme: {
    primary: '#FFFFFF',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});
```

Open the `main.js` file and import the vuetify plugin into it.

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';
import './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
```

Now let’s make use of the material design components provided by Vuetify to create our app shell. Open the `App.vue` file in the `src` folder and replace the contents with the code below:

```vue
// App.vue

<template>
  <v-app dark>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      v-model="drawer"
      enable-resize-watcher
      app
      fixed
      clipped
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      clipped-left
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>

    </v-content>
    <v-footer fixed app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      drawer: true,
      items: [
        {
          icon: 'search',
          title: 'Browse',
        },
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Discover Music',
    };
  },
  methods: {},
};
</script>
```

Vuetify components must be surrounded by a `v-app` element. Our application will make use of the dark theme. Vuetify makes use of Material Icons so we’ll include the link to Material Icons in the `index.html` file in the `public` folder. Open the `index.html` file and update it to look like the snippet below:

```html
<!-- index.html -->
...
  <head>
    ...
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons" rel="stylesheet">
    <title>Discover Music</title>
  </head>
...
```

We’ve created our app shell. Run `npm run serve` in a terminal in the root folder of your project. Visit http://localhost:8080 in your browser. It should look like the screenshot below:

![](https://d2mxuefqeaa7sj.cloudfront.net/s_F2BA36A165D09080ECF9360E6692E8CF2EAB661E0E74028D24D97955F3CF5C19_1527671712454_Screen+Shot+2018-05-30+at+10.12.51.png)

## Routing

To enable routing in our application, we’ll include `vue-router` as a plugin. To install `vue-router` in our project run `npm install vue-router` in a terminal in the root folder of your project. Then create a file called `vue-router.js` in the `plugins` folder. Open the `vue-router.js` file and update it with the code below:

```javascript
// vue-router.js

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

This simply tells Vue to use the `vue-router` library for routing. We’ll create another file `router.js`; this is where the routes for the application will be registered. Create the `router.js` file in the `src` folder, open it and copy the content below into it:

```javascript
// router.js

import VueRouter from 'vue-router'

const routes = [];
const router = new VueRouter({
 mode: 'history',
 routes
})
export default router
```

The next step is to register the router in the `main.js` file where Vue is initialized. Open the `main.js` file and update it to look like the snippet below:

```javascript
// main.js
...
import './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
```

Finally, open the `App.vue` file and include the `router-view` component between the `v-content` element. Update the `template` section of the `App.vue` component to look like the snippet below

```html
<!-- App.vue -->
<template>
  ...
  <v-content>
    <router-view></router-view>
  </v-content>
  ...
</template>

  ...
```