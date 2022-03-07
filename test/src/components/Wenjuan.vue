<template>
  <div style="width: 1200px">
    <!--    {{tabaleData_test}}-->
    <div
        style="margin-bottom: 20px;background-color: rgba(0, 0, 0, 0.3);;padding: 10px;border-radius: 15px;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
      <el-button type="primary" @click="add">新建问卷</el-button>
      &nbsp
      <el-button type="success" @click="search1">查询问卷</el-button>
      &nbsp&nbsp
      <el-dropdown>
        <el-button>
          显示设置<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <span @click="sort0"><el-dropdown-item>全部问卷</el-dropdown-item></span>
          <span @click="sort1"><el-dropdown-item>未发布问卷</el-dropdown-item></span>
          <span @click="sort2"><el-dropdown-item>未开始问卷</el-dropdown-item></span>
          <span @click="sort3"><el-dropdown-item>进行中问卷</el-dropdown-item></span>
          <span @click="sort4"><el-dropdown-item>已结束问卷</el-dropdown-item></span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        :default-sort="{prop: 'id', order: 'increase'}">
      <el-table-column
          label="问卷ID"
          prop="id"
          sortable
          width="100px">
      </el-table-column>
      <el-table-column
          label="问卷标题"
          prop="title"
          width="150px"
          sortable>
      </el-table-column>
      <!--      <el-table-column-->
      <!--          label="发布时间"-->
      <!--          prop="end">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--          label="结束时间"-->
      <!--          prop="start">-->
      <!--      </el-table-column>-->
      <el-table-column
          label="创建日期"
          prop="create"
          sortable>
      </el-table-column>
      <el-table-column
          label="问卷状态"
          prop="status"
          width="150px">
      </el-table-column>
      <el-table-column
          label="问卷类型"
          prop="level">
      </el-table-column>
      <!--      向后端传入用户id，后端返回所有问卷时也要返回问卷的状态，这次直接返回字符串，分为未发布，未开始，进行中，已结束，另外，如果到了设定的开始问卷时间问卷还没有发布，后端默认把其状态设定为已发布-->
      <!--      因此，后端总共返回的信息是，问卷id，问卷创建时间，问卷标题，问卷类型-->
      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字(问卷名称)搜索"
              class="test1"
              style="width: 200px"
          />
        </template>
        <template slot-scope="scope">
          <el-button
              type="primary"
              @click="shujufenxi(scope.$index, scope.row)"
              icon="el-icon-pie-chart">数据分析
          </el-button>
          <el-button
              @click="handleEdit(scope.$index, scope.row)"
              icon="el-icon-edit-outline" type="primary" plain>编辑问卷
          </el-button>
          <br><br>
          <el-button
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              icon="el-icon-folder-delete"
              style="display:inline-block;float: right">删除问卷
          </el-button>
          <el-dropdown style="float: right;display:inline-block;margin-right: 10px">
            <el-button type="success">
              更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <span @click="clickmethod3(scope.$index, scope.row)"><el-dropdown-item>浏览问卷</el-dropdown-item></span>
              <span @click="clickmethod4(scope.$index, scope.row)"><el-dropdown-item>发布问卷</el-dropdown-item></span>
              <span @click="clickmethod8(scope.$index, scope.row)"><el-dropdown-item>取消发布</el-dropdown-item></span>
              <span @click="clickmethod7(scope.$index, scope.row)"><el-dropdown-item>立即开始</el-dropdown-item></span>
              <span @click="clickmethod6(scope.$index, scope.row)"><el-dropdown-item>停止作答</el-dropdown-item></span>
              <span @click="clickmethod5(scope.$index, scope.row)"><el-dropdown-item>复制问卷</el-dropdown-item></span>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <!--    {{ tableData }}-->
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'Wenjuan',
  mounted() {
    this.search1()
  },
  data() {
    return {
      tableData: [],
      search: '',
      tabaleData_test: [],
    }
  },
  methods: {
    sort0() {
      console.log("全部问卷")
      this.search1()
    },
    sort1() {
      console.log("未发布问卷")
      this.tableData = []
      let i = 0
      for (i = 0; i <= this.tabaleData_test.length - 1; i++) {
        if (this.tabaleData_test[i].status === "未发布") {
          this.tableData.push(this.tabaleData_test[i])
        }
      }
    },
    sort2() {
      console.log("未开始问卷")
      this.tableData = []
      let i = 0
      for (i = 0; i <= this.tabaleData_test.length - 1; i++) {
        if (this.tabaleData_test[i].status === "未开始") {
          this.tableData.push(this.tabaleData_test[i])
        }
      }
    },
    sort3() {
      console.log("进行中问卷")
      this.tableData = []
      let i = 0
      for (i = 0; i <= this.tabaleData_test.length - 1; i++) {
        if (this.tabaleData_test[i].status === "已开始") {
          this.tableData.push(this.tabaleData_test[i])
        }
      }
    },
    sort4() {
      console.log("已结束问卷")
      this.tableData = []
      let i = 0
      for (i = 0; i <= this.tabaleData_test.length - 1; i++) {
        if (this.tabaleData_test[i].status === "已结束") {
          this.tableData.push(this.tabaleData_test[i])
        }
      }
    },
    clickmethod3(index, row) {
      console.log("点击浏览问卷", index, row.id)
      // this.$router.replace('/view')
      this.$router.push({path: '/view', query: {account: this.$route.query.id, id: row.id}})

    },
    clickmethod4($index, row) {
      console.log("点击发布问卷")
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/publish',
        data: {
          level: 0,
          id: row.id
        }
      }).then(response => {
        console.log(response)
        if (response.data === "不能发布") {
          alert("发布失败，问卷已经超过设定的结束时间，请您更改问卷相关信息后再尝试发布问卷")
        } else if (response.data === "已经发布过了") {
          alert("发布失败，该问卷已经发布")
        } else {

          this.$alert('复制链接到浏览器即可快速作答   http://42.193.111.182:8000/#/wenjuan?Questionnaireplanet=' + row.id, '发布成功', {
            confirmButtonText: '确定',
            callback: action => {
              this.search1()
              this.$message({
                type: 'success',
                message: `问卷发布成功`
              });
            }
          });
        }
      })
    },
    clickmethod5($index, row) {
      console.log("您点击了复制问卷方法")
      this.$confirm('复制的问卷将完全拷贝被复制问卷的信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/getallQ',
          //url: 'http://42.193.111.182:8000/consumer/e_qustionnare',
          data: {
            id: row.id
          }
        }).then(response => {
          console.log(response.data.question)

          this.axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/consumer/create_qustionnare',
            //url: 'http://42.193.111.182:8000/consumer/create_qustionnare',
            data: {
              account: this.$route.query.id,
              level: response.data.level,
              start_time: response.data.start_time,
              end_time: response.data.end_time,
              password: response.data.password,
              jieshuyu: response.data.jieshuyu,
              title: response.data.title + '(复制)',
              questionare_hide: response.data.hide,
              question: response.data.question
            }
          }).then(response => {
            console.log(response)
            this.search1()
          })
        })
        //这里将问卷信息复制一份发送给建立问卷的接口
        //当然要先调用输入问卷id返回问卷所有信息的接口
        this.$message({
          type: 'success',
          message: '复制成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消复制'
        });
      });
      //这里调用从接口返回所有问卷信息的接口
    },
    handleEdit(index, row) {
      if (row.status !== "未发布") {
        alert("当前问卷已发布或已结束，无法进行编辑，您可以复制后进行编辑")
      } else {
        console.log(index, row);
        // this.axios({
        //   method: 'POST',
        //   url: 'http://127.0.0.1:8000/consumer/getallQ',
        //   // url: 'http://42.193.111.182:8000/consumer/getallQ',
        //   data: {
        //     id: 17
        //   }
        // }).then(response => {
        //   console.log(response)
        // })
        this.$router.push({path: '/edit', query: {account: this.$route.query.id, id: row.id}})
      }

    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm('此操作将将已删除问卷移到回收站中, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.axios({
          method: 'POST',
          //url: 'http://42.193.111.182:8000/consumer/put_into_bin',
          url: 'http://127.0.0.1:8000/consumer/put_into_bin',
          // url: 'http://42.193.111.182:8000/consumer/e_qustionnare',
          data: {
            id: row.id
          }
        }).then(response => {
          console.log(response)
        })
        this.$message({
          type: 'success',
          message: '删除成功，对应问卷已发入回收站！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    add() {

      console.log("您点击了新建问卷方法")
      console.log(this.tableData)
      // this.tableData.push(
      //     {
      //       date: '2016-05-03',
      //       name: '王小虎',
      //       address: '上海市普陀区金沙江路 1516 弄'
      //     })
      this.$router.push({path: '/new1', query: {id: this.$route.query.id}})

    },
    search1() {
      console.log("点击了查找用户所有问卷方法")
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/getQN',
        // url: 'http://42.193.111.182:8000/consumer/getQN',
        data: {
          account: this.$route.query.id,
          bin: false
        }
      }).then(response => {
        console.log(response)
        this.tableData = []
        this.tableData = response.data.question
        this.tabaleData_test = response.data.question
        let i = 0
        for (i = 0; i <= this.tableData.length - 1; i++) {
          if (this.tableData[i].status === 0) {
            this.tableData[i].status = "未发布"
          } else if (this.tableData[i].status === 1) {
            this.tableData[i].status = "已开始"
          } else if (this.tableData[i].status === 2) {
            this.tableData[i].status = "未开始"
          } else if (this.tableData[i].status === 3) {
            this.tableData[i].status = "已结束"
          }
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
    shujufenxi($index, row) {
      console.log("您点击了数据分析功能")
      // this.axios({
      //   method: 'POST',
      //   url: 'http://127.0.0.1:8000/consumer/shujufenxi',
      //   // url: 'http://42.193.111.182:8000/consumer/shujufenxi',
      //   data: {
      //     id: row.id,
      //   }
      // }).then(response => {
      //   console.log(response)
      // })
      // this.$router.replace('/shujufenxi')
      this.$router.push({path: '/shujufenxi', query: {id: row.id}})
    },
    clickmethod6($index, row) {
      if (row.status !== "已开始") {
        alert("当前状态不能停止问卷")
      } else {
        console.log("您点击了停止问卷作答方法")
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/publish',
          // url: 'http://42.193.111.182:8000/consumer/publish',
          data: {
            level: 1,
            id: row.id
          }
        }).then(response => {
          console.log(response)
          if (response.data === '已经停止了') {
            alert("该问卷暂未发布，无法停止作答")
          } else {
            this.search1()
            alert("停止作答问卷成功")
          }
        })
      }
    },
    clickmethod7($index, row) {
      console.log("立即开始作答")
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/publish',
        data: {
          level: 2,
          id: row.id
        }
      }).then(response => {
        console.log(response)
        if (response.data === "无法立即开始作答") {
          alert("当前问卷状态无法开始立即作答，请您检查后再进行有关操作")
        } else {
          alert("当前问卷已开启")
          this.search1()
        }
      })
    },
    clickmethod8($index, row) {
      console.log("取消发布")
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/publish',
        // url: 'http://42.193.111.182:8000/consumer/publish',
        data: {
          level: 3,
          id: row.id
        }
      }).then(response => {
        console.log(response)
        if (response.data === "取消发布存在问题") {
          alert("当前问卷状态不可以取消发布")
        } else {
          alert("取消发布成功")
          this.search1()
        }
      })
    }

  },
}
</script>

<style>

</style>
