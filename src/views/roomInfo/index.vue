<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>房间信息管理</span>
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"/>
      <el-table-column
        label="房间号码">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>详细描述: </p>
            <p>{{ scope.row.remark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.roomNumber }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="房间类型">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.roomType }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="roomPrice"
        label="价格"/>
      <el-table-column
        label="折扣">
        <template slot-scope="scope">
          <el-tag type="primary">{{ scope.row.roomDiscount + '%' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="roomStatus"
        label="状态">
        <template slot-scope="scope">
          <el-button :type="showStatus(scope.row.roomStatus)" size="mini">{{ scope.row.roomStatus | formatStatus }}</el-button>
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
    </el-table-column></el-table>
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
        <el-button type="primary" @click="navigateTo('add')">添加房间信息</el-button>
        <el-button type="danger" @click="massDeletion">批量删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>

export default {
  filters: {
    formatStatus: function(value) {
      switch (value) {
        case 0: return '不可用'
        case 1: return '空闲'
        case 2: return '已预订'
        case 3: return '已入住'
      }
    }
  },
  data() {
    return {
      visible2: false,
      multipleSelection: [],
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 10
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
      this.$http.get('http://localhost:3000/RoomInfo/').then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/roomInfo/' + val })
    },
    handleEdit(index, row) {
      this.$router.push({
        path: '/roomInfo',
        name: 'EditRoom',
        params: {
          id: row._id
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true

      this.$http.delete(`http://localhost:3000/RoomInfo/${row._id}`).then(response => {
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
      })
      row.loading = false
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
      const self = this
      self.multipleSelection.forEach(function(value, index) {
        self.$http.delete(`http://localhost:3000/RoomInfo/${value._id}`)
      })
      setTimeout(function() {
        self.fetchData()
        self.$message({
          message: '删除成功！',
          type: 'success'
        })
      }, 0)
    },
    showStatus(val) {
      switch (val) {
        case 0: return 'info'
        case 1: return 'success'
        case 2: return 'warning'
        case 3: return 'danger'
      }
    }
  }
}
</script>

<style>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
</style>
