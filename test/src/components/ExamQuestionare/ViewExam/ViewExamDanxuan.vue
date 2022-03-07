<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px" v-show="question.score !== 0">[单选] {{ question.title }}
      ({{ question.score }})</strong>
    <strong style="font-size: 20px" v-show="question.score === 0">[单选] {{ question.title }}</strong>

    <p style="color: #a79d9d">{{ this.question.describe }}</p>

    <!--    {{ radio }}-->
    <div style="margin-top: 20px">
      <el-radio-group v-model="radio" size="medium">
        <el-radio-button v-for="x in this.question.true_xuanxiang.split(';')" :label="x">{{ x }}</el-radio-button>
      </el-radio-group>
    </div>
    <p style="color: #a79d9d" v-show="question.true_answer !== null"><strong>你设定的标准答案是： </strong>{{ question.true_answer }}</p>
    <p style="color: #a79d9d" v-show="question.true_answer === null"><strong>开放性试题，您没有设置标准答案</strong></p>

    <div style="margin-top: 20px" v-show="question.true_answer !== null">
      <el-radio-group v-model="true_radio" size="medium">
        <el-radio-button v-for="x in this.question.true_xuanxiang.split(';')" :label="x">{{ x }}</el-radio-button>
      </el-radio-group>
    </div>

  </div>
</template>

<script>
export default {
  name: "ViewExamDanxuan",
  data() {
    return {
      radio: '',
      true_radio: this.question.true_answer
    }
  },
  props: ['question']
}
</script>

<style scoped>

</style>
