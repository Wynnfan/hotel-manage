<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>房间类型管理</span>
      <el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :loading="listLoading"
      :data="list"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <!--<el-table-column-->
        <!--prop="typeId"-->
        <!--label="编号"/>-->
      <el-table-column
        label="房间类型">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>详细描述: </p>
            <p>{{ scope.row.remark }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.room_type_name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="预定价格"/>
      <el-table-column
        prop="discount"
        label="预定折扣"/>
      <el-table-column
        prop="area"
        label="房间面积">
        <template slot-scope="scope">
          <span>{{ scope.row.area }} m²</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="window"
        label="是否有窗">
        <template slot-scope="scope">
          <span>{{ scope.row.window | hasWindow }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="床位数量">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top-end">
            <p>床大小: {{ scope.row.bed_size }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag>{{ scope.row.bed_num }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--<el-table-column-->
        <!--label="修改时间|创建时间">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"/>-->
          <!--<span style="margin-left: 10px">{{ scope.row.updateTime | formatDate }}</span>-->
          <!--<br>-->
          <!--<i class="el-icon-time"/>-->
          <!--<span style="margin-left: 10px">{{ scope.row.createTime | formatDate }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
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
      <div class="bottom">
        <el-button type="primary" @click="navigateTo('add')">添加房间类型</el-button>
        <el-button type="danger" @click="massDeletion">批量删除</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
// import { getAllRoomType, delRoomType } from '@/api/roomType'

export default {
  filters: {
    hasWindow: function(value) {
      if (value > 0) return '有'
      else return '无'
    }
  },
  data() {
    return {
      visible2: false,
      multipleSelection: [],
      listLoading: true,
      list: [],
      loading: false
    }
  },
  created: function() {
    this.fetchData()
  },
  methods: {
    fetchData() {

      this.listLoading = true
      this.$http.get('http://localhost:3000/RoomType/').then(response => {
        this.list = response.data
        this.listLoading = false
      })
    },
    navigateTo(val) {
      this.$router.push({ path: '/roomType/' + val })
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
    handleEdit(index, row) {
      this.$router.push({
        path: '/roomType',
        name: 'EditType',
        params: {
          id: row._id
        }
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true

      this.$http.delete(`http://localhost:3000/RoomType/${row._id}`).then(response => {
        if (response) {
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    massDeletion() {
      let self = this
      self.multipleSelection.forEach(function(value, index) {
        self.$http.delete(`http://localhost:3000/RoomType/${value._id}`)
      })
      setTimeout(function() {
        self.fetchData()
        self.$message({
          message: '删除成功！',
          type: 'success'
        })
      }, 0)

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
