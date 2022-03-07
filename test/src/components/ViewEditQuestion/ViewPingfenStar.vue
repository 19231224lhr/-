<template>
  <div>
    <h3>[评分] {{ message.title }}&nbsp&nbsp&nbsp<i class="el-icon-key"></i></h3>
    <p style="color: #a79d9d">题目说明：{{ message.describe }}</p>

    <el-input v-model="text1" placeholder="输入评分题新题目" style="width: 500px"></el-input>
    &nbsp
    <el-button type="primary" @click="changeContext">修改题目</el-button>
    <br><br>
    <el-input placeholder="题目说明信息" style="width: 500px" v-model="text2" type="textarea"></el-input>
    &nbsp
    <el-button @click="changeDescribe">修改题目说明信息</el-button>
    <br><br>
    本题是否必做&nbsp

    <el-tooltip :content="'本题是否必做: ' + message.must" placement="top">
      <el-switch
          v-model="message.must"
          active-color="#13ce66"
          inactive-color="#ff4949">
      </el-switch>
    </el-tooltip>
    <br><br>
    <el-rate
        v-model="star"
        :colors="colors">
    </el-rate>
    <br>
    <div style="margin-bottom: 30px">
      <el-button type="danger" icon="el-icon-delete" circle
                 style="float: right;margin-left: 10px;margin-right: 50px" @click="open_remove"></el-button>
      <el-button round style="float: right" circle
                 icon="el-icon-bottom" @click="down"></el-button>
      <el-button type="primary" round style="float: right" circle icon="el-icon-top" @click="up"></el-button>
    </div>


  </div>
</template>

<script>
export default {
  name: "ViewPingfenStar",
  data() {
    return {
      text1: '',
      text2: '',
      text3: '',
      value_1: this.message.must,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      star: ''

    }
  },
  methods: {
    open_remove() {
      this.$confirm('此操作将删除问题, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.remove()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.isRemove = false
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    remove() {
      console.log("您点击了删除方法,index=", this.index)
      this.index_message = {
        direction_message: 'remove',
        index_2: this.index
      }
      this.$emit('func3', this.index_message)
    },
    up() {
      console.log("您点击了上移方法,index=", this.index)
      if (this.index === 0) {
        console.log("已经是第一题了，不能再上移了")
        this.open2_1()
      } else {
        console.log("上移方法成功")
        this.index_message = {
          direction_message: 'up',
          index_2: this.index
        }
        this.$emit('func3', this.index_message)
      }
    },
    down() {
      console.log("您点击了下移方法,index=", this.index)
      if (this.index === this.length - 1) {
        console.log("已经是最后一题了，不能再下移了")
        this.open2_2()
      } else {
        console.log("下移方法成功")
        this.index_message = {
          direction_message: 'down',
          index_2: this.index
        }
        this.$emit('func3', this.index_message)
      }

    },
    changeContext() {
      if (this.text1 === '') {
        alert("问题内容不能为空")
      } else {
        this.message.title = this.text1
        this.text1 = ''
      }
    },
    changeDescribe() {
      this.message.describe = this.text2
      this.text2 = ''
    },
    open1() {
      this.$notify({
        title: '成功',
        message: '问卷名修改成功',
        type: 'success'
      });
    },
    open1_1() {
      this.$notify({
        title: '成功',
        message: '增添选项成功',
        type: 'success'
      });
    },
    open1_2() {
      this.$notify({
        title: '成功',
        message: '题目说明信息修改成功',
        type: 'success'
      });
    },
    open4() {
      this.$notify.error({
        title: '错误',
        message: '问卷名不能修改为空值'
      })
    },
    open4_1() {
      this.$notify.error({
        title: '错误',
        message: '选项内容不能为空'
      })
    },
    open4_2() {
      this.$notify.error({
        title: '错误',
        message: '题目说明信息不能为空'
      })
    },
    open2_1() {
      this.$notify({
        title: '警告',
        message: '题目已经到最上面了，不能再往上移动了',
        type: 'warning'
      });
    },
    open2_2() {
      this.$notify({
        title: '警告',
        message: '题目已经到最下面了，不能再往下移动了',
        type: 'warning'
      });
    },
  },
  props: ['message', 'index', 'length']
}
</script>

<style scoped>

</style>
