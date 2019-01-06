<template>

  <div class="wrapper">

    <div class = 'row'>
      <h1>RansomWatch</h1>
    </div>

    <div class = 'row'>
      <h2>Anti-Ransomware Endpoint Solution</h2>
    </div>
    
    <div class = 'row'>

      <div class = 'col'>
        <p>This is column 1</p>
        <button @click = 'watchDir' class = 'btn btn-primary'>Watch Directory</button>
      </div>

      <div class = 'col'>
        <p>This is column 2</p>
        <button @click = "goTo('hello-world')" class = 'btn btn-success'>Route to another page</button>
      </div>
    </div>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'
  import router from '../router'
  import shell from 'node-powershell'
  import watchr from 'watchr'
  import store from '../store'

  export default {

    name: 'landing-page',

    components: { SystemInformation },

    data() {

      return {

        shutOff: false,
        path: "C:/Users/mr1o/Downloads/test"
      }
    },

    methods: {

      open (link) {

        this.$electron.shell.openExternal(link)
      },

      // Watches file changes in specified path, disables all network adapters if ransomware file extension found
      listener (changeType, fullPath, currentStat, previousStat) {

        switch ( changeType ) {

          case 'update':

            console.log('the file', fullPath, 'was updated', currentStat, previousStat)
            break

          case 'create':

            console.log('the file', fullPath, 'was created', currentStat)

            console.log(store.state.mainState.extensions)

            let trueExtension = fullPath.substr(fullPath.indexOf('.'));

            console.log(trueExtension)

            if (store.state.mainState.extensions.includes(trueExtension)) {

              // Crete powershell instance
              let ps = new shell({ 
                executionPolicy: 'Bypass',
                noProfile: true
              });

              ps.addCommand("Disable-NetAdapter -Name '*' -Confirm:$False") // Disable all network adapters, bypassing confirmation

              ps.invoke() // Run powershell with added commands
                .then(output => {

                  console.log(output);
                })
                .catch(err => {

                  console.log(err);
                  ps.dispose(); // Shut down instance
                });

              console.log('crypto found, doing a bunch of things')
              this.shutOff = true
            }
            break

          case 'delete':

            console.log('the file', fullPath, 'was deleted', previousStat)
            break
        }
      },

      next (err) {
        
        if ( err )  return console.log('watch failed on', this.path, 'with error', err)
        console.log('watch successful on', this.path)
      },

      watchDir () {
         
        // Watch file changes in path, take actions on specific change types
        var stalker = watchr.open(this.path, this.listener, this.next)
      },

      goTo(x) {

        router.push({name: x})
      }
    },

    watch: {

      shutOff: function(x) {

        if (x) {

          // stalker.close()
        }
      }
    }
  }
</script>

<style>


</style>
