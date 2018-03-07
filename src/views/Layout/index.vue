<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <div><h2 style="color:red;text-align:center;line-height:64px;height:64px;background-color:blue;">@sone时光机后台</h2></div>
                <myMenu :class="menuitemClasses" mywidth="auto" :activitymenu="activityName"></myMenu>
                <div class="sign-out" @click="logout()" style="color:white;margin-top:450px;padding-left:24px;cursor:pointer;">
                    <Icon type="power"></Icon> 退出系统
                </div>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem v-for="(item,key) in breadcrumb" :key="key">{{item}}</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div style="">
                          <router-view></router-view>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import myMenu  from './components/menu'
    import bus from 'api/bus'
    import {menu as menuData} from 'config/menu'
    import Cookie from 'js-cookie'

    export default {
        data () {
            return {
                isCollapsed: false,
                breadcrumb: [],
                activityName: 0,
                menuData
            };
        },
        beforeRouteUpdate (to,from,next){
            next()
        } ,
        methods :{
            initmenu() {
                let url = window.location.pathname
                for(let i=0;i<this.menuData.length;i++){
                    if(this.menuData[i].route == url){
                        this.activityName = i
                        this.breadcrumb = this.menuData[i]['breadcrumb']
                        break
                    }
                }
            },
            logout() {
                Cookie.remove('uid')
                window.localStorage.removeItem('userInfo')
                this.$router.push('/login')
            },
            activityName2Breadcrumb(name){
                this.activityName = name
                this.breadcrumb = this.menuData[name].breadcrumb
                // for(var i=0;i<this.menuData.length;i++){
                //     if(this.menuData[i].route === name){
                //         this.activityName = i
                //         this.breadcrumb = this.menuData[i].breadcrumb
                //         break
                //     }
                // }
            }
        },
        components:{
            myMenu
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        created(){
            this.initmenu();
        },
        watch:{
            activityName(newVal,oldVal){

            }
        },
        mounted() {
            let that = this
            bus.$on('getBreadcrumb',function(name){    
                let sunMenu = that.menuData[name]
                that.activityName = name
                that.breadcrumb = sunMenu.breadcrumb
            })

            bus.$on('activityNameChange',function(name){
                that.activityName2Breadcrumb(name)
            })
        }
    }
</script>
