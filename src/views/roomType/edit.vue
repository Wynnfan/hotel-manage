<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>编辑房间类型</span>
    </div>
    <el-form ref="form1" :model="form1" label-width="120px">
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        prop="room_type_name"
        label="房间类型名称">
        <el-input v-model="form1.room_type_name" placeholder="请输入房间类型名"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="预定价格"
        prop="price"
      >
        <el-input v-model.number="form1.price" type="number" placeholder="单位：元"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="预定折扣"
        prop="discount"
      >
        <el-input v-model.number="form1.discount" type="number" placeholder="0-100%"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="房间面积"
        prop="area"
      >
        <el-input v-model.number="form1.area" type="number" placeholder="单位：m²"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
        ]"
        label="是否有窗">
        <el-radio v-model="form1.window" :label="windowSwitch.has">有窗</el-radio>
        <el-radio v-model="form1.window" :label="windowSwitch.none">没有窗</el-radio>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="床位数量"
        prop="bed_num"
      >
        <el-input-number v-model="form1.bed_num" :min="1" :max="10" label="床位数量"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
        ]"
        label="床大小"
        prop="bed_size"
      >
        <el-input v-model.number="form1.bed_size" placeholder="例如：1.2m*1.5m"/>
      </el-form-item>
      <el-form-item label="详细描述">
        <el-input v-model="form1.remark" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>

export default {
  data() {
    return {
      form1: {
        room_type_name: '',
        area: null,
        window: null,
        bedNum: null,
        bedSize: null,
        price: null,
        discount: null,
        remark: null
      },
      loading: false,
      id: null,
      windowSwitch: {
        has: 1,
        none: 0
      }
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.id = this.$route.params.id
      if (this.id == null) {
        this.onCancel()
      }
      this.$http.get(`http://localhost:3000/RoomType/${this.id}`).then(res => {
        this.form1 = res.data
      })
    },
    onSubmit() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.put(`http://localhost:3000/RoomType/${this.id}`, this.form1).then(response => {
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

