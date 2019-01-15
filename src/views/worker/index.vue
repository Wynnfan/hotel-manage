<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>操作员管理</span>
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
        prop="account"
        label="用户名"/>
      <el-table-column
        prop="name"
        label="姓名"/>
      <el-table-column
        prop="phone"
        label="手机号"/>
      <el-table-column
        prop="gender"
        label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"/>
      <el-table-column
        prop="address"
        label="地址"/>
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
        :page-size="pageSize"
        :total="list.length"
        style="float: right"
        background
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">添加操作员</el-button>
        <el-button type="danger" @click="massDeletion">批量删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      visible2: false,
      multipleSelection: [],
      list: [],
      listLoading: true
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    fetchData() {
      this.listLoading = true
      this.$http.get('http://localhost:3000/User/').then(response => {
        console.log(response)
        this.list = response.data
        this.listLoading = false
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/worker/' + val })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/worker',
        name: 'EditWorker',
        params: {
          id: row._id
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      this.$http.delete(`http://localhost:3000/User/${row._id}`).then(response => {
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
    }
  }
}
</script>

<style>
  .red {
    color: red;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style>
