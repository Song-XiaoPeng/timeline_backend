let menu = [
    {
        title: "文章列表",
        icon:"document-text",
        // name: "0.0.1",
        groupName:"0",
        route: "/index/timeline",
        breadcrumb:["内容管理","文章列表"]
    },
    // {
    //     title: "评论管理",
    //     icon:"chatbubbles",
    //     // name: "0.1.2",
    //     groupName:"0",
    //     route: "/index/sone",
    //     breadcrumb:["内容管理","评论管理"]
    // },
    {
        title: "添加文章",
        icon:"chatbubbles",
        // name: "0.1.2",
        groupName:"0",
        route: "/index/setTimeline",
        breadcrumb:["内容管理","添加文章"]
    },
    {
        title: "首页",
        icon:"heart",
        // name:"1.0.3",
        groupName:"index",
        route: "/index",
        breadcrumb:["首页"]
    },
    {
        title: "个人设置",
        icon:"heart-broken",
        // name:"1.1.4",
        groupName:"1",
        route: "/index/setProfile",
        breadcrumb:["用户管理","个人设置"]                
    },
    {
        title: "修改密码",
        icon:"heart-broken",
        // name:"1.1.4",
        groupName:"1",
        route: "/index/modifyPassword",
        breadcrumb:["用户管理","修改密码"]                
    }
]

let groupMenu = [
    {
        title: "首页",
        name: "index"
    },
    {
        title: "内容管理",
        name:"0",
    },
    {
        title: "用户管理",
        name:"1",
    }

]
export {menu,groupMenu};