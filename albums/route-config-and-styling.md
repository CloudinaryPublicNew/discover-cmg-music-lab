# Configuring Route and Styling for Albums Page

When we click on an artiste on the browse page, we'll like to see a list of their featured albums. This will serve as the albums page. To create the albums page, we need to create a component to display all the data on the page and then register this component in the routes list.

Create a file called `Album.vue` in the `components` folder. The `components` folder can be found in the `src` directory, Open the newly created file and update it with the code below:

```vue
// Album.vue

<template>
  <div class="container-a">
    <v-layout row v-if="!noAlbums">
      <v-flex xs12>

        <!-- artiste banner here -->

      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <v-breadcrumbs large>
          <v-icon slot="divider">chevron_right</v-icon>
          <v-breadcrumbs-item
            v-for="item in breadcrumbs"
            :key="item.text"
            :href="item.link"
            :disabled="item.disabled">
            {{ item.text }}
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex xs2>
          
          <!-- artist avatar image here -->
          
        </v-flex>
        <v-flex xs1/>
        <v-flex xs9>
          <h3 v-if="noAlbums">No albums available to stream.</h3>

          <!-- album list here -->

          <rise-loader :loading="loading" color="#fff" v-if="!noAlbums"></rise-loader>
        </v-flex>
      </v-layout>
    </v-container>
  </div>

</template>

<script>
import RiseLoader from 'vue-spinner/src/RiseLoader';
import { API_BASE_URI, cl } from '../utils';

export default {
  data() {
    return {
      artist: {},
      albums: [],
      items: [],
      parallaxImage: '',
      cl,
      API_BASE_URI,
      noAlbums: false,
      loading: false,
    };
  },
  created() {
  },
  computed: {
    breadcrumbs() {
      return [
        {
          text: 'Search',
          link: '/browse/a',
          disabled: false,
        },
        {
          text: this.artist.name,
          link: this.$route.path,
          disabled: false,
        },
      ];
    },
    transformArtistAvatarImage() {
      return this.cl.url(this.artist.image, {
        width: 200,
        height: 200,
        gravity: 'auto:body',
        crop: 'fill',
        fetchFormat: 'auto',
        quality: 'auto',
        radius: '50:0:50:0',
        type: 'fetch',
        format: 'png',
      });
    },
    transformArtistBannerImage() {
      let url = this.artist.image;
      return this.cl.url(url, {
        width: '1400',
        height: 150,
        gravity: 'west',
        crop: 'lpad',
        aspectRatio: '16:9',
        background: 'auto:predominant',
        radius: '0:0:149:0',
        fetchFormat: 'auto',
        format: 'png',
        quality: 'auto',
        type: 'fetch',
      });
    },
  },
  methods: {
  },
  components: {
    RiseLoader,
  },
};
</script>

<style>
.album-artist {
  position: relative;
}
.album-artist img {
  width: 200px;
  height: 200px;
  margin: auto;
  display: block;
}
.album-artist h3 {
  text-align: center;
  margin-top: 10px;
}
.banner {
  position: absolute;
  top: 80px;
  left: 300px;
  font-size: 72px;
  color: #231f20;
}
.banner-image {
  height: 150px !important;
  display: block !important;
}
</style>

```

The component we just created doesn't do much, there's still a lot to be done before it becomes the very cool albums page we hope it to be. But no rush, we'll do that soon. First, let's create a route and register this component as a page.

Open the `routes.js` file and update the `routes` list to include the albums page route.

```javascript
...
import Album from './components/Album';

const routes = [
  ...
  {
    name: 'album',
    path: '/artist/:artistId/:name',
    component: Album
  },
]
...
```

Now that the albums page has been created, you can click on an artiste on the `browse` page to see what should be their album list. Currently, you'll find just breadcrumbs there but we're working on getting the album list next.