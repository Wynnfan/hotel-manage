<template>
  <el-card class="box-card" shadow="always">
    <div slot="header">
      <span>预订方式管理</span>
      <!--<el-button type="primary" style="float: right; padding: 6px 12px" icon="el-icon-search">搜索</el-button>-->
    </div>
    <el-table
      ref="multipleTable"
      :data="list"
      :loading="listLoading"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        prop="type"
        label="预订方式"/>
      <el-table-column
        prop="remark"
        label="详细描述"/>
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
        :total="total"
        style="float: right"
        background
        layout="total, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
      <div class="bottom">
        <el-button type="primary" @click="handleAdd()">添加预订方式</el-button>
        <el-dialog :visible.sync="dialogFormVisible" title="添加预订方式">
          <el-form :model="form">
            <el-form-item :label-width="formLabelWidth" label="预订方式">
              <el-input v-model="form.type" />
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="详细描述">
              <el-input v-model="form.remark" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button v-if="isEdit" :loading="addBtnLoading" type="primary" @click="edit()">确 认</el-button>
            <el-button v-if="!isEdit" :loading="addBtnLoading" type="primary" @click="add()">添 加</el-button>
          </div>
        </el-dialog>
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
      isEdit: false,
      list: [],
      total: 0,
      listLoading: false,
      multipleSelection: [],
      form: {
        type: null,
        remark: null,
        is_removed: false
      },
      id: '',
      formLabelWidth: '120px',
      addBtnLoading: false,
      dialogFormVisible: false
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
      this.list = null
      this.listLoading = true
      this.$http.get('http://localhost:3000/BookingType/').then(response => {
        this.list = response.data
        this.total = response.data.length
        this.listLoading = false
      })
    },
    add() {
      this.addBtnLoading = true
      this.$http.post('http://localhost:3000/BookingType/add', this.form).then(res => {
        if (res.data) {
          this.$message({
            message: '添加成功！',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: '添加失败！',
            type: 'error'
          })
        }
      }).catch(err => {
        this.$message({
          message: '添加失败！',
          type: 'error'
        })
        this.addBtnLoading = false
        this.dialogFormVisible = false
      })
      this.addBtnLoading = false
      this.dialogFormVisible = false
    },
    edit() {
      this.addBtnLoading = true
      this.$http.put(`http://localhost:3000/BookingType/${this.id}`, this.form).then(res => {
        if (res.data) {
          this.$message({
            message: '编辑成功！',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: '编辑失败！',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '编辑失败！',
          type: 'error'
        })
        this.addBtnLoading = false
        this.dialogFormVisible = false
      })
      this.addBtnLoading = false
      this.dialogFormVisible = false
    },
    handleAdd() {
      this.form.type = null
      this.form.remark = null
      this.isEdit = false
      this.dialogFormVisible = true
    },
    handleEdit(index, row) {
      this.isEdit = true
      this.dialogFormVisible = true
      this.id = row._id
      this.$http.get(`http://localhost:3000/BookingType/${this.id}`).then(res => {
        this.form = res.data
      })
    },
    handleDel(row) {
      row.visible2 = false
      row.loading = true
      this.$http.delete(`http://localhost:3000/BookingType/${row._id}`).then(response => {
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
      this.fetchData()
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
        self.$http.delete(`http://localhost:3000/BookingType/${value._id}`)
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
