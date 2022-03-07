<template>
  <div>
    <h3>多选题创建方法</h3>
    {{ ruleForm.xuanxiang }}
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="题目名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="多选题题目内容" style="width: 700px;"></el-input>
      </el-form-item>
      <el-form-item label="题目描述">
        <el-input v-model="ruleForm.describe" placeholder="多选题题目描述" type="textarea" autosize
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
      <el-form-item label="选项数量限制">
        <div class="block" style="width: 500px">
          <el-slider
              v-model="ruleForm.value"
              range
              show-stops
              :max="ruleForm.num"
              :min="1">
          </el-slider>
        </div>
      </el-form-item>
      <el-form-item label="正确答案">
        <el-input v-model="ruleForm.true_answer" placeholder="不同选项之间用英文分号(;)分隔" type="textarea" autosize
                  style="width: 700px"></el-input>
      </el-form-item>
      <el-form-item label="该题分值">
        <el-input v-model="ruleForm.score" placeholder="输入题目分值" type="textarea" autosize
                  style="width: 700px"></el-input>
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
  name: "ExamDuoxuan",
  data() {
    return {
      ruleForm: {
        level: 2,
        title: '',
        num: 4,
        describe: '',
        xuanxiang: [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
        must: false,
        true_xuanxiang: '',
        value: [1, 2],
        min_num: '',
        max_num: '',
        true_answer: '',
        score: ''
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
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    handleChange(value) {
      console.log(value);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let i = 0
          let test = true
          if (this.ruleForm.true_xuanxiang === '') {
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
          }
          let a = 0
          let judge = true
          let b = this.ruleForm.true_answer.split(';')
          for (a = 0; a <= b.length - 1; a++) {
            if (this.ruleForm.xuanxiang.indexOf(b[a]) === -1) {
              judge = false
            }
          }
          if (this.isNumber(this.ruleForm.score) === false || this.ruleForm.score <= 0) {
            console.log(typeof this.ruleForm.score)
            alert("请您输入正确的分值")
          } else if (test === false) {
            alert("有必选项没有填写")
            return false
          } else if (judge === false) {
            alert("你设计的正确答案不包含在已设计的选项中，请您重新设置正确答案")
          } else {
            console.log(this.ruleForm)
            this.ruleForm.min_num = this.ruleForm.value[0]
            this.ruleForm.max_num = this.ruleForm.value[1]
            this.$emit("func1", this.ruleForm)
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
