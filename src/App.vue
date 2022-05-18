<template>
  <div id="app">
    <b-navbar class="is-primary">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'home' }">
          <img src="@/assets/images/aim-logo-white.png" alt="Catalyst AIM"/>
        </b-navbar-item>
      </template>
      <template #start>
      </template>
      <template #end>
        <b-navbar-item>
          Version {{ app.version || '0.1' }}
        </b-navbar-item>
        <b-navbar-dropdown label="Bounty Tool">
          <b-navbar-item 
            tag="router-link" :to="{ name: 'profile' }">
            Profile
          </b-navbar-item>
          <b-navbar-item 
            tag="router-link" :to="{ name: 'instructions' }"> 
            Instructions
          </b-navbar-item>
          <!-- <b-navbar-item tag="router-link" :to="{ name: 'stats' }">
            Statistics
          </b-navbar-item> -->
        </b-navbar-dropdown>
      </template>
    </b-navbar>
    
    <router-view/>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>Made by Catalyst Community for the Catalyst Community</p>
        <p><img class="aim-logo" src="@/assets/images/aim-logo.png" alt="Cardano AIM" /></p>
        <b-button
          label="Feedback"
          type="is-primary"
          icon-left="message-reply-text"
          tag="a"
          target="_blank"
          href="https://forms.gle/BUFPVPetPvetpQB5A"
          >
        </b-button>
      </div>
    </footer>
  </div>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    computed:{
      ...mapState({
        app: (state) => state.app
      })
    }
  }
</script>
<style lang="scss">
.aim-logo {
  width: 150px;
}
</style>
