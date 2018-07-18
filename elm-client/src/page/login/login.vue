<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay ? '登陆' : '密码登录'" :goBack="true"></head-top>

    <form class="" v-if="loginWay">
111
    </form>
    <form class="loginForm" v-else>
      <section class="input_container">
        <input type="text" v-model.lazy="userAccount" placeholder="请输入账号"/>
      </section>
      <section class="input_container">
        <input v-if="!showPassword" type="password" placeholder="密码"  v-model="passWord">
        <input v-else type="text" placeholder="密码"  v-model="passWord">
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePassWordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber"/>
        <div class="img_change_img">
          <img :src="captchaCodeImg" v-show="captchaCodeImg"/>
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>

    <p class="login_tips">
      温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
      注册过的用户可凭账号密码登录
    </p>

    <div class="login_container" @click="mobileLogin">登录</div>

  </div>
</template>

<script>
import headTop from '@/components/header/header'
import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '@/service/getData'
export default {
    data(){
      return {
        loginWay:false,//默认短信
        userAccount:null,//用户名
        showPassword: false, // 是否显示密码
        passWord: null, //密码
        codeNumber: null, //验证码
        captchaCodeImg: null, //验证码地址
      }
    },
    created(){
      this.getCaptchaCode();
    },
    components:{
      headTop
    },
    methods:{
      //是否显示密码
      changePassWordType(){
        this.showPassword = !this.showPassword;
      },
      //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
      async getCaptchaCode(){
        let res = await getcaptchas();
        this.captchaCodeImg = res.code;
      },

      //发送登录信息
      async mobileLogin(){
        if (this.loginWay) {
          if (!this.rightPhoneNumber) {
            this.showAlert = true;
            this.alertText = '手机号码不正确';
            return
          }else if(!(/^\d{6}$/gi.test(this.mobileCode))){
            this.showAlert = true;
            this.alertText = '短信验证码不正确';
            return
          }
          //手机号登录
          this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token);
        }else{
          if (!this.userAccount) {
            this.showAlert = true;
            this.alertText = '请输入手机号/邮箱/用户名';
            return
          }else if(!this.passWord){
            this.showAlert = true;
            this.alertText = '请输入密码';
            return
          }else if(!this.codeNumber){
            this.showAlert = true;
            this.alertText = '请输入验证码';
            return
          }
          //用户名登录
          this.userInfo = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
        }
        //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
        if (!this.userInfo.user_id) {
          this.showAlert = true;
          this.alertText = this.userInfo.message;
          if (!this.loginWay) this.getCaptchaCode();
        }else{
          this.RECORD_USERINFO(this.userInfo);
          this.$router.go(-1);

        }
      },
    }
}
</script>

<style scoped>
  .loginContainer {
    padding-top: 1.95rem;
  }
  .loginContainer p, .loginContainer span, .loginContainer input {
    font-family: Helvetica Neue, Tahoma, Arial;
  }

  .change_login {
    position: absolute;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.75rem;
    font-size: 0.7rem;
    color: #fff;
  }

  .loginForm {
    background-color: #fff;
    margin-top: 0.6rem;
  }
  .loginForm .input_container {
    display: flex;
    justify-content: space-between;
    padding: 0.6rem 0.8rem;
    border-bottom: 1px solid #f1f1f1;
  }
  .loginForm .input_container input {
    font-size: 0.7rem;
    color: #666;
  }
  .loginForm .input_container button {
    font-size: 0.65rem;
    color: #fff;
    font-family: Helvetica Neue, Tahoma, Arial;
    padding: 0.28rem 0.4rem;
    border: 1px;
    border-radius: 0.15rem;
  }
  .loginForm .input_container .right_phone_number {
    background-color: #4cd964;
  }
  .loginForm .phone_number {
    padding: 0.3rem 0.8rem;
  }
  .loginForm .captcha_code_container {
    height: 2.2rem;
  }
  .loginForm .captcha_code_container .img_change_img {
    display: flex;
    align-items: center;
  }
  .loginForm .captcha_code_container .img_change_img img {
    width: 3.5rem;
    height: 1.5rem;
    margin-right: 0.2rem;
  }
  .loginForm .captcha_code_container .img_change_img .change_img {
    display: flex;
    flex-direction: "column";
    flex-wrap: wrap;
    width: 2rem;
    justify-content: center;
  }
  .loginForm .captcha_code_container .img_change_img .change_img p {
    font-size: 0.55rem;
    color: #666;
  }
  .loginForm .captcha_code_container .img_change_img .change_img p:nth-of-type(2) {
    color: #3b95e9;
    margin-top: 0.2rem;
  }

  .login_tips {
    font-size: 0.5rem;
    color: red;
    padding: 0.4rem 0.6rem;
    line-height: 0.5rem;
  }
  .login_tips a {
    color: #3b95e9;
  }

  .login_container {
    margin: 0 0.5rem 1rem;
    font-size: 0.7rem;
    color: #fff;
    background-color: #4cd964;
    padding: 0.5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
  }

  .button_switch {
    background-color: #ccc;
    display: flex;
    justify-content: center;
    width: 2rem;
    height: 0.7rem;
    padding: 0 0.2rem;
    border: 1px;
    border-radius: 0.5rem;
    position: relative;
  }
  .button_switch .circle_button {
    transition: all 0.3s;
    position: absolute;
    top: -0.2rem;
    z-index: 1;
    left: -0.3rem;
    width: 1.2rem;
    height: 1.2rem;
    box-shadow: 0 0.026667rem 0.053333rem 0 rgba(0, 0, 0, 0.1);
    background-color: #f1f1f1;
    border-radius: 50%;
  }
  .button_switch .trans_to_right {
    transform: translateX(1.3rem);
  }
  .button_switch span {
    font-size: 0.45rem;
    color: #fff;
    transform: translateY(0.05rem);
    line-height: 0.6rem;
  }
  .button_switch span:nth-of-type(2) {
    transform: translateY(-0.08rem);
  }

  .change_to_text {
    background-color: #4cd964;
  }

  .to_forget {
    float: right;
    font-size: 0.6rem;
    color: #3b95e9;
    margin-right: 0.3rem;
  }
</style>
