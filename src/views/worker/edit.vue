<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>编辑操作员</span>
    </div>
    <el-form ref="worker" :model="worker" :rules="rules2" label-width="120px">
      <el-form-item
        prop="account"
        label="用户名">
        <el-tag>{{ worker.account }}</el-tag>
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
        <el-input v-model.number="worker.phone" type="number" placeholder="请输入手机号码" style="width: 50%"/>
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
        label="地址"
        prop="address"
      >
        <el-input v-model="worker.address" placeholder="请输入地址"/>
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

export default {
  components: { ElCard },
  data() {
    return {
      worker: {
        account: null,
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
        account: [
          { required: true, message: '请输入登录账号' },
          { min: 3, message: '长度在 3 个字符以上', trigger: 'blur' }
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
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.$http.get(`http://localhost:3000/User/${this.$route.params.id}`).then(res => {
        this.worker = res.data
      })
    },
    onSubmit() {
      this.$refs.worker.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.put(`http://localhost:3000/User/${this.$route.params.id}`, this.worker).then(response => {
            if (response) {
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
