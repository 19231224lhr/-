<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[填空] {{ question.title }}</strong>
    <p style="color: #a79d9d">{{ question.describe }}</p>
    <br>
    <div>
      您提交的答案是：{{ answer }}
    </div>

  </div>
</template>

<script>
export default {
  name: "AnswerTiankong",
  data() {
    return {}
  },
  watch: {},
  props: ['question', 'answer']
}
</script>

<style scoped>

</style>
