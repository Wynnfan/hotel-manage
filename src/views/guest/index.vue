<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>客户信息管理</span>
      <!--<el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>-->
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="gender"
        label="性别"/>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="身份证号码">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover
            v-model="scope.row.visible2"
            placement="top"
            width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">取消</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger" @click="scope.row.visible2 = true">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 14px;">
      <el-pagination
        :current-page="currentPage"
        :page-size="pagesize"
        :total="list.length"
        style="float: right"
        background
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">添加客户</el-button>
        <el-button type="danger" @click="massDeletion">批量删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  name: 'Guest',
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      list: [],
      visible2: false,
      loading: null,
      listLoading: false,
      multipleSelection: null
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    fetchData() {
      this.$http.get('http://localhost:3000/Guest/').then(response => {
        this.list = response.data
      })
    },
    navigateTo(val) {
      this.$router.push('/user/' + val)
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      this.$http.delete(`http://localhost:3000/Guest/${row._id}`).then(response => {
        if (response.data) {
          this.fetchData()
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        } else {
          this.$message({
            message: '删除失败！',
            type: 'error'
          })
        }
        row.loading = false
        this.fetchData()
      })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/user',
        name: 'EditGuest',
        params: {
          id: row._id
        }
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    massDeletion() {
      let self = this
      self.multipleSelection.forEach(function(value, index) {
        self.$http.delete(`http://localhost:3000/User/${value._id}`)
      })
      setTimeout(function() {
        self.fetchData()
        self.$message({
          message: '删除成功！',
          type: 'success'
        })
      }, 10)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
<!-- <style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style> -->

<!-- <template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>客户信息管理</span>
      <el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :loading="listLoading"
      :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="userId"
        label="编号"/>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="gender"
        label="性别"/>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="email"
        label="email">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="idcard"
        label="身份证号">
      </el-table-column>
      <el-table-column
        label="修改时间|创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.updateTime | formatDate }}</span>
          <br>
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popover
            v-model="scope.row.visible2"
            placement="top"
            width="160">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" round @click="scope.row.visible2 = false">取消</el-button>
              <el-button type="danger" size="mini" round @click="handleDel(scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" :loading="scope.row.loading" size="mini" type="danger" @click="scope.row.visible2 = true">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>

    </el-table>

    <div style="padding: 14px;">
      <el-pagination

        style="float: right"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="list.length">
      </el-pagination>
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">添加客户</el-button>
        <el-button type="danger" @click="massDeletion">批量删除</el-button>

      </div>

    </div>

  </el-card>
</template>
