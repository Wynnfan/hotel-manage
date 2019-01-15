<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>添加操作员</span>
    </div>
    <el-form ref="worker" :model="worker" :rules="rules2" label-width="120px">
      <el-form-item
        prop="account"
        label="用户名">
        <el-input v-model="worker.account" placeholder="请输入用户名，用作登录，不可修改"/>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input v-model="worker.password" type="password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="pass"
      >
        <el-input v-model="confirmPassword" type="password" placeholder="请再次输入密码"/>
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input v-model="worker.name" placeholder="请输入真实姓名"/>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="phone"
      >
        <el-input v-model.number="worker.phone" placeholder="请输入手机号码" style="width: 50%"/>
        <!--<el-button type="primary" disabled="">发送验证码</el-button>-->
      </el-form-item>
      <el-form-item
        prop="gender"
        label="性别">
        <el-radio v-model="worker.gender" label="男">男</el-radio>
        <el-radio v-model="worker.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item
        label="邮箱地址"
        prop="email"
      >
        <el-input v-model="worker.email" />
      </el-form-item>
      <el-form-item
        label="住址"
        prop="address"
      >
        <el-input v-model="worker.address" placeholder="请输入住址"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>

import ElCard from 'element-ui/packages/card/src/main'
import crypto from 'crypto'

export default {
  components: { ElCard },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.worker.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      worker: {
        account: null,
        password: null,
        name: null,
        phone: null,
        email: '',
        address: '',
        gender: null,
        role: 'user',
        is_removed: false
      },
      confirmPassword: null,
      loading: false,
      rules2: {
        account: [
          { required: true, message: '请输入登录账号' },
          { min: 3, message: '长度在 3 个字符以上', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '不能为空' }
        ],
        confirmPassword: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空' }
        ],
        phone: [
          { required: true, message: '不能为空' }
        ],
        gender: [
          { required: true, message: '不能为空' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      if (!this.worker.password) {
        this.$message({
          message: '请输入密码',
          type: 'error'
        })
        return
      }
      if (!this.confirmPassword) {
        this.$message({
          message: '请再次输入密码',
          type: 'error'
        })
        return
      }
      if (this.confirmPassword !== this.worker.password) {
        this.$message({
          message: '两次密码输入不一致',
          type: 'error'
        })
        return
      }
      this.$refs.worker.validate((valid) => {
        if (valid) {
          this.loading = true
          this.worker.password = crypto.createHash('md5').update(this.worker.password).digest('hex')
          this.$http.post('http://localhost:3000/User/add', this.worker).then(response => {
            console.log(response)
            if (response.data && !response.data.code) {
              this.$message({
                message: '提交成功！',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 20000)
            } else {
              this.showError(response.data.msg)
              this.loading = false
            }
          }).catch(error => {
            this.loading = false
            this.showError()
            console.log(error)
          })
        } else {
          this.loading = false
          return false
        }
      })
    },
    showError(msg) {
      this.$message({
        message: '提交失败 ' + msg,
        type: 'error'
      })
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>
