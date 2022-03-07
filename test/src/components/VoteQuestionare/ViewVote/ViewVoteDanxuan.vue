<template>
  <div>
    <h1>单选题</h1>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[单选] {{ question.title }}</strong>

    <p style="color: #a79d9d">{{ question.describe }}</p>

    <!--    {{ radio }}-->
    <div style="margin-top: 20px" v-for="(item,index) in question.true_xuanxiang.split(';')">
        <el-radio v-model="radio" :label="index">{{ item }}</el-radio>
      &nbsp&nbsp&nbsp
      剩余人数&nbsp&nbsp&nbsp
      {{question.true_number.split(';')[index]}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewVoteDanxuan",
  data() {
    return {
      radio: '',
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
  props: ['question','account']
}
</script>

<style scoped>

</style>
