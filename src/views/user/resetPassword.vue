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
    margin-top: -200px;
    box-shadow:0 0 20px 0px #eaeaea;
  }
</style>
<template>
  <div>
    <title-bar></title-bar>
    <div class="pclog">
      <div class="pclog-mian">
        <center class="sign-title">找回密码</center>
        <div class="form-region" style="position:relative;">
          <div class="from-title">手机号码：</div>
          <div class="from-input">
            <input type="number" autocomplete="off" v-model="phoneNo">
            <button class="getCodeBut" @click="">{{timerCodeMsg}}</button>
            <div style="clear:both;"></div>
          </div>
        </div>
        <div class="form-region">
          <div class="from-title" >验证密码：</div>
          <div class="from-input">
            <input type="number" autocomplete="off" v-model="code">
          </div>
        </div>
        <div class="form-region">
          <div class="from-title">登录密码：</div>
          <div class="from-input">
            <input type="password" autocomplete="off" v-model="password">
          </div>
        </div>
        <div class="form-region">
          <div class="from-title">确认密码：</div>
          <div class="from-input">
            <input type="password" autocomplete="off" v-model="passwordRepeat">
          </div>
        </div>
        <div class="form-region" style="margin-top:30px;">
          <center>
            <Button-group size="large" shape="circle">
              <Button type="primary" style="width:150px;" @click="modifyPassword()" :loading="loginLoading">提交修改</Button>
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

  export default {
    data() {
      return {
        loginLoading: false,
        phoneNo: '',
        password: '',
        passwordRepeat: '',
        code: '',
        timerCodeMsg: '获取验证码',
        isSend: true
      };
    },
    components: {
      TitleBar
    }
  };
</script>
