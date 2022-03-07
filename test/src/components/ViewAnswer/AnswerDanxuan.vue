<template>
  <div>
<!--    {{question}}-->
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[单选] {{ question.title }}</strong>

    <p style="color: #a79d9d">{{ question.describe }}</p>

    <!--    {{ radio }}-->
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio" size="medium">
        <el-radio-button v-for="x in this.question.true_xuanxiang.split(';')" :label="x">{{ x }}</el-radio-button>
      </el-radio-group>
    </div>
    <br>
    <div>
      您提交的答案是：{{ true_answer}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewDanxuan",
  data() {
    return {
      radio: '',
      true_answer: this.question.answer.answerText
    }
  },
  props: ['question','answer']
}
</script>

<style scoped>

</style>
