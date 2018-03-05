<template>
   <div>
        <Menu width="mywidth" ref="menu" :theme="theme3" :active-name="activitymenu" @on-select="menuSelected">
        <div v-for="item in menuGroup">
            <MenuGroup :title="item.title">
                <div v-for="(item1,key) in menuData" v-if="item.name === item1.groupName">
                    <MenuItem :name="key">
                        <Icon :type="item1.icon"></Icon>
                        {{ item1.title }}
                    </MenuItem>
                </div>
            </MenuGroup>
        </div>
    </Menu>
   </div>
</template>
<script>
    import {menu as menuData,groupMenu as menuGroup} from 'config/menu'
    import bus from 'api/bus'

    export default 
    {
        data () {
            return {
                theme3: 'dark',
                menuData: menuData,
                menuGroup: menuGroup,
                breadcrumb:''
            }
        },
        methods:{
           menuSelected(name) {
            //    let strArr = name.split('.')
               let sunMenu = this.menuData[name]
               bus.$emit('getBreadcrumb',sunMenu.breadcrumb)
               this.$router.push(sunMenu.route)
           } 
        },
        props: ['activitymenu','mywidth'],        
        mounted(){
        }
    }
</script>