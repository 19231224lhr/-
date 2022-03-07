<template>
  <div>
    <h3>填空题创建方法</h3>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="题目名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="填空题题目内容" style="width: 700px;"></el-input>
      </el-form-item>
      <el-form-item label="题目描述">
        <el-input v-model="ruleForm.describe" placeholder="填空题题目描述" type="textarea" autosize
                  style="width: 700px"></el-input>
      </el-form-item>
      <el-form-item label="字数限制" prop="max_length">
        <el-input-number v-model="ruleForm.max_length" controls-position="right" @change="handleChange" :min="1"
                         :max="1000"></el-input-number>
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
  name: "CreateTiankong",
  data() {
    return {
      ruleForm: {
        level: 3,
        title: '',
        describe: '',
        must: false,
        max_length: 100
      },
      rules: {
        title: [
          {required: true, message: '请输入题目内容', trigger: 'blur'},
        ],
        max_length: [
          {required: true, message: '请输入最长字数', trigger: 'blur'}
        ]
      }
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
