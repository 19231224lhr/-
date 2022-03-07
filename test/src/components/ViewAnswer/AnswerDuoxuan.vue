<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px">[多选] {{ question.title }}</strong>
    <p style="color: #a79d9d">{{ question.describe }}</p>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkbox" size="medium">
        <el-checkbox-button v-for="x in question.true_xuanxiang.split(';')" :label="x" :key="x">{{
            x
          }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <p style="color: #a79d9d">最少选项数量：{{ question.min_num }} 最多选项数量：{{ question.max_num }}</p>
    <br>
    <div>
      您提交的答案是：{{ answer}}
    </div>

  </div>
</template>

<script>

export default {
  name: "AnswerDuoxuan",
  data() {
    return {
      checkbox: [],
      message: {},
      answer: '',
      isWarning: false,
      isTrue: true,
      username: ''
    };
  },
  methods: {

  },
  watch: {

  },
  props: ['question','answer']
}
</script>

<style scoped>

</style>
