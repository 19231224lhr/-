<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>
    <strong style="font-size: 20px" v-show="question.score !== 0">[多选] {{ this.question.title }}
      ({{ question.score }})</strong>
    <strong style="font-size: 20px" v-show="question.score === 0">[多选] {{ this.question.title }}</strong>
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
    <div style="height: 10px;padding-top: 0px;margin-top: 0px">
    <span v-show="isWarning === true">
      <el-alert
          title="请选择正确数量的选项"
          type="warning"
          show-icon
          v-show="question.min_num > checkbox.length || question.max_num < checkbox.length">
    </el-alert>
    </span>
    </div>
  </div>
</template>

<script>

export default {
  name: "Duoxuan",
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
    changegeshi() {
      if (this.checkbox.length === 0) {
        console.log("空")
      } else {
        console.log("-------------",this.checkbox)
        this.isWarning = true

      }
      let a = ''
      let i = 0;
      for (i = 0; i <= this.checkbox.length - 1; i++) {
        if (i === this.checkbox.length - 1) {
          a = a + this.checkbox[i]
        } else {
          a = a + this.checkbox[i] + ';'
        }
      }
      this.answer = a
    },
  },
  watch: {
    checkbox: {
      immediate: true,

      handler(newvalue, oldvalue) {
        this.changegeshi()
        if (this.answer === '' && this.question.must === true) {
          console.log("必须做答题没有写")
          this.isTrue = false
        } else if (this.question.min_num > this.checkbox.length || this.question.max_num < this.checkbox.length) {
          this.isTrue = false
        } else {
          this.isTrue = true
        }
        this.message = {
          level: 2,
          answer: this.answer,
          id: this.question.id,
          isTrue: this.isTrue,
          account: this.account
        }

        this.$emit("func1", this.message)
      }
    }
  },
  props: ['question','account']
}
</script>

<style scoped>

</style>
