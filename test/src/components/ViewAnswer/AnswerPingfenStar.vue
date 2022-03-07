<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>

    <strong style="font-size: 20px">[评分] {{ question.title }}</strong>
    <p style="color: #a79d9d">{{ question.describe }}</p>
    <br>
    <div>
      您提交的答案是{{ answer }}
    </div>
    <el-rate
        v-model="answer"
        :colors="colors">
    </el-rate>


  </div>
</template>

<script>
export default {
  name: "AnswerPingfenStar",
  data() {
    return {

      message: {},
      star: 3,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      username: ''

    };
  },
  methods: {},
  watch: {},
  props: ['question', 'answer']
}
</script>

<style scoped>

</style>
