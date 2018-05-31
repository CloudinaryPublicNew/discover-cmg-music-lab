# Fetching and Listing of Albums

Before we make the call to the server to get the list of an artiste's albums, we'll need a component to display that list. For that, we'll create a new component called `AlbumList`.

Create a file called `AlbumList.vue` in the components folder. Update the file with the code below:

```vue
// AlbumList.vue

<template>
 <v-container fluid grid-list-md>
   <v-layout row wrap>
     <v-flex xs6 v-for="album in albums" :key="album.id">
       <a @click="navigateTo(album)">
       <v-card>
         <v-card-media
           :src="transformArtistBannerImage(album.image.replace('http', 'https'))"
           height="200px"
         >
           <v-container fill-height fluid>
             <v-layout fill-height>
               <v-flex xs12 align-end flexbox>
             <p>{{transformArtistBannerImage(album.src)}}</p>
               </v-flex>
             </v-layout>
           </v-container>
         </v-card-media>
         <v-card-actions>
           <span class="headline white--text" v-text="album.title"></span>
         </v-card-actions>
       </v-card>
     </a>
     </v-flex>
   </v-layout>
 </v-container>
</template>

<script>
import { goTo, formatSlug, normalizeTitle } from '../utils';
export default {
  data() {
    return { goTo, formatSlug };
  },
  props: ['albums', 'cl'],
  methods: {
    navigateTo(item) {
      return goTo(
        this.$router,
        `/player/${item.id}/${formatSlug(item.title)}/track/0`,
        item
      );
    },
    transformArtistBannerImage(image) {
      return this.cl.url(image, {
        width: 300,
        height: 150,
        gravity: 'center',
        crop: 'pad',
        background: 'auto:predominant',
        fetchFormat: 'auto',
        quality: 'auto',
        type: 'fetch',
      });
    },
  },
};
</script>

<style>
.card__media__content {
  height: 200px;
}
</style>
```

In this component, we'll be looping through and displaying the list of items provided as a prop to the component. This component will receive two props, `items` and `cl`. The `items` prop will be the list of albums, while `cl` is cloudinary library for image transformation.

In the methods object of the component, we have two functions, `navigateTo` and `transformArtisteBannerImage`. The `navigateTo` function takes one param, the album item and then it uses the `goTo` to navigate the user to the formatted route. The `formatSlug` function will format the album title to a slug format. Let's go ahead and create the `formatSlug` function in the `utils.js` file.

```javascript
// utils.js
 ...

 export const formatSlug = (str) => (
 str
   .replace(/\//g, '-')
   .replace(/ /g, '-')
   .replace(/:/g, '')
   .toLowerCase()
 );
```

Place the `formatSlug` function at the end of the `utils.js` file beneath the previously created functions.

### List albums

Now that we've created the `AlbumList` component, let's use it to display the list of albums on the `Album` page. Update the `Album.vue` page to look like so.

Place the `album-list` element where we have the `<!-- album list here --> comment.

```vue
// Album.vue
<template>
  ...
  <v-flex xs9>
    <h3 v-if="noAlbums">No albums available to stream.</h3>
    <album-list v-else :albums="albums" :cl="cl"></album-list>
    <rise-loader :loading="loading" color="#fff" v-if="!noAlbums"></rise-loader>
  </v-flex>
  ...
</template>

<script>
...
import AlbumList from './AlbumList';
export default {
  data() {
    ...
  },
  created() {
    this.fetchAlbums(this.$route.params.artistId);
  },
  computed: {
    ...
  },
  methods: {
    fetchAlbums: async function(artistId) {
      this.loading = true;
      const response = await fetch(`${API_BASE_URI}/releases/${artistId}`);
      const data = await response.json();
      this.albums = data.releases.release;
      if (this.albums.length < 1) {
        this.noAlbums = true;
        return;
      }
      this.artist = this.albums[0].artist;
      this.loading = false;
    },
  },
  components: {
    AlbumList,
    RiseLoader,
  },
};
</script>

```

We've updated the `Album` component to get the list of an artiste's albums using the `artistId`. The `fetchAlbums` method makes the `GET` request to the server to get the list albums. Then the returned album list is set to the `albums` property.

In the `created` lifecycle, the `fetchAlbums` method is called with the `artistId` param as an argument. 

Visiting the `Album` page, you should now see the list of an artiste's albums. Next is showing the artiste's banner image.