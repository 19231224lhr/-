<template>
  <div>
    <!--    <h2>填空编辑功能</h2>-->
    <h3>[填空] {{ context }}&nbsp&nbsp&nbsp<i class="el-icon-key"></i></h3>
    <span style="color: #a79d9d">{{describe}}</span>
    <span style="float: right;margin-right: 50px" @click="fold" v-show="isFold === false"><i
        class="el-icon-arrow-up"></i> </span>
    <span style="float: right;margin-right: 50px" @click="fold" v-show="isFold === true"><i
        class="el-icon-arrow-down"></i> </span>

    <transition name="el-zoom-in-top">
      <div v-show="isFold === false" style="margin: 0;padding: 0">
        <br>
        <el-input v-model="text1" placeholder="输入填空题新题目" style="width: 500px"></el-input>
        &nbsp
        <el-button type="primary" @click="change1">修改题目</el-button>
        <br><br>
        <el-input placeholder="题目说明信息" style="width: 500px" v-model="text3" type="textarea"></el-input>
        &nbsp
        <el-button @click="changeContext_1">修改题目说明信息</el-button>
        <br><br>
        回答长度限制&nbsp
        <el-input-number v-model="max_length" @change="handleChange" :min="1" :max="1000" label="描述文字"></el-input-number>
        <br><br>
        <!--    <el-radio v-model="radio_1" label="1">本题必做</el-radio>-->
        <!--    <el-radio v-model="radio_1" label="2">本题不必做</el-radio>-->
        本题是否必做&nbsp

        <el-tooltip :content="'本题是否必做: ' + must" placement="top">
          <el-switch
              v-model="must"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </el-tooltip>
        <br>
        <el-button type="danger" icon="el-icon-delete" circle
                   style="float: right;margin-left: 10px;margin-right: 50px" @click="open_remove"></el-button>
        <el-button round style="float: right" circle
                   icon="el-icon-bottom" @click="down"></el-button>
        <el-button type="primary" round style="float: right" circle icon="el-icon-top" @click="up"></el-button>
        <br>
        <el-button type="success" @click="sendMessage">保存修改</el-button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "EditTiankong",
  data() {
    return {
      value: true,
      radio_1: '',
      num: 30,
      text1: '',
      text3: '',
      message: {},
      isFold: false
    }
  },
  methods: {
    fold() {
      this.isFold = !this.isFold
    },
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
      this.$emit('func1', this.index_message)
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
    changeContext_1() {
      if (this.text3 === '') {
        this.open4_2()
      } else {
        this.open1_2()
        this.describe = this.text3
      }
    },
    change1() {
      if (this.text1 === '') {
        // this.text1 = this.context
        this.open4()
      } else {
        this.context = this.text1
        this.open1()
      }
    },
    sendMessage() {
      if (this.text1 === '') {
        this.text1 = this.context
      }
      this.message = {
        title: this.context,
        level: '3',
        describe: this.describe,
        must: this.must,
        max_length: this.max_length,
        id: this.id
      }
      this.$emit('func1', this.message)
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
        this.$emit('func1', this.index_message)
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
        this.$emit('func1', this.index_message)
      }
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
    handleChange(value) {
      console.log(value);
    }
  },
  props: ['context', 'index', 'length','describe','max_length','must','id']
}
</script>

<style scoped>

</style>
