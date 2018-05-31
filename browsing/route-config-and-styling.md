# Configuring Route and Styling for Browse Page
Our application will be needing an index page where artistes, their albums and tracks will be listed. We’ll call this page the browse page. First, we’ll install the packages that we’ll be making use of. Run the following command in a terminal in the root folder of your project.

```terminal
npm install vue-social-sharing vue-spinner vue-aplayer lodash hls.js
```

Let’s create the `browse` component, create a file called `Browse.vue` in the `components` folder and follow the steps below to create the component.

### Template
Make the template section of the component identical to the one below:

```html
<template>
 <div>
   <v-container fluid>
    <v-layout>
      <v-flex xs8 offset-xs2>
            <!-- carousel component here -->       
      </v-flex>
    </v-layout>
    
  </v-container>
    <v-container fluid fill-height>
    <v-layout>
      <v-flex xs8 offset-xs2>
         <v-text-field
          name="input-1-3"
          label="Search Artists"
          single-line
          prepend-icon="search"
          v-model="search"
        ></v-text-field> 
      </v-flex>
    </v-layout>
    
  </v-container>
  <v-container>
    <v-layout>
        <!-- pagination and browse list will come here -->
    </v-layout>
  </v-container>
 </div>
</template>
```

### Styles
Update the `style` section of the component with the following styles:

```css
<style>
  .alphabets .container {
    padding: 2px;
  }
  .alphabets .layout {
    padding: 10px 15px;
    text-align: center;
  }
  .alphabets .layout:hover {
    background: #e1e1e1;
    color: #303030;
    cursor: default;
  }
  .pagination {
    margin-top: 15px;
  }
  .pagination__item--active {
    color: #303030 !important;
  }
</style>
```

### Script

```javascript

<script>

export default {
  name: 'browser',
  data() {
    return {
      search: '',
      loading: false,
    };
  },
  watch: {
  },
  created() {
  },
  methods: {
  },
  components: {
  },
};
</script>
```
    

## Configuring route 
Let’s create a route for the newly created `Browse` component. Open the `router.js` file in the `src` folder. Update the routes array to include the `Browse` route.

```javascript
// router.js
...
import Browse from './components/Browse';
const routes = [
  {
    name: 'browse',
    path: '/',
    redirect: './browse/a',
  },
  {
    name: 'browse-alpha',
    path: '/browse/:alphabet',
    component: Browse,
  },
];
...
```

Since the browse page will serve as our home page; whenever someone visits the root route, it will redirect them to the `/browse/a` route. The browse route will take a parameter, which is the letter of the alphabet. Artistes with names starting with that letter will be fetched to populate the page.

