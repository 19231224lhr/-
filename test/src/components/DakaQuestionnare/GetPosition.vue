<template>
  <div>
    <h3>{{ruleForm.title}}</h3>
    <p style="color: #a79d9d">{{ ruleForm.describe }}</p>

    <el-button @click="getPosition"><i class="el-icon-position"></i> 点击获取地理位置</el-button>
    <br><br>
    <strong v-show="isGetPosition === true">您当前的地理位置是：</strong>{{ position }}
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>


  </div>
</template>

<script>
export default {
  name: "GetPosition",
  data() {
    return {
      ruleForm: {
        level: 6,
        title: '获取地理位置',
        describe: '你需要授权获取地理位置才能完成这一操作',
        must: true
      },
      position: '',
      isGetPosition: ''
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
  }
}
</script>

<style scoped>

</style>
