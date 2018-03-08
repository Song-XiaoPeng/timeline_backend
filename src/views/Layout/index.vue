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
    h3 {
        text-align: center;
        font-size: 21px;
        font-weight: 300;
        height: 64px;
        line-height: 64px;
        color: #ECEFF1;
    }
    .sign-out {
        position: absolute;
        cursor: pointer;
        font-size: 12px;
        right: 20px;
        top: 0px;
    }
    .avator{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        position: absolute;
        left: 100px;
        top: 0px
    }
    .header{
        position: relative;
    }
    .header p{
        position: absolute;
        left: 0
    }
</style>
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider :collapsed-width="78" v-model="isCollapsed" style="position: 'fixed'," on-collapse="">
                <div><h3>@sone时光机</h3></div>
                <!-- <myMenu :class="menuitemClasses" mywidth="auto" :activitymenu="nowActivityName"></myMenu> -->
                <Menu width="mywidth" ref="menu" :theme="theme3" :active-name="nowActivityName" @on-select="menuSelected" @on-open-change="menuOpenChange">
                    <template v-for="item in menuGroup">
                        <MenuGroup :title="item.title">
                            <template v-for="(item1,key) in menuData" v-if="item.name === item1.groupName">
                                <MenuItem :name="key">
                                    <Icon :type="item1.icon"></Icon>
                                    <span v-if="isSeen">{{ item1.title }}</span>
                                </MenuItem>
                            </template>
                        </MenuGroup>
                    </template>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                    <div class="header">
                        <p> 欢迎，{{ nickname }}！</p>
                        <img :src="avator" alt="" class="avator">
                        <div class="sign-out" @click="logout()">
                            <Icon type="power"></Icon> 退出系统
                        </div>
                    </div>
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem v-for="(item,key) in nowbreadcrumb" :key="key">{{item}}</BreadcrumbItem>
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
    import {menu as menuData,groupMenu as menuGroup} from 'config/menu'
    import Cookie from 'js-cookie'
    import ajax from 'api'

    export default {
        data () {
            return {
                isSeen: true,
                isCollapsed: false,
                breadcrumb: [],
                activityName: 0,
                menuData,
                theme3: 'dark',
                menuGroup: menuGroup,
                breadcrumb:'',
                userInfo: []
            };
        },
        beforeRouteUpdate (to,from,next){
            console.log(to)
            console.log(from)
            for(let i=0;i<this.menuData.length;i++){
                if(this.menuData[i].route == to.path){
                    this.activityName = i
                    this.$store.state.app.activityName = i
                    this.breadcrumb = this.menuData[i]['breadcrumb']
                    this.$store.state.app.breadcrumb = this.menuData[i]['breadcrumb']
                    break
                }
            }
            next()
        } ,
        methods :{
            menuOpenChange() {
                alert(this.isSeen)
                this.isSeen = this.isSeen ? false : true
            },
            menuSelected(name) {
                //    let strArr = name.split('.')
                //    bus.$emit('getBreadcrumb',name)
                this.$store.dispatch('changeBreadcrumb',{name: this.menuData[name].breadcrumb})
                this.$store.dispatch('changeActivityName',{name: name})
                let sunMenu = this.menuData[name]
                this.$router.push(sunMenu.route)
            },
            switchMenu(to) {

            },
            initmenu() {
                let url = window.location.pathname
                for(let i=0;i<this.menuData.length;i++){
                    if(this.menuData[i].route == url){
                        this.activityName = i
                        this.$store.state.app.activityName = i
                        this.breadcrumb = this.menuData[i]['breadcrumb']
                        this.$store.state.app.breadcrumb = this.menuData[i]['breadcrumb']
                        break
                    }
                }
            },
            logout() {
                Cookie.remove('uid')
                window.localStorage.removeItem('userInfo')
                this.$router.push('/login')
            },
            getUserInfo() {
                var that = this
                ajax.getProfile({
                    data:{},
                    success(res) {
                        that.userInfo = res
                    }
                })
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
            },
            nowbreadcrumb(){
                return this.$store.state.app.breadcrumb
            },
            nowActivityName() {
                return this.$store.state.app.activityName
            },
            avator() {
                return this.userInfo.img
                // return this.$store.state.user.userInfo.avator
            },
            nickname() {
                return this.userInfo.nickname
                // return this.$store.state.user.userInfo.nickname
            }
        },
        created(){
            this.getUserInfo()
            // var userInfo = this.$store.state.user.userInfo
            // console.log(this.$store.state)
            // console.log(456456456)            
            this.initmenu();
        },
        watch:{
            activityName(newVal,oldVal){

            }
        },
        mounted() {
            let that = this
            // bus.$on('getBreadcrumb',function(name){    
            //     let sunMenu = that.menuData[name]
            //     that.activityName = name
            //     that.breadcrumb = sunMenu.breadcrumb
            // })

            // bus.$on('activityNameChange',function(name){
            //     that.activityName2Breadcrumb(name)
            // })
        }
    }
</script>
