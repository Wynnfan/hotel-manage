<template>
  <div id="home">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>快捷操作</span>
        <span style="float: right; padding: 3px 0">操作按钮</span>
      </div>
      <el-button type="primary" @click="navigateToAddInfo">入住登记</el-button>
      <el-button type="primary" @click="navigateToEditRoom">退房结账</el-button>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created: function() {
  },
  methods: {
    navigateToAddInfo() {
      this.$router.push('/user/add')
    },
    navigateToEditRoom() {
      this.$router.push('/roomInfo')
    }
  }
}
</script>

