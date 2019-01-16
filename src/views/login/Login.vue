<template>
  <div id="login">
    <div class="login-wrap">
      <div class="login-wrap-left">
        <img src="../../assets/images/login-left.jpg" alt="login">
      </div>
      <div :class="[bForgetPassowrd===true?'login-trans':'']" class="login-wrap-right">
        <img class="login-logo" src="../../assets/images/logo.png" alt="">
        <h3>Hotel Admin</h3>
        <div class="login-wrap-form">
          <el-form ref="loginRules" :model="loginRulesForm" :rules="loginRules" label-width="100px" class="demo-loginRules">
            <el-form-item prop="name" class="login-name" >
              <el-input v-model="loginRulesForm.name" placeholder="请输入登录账号"/>
            </el-form-item>
            <el-form-item class="login-password" prop="password">
              <el-input :type="pwdType" v-model="loginRulesForm.password" name="password" placeholder="请输入登录密码" @keyup.enter.native="login('loginRules')"/>
              <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" />
              </span>
            </el-form-item>
            <div class="login-btn-div" @click="login('loginRules')">
              <el-button :loading="bBtnLoginStatus" class="login-btn" type="primary" >登录</el-button>
            </div>
            <el-form-item class="login-operation">
              <el-checkbox v-model="checkBoxFlag">记住我</el-checkbox>
              <span class="forget-password" @click="forgetPassowrd">忘记密码?</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div :class="[bForgetPassowrd===true?'forget':'']" class="forget-password-wrap">
        <h3>找回密码</h3>
        <div class="login-wrap-form">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
            <el-form-item class="login-name" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入登录账号"/>
            </el-form-item>
            <el-form-item class="login-password" prop="oldPassword">
              <el-input v-model="ruleForm.oldPassword" :type="pwdType" placeholder="请输入旧密码"/>
              <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" />
              </span>
            </el-form-item>
            <el-form-item class="login-password" prop="newPassword">
              <el-input v-model="ruleForm.newPassword" type="password" placeholder="请输入新密码"/>
            </el-form-item>
            <div class="forget-btn-div" style="text-align: center">
              <el-button class="login-btn" type="defalut" @click="forgetPassowrd" >返回登录</el-button>
              <el-button :loading="bBtnLoginStatus" class="login-btn" type="primary" @click="modify('ruleForm')">立即修改</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import crypto from 'crypto'
export default {
  name: 'Login',
  data() {
    return {
      aa: 'aa',
      ruleForm: {
        name: '',
        oldPassword: '',
        newPassword: ''
      },
      loginRulesForm: {
        name: '',
        password: ''
      },
      loginRules: {
        name: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 3, message: '长度在 3 个字符以上', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 5, message: '长度在 5 个字符以上', trigger: 'blur' }
        ]
      },
      rules: {
        newPassword: [
          { required: true, message: '请输入新登录密码', trigger: 'blur' },
          { min: 5, message: '长度在 5 个字符以上', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入登录账号' }
        ],
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ]
      },
      pwdType: 'password',
      bBtnLoginStatus: false, // 点击登录时按钮的等待状态
      checkBoxFlag: false, // 记住我？
      bForgetPassowrd: false, // 忘记密码
      sModifyBtnText: '发送验证码', // 发送验证码按钮文本
      nSendTime: 60, //
      bModifyBtnStatus: false,
      bSendTime: null
    }
  },
  mounted() {
    const RememberUser = localStorage.getItem('RememberUser') // 进入页面时判断是否"记住我"这个用户，如果有，就填充表单

    if (RememberUser !== null) {
      const tmpUser = JSON.parse(RememberUser)
      var decipher = crypto.createDecipher('aes192', 'hotelAdmin')
      var tmpPass = decipher.update(tmpUser.password, 'hex', 'utf8')
      tmpPass += decipher.final('utf8')
      this.loginRulesForm.name = tmpUser.user
      this.loginRulesForm.password = tmpPass
      this.checkBoxFlag = tmpUser.status
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    login(formName) {
      this.$refs[formName].validate(valid => { // 表单验证
        if (valid) {
          this.bBtnLoginStatus = true // 改变登陆按钮状态
          const accountInfo = {}
          accountInfo.name = this.loginRulesForm.name
          accountInfo.password = crypto.createHash('md5').update(this.loginRulesForm.password).digest('hex') // 对密码进行加密

          if (this.checkBoxFlag) { // 记住密码
            localStorage.setItem('RememberUser', JSON.stringify({ user: accountInfo.name, password: accountInfo.password, status: this.checkBoxFlag }))
          }

          let message = '登陆正确'
          let type = 'success'

          this.$http.post('http://localhost:3000/User/login', accountInfo).then(res => {
            message = res.data.msg

            if (res.data.code === 200) {
              window.localStorage.setItem('loginToken', res.data.token)
              window.localStorage.setItem('role', res.data.role)
              setTimeout(() => {
                this.$router.push({ path: '/' })
              }, 3000)
            } else {
              type = 'error'
            }

            this.$message({
              showClose: true,
              message: message,
              type: type
            })

            this.bBtnLoginStatus = false
            // const userLogin = {
            //   username: accountInfo.name,
            //   password: accountInfo.password
            // }
            // window.localStorage.setItem('userLogin', JSON.stringify(userLogin))
          })

          this.bBtnLoginStatus = false
        } else {
          this.$message({
            showClose: true,
            message: '请正确填写登录表单',
            type: 'error'
          })
        }
      })
    },
    forgetPassowrd() { // 忘记密码
      this.bForgetPassowrd = !this.bForgetPassowrd
    },
    modify(formName) { // 修改密码
      this.$refs[formName].validate(valid => {
        if (valid) {
          let message = null
          let type = null
          let newPassword = crypto.createHash('md5').update(this.ruleForm.newPassword).digest('hex') // 对密码进行加密
          let oldPassword = crypto.createHash('md5').update(this.ruleForm.oldPassword).digest('hex') // 对密码进行加密

          let params = {}
          params.name = this.ruleForm.name
          params.oldPassword = oldPassword
          params.newPassword = newPassword
          console.log(params)
          this.$http.post('http://localhost:3000/User/modifyPassword', params).then(res => {
            if (res.data.code === 200) {
              message = res.data.msg
              type = 'success'
            } else {
              message = res.data.msg
              type = 'error'
            }
            this.$message({
              showClose: true,
              message: message,
              type: type
            })
          }).catch(error => {
            this.$message({
              showClose: true,
              message: '网络请求失败' + error,
              type: 'error'
            })
          })
        } else {
          this.$message({
            showClose: true,
            message: '请正确填写登录表单',
            type: 'error'
          })
        }
      })
    }
  }

}
</script>

<style>
  #login {
    position: relative;
    width: 100%;
    height: 100%;
    background: #F1F2F7;
  }
  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /* display: flex;
    justify-content: space-between; */
    width: 800px;
    height: 400px;
    background: #fff;
    overflow: hidden;
    /* border: 1px  solid #cfcfcf; */
  }
  .login-wrap-left {
    position: absolute;
    left: 0;
    width: 60%;
    height: 100%;
  }
  .login-wrap-left img {
    width: 100%;
    height: 100%;
  }
  .login-wrap-right {
    position: absolute;
    right: 0;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    width: 40%;
    height: 100%;
    /* border-left: 1px solid #cfcfcf; */
    box-sizing: border-box;
    transition: .5s;
    background: #fff;
  }
  .login-name>div {
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .login-password>div {
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .login-wrap-right h3 {
    text-align: center;
    font-size: 20px;

  }
  .login-wrap-form {
    margin-top: 15px;
    text-align: center;
  }
  .login-btn-div {
    width: 100%;
  }
  .login-logo {
    width: 100px;
    height: 100px;
    margin: 0 auto;
    display: block;
  }
  .forget-password {
    color: #606266;
    cursor: pointer;
  }
  .login-operation {
    width: 100%;
    margin-top: 30px;
  }
  .login-operation>div {
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .forget-password-wrap {
    position: absolute;
    right: 0;
    width: 40%;
    height: 100%;
    /* background: #000; */
    transform: translateX(100%);
    transition: .5s;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    opacity: 0;
  }
  .forget-password-wrap h3 {
    text-align: center;
    color: #59A8F4;
    line-height: 80px;
  }
  .login-trans {
    transform: translateX(-100%);
    opacity: 0;
  }
  .forget {
    transform: translateX(0%);
    opacity: 1;
  }
  .forget-btn-div {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    bottom: 0px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>
