<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[单选] {{ this.question.title }}</strong>

    <p style="color: #a79d9d">{{ this.question.describe }}</p>

<!--    {{ radio }}-->
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio" size="medium" @click="method1">
        <el-radio-button v-for="x in this.question.true_xuanxiang.split(';')" :label="x">{{ x }}</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "Danxuan",
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
