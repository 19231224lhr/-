<template>
  <div>
    <div
        style="margin-bottom: 20px;background-color: rgba(0, 0, 0, 0.3);;padding: 10px;border-radius: 15px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-button type="primary" @click="search2">刷新回收站</el-button>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
      <el-table-column
          label="问卷编号"
          width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="问卷名称"
          width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>问卷名称: {{ scope.row.title }}</p>
            <p>问卷编号: {{ scope.row.id }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
          label="问卷类型"
          width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.level }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">浏览
          </el-button>
          <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
          <el-button
              size="mini"
              type="primary"
              @click="handleRecover(scope.$index, scope.row)">恢复
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  mounted() {
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/getQN',
      // url: 'http://42.193.111.182:8000/consumer/getQN',
      data: {
        account: this.$route.query.id,
        bin: true
      }
    }).then(response => {
      console.log(response)

      this.tableData = response.data.question
      let i = 0
      for (i = 0; i <= this.tableData.length - 1; i++) {
        if (this.tableData[i].level === "1") {
          this.tableData[i].level = "普通问卷"
        } else if (this.tableData[i].level === "2") {
          this.tableData[i].level = "打卡问卷"
        } else if (this.tableData[i].level === "3") {
          this.tableData[i].level = "考试问卷"
        } else if (this.tableData[i].level === "4") {
          this.tableData[i].level = "报名问卷"
        } else if (this.tableData[i].level === "5") {
          this.tableData[i].level = "投票问卷"
        } else if (this.tableData[i].level === "6") {
          this.tableData[i].level = "关联问卷"
        }
      }

    })
  },
  name: "Recovery",
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    search2() {
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/getQN',
        // url: 'http://42.193.111.182:8000/consumer/getQN',
        data: {
          account: this.$route.query.id,
          bin: true
        }
      }).then(response => {
        console.log(response)

        this.tableData = response.data.question
        let i = 0
        for (i = 0; i <= this.tableData.length - 1; i++) {
          if (this.tableData[i].level === "1") {
            this.tableData[i].level = "普通问卷"
          } else if (this.tableData[i].level === "2") {
            this.tableData[i].level = "打卡问卷"
          } else if (this.tableData[i].level === "3") {
            this.tableData[i].level = "考试问卷"
          } else if (this.tableData[i].level === "4") {
            this.tableData[i].level = "报名问卷"
          } else if (this.tableData[i].level === "5") {
            this.tableData[i].level = "投票问卷"
          } else if (this.tableData[i].level === "6") {
            this.tableData[i].level = "关联问卷"
          }
        }

      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push({path: '/recovery', query: {id: row.id}})
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将永久删除该问卷, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/delete_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/delete_qustionnare',
          data: {
            id: row.id
          }
        }).then(response => {
          console.log(response)
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleRecover(index, row) {
      console.log(index, row);
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/out_of_bin',
        // url: 'http://42.193.111.182:8000/consumer/out_of_bin',
        data: {
          id: row.id
        }
      }).then(response => {
        console.log(response)
      })
      this.$alert('恢复成功', '通知信息', {
        confirmButtonText: '确定',
        callback: action => {
          this.tableData.splice(index, 1)
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
