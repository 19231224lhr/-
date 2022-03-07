<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px" v-show="question.score !== 0">[多选] {{ this.question.title }}
      ({{ question.score }})</strong>
    <strong style="font-size: 20px" v-show="question.score === 0">[多选] {{ this.question.title }}</strong>

    <p style="color: #a79d9d">{{ this.question.describe }}</p>

    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkbox" size="medium">
        <el-checkbox-button v-for="x in question.true_xuanxiang.split(';')" :label="x" :key="x">{{
            x
          }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <p style="color: #a79d9d" v-show="question.true_answer !== null"><strong>你设定的标准答案是： </strong>{{ question.true_answer }}</p>
    <p style="color: #a79d9d" v-show="question.true_answer === null"><strong>开放性试题，您没有设置标准答案</strong></p>
    <div style="margin-top: 20px" v-show="question.true_answer !== null">
      <el-checkbox-group v-model="true_checkbox" size="medium">
        <el-checkbox-button v-for="x in question.true_xuanxiang.split(';')" :label="x" :key="x">{{
            x
          }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>

  </div>
</template>

<script>
export default {
  name: "ViewExamDuoxuan",
  data() {
    return {
      checkbox: [],
      true_checkbox: this.question.true_answer.split(';')
    }
  },
  props: ['question']
}
</script>

<style scoped>

</style>
