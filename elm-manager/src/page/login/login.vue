<template xmlns:el="http://www.w3.org/1999/html">
<div class="login_page fillcontain">
  <transition name="form-fade" mode="in-out">
    <section class="form_contianer" v-show="showLogin">
      <div class="manage_tip">
        <p>xiaobaigou后台管理系统</p>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="70px" label-position="left">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="loginForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')" >登陆</el-button>
        </el-form-item>
      </el-form>

      <p class="tip">温馨提示：</p>
      <p class="tip">未登录过的新用户，自动注册</p>
      <p class="tip">注册过的用户可凭账号密码登录</p>
    </section>
  </transition>
</div>
</template>

<script>
  import {mapActions,mapState} from 'vuex'
  import {login} from '@/api/getData'
export default {
    data(){
      return {
        loginForm: {
            username: '',
            password: '',
        },
        rules: {
            username: [{required: true, message: '帐号不能为空', trigger: 'blur'}],
            password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
        },
        showLogin: false,
      }
    },
    mounted(){
      this.showLogin = true;
      if(!this.adminInfo.id){
        this.getAdminData();
      }
    },
    computed: {
      ...mapState(['adminInfo'])
    },
    methods: {
      ...mapActions(['getAdminData']),
      async submitForm(formName){
        this.$refs[formName].validate(async (valid) =>{
          debugger;
          if(valid){
            const res = await login({user_name: this.loginForm.username,password: this.loginForm.password});
            if(res.status == 1){
              this.$message({
                type: 'success',
                message: '登陆成功'
              })
              this.$router.push('manage');
            }else{
              this.$message({
                type: 'error',
                message: res.message
              });
            }
          }else{
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        })
      },
    },
    watch: {
      adminInfo(newValue,oldValue){
        debugger;
        if(newValue.id){
          this.$message({
            type: 'success',
            message: '已登陆，将进行跳转'
          });
          this.$router.push('manage')
        }
      }
    }
}
</script>

<style lang="less" scoped>
  @import "../../style/mixin";
  .login_page{
    background-color: #324057;
  }
  .manage_tip{
    position: absolute;
    width: 100%;
    top: -70px;
    left: 0;
    p{
      font-size: 30px;
      color: #fff;
    }
  }
  .form_contianer{
    .wh(320px, 210px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
      width: 100%;
      font-size: 16px;
    }
  }
  .tip{
    font-size: 12px;
    color: red;
  }
  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }
  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
