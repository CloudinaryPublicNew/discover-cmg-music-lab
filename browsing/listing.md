# Fetching and Listing of Artists

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

```vue
// Browser.vue
<template>
  ...
  <v-container>
    <v-layout>
      <v-flex xs6 offset-xs2>
        <browse-list  v-if="!loading" :items="items" :type="type" :pageSize="pageSize" :totalItems="totalItems"></browse-list>
        <rise-loader :loading="loading" color="#fff"></rise-loader>
      </v-flex>
      ...
</template>

<script>
import BrowseList from './BrowseList';
import RiseLoader from 'vue-spinner/src/RiseLoader';
import { API_BASE_URI } from '../utils';

export default {
  name: 'browser',
  data() {
    return {
      search: '',
      items: [],
      type: 'browse',
      loading: false,
      page: 1,
      totalItems: 0,
      pageSize: 6,
    };
  },
  watch: {
    '$route.params.alphabet'() {
      this.fetchBrowsedItems(this.$route.params.alphabet);
    },
  },
  created() {
    this.fetchBrowsedItems(this.$route.params.alphabet);
  },
  methods: {
    fetchBrowsedItems: async function(browsePath = 'a', page, pageSize) {
      this.loading = true;
      const data = await fetchFilteredItems(
        'browse',
        browsePath,
        page,
        pageSize
      );
      this.type = 'browse';
      this.items = data.artists.artist;
      this.totalItems = data.artists.totalItems;
      this.page = page;
      this.loading = false;
    },
  },
  components: {
    BrowseList,
    RiseLoader,
  },
};
</script>
```

In the snippet above, we introduced the `BrowseList` component and the `RiseLoader` component. Place the `BrowseList` component in the spot where we had the `<!-- Place the browse-list component here -->` comment.

In the `script` section, we created a method `fetchBrowsedItems`. This method is responsible for making calls to the endpoint and retrieving the data based on the `browsePath`, `page` and `pageSize`. The `browsePath` is the alphabet param for the route. It defaults to `a`.

In the `created` lifecycle, we call the `fetchBrowsedItems` method with the `alphabet` param. We also watch the alphabet param for changes and we call the `fetchBrowsedItems` method with the updated param.
