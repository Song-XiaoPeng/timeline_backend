<style scoped lang="scss">
  @import "src/sass/register";
  .pclog{
    // background-image: url("../../static/images/login-bg1.jpg");
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
    width: 80px
  }
  .captcha {
    position:relative;
    top:10px;
    right:-32px;
  }
</style>
<template>
  <div>
    <!-- <title-bar></title-bar> -->
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
        <div class="form-region">
          <div class="from-title">验证码：</div>
          <div class="from-input">
            <input type="text" autocomplete="off" v-model="captchaStr" @keyup.enter="login()">
          </div>
        </div>
        <div class="form-region">
          <div class="from-title">记住密码：</div>
          <div class="from-input" style="position:absolute">
            <input type="radio">
            <img :src="captcha" alt="" @click="getCaptchaImg" class="captcha">
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
  import {setStorage,USER_INFO_KEY} from "../../libs/util";
  import md5 from "js-md5"

  export default {
    data() {
      return {
        captchaStr: '',
        captchaMd5: '',
        captcha:'',
        nickname: '',
        password: '',
        loginLoading: false
      };
    },
    components: {
      TitleBar
    },
    methods: {
        getCaptchaImg(){
            let that = this;
            ajax.getCaptchaImg({
            data:{},
            success(res){
                that.captcha = res.data.image
                that.captchaMd5 = res.data.verify
            },
            error(res){
                that.$Message.error('错误');
            }
        });
      },
      login() {
        var that = this
        this.loginLoading = true
        if(md5(this.captchaStr) !== this.captchaMd5){
            console.log(this.captchaMd5)
            console.log(md5(this.captchaStr))
            this.loginLoading = false
            this.$Message.error('验证码输入错误！');
            this.getCaptchaImg()
            return
        }
        ajax.login({
          data: {
            nickname: this.nickname,
            password: this.password,
            type: 'backend',
          },
          success(res){
            that.loginLoading = false;
            setStorage(USER_INFO_KEY,JSON.stringify(res))
            // window.localStorage.setItem('userInfo',JSON.stringify(res))
            that.$store.commit('changeUserInfo',res)
            Cookie.set('uid',res.uid,{expires: 7})
            that.$Message.success('登录成功');
            that.$router.push('/index')
          },
          error(res){
            that.loginLoading = false;
            that.$Message.error(res);
          }
        })
      }
    },
    created () {
        this.getCaptchaImg()
    }
  };
</script>
