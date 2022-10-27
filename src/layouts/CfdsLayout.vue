<script>
import { router } from "@/router";


export default {
    data(){
        return { 
          names: [],

        }

    },
    methods:{
           gotoLandingPage(){
         router
        .push({
          name: "LandingPage",
        })
        .catch(() => {});
    },
        gotoCustReleasePage(){
         router
        .push({
          name: "CustomerReleasesPage",
        })
        .catch(() => {});
    },
       gotoHomePage(){
         router
        .push({
          name: "HomePage",
        })
        .catch(() => {});
    },
    }

}
</script>

<template>
<div class="container" style="overflow-y:scroll">  
  <header id="rackHeader" class="header header--compressed">
    <nav>
    <div class="header-bar container rackHeaderBar">
        <div class="header-bar__main">
            <div class="header-heading">
              <router-link to="LandingPage">
                <img
                  class="main-logo"
                  src="../../public/images/Cisco_Logo_no_TM_Midnight_Blue-RGB.png"
                />
              </router-link>
             
            </div>
          </div>
      <!-- <div class="header-bar__main">
            <div class="header-heading">
        <span style="margin-right: 35px;">
          <a @click="gotoCustReleasePage()">
            CustomerReleasesPage
          </a>
          </span>
            </div>
      </div> -->
    </div>
    </nav>

         </header>   
        <div>
            <router-view />
        </div>
</div>

</template>

<style>
.header{
    font-size: 1.5em;
    position: sticky;
      top: 0;
}
</style>