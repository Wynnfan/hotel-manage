<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>添加房间</span>
    </div>
    <el-form ref="roomInfo" :model="roomInfo" >
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="房间号码"
        prop="roomNumber"
      >
        <el-input v-model.number="roomInfo.roomNumber" placeholder="请输入房间号码"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="房间类型">
        <el-select v-model="roomInfo.roomType" :change="idToType(roomInfo.roomType)" placeholder="请选择房间类型">
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
        <el-input v-model.number="roomInfo.roomPrice" type="number"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="折扣"
        prop="roomDiscount"
      >
        <el-input v-model.number="roomInfo.roomDiscount" type="number"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
        ]"
        label="房间状态"
      >
        <el-radio-group v-model="roomInfo.roomStatus">
          <el-radio :label="statusList.unavailable">不可用</el-radio>
          <el-radio :label="statusList.available">空闲</el-radio>
          <el-radio :label="statusList.occupied">已预订</el-radio>
          <el-radio :label="statusList.inUse">已入住</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="详细描述">
        <el-input v-model="roomInfo.remark" type="textarea"/>
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
      roomInfo: {
        roomNumber: null,
        roomType: null,
        roomPrice: null,
        roomDiscount: null,
        roomStatus: null,
        remark: null,
        is_removed: false
      },
      loading: false,
      typeList: null,
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
      this.$http.get('http://localhost:3000/RoomType/').then(response => {
        this.typeList = response.data
      })
    },
    idToType(val) {
      if (val == null) return
      this.typeList.forEach(type => {
        if (val === type.roomType) {
          this.roomInfo.roomType = type.room_type_nameType
        }
      })
    },
    onSubmit() {
      this.$refs.roomInfo.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post('http://localhost:3000/RoomInfo/add', this.roomInfo).then(response => {
            if (response.data) {
              this.$message({
                message: '提交成功！',
                type: 'success'
              })
              this.loading = false
              setTimeout(this.onCancel(), 2000)
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
