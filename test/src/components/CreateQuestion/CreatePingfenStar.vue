<template>
<div>
  <h2>评分题(五星制)编辑方法</h2>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="题目名称" prop="title">
      <el-input v-model="ruleForm.title" placeholder="评分题题目内容" style="width: 700px;"></el-input>
    </el-form-item>
    <el-form-item label="题目描述">
      <el-input v-model="ruleForm.describe" placeholder="评分题题目描述" type="textarea" autosize
                style="width: 700px"></el-input>
    </el-form-item>
    <el-form-item label="样式浏览">
      <el-rate
          v-model="star"
          :colors="colors">
      </el-rate>

    </el-form-item>
    <el-form-item label="题目必答" prop="must">
      <el-switch v-model="ruleForm.must"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>




</div>
</template>

<script>
export default {
  name: "CreatePingfenStar",
  data() {
    return {
      star: '',
      ruleForm: {
        level: 5,
        title: '',
        describe: '',
        must: false,
      },
      rules: {
        title: [
          {required: true, message: '请输入题目内容', trigger: 'blur'},
        ],
        max_score: [
          {required: true, message: '请输入最长字数', trigger: 'blur'}
        ]
      },
      colors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.$emit("func1", this.ruleForm)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style scoped>

</style>
