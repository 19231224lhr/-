<template>
  <div>
    <div class="answer-div">
      <el-input placeholder="点击输入问卷编号" style="width: 300px;float: left;margin: 30px" v-model="wenjuanid"></el-input>
      <el-button type="primary" icon="el-icon-search" style="float: right;margin: 30px" @click="searchMethod">搜索
      </el-button>
      <div class="form-div">
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              label="问卷编号"
              width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="问卷名称"
              width="180">
            <template slot-scope="scope">
              <i class="el-icon-paperclip"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="问卷状态"
              width="180">
            <template slot-scope="scope">
              <i class="el-icon-paperclip"></i>
              <span style="margin-left: 10px">{{ scope.row.level }}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="题目数量"
              width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>问卷名: {{ scope.row.name }}</p>
                <p>问卷id: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">回答问卷
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>


    </div>

  </div>
</template>

<script>
export default {
  name: "Answer",
  data() {
    return {
      tableData: [],
      wenjuanid: ''
    }
  },
  methods: {
    searchMethod() {
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/getallQ',
        // url: 'http://42.193.111.182:8000/consumer/getallQ',
        // url: 'http://42.193.111.182:8000/consumer/getallQ',
        data: {
          id: this.wenjuanid
        }
      }).then(response => {
        console.log(response)
        if (response.data.n === 0) {
          alert("对应问卷还没有发布")
        } else if (response.data.n === 1) {
          this.tableData = [
            {
              date: this.wenjuanid,
              name: response.data.question.length,
              level: response.data.n = "进行中"
            }
          ]
        } else if (response.data.n === 2) {
          this.tableData = [
            {
              date: this.wenjuanid,
              name: response.data.question.length,
              level: response.data.n = "未开始作答"
            }
          ]
        } else if (response.data.n === 3) {
          this.tableData = [
            {
              date: this.wenjuanid,
              name: response.data.question.length,
              level: response.data.n = "已结束"
            }
          ]
        } else if (response.data.n === 4) {
          alert("问卷不存在，请您检查问卷编号")
        }



      })
    },
    handleEdit(index, row) {
      console.log(index, row);
      console.log("您点击了查看问卷方法")
      this.$router.push({path: '/wenjuan', query: {account: this.$route.query.id, Questionnaireplanet: this.wenjuanid}})
    },
  }
}
</script>

<style scoped>
.answer-div {
  background-color: white;
  width: 1000px;
  height: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px
}

.form-div {
  margin: 10px;
}
</style>
