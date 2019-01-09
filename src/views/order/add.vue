<template>
  <el-card class="app-container" shadow="always">
    <div slot="header">
      <span>添加订单</span>
    </div>
    <el-form ref="form1" :model="form1" >
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="入住人"
        prop="name"
      >
        <el-input v-model="form1.name" placeholder="请输入入住人姓名"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="手机号"
        prop="phone"
      >
        <el-input v-model="form1.phone" placeholder="请输入预留手机号"/>
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="房间类型">
        <el-select v-model="form1.roomType" :change="idToType('', form1.roomType)" placeholder="请选择房间类型">
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
          v-model="orderDateRange"
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
        {{ form1.orderDays + ' 晚' }}
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '不能为空'}
        ]"
        label="预订方式">
        <el-select v-model="form1.orderType" :change="idToType(form1.orderType, '')" placeholder="请选择预订方式">
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
        {{ '￥' + form1.orderCost }}
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
  name: 'Add',
  data() {
    return {
      form1: {
        orderTypeId: null,
        orderType: null,
        roomType: null,
        userId: 0,
        name: null,
        phone: null,
        orderDate: null,
        orderDays: 0,
        orderCost: 0
      },
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
      this.$http.get('http://localhost:3000/BookingType/').then(res => {
        this.orderTypeList = res.data
      }).then(() => {
        this.$http.get('http://localhost:3000/RoomType/').then(response => {
          this.roomTypeList = response.data
        })
      })
    },
    idToType(otId, rtId) {
      if (rtId == null) {
        this.orderTypeList.forEach(t => {
          if (otId === t.typeId) {
            this.form1.orderType = t.type
          }
        })
      } else {
        this.roomTypeList.forEach(type => {
          if (rtId === type.typeId) {
            this.form1.roomType = type.roomType
            this.form1.orderCost = type.price * this.form1.orderDays
          }
        })
      }
    },
    calcDays() {
      this.form1.orderDate = this.orderDateRange[0]
      this.form1.orderDays = this.orderDateRange[1].getDate() - this.orderDateRange[0].getDate()
    },
    onSubmit() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          this.loading = true
          addOrder(this.form1).then(response => {
            if (response === 1) {
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
