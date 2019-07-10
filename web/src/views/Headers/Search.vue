<template>
  <div>
    <div class="search">
      <el-input
        placeholder="请输入搜索内容"
        size="small"
        clearable
        maxlength="32"
        prefix-icon="el-icon-search"
        @keyup.enter.native="getSearchArticle"
        v-model="keyword"
      ></el-input>
      <!-- <button @click = "get">123</button> -->
      <ul>
        <li v-for="item in srcList" :key="item.id" v-show="keyword">
          <a class="srcline" :href=item.src>{{'点击跳转到: ' + item.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import merge from "webpack-merge";
import { mapActions, mapState } from "vuex";
export default {
  props: {},
  data() {
    return {
      keyword: "",
      list: [],
      srcList: [],
      count: 0
    };
  },
  computed: {
    ...mapState({}),
    hasNoData() {
      return !this.list.length;
    }
  },
  methods: {
    ...mapActions({
      searchArticle: "article/searchArticle",
      getArticleList: "article/getArticleList"
    }),
    /**
     * 搜索文章
     * @returns 文章列表
     */
    async getSearchArticle() {
      const keyword = this.keyword;
      if (!keyword) return false;

      const path = this.$route.path;
      let articlePath = "/";

      if (path !== articlePath) {
        articlePath += `?keyword=${keyword}`;
        this.$router.push(articlePath);
      } else {
        this.$router.replace({
          query: merge(this.$route.query, {
            keyword
          })
        });
        console.log(this.$router)
        this.getArticle();
      }
    },
    /**
     * 获取列表
     *
     * @returns 文章列表
     */
    async getList() {
      let res = await this.getArticle();
      this.list = res.data.data.data;
      this.list.forEach(ele => {
        let o = {
          src: "article/detail/" + ele.id,
          id: ele.id,
          title: ele.title
          }
        this.srcList.push(o)
        o = {}
        console.log(this.srcList)
      });
      this.list = []
    },
    /**
     * 获取文章
     *
     * @returns 文章列表
     */
    async getArticle() {
      const { page, desc, category_id, keyword } = this.$route.query;
      let res = await this.getArticleList({
        page,
        desc,
        keyword,
        category_id
      });
      this.list = res.data.data.data;
      this.list.forEach(ele => {
        let o = {
          src: "article/detail/" + ele.id,
          id: ele.id,
          title: ele.title
          }
          console.log(o.id)
          if(this.srcList.length>2){
            this.srcList.shift();
          }
        this.list = []
        this.srcList.push(o)
        o = {}
       
      });
       console.log(this.srcList)
    }
  }
};
</script>
<style>
.srcline {
  text-decoration: none;
  font-size: 20px;
  display: inline-block;
  border-bottom: 2px dashed #657180;
  margin-left:50px;
  margin-bottom: 10px;
  color: #657180
}
</style>
