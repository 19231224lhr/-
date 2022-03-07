<template>
  <div>
    <h2>单选题创建功能</h2>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="题目名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="单选题题目内容" style="width: 700px;"></el-input>
      </el-form-item>
      <el-form-item label="题目描述">
        <el-input v-model="ruleForm.describe" placeholder="单选题题目描述" type="textarea" autosize
                  style="width: 700px"></el-input>
      </el-form-item>
      <el-form-item label="选项数量">
        <el-input-number v-model="ruleForm.num" controls-position="right" @change="handleChange" :min="2"
                         :max="10"></el-input-number>
      </el-form-item>
      <!--      {{ ruleForm.xuanxiang }}-->
      <el-form-item v-for="(item,index) in ruleForm.num" :label="'选项' + item" prop="xuanxiang">
        <el-input placeholder="填写选项内容" style="width: 500px" v-model="ruleForm.xuanxiang[index]"></el-input>
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
  name: "CreateDanxuan",
  data() {
    return {
      ruleForm: {
        level: 1,
        title: '',
        num: 4,
        describe: '',
        xuanxiang: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        must: false,
        true_xuanxiang: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入题目内容', trigger: 'blur'},
        ],
        xuanxiang: [
          {required: true, message: '请输入选项内容', trigger: 'blur'},
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
          let i = 0
          let test = true
          for (i = 0; i <= this.ruleForm.num - 1; i++) {
            console.log(this.ruleForm.xuanxiang[i])
            if (this.ruleForm.xuanxiang[i] === '' || this.ruleForm.xuanxiang[i] === undefined) {
              test = false
            } else {
              if (i !== this.ruleForm.num - 1) {
                this.ruleForm.true_xuanxiang = this.ruleForm.true_xuanxiang + this.ruleForm.xuanxiang[i] + ';'
              } else {
                this.ruleForm.true_xuanxiang = this.ruleForm.true_xuanxiang + this.ruleForm.xuanxiang[i]

              }
            }
          }
          if (test === false) {
            alert("有必选项没有填写")
            return false
          } else {
            console.log(this.ruleForm)
            this.$emit("func1",this.ruleForm)

            // this.ruleForm.title = ''
            // this.ruleForm.num = 4
            // this.ruleForm.describe = ''
            // this.ruleForm.xuanxiang = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
            // this.ruleForm.must = false
            // this.ruleForm.true_xuanxiang = ''
            // alert('创建成功');
          }
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
