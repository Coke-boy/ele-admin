<template>
  <div class="login-container">
    <!-- 左侧盒子 -->
    <div class="left-box">
      <!-- 顶部的标题 -->
      <div class="title-box">
        <img src="../../assets/login_logo.png" alt="" class="logo" />
        <span class="title">ele-admin</span>
        <span class="line"></span>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="loginForm" :rules="rules" :model="loginForm" label-width="43px">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="loginForm.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="loginCode">
          <el-row>
            <el-col :span="17">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="loginForm.loginCode"></el-input>
            </el-col>
            <el-col :span="7" class="code-col">
              <!-- 登录验证码 -->
              <img @click="changeCode" class="login-code" :src="codeURL" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="loginForm.isChecked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>
            和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="my-btn" @click="submitForm('loginForm')" type="primary">登录</el-button>
          <el-button @click="showRegister" class="my-btn" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <img src="../../assets/login_banner_ele.png" alt="" />
    <registerDialog ref="registerDialog"></registerDialog>
  </div>
</template>

<script>
import registerDialog from './components/registerDialog.vue';
// 定义校验函数 - 手机
import { checkPhone } from '@/utils/validator.js';
import { login } from '@/api/login.js';
import { setToken } from '@/utils/token.js';

export default {
  name: 'login',
  components: {
    registerDialog
  },
  data() {
    return {
      loginForm: {
        // 手机号
        phone: '',
        // 密码
        password: '',
        // 验证码
        loginCode: '',
        // 是否勾选
        isChecked: false
      },
      // 校验规则
      rules: {
        phone: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          },
          { validator: checkPhone, trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '密码的长度为6-12位', trigger: 'blur' }
        ],
        loginCode: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码的长度为4位', trigger: 'blur' }
        ]
      },
      // 验证码的地址
      codeURL: process.env.VUE_APP_URL + '/captcha?type=login'
    };
  },
  methods: {
    // 刷新验证码
    changeCode() {
      this.codeURL = process.env.VUE_APP_URL + '/captcha?type=login&t=' + Date.now();
    },
    // 用户提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证正确
          // 验证是否勾选
          if (this.loginForm.isChecked != true) {
            return this.$message.warning('请勾选用户协议');
          }
          // 验证通过
          login({
            phone: this.loginForm.phone,
            password: this.loginForm.password,
            code: this.loginForm.loginCode
          }).then(res => {
            // 正确
            if (res.data.code === 200) {
              // this.$message.success('欢迎你');
              // 服务器返回了token
              setToken(res.data.data.token);
              // 跳转到首页
              this.$router.push('/index');
            } else if (res.data.code === 202) {
              this.$message.error(res.data.message);
            }
            // 错误
          });
        } else {
          this.$message.error('验证失败');
          // 验证错误
          return false;
        }
      });
    },
    // 显示注册对话框
    showRegister() {
      this.$refs.registerDialog.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
  display: flex;
  align-items: center;
  justify-content: space-around;

  .left-box {
    width: 478px;
    background-color: #f5f5f5;
    height: 550px;
    padding-right: 41px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 44px;
      margin-left: 48px;
      margin-bottom: 27px;
  
      .title {
        font-size: 24px;
        margin-left: 16px;
        margin-right: 14px;
      }
      .line {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .sub-title {
        font-size: 21px;
        margin-left: 12px;
      }
    }

    .login-code {
      width: 100%;
      height: 40.8px;
    }

    .my-btn {
      width: 100%;
      margin-top: 26px;
      margin-left: 0;
    }

    .code-col {
      height: 40.8px;
    }
  }

  .el-checkbox {
    display: flex;
    align-items: center;
    .el-checkbox__label {
      display: flex;
    }
  }
}
</style>
