<template>
<div>
  <h3>[位置] {{ message.title }}&nbsp&nbsp&nbsp<i class="el-icon-key"></i></h3>
  <p style="color: #a79d9d">{{ message.describe }}</p>
  <el-button @click="getPosition"><i class="el-icon-position"></i> 点击获取地理位置</el-button>
  <br><br>
  <strong v-show="isGetPosition === true">您当前的地理位置是：</strong>{{ position }}
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
  name: "ViewPosition",
  data() {
    return {
      position: '',
      isGetPosition: ''
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
    getPosition() {
      console.log("您点击了获取地理位置的按钮")
      this.$confirm('您将授权访问您的地理位置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isGetPosition = true
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/get_ip',

        }).then(response => {
          this.position = response.data
        })
        this.$message({
          type: 'success',
          message: '获取地理未知成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '您已取消获取地理位置'
        });
      });
    },
  },
  props: ['message','index','length']
}
</script>

<style scoped>

</style>
