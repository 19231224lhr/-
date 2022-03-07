<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px" v-show="question.score !== 0">[填空] {{ this.question.title }}
      ({{ question.score }})</strong>
    <strong style="font-size: 20px" v-show="question.score === 0">[填空] {{ this.question.title }}</strong>
    <p style="color: #a79d9d">{{ question.describe }}</p>
    <el-input
        type="textarea"
        placeholder="请写出您的回答"
        v-model="tiankong"
        :maxlength="question.max_length"
        style="width: 500px;"
        show-word-limit></el-input>

  </div>
</template>

<script>
export default {
  name: "Tiankong",
  data() {
    return {
      tiankong: '',
      message: {},
      isTrue: true,
      username: ''
    }
  },
  watch: {
    tiankong: {
      immediate: true,
      handler(newvalue, oldvalue) {
        if (this.question.must === true && this.tiankong === '') {
          this.isTrue = false
        } else {
          this.isTrue = true
        }
        this.message = {
          level: 3,
          answer: this.tiankong,
          id: this.question.id,
          isTrue: this.isTrue,
          account: this.account
        }
        this.$emit("func1", this.message)
      }
    }
  },
  props: ['question','account']
}
</script>

<style scoped>

</style>
