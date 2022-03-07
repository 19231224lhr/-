<template>
  <div>
    <!--    <h2>评分题浏览编辑功能</h2>-->
    <strong style="font-size: 20px" v-show="message.score !== 0">[评分] {{ message.title }}
      ({{ message.score }})</strong>
    <strong style="font-size: 20px" v-show="message.score === 0">[评分] {{ message.title }}</strong>
    <p style="color: #a79d9d">题目说明：{{ message.describe }}</p>

    <el-input v-model="text1" placeholder="输入评分题新题目" style="width: 500px"></el-input>
    &nbsp
    <el-button type="primary" @click="changeContext">修改题目</el-button>
    <br><br>
    <el-input placeholder="题目说明信息" style="width: 500px" v-model="text2" type="textarea"></el-input>
    &nbsp
    <el-button @click="changeDescribe">修改题目说明信息</el-button>
    <br><br>
    设定最高评分&nbsp
    <el-input-number v-model="message.max_score" @change="handleChange" :min="1" :max="1000"
                     label="描述文字"></el-input-number>
    <br><br>
    <div class="block">
      <el-slider
          v-model="value"
          show-input
          :max="message.max_score"
          style="width: 500px">
      </el-slider>
    </div>
    <br>
    题目分值&nbsp&nbsp
    <el-input v-model="message.score" placeholder="输入题目分值" type="textarea" autosize
              style="width: 300px"></el-input>

    <br><br>
    本题是否必做&nbsp

    <el-tooltip :content="'本题是否必做: ' + message.must" placement="top">
      <el-switch
          v-model="message.must"
          active-color="#13ce66"
          inactive-color="#ff4949">
      </el-switch>
    </el-tooltip>
    <br>
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
  name: "ViewPingfen",
  data() {
    return {
      text1: '',
      text2: '',
      text3: '',
      value: 10,
      value_1: this.message.must,
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
    handleChange(value) {
      console.log(value);
    },
    changeContext() {
      if (this.text1 === '') {
        alert("问题内容不能为空")
      } else {
        this.message.title = this.text1
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
  watch: {
    value_1: {
      handler() {
        console.log("value_1发生了变化")
        this.message.must = this.value_1
      }
    },
    num: {
      handler() {
        console.log("num发生了变化")
        this.message.max_length = this.num
      }
    }
  },
  props: ['message', 'index', 'length']
}
</script>

<style scoped>

</style>
