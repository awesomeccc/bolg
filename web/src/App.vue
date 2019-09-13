<template>
  <div id="app">
   
    <!-- <v-headers/> -->
    <headers-all></headers-all>
     <v-loading :text="loadingText" v-if="isLoading" />
    <router-view  class="router-views"  v-on:public_header="public_header" v-on:public_footer="public_footer" ></router-view>
   <main-footer  v-if="footer_show"> </main-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VLoading from "./components/Loading";
import VHeaders from "./components/Headers";
import MainFooter from "./components/MainFooter";
import HeadersAll from "./views/Headers/headers.vue";

export default {
  components: {
    VLoading,
    VHeaders,
    MainFooter,
    HeadersAll
  },
  data() {
    return {
      centerDialogVisible: true,
      showClose: true,
      header_show: true,
      footer_show: true
    };
  },
  computed: {
    ...mapGetters("loading", ["isLoading", "loadingText"])
  },
  methods: {
    //是否显示头部
    public_header: function(bool) {
      this.header_show = bool;
    },
    //是否显示底部
    public_footer: function(bool) {
      this.footer_show = bool;
    }
  }
};
</script>

<style>
html,
body {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background: #f8f8f8;
}

section,
article,
header,
nav,
ul,
li,
h1,
h2,
h3,
p {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}
.router-views {
  padding-bottom: 60px;
  margin-top: 96px;
}
</style>
