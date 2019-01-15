<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>添加客户信息</span>
    </div>
    <el-form ref="guest" :model="guest" :rules="rules2" label-width="120px">
      <el-form-item
        label="姓名"
        prop="name"
      >
        <el-input v-model="guest.name" placeholder="请输入真实姓名" style="width: 20%" />
      </el-form-item>
      <el-form-item
        label="手机号码"
        prop="phone"
      >
        <el-input v-model.number="guest.phone" placeholder="请输入手机号码" style="width: 30%"/>
      </el-form-item>
      <el-form-item
        prop="gender"
        label="性别">
        <el-radio v-model="guest.gender" label="男">男</el-radio>
        <el-radio v-model="guest.gender" label="女">女</el-radio>
      </el-form-item>
      <el-form-item
        label="身份证号码"
        prop="idcard"
      >
        <el-input v-model="guest.idcard" placeholder="请输入身份号码" style="width: 40%"/>
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
      guest: {
        name: '',
        phone: null,
        gender: null,
        idcard: null,
        is_removed: false
      },
      loading: false,
      rules2: {
        name: [
          { required: true, message: '不能为空' }
        ],
        phone: [
          { required: true, message: '不能为空' }
        ],
        gender: [
          { required: true, message: '不能为空' }
        ],
        idcard: [
          { required: true, message: '不能为空' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.guest.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post('http://localhost:3000/Guest/add', this.guest).then(response => {
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
