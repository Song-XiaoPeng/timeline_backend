<style scoped lang="scss">
  @import "src/sass/register";
  .pclog{
    background-image: url("../../static/images/login-bg.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .pclog-mian{

    background: rgba(255,255,255,0.2);
    position: absolute;
    top:50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -175px;
    box-shadow:0 0 20px 0px #eaeaea;
  }
  .from-title{
    width: 64px
  }
</style>
<template>
  <div>
    <title-bar></title-bar>
    <div class="pclog">
      <div class="pclog-mian">
        <center class="sign-title">用户登录</center>
        <div class="form-region">
          <div class="from-title">用户名：</div>
          <div class="from-input">
            <input autocomplete="off" v-model="nickname" @keyup.enter="login()">
          </div>
        </div>
        <div class="form-region">
          <div class="from-title">密&nbsp;&nbsp;&nbsp;码：</div>
          <div class="from-input">
            <input type="password" autocomplete="off" v-model="password" @keyup.enter="login()">
          </div>
        </div>
        <div class="form-region" style="margin-top:30px;">
          <center>
            <Button-group size="large" shape="circle">
              <Button type="primary" style="width:150px;" @click="login()" :loading="loginLoading">登录系统</Button>
            </Button-group>
          </center>
        </div>
      </div>
    </div>
    <div class="copyright">
        <p>@sone的时光机</p>
    </div>
  </div>
</template>
<script>
  import TitleBar from '@src/components/TitleBar';
  import ajax from 'api'
  import Cookie from 'js-cookie'

  export default {
    data() {
      return {
        nickname: '',
        password: '',
        loginLoading: false
      };
    },
    components: {
      TitleBar
    },
    methods: {
      login() {
        var that = this
        this.loginLoading = true
        ajax.login({
          data: {
            nickname: this.nickname,
            password: this.password,
            type: 'backend'
          },
          success(res){
            this.loginLoading = false;
            window.localStorage.setItem('userInfo',JSON.stringify(res))
            Cookie.set('uid',res.id,{expires: 7})
            that.$Message.success('登录成功');
            that.$router.push('/index')
          },
          error(res){
            that.$Message.error('账号密码错误');
          }
        })
      }
    },
    created () {
      
    }
  };
</script>
