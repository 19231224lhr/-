<template>
  <div style="width: 1000px">
<!--    {{ tableData }}-->
    <div class="answer-div">
      <div class="form-div">
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
              <i class="el-icon-paperclip"></i>
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看答案
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
  name: "SearchAnswer",
  mounted() {
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/yidawenjuan',
      // url: 'http://42.193.111.182:8000/consumer/yidawenjuan',
      data: {
        account: this.$route.query.id
      }
    }).then(response => {
      console.log("查询个人已答问卷", response)
      this.tableData = response.data.QNID
    })
  },
  data() {
    return {
      wenjuanid: '',
      tableData: []
    }

  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      console.log("您点击了查看答案方法",row)
      this.$router.push({path: '/viewanswer', query: {account: this.$route.query.id, Qid: row.id}})
    },
  }
}
</script>

<style scoped>

</style>
