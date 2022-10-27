<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import { testcaseService } from "@/core/services/testcaseService";
import { requestOptions } from "@/core/helpers/request";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
export default {
  name: "topologySlides",
  props: ["projectId"],
  data() {
    return {
      primaryOptions: {
        type: "loop",
        width: 800,
        pagination: false,
      },
      secondaryOptions: {
        type: "slide",
        rewind: true,
        width: 800,
        gap: "1rem",
        pagination: false,
        fixedWidth: 110,
        fixedHeight: 70,
        cover: true,
        focus: "center",
        isNavigation: true,
      },
      slides: [],
      topoList: [],
    };
  },
  mounted() {
    // Attept to add a slide.
    this.loadTopologies();
    this.$refs.primary.sync(this.$refs.secondary.splide);
  },
  components: {
    Splide,
    SplideSlide,
  },
  methods: {
    emitToParent(value, payload) {
      this.$emit("child", value, payload);
    },
    loadTopologies() {
      this.loading = true;
      this.loadingMessage = "Loading Topologies..";
      let self = this;
     /* testcaseService.getAllTopologyNames(this.projectId).then(
        (data) => {
          let list = [];
          for (let k = 0; k < data.length; k++) {
            list[k] = data[k].split(".")[0];
          }
          self.topoList = list;
          self.slides = [];
          let obj = {};
          for (let i = 0; i < data.length; i++) {
            obj = {};
            obj["src"] =
              requestOptions.apiUrl() +
              "/get_topology/" +
              self.projectId +
              "_" +
              data[i];
            self.slides.push(obj);
          }
        },
        (error) => {
          this.loading = false;
          this.loadingMessage = "";
          this.showErrorModal = true;
          this.modalErrorMessage =
            "Error while fetching topologies. Please try again later.";
        }
      );*/
    },
    onMounted(splide) {
      // do something
    },

    onArrowsMounted(splide, prev, next) {
      // do something
    },
  },
};
</script>
<template>
  <div class="mainContainer topoSlidesPage">
    <div class="topo_splideContainer">
      <splide :slides="slides" :options="primaryOptions" ref="primary">
        <splide-slide v-for="slide in slides" :key="slide.src">
          <img :src="slide.src" />
        </splide-slide>
      </splide>
      <splide :slides="slides" :options="secondaryOptions" ref="secondary">
        <splide-slide v-for="slide in slides" :key="slide.src">
          <img :src="slide.src" />
        </splide-slide>
      </splide>
    </div>
  </div>
</template>
