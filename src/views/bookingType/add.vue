<template>
  <div class="app-container">
    <el-form ref="form1" :model="form1" :rules="rules2" label-width="120px">
      <el-form-item
        prop="type"
        label="预订方式">
        <el-input v-model="form1.type" placeholder="请输入预订方式"/>
      </el-form-item>
      <el-form-item
        label="remark"
        prop="password"
      >
        <el-input v-model="form1.password" type="password" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="pass"
      >
        <el-input v-model="form1.pass" type="password" placeholder="请再次输入密码"/>
      </el-form-item>
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input v-model.number="form1.name" placeholder="请输入真实姓名"/>
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="phone"
      >
        <el-input v-model.number="form1.phone" type="number" placeholder="请输入手机号码" style="width: 50%"/>
        <!--<el-button type="primary" disabled="">发送验证码</el-button>-->
      </el-form-item>
      <el-form-item
        prop="gender"
        label="性别">
        <el-radio v-model="form1.gender" label="男">男</el-radio>
        <el-radio v-model="form1.gender" label="女">女</el-radio>
      </el-form-item>
      <!--<el-form-item-->
      <!--label="邮箱地址"-->
      <!--prop="email"-->
      <!--&gt;-->
      <!--<el-input v-model="form1.email" />-->
      <!--</el-form-item>-->
      <!--<el-form-item-->
      <!--label="地址"-->
      <!--prop="address"-->
      <!--&gt;-->
      <!--<el-input v-model="form1.address" placeholder="请输入地址"/>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form1.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form1: {
        username: null,
        password: null,
        pass: null,
        name: null,
        phone: null,
        email: null,
        address: null,
        gender: null
      },
      loading: false,
      rules2: {
        username: [
          { required: true, message: '不能为空' }
        ],
        password: [
          { required: true, message: '不能为空' }
        ],
        pass: [
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
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.loading = true
          add(this.form1).then(response => {
            if (response.data) {
              this.$message({
                message: '提交成功！',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 20000)
            } else {
              this.showError()
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
    showError() {
      this.$message({
        message: '提交失败！',
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
