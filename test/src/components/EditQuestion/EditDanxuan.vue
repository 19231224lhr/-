<template>
  <div>
    <!--    <h2>单选题编辑功能</h2>-->
    <h3>[单选] {{ context }}&nbsp&nbsp&nbsp<i class="el-icon-key"></i></h3>
    <span style="color: #a79d9d">{{ describe }}</span>
    <span style="float: right;margin-right: 50px" @click="fold" v-show="isFold === false"><i
        class="el-icon-arrow-up"></i> </span>
    <span style="float: right;margin-right: 50px" @click="fold" v-show="isFold === true"><i
        class="el-icon-arrow-down"></i> </span>

    <transition name="el-zoom-in-top">
      <div v-show="isFold === false" style="margin: 0;padding: 0">
        <br>
        <el-input placeholder="题目内容" style="width: 500px" v-model="text2"></el-input>
        &nbsp
        <el-button @click="changeContext">修改题目内容</el-button>
        <br><br>
        <el-input placeholder="题目说明信息" style="width: 500px" v-model="text3" type="textarea"></el-input>
        &nbsp
        <el-button @click="changeContext_1">修改题目说明信息</el-button>
        <br><br>
        <el-input placeholder="增加选项内容" style="width: 300px" v-model="text1"
                  v-show="newxuanxiang.length <= 10"></el-input>
        <el-input placeholder="选项数量已超过上限" style="width: 300px" v-model="text1" v-show="newxuanxiang.length > 10"
                  disabled></el-input>
        &nbsp
        <el-button @click="add" v-show="newxuanxiang.length <= 10">增加一个选项</el-button>
        <el-button @click="add" v-show="newxuanxiang.length > 10" disabled>增加一个选项</el-button>
        <el-button type="primary" @click="delete1" v-show="status === true & newxuanxiang.length >= 2">删除最后一个选项
        </el-button>
        <el-button type="primary" @click="delete1" v-show="status === true & newxuanxiang.length <= 1" disabled>删除最后一个选项
        </el-button>
        <el-button type="primary" @click="delete2" v-show="status === false & newxuanxiang.length >= 2">删除第一个选项
        </el-button>
        <el-button type="primary" @click="delete2" v-show="status === false & newxuanxiang.length <= 1" disabled>删除第一个选项
        </el-button>
        <el-button type="danger" icon="el-icon-refresh" circle @click="change"></el-button>
        <div style="margin-top: 20px">
          <el-radio-group v-model="radio" size="medium">
            <el-radio-button v-for="x in newxuanxiang" :label="x">{{ x }}</el-radio-button>
          </el-radio-group>
        </div>
        <br>
        本题是否必做&nbsp
        <el-tooltip :content="'本题是否必做: ' + must" placement="top">
          <el-switch
              v-model="must"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </el-tooltip>
        <br>
        <el-button type="danger" icon="el-icon-delete" circle style="float: right;margin-left: 10px;margin-right: 50px"
                   @click="open_remove"></el-button>
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
  name: "EditDanxuan",
  data() {
    return {
      value: true,
      text1: '',
      text2: '',
      text3: '',
      radio: '',
      radio_1: '',
      newxuanxiang: this.xuanxiang,
      status: true,
      message: {},
      sendxuanxiang: '',
      index_message: {},
      isRemove: true,
      isFold: false,
      describe: ''
    }
  },
  methods: {
    fold() {
      console.log("点击了折叠方法")
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
    changegeshi() {
      let i = 0;
      for (i = 0; i <= this.newxuanxiang.length - 1; i++) {
        if (i === this.newxuanxiang.length - 1) {
          this.sendxuanxiang = this.sendxuanxiang + this.newxuanxiang[i]
        } else {
          this.sendxuanxiang = this.sendxuanxiang + this.newxuanxiang[i] + ';'
        }
      }
    },
    add() {
      if (this.text1 === '') {
        this.open4_1()
      } else {
        this.open1_1()
        this.newxuanxiang.push(this.text1)
        console.log("22222", this.newxuanxiang)
      }
    },
    delete1() {
      this.newxuanxiang.pop()
    },
    delete2() {
      this.newxuanxiang.shift()
    },
    change() {
      this.status = !this.status
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
    changeContext() {
      if (this.text2 === '') {
        this.open4()
      }
      if (this.text2 !== '') {
        this.open1()
        this.context = this.text2
      }
    },
    changeContext_1() {
      if (this.text3 === '') {
        this.open4_2()
      } else {
        this.describe = this.text3
        this.open1_2()
      }
    },
    sendMessage() {
      if (this.text2 === '') {
        this.text2 = this.context
      }
      this.changegeshi()
      this.message = {
        title: this.context,
        level: '1',
        true_xuanxiang: this.sendxuanxiang,
        describe: this.describe,
        must: this.must,
        id: this.id
      }
      this.$emit('func1', this.message)
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
    context: {
      handler() {
        console.log("context发生了改变")
      }
    },
    id: {
      handler() {
        console.log("id发生了改变")
      }
    }
  },
  props: ['context', 'xuanxiang', 'index', 'id', 'length', 'describe' ,'must']
}
</script>

<style scoped>

</style>
