
<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>编辑订单</span>
    </div>
    <el-form ref="form" :model="form" >
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="入住人"
        prop="name"
      >
        <el-input v-model="form.name" placeholder="请输入入住人姓名"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="手机号"
        prop="phone"
      >
        <el-input v-model="form.phone" placeholder="请输入预留手机号"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="房间类型">
        <el-select v-model="form.roomType" :change="idToType('', form.roomType)" placeholder="请选择房间类型">
          <el-option v-for="rt in roomTypeList" :label="rt.room_type_name" :value="rt.room_type_name" :key="rt.room_type_name">
            {{ rt.room_type_name + '(' + rt.price + '元)' }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="入住日期"
      >
        <el-date-picker
          v-model="form.orderDateRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="calcDays"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="入住天数"
        prop="orderDays"
      >
        <!--<el-input-number v-model="form1.orderDays" @change="idToType(form1.roomTypeId)" :min="1" label="预订天数"></el-input-number>-->
        {{ form.orderDays + ' 晚' }}
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="预订方式">
        <el-select v-model="form.orderType" :change="idToType(form.orderType, '')" placeholder="请选择预订方式">
          <el-option v-for="t in orderTypeList" :label="t.type" :value="t.type" :key="t.type">
            {{ t.type }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'},
          { type: 'number', message: '必须为数字值'}
        ]"
        label="订单费用"
        prop="orderCost"
      >
        {{ '￥' + form.orderCost }}
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
      form: {
        orderType: null,
        roomType: null,
        name: null,
        phone: null,
        orderDateRange: null,
        orderDays: 0,
        orderCost: 0,
        is_removed: false
      },
      id: '',
      orderDateRange: null,
      loading: false,
      roomTypeList: [],
      orderTypeList: []
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
        this.roomTypeList = response.data
      }).then(() => {
        this.$http.get('http://localhost:3000/BookingType/').then(res => {
          this.orderTypeList = res.data
        })
      }).then(() => {
        this.$http.get(`http://localhost:3000/Order/${this.id}`).then(res => {
          console.log(res)
          this.form = res.data
        })
      })
    },
    idToType(ot, rt) {
      if (!rt || rt === undefined) {
        this.orderTypeList.forEach(t => {
          if (ot === t.type) {
            this.form.orderType = t.type
          }
        })
      } else {
        this.roomTypeList.forEach(type => {
          if (rt === type.room_type_name) {
            this.form.roomType = type.room_type_name
            console.log(type.roomType)
            this.form.orderCost = type.price * this.form.orderDays
            return
          }
        })
      }
    },
    calcDays() {
      this.form.orderDays = this.form.orderDateRange[1].getDate() - this.form.orderDateRange[0].getDate()
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$http.put(`http://localhost:3000/Order/${this.id}`, this.form).then(response => {
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
