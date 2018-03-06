<style scoped lang="scss">
  @import "src/sass/titleBar";
</style>
<template>
  <div>
    <Menu mode="horizontal" theme="dark" :active-name=name>
      <div class="layout-logo">
      	@sone的时光机
      </div>
      <div class="layout-nav">
        <Menu-item name="2" @click.native="jump('2')" v-if="!isPanel">
          <Icon type="ios-keypad"></Icon>
          登录
        </Menu-item>
        <Menu-item name="3" @click.native="jump('3')" v-if="!isPanel">
          <Icon type="ios-analytics"></Icon>
          找回密码
        </Menu-item>
      </div>
    </Menu>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        name: '',
        isPanel: true
      };
    },
    methods: {
      jump (type) {
        this.name = type;
        switch(type){
          case '1':
            this.$router.push('/');
            break;
          case '2':
            this.$router.push('/login');
            break;
          case '3':
            this.$router.push('/resetPassword');
            break;
        }
      },
      cancellation () {
        window.localStorage.removeItem('userInfo');
        this.$router.push('/');
      }
    },
    created () {
      switch (this.$route.name) {
        case '/':
          this.name = '2';
          this.isPanel = false;
          break;
        case 'login':
          this.name = '2';
          this.isPanel = false;
          break;
        case 'resetPassword':
          this.name = '3';
          this.isPanel = false;
          break;
      }
    }
  };
</script>
