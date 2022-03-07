<template>
  <div>
    <!--    <h2>多选题浏览编辑功能</h2>-->
    <strong style="font-size: 20px" v-show="message.score !== 0">[多选] {{ message.title }}
      ({{ message.score }})</strong>
    <strong style="font-size: 20px" v-show="message.score === 0">[多选] {{ message.title }}</strong>
    <p style="color: #a79d9d">题目说明：{{ message.describe }}</p>
    <el-input placeholder="输入题目内容" style="width: 500px" v-model="text1"></el-input>
    &nbsp
    <el-button @click="changeContext">修改题目内容</el-button>
    <br><br>
    <el-input placeholder="题目说明信息" style="width: 500px" v-model="text2" type="textarea"></el-input>
    &nbsp
    <el-button @click="changeDescribe">修改题目说明信息</el-button>
    <br><br>
    <el-input placeholder="增加选项内容" style="width: 300px" v-model="text3"
              v-show="message.true_xuanxiang.split(';').length <= 10"></el-input>
    <el-input placeholder="选项数量已超过上限" style="width: 300px" v-model="text3" v-show="message.true_xuanxiang.split(';').length > 10"
              disabled></el-input>
    &nbsp
    <el-button @click="add" v-show="message.true_xuanxiang.split(';').length <= 10">增加一个选项</el-button>
    <el-button @click="add" v-show="message.true_xuanxiang.split(';').length > 10" disabled>增加一个选项</el-button>
    <el-button type="primary" @click="delete1" v-show="status === true & message.true_xuanxiang.split(';').length >= 2">删除最后一个选项
    </el-button>
    <el-button type="primary" @click="delete1" v-show="status === true & message.true_xuanxiang.split(';').length <= 1" disabled>
      删除最后一个选项
    </el-button>
    <el-button type="primary" @click="delete2" v-show="status === false & message.true_xuanxiang.split(';').length >= 2">删除第一个选项
    </el-button>
    <el-button type="primary" @click="delete2" v-show="status === false & message.true_xuanxiang.split(';').length <= 1" disabled>
      删除第一个选项
    </el-button>
    <el-button type="danger" icon="el-icon-refresh" circle @click="change"></el-button>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkbox" size="medium">
        <el-checkbox-button v-for="x in message.true_xuanxiang.split(';')" :label="x">{{ x }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <br>
    可选数量限制&nbsp
    <el-input style="width: 70px" placeholder="max" v-model="message.min_num"></el-input>
    &nbsp-&nbsp
    <el-input style="width: 70px" placeholder="min" v-model="message.max_num"></el-input>
    <br><br>
    正确答案&nbsp&nbsp

    <el-input v-model="message.true_answer" placeholder="输入正确答案" type="textarea" autosize
              style="width: 300px"></el-input>
    <br><br>
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
  name: "ViewDuoxuan",
  data() {
    return {
      text1: '',
      text2: '',
      text3: '',
      status: true,
      checkbox: [],


    }
  },
  methods: {
    change_geshi(a) {
      let i = 0;
      let m = '';
      for (i = 0; i <= a.length - 1; i++) {
        if (i !== a.length - 1) {
          m = m + a[i] + ';'
        } else {
          m = m + a[i]
        }
      }
      return m;
    },
    changeContext() {
      if (this.text1 !== '') {
        this.message.title = this.text1
      } else {
        alert("题目内容不能为空")
      }
    },
    changeDescribe() {
      this.message.describe = this.text2
      this.text2 = ''
    },
    add() {
      if (this.text3 === '') {
        this.open4_1()
      } else {
        this.message.true_xuanxiang = this.message.true_xuanxiang + ';' + this.text3
        this.text3 = ''
      }
    },
    delete1() {
      let a = this.message.true_xuanxiang.split(';')
      a.pop()
      this.message.true_xuanxiang = this.change_geshi(a)
    },
    delete2() {
      let a = this.message.true_xuanxiang.split(';')
      a.shift()
      this.message.true_xuanxiang = this.change_geshi(a)

    },
    change() {
      this.status = !this.status
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
    message: {
      handler() {
        if (this.message.min_num <= 1 || this.message.min_num > this.message.max_num) {
          this.message.min_num = 1
        }
        if (this.message.max_num > this.message.true_xuanxiang.split(';').length || this.message.max_num < this.message.min_num) {
          this.message.max_num = this.message.true_xuanxiang.split(';').length
        }
      },

    }

  },


  props: ['message', 'index', 'length']
}
</script>

<style scoped>

</style>
