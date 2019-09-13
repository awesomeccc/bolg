    
<template>
  <section class="header">
    <header class="header-box">
      <!-- <section class="logo">
        <a href="/"><img src="../assets/images/LOGO.png" alt="LOGO"></a>
      </section>-->
      <!--  -->

      <div class="nav-list">
        <ul class="nav-box">
          <li
            v-for="(item, index) in nav"
            :class="navIndex === index ? 'nav-item nav-item--active' : 'nav-item'"
            @click="changeNav(item.path, index)"
            :key="index"
          >
            <i class="iconfont" v-html="item.icon"></i>
            {{item.name}}
          </li>
        </ul>
      </div>

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
      </div>
    </header>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import merge from "webpack-merge";
export default {
  data() {
    return {
      keyword: "",
      navIndex: 0,
      nav: [
        {
          key: "01",
          name: "首页",
          icon: "&#xe678;",
          path: "/"
        },
        {
          key: "02",
          name: "音乐",
          icon: "&#xe61b;",
          path: "/music"
        },
        //  {
        //   key: '03',
        //   name: '友情链接',
        //   icon: '&#xe69b;'
        // },
        //  {
        //   key: '04',
        //   name: '主题',
        //   icon: '&#xe678;'
        // },
        {
          key: "05",
          name: "关于我",
          icon: "&#xe613;",
          path: "/about"
        },
        {
          key: "03",
          name: "小程序",
          icon: "&#xe69b;",
          path: "/minip"
        },
        {
          key: "04",
          name: "后台管理",
          icon: "&#xe678;",
          path: "http://49.235.152.59:443"
        }
      ]
    };
  },
  mounted() {},
  computed: {
    ...mapState({})
  },   
   created:function () {
            this.$emit('public_footer', true);
        },
  methods: {
    ...mapActions({
      searchArticle: "article/searchArticle",
      showUserManager: "user/showUserManager",
      getArticleList: "article/getArticleList"
    }),
    /**
     * 切换导航栏
     */
    changeNav(path, index) {
      this.$router.replace({
        query: merge({})
      });
      this.navIndex = index;
      this.toPath(path);
      this.getArticle();
    },
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
        this.toPath(articlePath);
      } else {
        this.$router.replace({
          query: merge(this.$route.query, {
            keyword
          })
        });
        this.getArticle();
      }
    },
    /**
     * 获取文章
     *
     * @returns 文章列表
     */
    async getArticle() {
      const { page, desc, category_id, keyword } = this.$route.query;
      await this.getArticleList({
        page,
        desc,
        keyword,
        category_id
      });
    },
    /**
     * 路由调整
     * @param path 路由地址
     */
    toPath(path) {
      if(path.startsWith('http')){
      window.open(path,'_blank')
      }else{
          this.$router.push(path);
    }
      }
    
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "iconfont"; /* project id 1264274 */
  src: url("//at.alicdn.com/t/font_1264274_lpipprhwa0h.eot");
  src: url("//at.alicdn.com/t/font_1264274_lpipprhwa0h.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_1264274_lpipprhwa0h.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_1264274_lpipprhwa0h.woff") format("woff"),
    url("//at.alicdn.com/t/font_1264274_lpipprhwa0h.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_1264274_lpipprhwa0h.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.header {
  width: 100%;
  height: 96px;
  z-index: 5000;
  background: #fff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid #f0f0f0;
  position: absolute;
  top: 0;
}
.header-box {
  width: 70%;
  box-sizing: border-box;
  margin: 0 auto;
  height: 96px;
  display: flex;
  align-items: center;
}
.logo {
  width: 200px;
  height: 96px;
  margin-left: -20px;
  & img {
    width: 100%;
  }
}
.nav-box-dropdown {
  display: none;
}
.nav-list {
  display: block;
  margin: 0 24px;
  & .nav-box {
    display: flex;
    height: 96px;
    width: 100%;
    & .nav-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-items: center;
      padding: 0 24px;
      height: 96px;
      line-height: 96px;
      color: #404040;
      font-size: 20px;
      text-decoration: none;
      &:hover {
        color: #409eff;
      }
    }
    & .icon {
      margin-right: 8px;
    }
    & .nav-item--active {
      color: #409eff;
    }
  }
}
.search {
  position: relative;
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
.nav-dropdown {
  display: none;
}
@media screen and (min-width: 200px) and (max-width: 768px) {
  .header {
    box-sizing: border-box;
    padding: 0 16px;
  }
  .header-box {
    width: 100%;
  }
  .nav-dropdown {
    display: block;
    margin: 0 16px;
  }
  .nav-list {
    display: none;
    margin: 0 16px;
  }
  .search {
    width: auto;
    flex: 1;
  }
}
</style>