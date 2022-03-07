<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>

    <strong style="font-size: 20px">[评分] {{ question.title }}</strong>
    <p style="color: #a79d9d">{{ question.describe }}</p>

    <div class="block">
      <el-slider
          v-model="value"
          show-input
          style="width: 500px"
          :max="question.max_score">
      </el-slider>
    </div>
    <br>
    <div>
      您提交的答案是：{{ answer}}
    </div>

  </div>
</template>

<script>
export default {
  name: 'AnswerPingfen',
  data() {
    return {
      message: {},
      value: 0,
      username: ''
    };
  },
  methods: {},
  watch: {

  },
  props: ['question','answer']
}
</script>

<style scoped>

</style>
