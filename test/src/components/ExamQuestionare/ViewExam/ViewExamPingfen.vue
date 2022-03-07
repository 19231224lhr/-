<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px" v-show="question.score !== 0">[评分] {{ question.title }}
      ({{ question.score }})</strong>
    <strong style="font-size: 20px" v-show="question.score === 0">[评分] {{ question.title }}</strong>
    <p style="color: #a79d9d">{{ question.describe }}</p>

    <div class="block">
      <el-slider
          v-model="value"
          show-input
          style="width: 500px"
          :max="question.max_score">
      </el-slider>
    </div>
    <strong><p style="color: #a79d9d">开放性试题，您没有设置标准答案</p></strong>



  </div>
</template>

<script>
export default {
  name: 'ViewExamPingfen',
  props: ['question']
}
</script>

<style scoped>

</style>
