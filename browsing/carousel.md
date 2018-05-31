# Artists Carousel

Let's add a carousel to the browse page, this will showcase the imagery of the artistes on our application.We'll create a separate component to handle the functionality of the carousel and then we'll place the component in the browse page. Create a file called `Carousel.vue` and update the contents with the following:

```vue

<template>
  <div>
    <v-carousel hide-controls hide-delimiters interval="3000" dark>
      <v-carousel-item v-for="(item,i) in transformedItems" 
        :src="item.src" 
        :key="item.id"
        transition="fade"
        reverse-transition="fade">
		    <h1 class="display-4">{{item.name}}</h1>
		    <img :src="transformCoverImage(item)"  @click="navigateTo(item)">  	     
      </v-carousel-item>
	  </v-carousel>
  </div>
</template>

<script>
import { goTo, normalizeTitle, cl } from '../utils';
export default {
  name: 'carousel',
  props: ['items', 'type'],
  data() {
    return {
      goTo,
      normalizeTitle,
      cl,
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
    transformCoverImage(item) {
      console.log(item);
      let url =
        item.image ||
        'http://artwork-cdn.7static.com/static/img/artistimages/00/008/194/0000819457_300.jpg';
      return this.cl.url(url, {
        width: '1036',
        height: 250,
        gravity: 'center',
        crop: 'pad',
        aspectRatio: '16:9',
        background: 'auto:predominant',
        effect: 'gradient_fade:symmetric_pad:0.05',
        fetchFormat: 'auto',
        format: 'png',
        quality: 'auto',
        type: 'fetch',
      });
    },
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
<style>
.carousel {
  height: 350px;
}

.fade-enter-active,
.fade-leave-active,
.fade-leave-to {
  transition: 0.3s ease-out;
  position: absolute;
  top: 0;
  left: 0;
}
.fade-enter,
.fade-leave,
.fade-leave-to {
  opacity: 0;
}
</style>
```

The `cl` function we imported from the `utils` file is from the Cloudinary library. Using cloudinary, we can transform the images on the carousel as seen in the `transformCoverImage` method. [Cloudinary](cloudinary.com) is the media management platform for web and mobile developers.

Let's install the Cloudinary js library to help us with image transformation. Run the following command in a terminal in your project folder:

```
npm install cloudinary-core
```

Then open the `utils.js` file and initialize the Cloudinary library there. Update the `utils.js` file with the snippet below.

```javascript
// utils.js

...

export const cl = cloudinary.Cloudinary.new({
  cloud_name: 'christekh',
  secure: true,
});
```

Now let's reference the newly created carousel component in our `browse` page. Update the `Browse.vue` file to include the `Carousel` component. Replace the `<!-- place carousel here --> comment with the actual carousel component

```vue
<template>
  ...
  <v-container fluid>
    <v-layout>
      <v-flex xs8 offset-xs2>
            <carousel  v-if="!loading" :items="items" :type="type" :pageSize="pageSize" :totalItems="totalItems" @changePage="changePage($event)"></carousel>         
      </v-flex>
    </v-layout>
  </v-container>
  ...
</template>

<script>
...
import Carousel from './Carousel';

export default {
  name: 'browser',
  ...
  components: {
    ...
    Carousel
  }, 
}
</script>
...
```

Now you should see the carousel component right above the search area.
