<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[单选] {{ this.question.title }}</strong>

    <p style="color: #a79d9d">{{ this.question.describe }}</p>

    <!--    {{ radio }}-->
    <div style="margin-top: 20px" v-for="(item,index) in question.true_xuanxiang.split(';')">
      <el-radio v-model="checkbox" :label="index">{{ item }}</el-radio>
      &nbsp&nbsp&nbsp
      剩余人数&nbsp&nbsp&nbsp
      {{ question.true_number.split(';')[index] }}
    </div>
    <p style="color: #a79d9d">最少选项数量：{{ question.min_num }} 最多选项数量：{{ question.max_num }}</p>
    <span v-show="isWarning === true">
      <el-alert
          title="请选择正确数量的选项"
          type="warning"
          show-icon
          v-show="question.min_num > checkbox.length || question.max_num < checkbox.length">
    </el-alert>
    </span>

  </div>
</template>

<script>
export default {
  name: "ViewVotewDuoxuan",
  data() {
    return {
      checkbox: [],
      message: {},
      isTrue: true,
      username: ''
    }
  },
  methods: {
    method1() {
      if (this.question.must === true && this.radio === '') {
        this.isTrue = false
      } else {
        this.isTrue = true
      }
      this.message = {
        level: 1,
        answer: this.radio,
        id: this.question.id,
        isTrue: this.isTrue,
        account: this.account
      }
      // console.log(this.message)
      this.$emit('func1', this.message)
    }
  },
  watch: {
    radio: {
      immediate: true,
      handler(newvalue, oldvalue) {
        this.method1()
      }
    }
  },
  props: ['question', 'account']
}
</script>

<style scoped>

</style>
