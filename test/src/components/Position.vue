<template>
  <div>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[位置] {{ this.question.title }}</strong>

    <p style="color: #a79d9d">{{ this.question.describe }}</p>
    <el-button @click="getPosition"><i class="el-icon-position"></i> 点击获取地理位置</el-button>
    <br><br>
    <strong v-show="isGetPosition === true">您当前的地理位置是：</strong>{{ position }}
  </div>
</template>

<script>
export default {
  name: "Position",
  data() {
    return {
      position: '',
      isGetPosition: '',
      isTrue: true
    }
  },
  methods: {
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
          // url: 'http://42.193.111.182:8000/consumer/get_ip',

        }).then(response => {
          console.log(response)
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
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$emit("func1", this.ruleForm)
    }
  },
  props: ['question', 'account'],
  watch: {
    position: {
      immediate: true,
      handler() {
        if (this.position === '' && this.question.must === true) {
          console.log("必须做答题没有写")
          this.isTrue = false
        } else {
          this.isTrue = true
        }
        this.message = {
          level: 6,
          answer: this.position,
          id: this.question.id,
          isTrue: this.isTrue,
          account: this.account
        }

        this.$emit("func1", this.message)
      }
    }
  }
}
</script>

<style scoped>

</style>
