/**
 * 管理员菜单
 * @type {*[]}
 */

  // 查看菜单列表
const menus = [
    {
      name: "首页",
      path: "/",
      icon: "ios-navigate"
    },
    // 系统管理
    {
      name: "系统管理",
      path: "set",
      icon: "ios-cog",
      children: [
        {
          icon: "md-contacts",
          name: "管理员管理",
          path: "/admin"
        }
      ]
    },
    {
      name: "分类管理",
      path: "category",
      icon: "md-move",
      children: [
        {
          name: "分类列表",
          path: "/category",
          icon: "md-list"
        },
        {
          name: "分类创建",
          path: "/category/create",
          icon: "md-add-circle"
        }
      ]
    },
    {
      name: "文章管理",
      path: "article",
      icon: "md-list-box",
      children: [
        {
          name: "文章列表",
          path: "/article",
          icon: "md-list"
        },
        {
          name: "文章创建",
          path: "/article/create",
          icon: "md-add-circle"
        }
      ]
    },
    {
      name: "评论管理",
      path: "comments",
      icon: "md-text",
      children: [
        {
          name: "评论列表",
          path: "/comments",
          icon: "md-list"
        }
      ]
    },
    {
      name: "图书管理",
      path: "book",
      icon: "ios-book",
      children: [
        {
          name: "图书列表",
          path: "/book",
          icon: "md-list"
        },
        {
          name: "添加图书",
          path: "/addbooks",
          icon: "md-list"
        }
      ]
    },
    {
      name: "音乐管理",
      path: "",
      icon: "ios-headset",
      children: [
        {
          name: "图书列表",
          path: "/book",
          icon: "md-list"
        },
        {
          name: "添加图书",
          path: "/addbooks",
          icon: "md-list"
        }
      ]
    },
    {
      name: "电影管理",
      path: "",
      icon: "ios-desktop",
      children: [
        {
          name: "图书列表",
          path: "/book",
          icon: "md-list"
        },
        {
          name: "添加图书",
          path: "/addbooks",
          icon: "md-list"
        }
      ]
    }

  ];

export {menus};
