<template>
  <div class="headers">
    <headers-co></headers-co>
    <div class="search">
      <search></search>
    </div>
  </div>
</template>
<script>
import HeadersCo from "./HeadersCo.vue";
import Search from "./Search.vue";

export default {
  name: "HeadersAll",
  data(){
    return {
      keywordData: ''
    }
  },
  methods: {
    
  },
  components: {
    HeadersCo,
    Search
  }
};
</script>
<style lang="scss">
.headers {
  display: block;
  height: 50px;

  & .search {
    position: absolute;
    right: 36px;
    top: 2px;
    width: 480px;

    .search-icon {
      position: absolute;
      right: 8px;
      top: 8px;
      color: #aaa;
    }

    & .search-input {
      box-sizing: border-box;
      color: #404040;
      height: 36px;
      line-height: 36px;
      width: 360px;
      font-size: 16px;
      padding-right: 32px;
      padding-left: 10px;
      outline: none;
      border: 1px solid #ccc;

      &:focus {
        border-color: #409eff;
      }

      &::placeholder {
        color: #ccc;
        font-size: 16px;
      }

      &:focus .search-icon {
        color: #409eff;
      }
    }
  }
}
</style>
