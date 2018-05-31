# Displaying an Artist's Banner Image

The next step now is showing an image of the artist on the `Album` page. In the template section of the `Album` we made some comments to be filled later. Now we'll replace those comments with actual elements to display a banner image.

Open the `Album.vue` page and update the template section with the snippet below:

```html
<template>
  <v-layout row v-if="!noAlbums">
    <v-flex xs12>
      <!-- artiste banner here -->
      <img class="banner-image" :src="transformArtistBannerImage" :alt="artist.name">
      <h3 class="banner">{{artist.name}}</h3>
    </v-flex>
  </v-layout>

  ...
  <v-container>
    <v-layout row>
      <v-flex xs2>
        <!-- artist avatar image here -->
        <div class="album-artist" v-if="!noAlbums">
          <img :src="transformArtistAvatarImage" :alt="artist.name">
          <h3>{{artist.name}}</h3>
        </div>
      </v-flex>
      <v-flex xs1/>
      <v-flex xs9>
        <h3 v-if="noAlbums">No albums available to stream.</h3>
        ...
  ...
</template>
```

Be sure to look out for the comments and place the new snippets where the comments where. A banner of each artist should now be visible on their album page.

