<template>
  <div>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[位置] {{ question.title }}</strong>

    <p style="color: #a79d9d">{{ question.describe }}</p>
    <el-button disabled><i class="el-icon-position"></i> 点击获取地理位置</el-button>
    <br><br>
    <strong>您上传地理位置是：</strong>{{ answer }}
  </div>
</template>

<script>
export default {
  name: "AnswerPosition",
  data() {
    return {
      position: '',
      isGetPosition: '',
      isTrue: true
    }
  },
  methods: {

  },
  props: ['question','answer'],
}
</script>

<style scoped>

</style>
