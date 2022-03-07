<template>
  <div>
    <br>
    <i class="el-icon-star-off" style="color: red;font-size: 20px" v-show="question.must === true"></i>

    <strong style="font-size: 20px">[评分] {{ question.title }}</strong>
    <p style="color: #a79d9d">{{ question.describe }}</p>

    <el-rate
        v-model="star"
        :colors="colors">
    </el-rate>


  </div>
</template>

<script>
export default {
  name: "PingfenStar",
  data() {
    return {

      message: {},
      star: 3,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      username: ''

    };
  },
  methods: {},
  watch: {
    star: {
      immediate: true,
      handler(newvalue, oldvalue) {
        this.message = {
          level: 5,
          answer: this.star,
          id: this.question.id,
          isTrue: true,
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
