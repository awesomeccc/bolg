import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // 哈斯
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    // 兼容
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
      // 文章列表
      path: '/',
      component(resolve) {
        require(['../views/article/list.vue'], resolve);
      }
    },
    {
      // 文章详情
      path: '/article/detail/:id',
      component(resolve) {
        require(['../views/article/detail.vue'], resolve);
      }
    },
    {
      // 关于我
      path: '/about',
      component(resolve) {
        require(['../views/about/index.vue'], resolve);
      }
    },
    {
      // 小程序
      path: '/minip',
      component(resolve) {
        require(['../views/minipro/index.vue'], resolve);
      }
    },
    {
      // 关于我
      path: '/keyword',
      component(resolve) {
        require(['../components/music/Test.vue'], resolve);
      }
    },
    {
      // 关于我
      path: '/keyword1',
      component(resolve) {
        require(['../components/music/Recommend.vue'], resolve);
      }
    },

    {
      // 关于我
      path: '/music',
      component(resolve) {
        require(['../views/music/MusicHeader.vue'], resolve);
      }
    },
    {
      path: '/music/:id',
      component(resolve) {
        require(['../views/music/PlayerAll.vue'], resolve);
      }
    },

    {
      // 关于我
      path: '/player',
      component(resolve) {
        require(['../components/Aplayer.vue'], resolve);
      }
    },
    // {
    //   // 关于我
    //   path: '/headersall',
    //   component(resolve) {
    //     require(['../views/Headers/HeadersAll.vue'], resolve);
    //   }
    // },
    {
      path: '/headersall',
      component(resolve) {
        require(['../views/Headers/HeadersAll.vue'], resolve);
      },
      children: [{
        //todo: 首页
        path: '/',
        name: 'index',
        meta: {
          module: "/",
          title: '首页'
        },
        component(resolve) {
          require(['../views/article/list.vue'], resolve);
        }
      }, ]
    },
    {
      // 文章列表
      path: '*',
      component(resolve) {
        require(['../views/article/list.vue'], resolve);
      }
    },
  ]
  // routes: [
  //   { path: '/', 
  //   component(resolve) {
  //   require(['../views/Headers/HeadersAll.vue'], resolve)},
  //     children: [
  //       {
  //         // 当 /user/:id/profile 匹配成功，
  //         // UserProfile 会被渲染在 User 的 <router-view> 中
  //         path: 'list',
  //         omponent(resolve) {
  //           require(['../views/article/list.vue'], resolve);
  //         }
  //       },
  //      {
  //     // 关于我
  //     path: '/about',
  //     component(resolve) {
  //       require(['../components/Aplayer.vue'], resolve);
  //     }
  //   },
  //     ]
  //   },
  //   {
  //         // 文章列表
  //         path: '/li',
  //         component(resolve) {
  //           require(['../views/article/list.vue'], resolve);
  //         }
  //       },
  //     ]
})
