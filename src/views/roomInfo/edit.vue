<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>编辑房间</span>
    </div>
    <el-form ref="form1" :model="form1" >
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="房间号码"
        prop="roomNumber"
      >
        <el-input v-model.number="form1.roomNumber" placeholder="请输入房间号码"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="房间类型">
        <el-select v-model="form1.roomType" :change="idToType(form1.roomType)" placeholder="请选择房间类型">
          <el-option v-for="t in typeList" :label="t.room_type_name" :value="t.room_type_name" :key="t.room_type_name">
            {{ t.room_type_name + '(' + t.price + '元)' }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="价格"
        prop="roomPrice"
      >
        <el-input v-model.number="form1.roomPrice" type="number"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="折扣"
        prop="roomDiscount"
      >
        <el-input v-model.number="form1.roomDiscount" type="number"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
        ]"
        label="房间状态"
      >
        <el-radio-group v-model="form1.roomStatus">
          <el-radio :label="statusList.unavailable">不可用</el-radio>
          <el-radio :label="statusList.available">空闲</el-radio>
          <el-radio :label="statusList.occupied">已预订</el-radio>
          <el-radio :label="statusList.inUse">已入住</el-radio>
        </el-radio-group>
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

import ElCard from 'element-ui/packages/card/src/main'
export default {
  components: { ElCard },
  data() {
    return {
      form1: {
        roomId: null,
        roomNumber: null,
        roomType: null,
        typeId: null,
        roomPrice: null,
        roomDiscount: null,
        roomStatus: null,
        remark: null
      },
      loading: false,
      typeList: null,
      id: null,
      statusList: {
        unavailable: 0,
        available: 1,
        occupied: 2,
        inUse: 3
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
      this.$http.get('http://localhost:3000/RoomType/').then(response => {
        this.typeList = response.data
      }).then(() => {
        this.$http.get(`http://localhost:3000/RoomInfo/${this.id}`).then(res => {
          this.form1 = res.data
        })
      })
    },
    idToType(val) {
      if (val == null) {
        return
      } else {
        this.typeList.forEach(type => {
          if (val === type.roomType) {
            this.form1.roomType = type.room_type_nameType
          }
        })
      }
    },
    onSubmit() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.put(`http://localhost:3000/RoomInfo/${this.id}`, this.form1).then(response => {
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
</style>
