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
        title: "用户留存",
        icon:"heart",
        // name:"1.0.3",
        groupName:"1",
        route: "/index",
        breadcrumb:["统计分析","用户留存"]
    },
    {
        title: "流失用户",
        icon:"heart-broken",
        // name:"1.1.4",
        groupName:"1",
        route: "/index?a=1",
        breadcrumb:["统计分析","流失用户"]                
    }
]

let groupMenu = [
    {
        title: "内容管理",
        name:"0",
    },
    {
        title: "统计分析",
        name:"1",
    }
]
export {menu,groupMenu};