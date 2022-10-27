<script>
/*
To use the GlobalToast Component, import it into the component where you'd like a toast message.

The global toast closes itself with the timeout or a user can close it using the 
close icon, which emits to the parent the string 'closeGlobalToast'.
The parent has to be listening for that emit, upon which the parent
clears the local feedbackMessages array and clears the global messages array using
modifyGlobalFeedbackMessages mutation.

When you put items into the feedbackMessages prop, the toast will appear.
You put items into that array using the parent, but a global store exists for 
feedback messages and if you want them available in your component, set up a 
watcher in your component so that if they manifest, they are put into the feedbackMessages.
The parent's mount hook should also do a check for global messages.
*/

export default {
  name: "GlobalToast",
  props: ["feedbackMessages", "timeout"],
  methods: {
    feedbackTimeout(timeout, feedback) {
      setTimeout(
        () => {
          let result = feedback;
          return (result.actionResult = "");
        },
        timeout,
        feedback
      );
    }
  }
};
</script>
<template>
  <div class="global-toast-boxes">
    <div
      class="row"
      v-for="(feedback, index) in feedbackMessages"
      v-bind:key="index"
    >
      <transition name="fade" v-enter="feedbackTimeout(timeout, feedback)">
        <div
          v-if="feedback.actionResult === 'success'"
          class="global-toast-alert"
        >
          <div class="global-toast-alert-header">
            <div class="global-toast-alert-header-right">
              <div
                class="icon-close icon-tiny"
                @click="feedback.actionResult = ''"
              ></div>
            </div>
          </div>
          <div class="alert alert--success">
            <div class="col-lg-1 flex flex-middle">
              <div class="alert__icon icon-check-outline"></div>
            </div>
            <div class="col-lg-10">
              <div class="alert__message">{{ feedback.message }}</div>
            </div>
            <div class="col-lg-1"></div>
          </div>
        </div>
        <div
          v-else-if="feedback.actionResult === 'failure'"
          class="global-toast-alert"
        >
          <div class="global-toast-alert-header">
            <div class="global-toast-alert-header-right">
              <div
                class="icon-close icon-tiny"
                @click="feedback.actionResult = ''"
              ></div>
            </div>
          </div>
          <div class="alert alert--danger">
            <div class="col-lg-1 flex flex-middle">
              <div class="alert__icon icon-error-outline"></div>
            </div>
            <div class="col-lg-10">
              <div class="alert__message">{{ feedback.message }}</div>
            </div>
            <div class="col-lg-1"></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.global-toast-boxes {
  position: absolute;
  right: 0;
  margin-right: 20px;
  width: 20%;
  min-width: 350px;
  z-index: 100 !important;
}
.global-toast-alert {
  position: relative !important;
  z-index: 10;
  background-color: transparent;
  border-bottom: 4px solid transparent;
}
.global-toast-alert-header {
  height: 0.1pt;
  width: 100pt;
  position: relative;
  text-align: right;
  float: right;
  background-color: white;
}
.global-toast-alert-header-right {
  margin: 0.25em;
}
.global-toast-alert .alert {
  min-height: 40px !important;
  width: 100% !important;
  height: 100%;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  background-color: white;
}
.global-toast-alert .alert__icon {
  color: #ffffff !important;
  position: relative !important;
  left: -55px !important;
  font-size: 2.4rem !important;
  top: -1pt !important;
}
.global-toast-alert .alert__message {
  position: relative !important;
  background-color: white;
}
.icon-close.icon-tiny {
  padding-right: 5px;
  z-index: 20;
}
</style>
