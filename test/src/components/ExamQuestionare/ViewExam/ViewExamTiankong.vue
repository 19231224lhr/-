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
    <p style="color: #a79d9d" v-show="question.true_answer !== null"><strong>你设定的标准答案是： </strong>{{ question.true_answer }}</p>
    <p style="color: #a79d9d" v-show="question.true_answer === null"><strong>开放性试题，您没有设定标准答案</strong>{{ question.true_answer }}</p>


  </div>
</template>

<script>
export default {
  name: "ViewExamTiankong",
  data() {
    return {
    }
  },
  watch: {
  },
  props: ['question']
}
</script>

<style scoped>

</style>
