<template>
  <div class="wrapper">

    <div class = 'row'>
      <h1>Hello World</h1>
    </div>
    <div class = 'row'>
      <h2>Subheading</h2>
    </div>
    
    <div class = 'row'>
      <div class = 'col'>
        <p>This is column 1</p>
        <button @click = 'helloWorld' class = 'btn btn-primary'>Increment state property</button>
        <p>State Property: {{property()}}</p>
      </div>

      <div class = 'col'>
        <p>This is column 2</p>
        <button @click = "goTo('landing-page')" class = 'btn btn-success'>Go Back</button>
      </div>
    </div>
    <div class = 'row'>
      <div class = 'col'>
        {{extensions()}}
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import store from '../store'

  export default {

    name: 'hello-world',

    components: {  },

    mounted() {

      store.dispatch('loadExtensions')
    },

    data() {

      return {

      }
    },

    methods: {

      extensions() {

        return store.state.mainState.extensions
      },

      property() {

        return store.state.mainState.property1
      },

      helloWorld () {

        store.dispatch('incrementCounter')
      },

      goTo(x) {

        router.push({name: x})
      }
    }
  }
</script>

<style>

  
</style>
