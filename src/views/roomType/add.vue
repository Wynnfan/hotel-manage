<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>添加房间类型</span>
    </div>
    <el-form ref="roomInfo" :model="roomInfo" label-width="120px">
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        prop="roomType"
        label="房间类型名称">
        <el-input v-model="roomInfo.roomType" placeholder="请输入房间类型名"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="预定价格"
        prop="price"
      >
        <el-input v-model.number="roomInfo.price" type="number" placeholder="单位：元"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="预定折扣"
        prop="discount"
      >
        <el-input v-model.number="roomInfo.discount" type="number" placeholder="0-100%"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="房间面积"
        prop="area"
      >
        <el-input v-model.number="roomInfo.area" type="number" placeholder="单位：m²"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
        ]"
        label="是否有窗">
        <el-radio v-model="roomInfo.window" :label="windowSwitch.has">有窗</el-radio>
        <el-radio v-model="roomInfo.window" :label="windowSwitch.none">没有窗</el-radio>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="床位数量"
        prop="bedNum"
      >
        <el-input-number v-model="roomInfo.bedNum" :min="1" :max="10" label="床位数量"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
        ]"
        label="床大小"
        prop="bedSize"
      >
        <el-input v-model="roomInfo.bedSize" placeholder="例如：1.2m*1.5m"/>
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
import { addRoomType } from '@/api/roomType'
import ElCard from "element-ui/packages/card/src/main";
export default {
  components: {ElCard},
  data() {
    return {
      roomInfo: {
        typeId: null,
        roomType: '',
        area: '',
        window: '',
        bedNum: 0,
        bedSize: '',
        price: 0,
        discount: 0,
        remark: ''
      },
      loading: false,
      windowSwitch: {
        has: 1,
        none: 0
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.roomInfo.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.post('http://localhost:3000/RoomType/add', this.roomInfo).then(response => {
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
  .line{
    text-align: center;
  }
</style>
