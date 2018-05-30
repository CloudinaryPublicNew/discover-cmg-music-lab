# Fetching and Listing a List of Artists

To display a list of artistes returned from the server, we’ll need a list component. First, we’ll create a component called `BrowserList`. This component will hold individual data for all artistes. Create a file called `BrowserList.vue`. Open the file and fill it with the content below:

```vue
<template>
  <div>
    <v-list two-line subheader>
      <v-list-tile v-for="item in transformedItems" :key="item.id" avatar @click="navigateTo(item)">
        <v-list-tile-avatar>
          <img :src="item.image.replace('300.jpg', '50.jpg').replace('http', 'https')">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.name }}</v-list-tile-title>
          <v-list-tile-sub-title>ARTIST</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">info</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    
  </div>
</template>

<script>
import { goTo, normalizeTitle } from '../utils';
export default {
  name: 'browser-list',
  props: ['items', 'type'],
  data() {
    return {
      goTo,
      normalizeTitle,
    };
  },
  computed: {
    transformedItems() {
      if (this.type === 'search') {
        return this.items.map((item) => item.artist);
      } else {
        return this.items;
      }
    },
  },
  methods: {
    navigateTo(item) {
      return goTo(
        this.$router,
        `/artist/${item.id}/${normalizeTitle(item.name)}`,
        item
      );
    },
  },
};
</script>
```

If you noticed, we imported some helper functions from a `utils` file, let's create the utils file and input the helper functions there. Create a file called `utils.js` in the `src` folder. Copy the following contents into it.

```javascript
// utils.js

export const API_BASE_URI =
  'https://canadian-music-week.cloudinary.auth0-extend.com/music-discovery-service';
export const ALPHABETS = 'abcdefghijklmnopqrstuvwxyz';

export const goTo = (router, path, data) => {
  let query = {};

  if (router.currentRoute.name === 'browse-alpha') {
    query = { artist: data };
  }

  if (router.currentRoute.name === 'album') {
    query = { album: data };
  }

  if (router.currentRoute.name === 'player') {
    query = { track: data };
  }

  router.push({
    query: query,
    path,
  });
};

export const normalizeTitle = (title) => {
  return title
    .replaceAll(' ', '-')
    .replaceAll('/', '-')
    .toLowerCase();
};
```
In the `utils.js` file, we declared and exported the base api url for our project and the alphabets. The alphabets bit will be used sooner than later in the project. The `goTo` function aids with navigation, it uses the route name to define the query params for that particular route. 

Meanwhile, in the `normalizeTitle` function, we take in a title string as a parameter, all spaces and forward slashes in the `title` are replaced with `-`.

### Fetching of artistes.

Now that we've created a `BrowserList` component, we'll need to feed it data to display. This data will be gotten from the API. Let's update the `Browser` component to make a request to the API and then we feed that data to the `BrowserList` component.

```javascript
// Browser.vue

```