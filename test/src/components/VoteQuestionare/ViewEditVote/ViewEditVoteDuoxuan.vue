<template>
  <div>
    <!--    <h2>单选题浏览修改功能</h2>-->
    <!--    {{ this.message }}-->
    <!--    {{ message }}-->
    <h3>[多选] {{ message.title }}&nbsp&nbsp&nbsp<i class="el-icon-key"></i>
    </h3>
    <p style="color: #a79d9d">题目说明：{{ message.describe }}</p>
    <el-input placeholder="题目内容" style="width: 500px" v-model="text1"></el-input>
    &nbsp
    <el-button @click="changeContext">修改题目内容</el-button>
    <br><br>
    <el-input placeholder="题目说明信息" style="width: 500px" v-model="text2" type="textarea"></el-input>
    &nbsp
    <el-button @click="changeDescribe">修改题目说明信息</el-button>
    <br><br>
    <el-input placeholder="增加选项内容" style="width: 300px" v-model="text3"
              v-show="message.true_xuanxiang.split(';').length <= 10"></el-input>
    <el-input placeholder="选项数量已超过上限" style="width: 300px" v-show="message.true_xuanxiang.split(';').length > 10"
              disabled></el-input>
    &nbsp
    <el-button @click="add" v-show="message.true_xuanxiang.split(';').length <= 10">增加一个选项</el-button>
    <el-button @click="add" v-show="message.true_xuanxiang.split(';').length > 10" disabled>增加一个选项</el-button>
    <el-button type="primary" @click="delete1" v-show="status === true & message.true_xuanxiang.split(';').length >= 2">
      删除最后一个选项
    </el-button>
    <el-button type="primary" @click="delete1" v-show="status === true & message.true_xuanxiang.split(';').length <= 1"
               disabled>删除最后一个选项
    </el-button>
    <el-button type="primary" @click="delete2"
               v-show="status === false & message.true_xuanxiang.split(';').length >= 2">
      删除第一个选项
    </el-button>
    <el-button type="primary" @click="delete2" v-show="status === false & message.true_xuanxiang.split(';').length <= 1"
               disabled>删除第一个选项
    </el-button>
    <el-button type="danger" icon="el-icon-refresh" circle @click="change"></el-button>
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio" size="medium">
        <el-radio-button v-for="x in message.true_xuanxiang.split(';')" :label="x">{{ x }}</el-radio-button>
      </el-radio-group>
    </div>
    <br>
<!--    {{ message.true_number.split(';') }}-->
    <div v-for="(item,index) in message.true_xuanxiang.split(';')">
      <el-input placeholder="填写投票内容" style="width: 500px"
                v-model="message.true_xuanxiang.split(';')[index]"></el-input>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <el-input-number v-model="message.true_number.split(';')[index]" :min="1" :max="1000"
                       label="描述文字"></el-input-number>
      <br><br>
    </div>
    <el-button>确认</el-button>
    <br>
    <br>
    选项数量限制&nbsp&nbsp&nbsp
    <el-input v-model="message.min_num" style="width: 100px"></el-input>
    -
    <el-input v-model="message.max_num" style="width: 100px"></el-input>
    <br>
    <br>
    本题是否必做&nbsp
    <el-tooltip :content="'本题是否必做: ' + message.must" placement="top">
      <el-switch
          v-model="message.must"
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
  </div>
</template>

<script>
export default {
  name: "ViewDanxuan",
  data() {
    return {
      shuzu: ["1", "2", "3", "4"],
      text1: '',
      text2: '',
      text3: '',
      radio: '',
      status: true,
      index_message: {}
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
    change() {
      this.status = !this.status
    },
    changeContext() {
      console.log("您点击了改变内容方法", this.text1)
      if (this.text1 !== '') {

        this.message.title = this.text1
        this.text1 = ''
      } else {
        alert("题目描述不能是空值")
      }
    },
    changeDescribe() {
      this.message.describe = this.text2
      this.text2 = ''
    },
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
    add() {
      if (this.text3 === '') {
        this.open4_1()
      } else {
        this.open1_1()
        this.message.true_xuanxiang = this.message.true_xuanxiang + ';' + this.text3
        this.text3 = ''
      }
    },
    delete1() {
      let a = this.message.true_xuanxiang.split(';')
      a.pop()
      this.message.true_xuanxiang = this.change_geshi(a)
      // console.log(this.message.xuanxiang)
    },
    delete2() {
      let a = this.message.true_xuanxiang.split(';')
      a.shift()
      this.message.true_xuanxiang = this.change_geshi(a)
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
  watch: {},
  props: ['message', 'index', 'length']
}
</script>

<style scoped>

</style>
