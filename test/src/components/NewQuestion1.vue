<template>
  <div class="new-div-1">
    <div class="new-div-2" v-show="step === 1">
<!--      <h1>欢迎来到新建问卷方法</h1>-->
      <div class="new-div-3">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="问卷名称" prop="title">
            <el-input v-model="ruleForm.title" placeholder="问卷名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="问卷类型" prop="q_type">
            <el-select v-model="ruleForm.q_type" placeholder="请选择问卷类型">
              <el-option label="普通问卷" value="1"></el-option>
              <el-option label="打卡问卷" value="2"></el-option>
              <el-option label="考试问卷" value="3"></el-option>
              <el-option label="报名问卷" value="4"></el-option>
            </el-select>
<!--     title start_time end_time password jieshuyu       -->
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-col :span="11">
              <el-form-item prop="date3">
                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date3"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date4">
                <el-time-picker placeholder="选择时间" v-model="ruleForm.date4" style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="是否需要密码" prop="delivery">
            <el-switch v-model="ruleForm.must"></el-switch>
          </el-form-item>
          <div v-show="ruleForm.must === true" style="width: 500px">
            <el-form-item label="问卷密码">
              <el-input v-model="ruleForm.password_1" placeholder="问卷密码，若不填写密码则默认答题" show-password></el-input>
            </el-form-item>
            <el-form-item label="重复密码" prop="password_2">
              <el-input v-model="ruleForm.password_2" placeholder="重复密码" show-password></el-input>
            </el-form-item>
          </div>
          <el-form-item label="问卷结束语">
            <el-input
                type="textarea"
                placeholder="请输入内容，不输入默认问卷没有结束语"
                v-model="ruleForm.textarea"
                maxlength="50"
                show-word-limit
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-steps :active="1" finish-status="success" simple style="margin-top: 20px">
        <el-step title="步骤 1 问卷信息"></el-step>
        <el-step title="步骤 2 问卷内容"></el-step>
        <el-step title="步骤 3 问卷提交"></el-step>
      </el-steps>
      <br><br>
      <!--    {{ this.$route.query.id }}-->
    </div>
    <NewQuestion2 v-show="step === 2" :questionare_message="questionare_message" :judge="123"></NewQuestion2>
  </div>
</template>

<script>
import NewQuestion2 from "@/components/NewQuestion2";

export default {
  name: "NewQuestion",
  components: {
    NewQuestion2
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.password_1) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      ruleForm: {
        title: '',
        q_type: '',
        date1: '',
        date2: '',
        date3: '',
        date4: '',
        must: false,
        password_1: '',
        password_2: '',
        textarea: ''
      },
      rules: {
        title: [
          {required: true, message: '问卷名称不能为空', trigger: 'blur'},
        ],
        q_type: [
          {required: true, message: '请选择问卷类型', trigger: 'change'}
        ],
        date1: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date2: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        date3: [
          {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
        ],
        date4: [
          {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
        ],
        password_2: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      },
      step: 1,
      time_start: '',
      time_end: '',
      questionare_message: {}
    };
  },
  methods: {
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
          date.getMonth() + 1 < 10
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();

      // 拼接
      return year + "-" + month + "-" + day;
    },
    dealWithTime(date) {
      var date = new Date(date);
      let Y = date.getFullYear()
      let M = date.getMonth() + 1 - 0 >= 10 ? Number(date.getMonth()) + 1 : '0' + (Number(date.getMonth()) + 1)
      let D = date.getDate()
      let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
      let m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
      let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
      return h + ':' + m + ':' + s
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var myDate = new Date();
          let a = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
          let b = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
          let c = myDate.getDate();        //获取当前日(1-31)

          let time_1 = this.dateFormat(this.ruleForm.date1).split('-')
          let time_2 = this.dateFormat(this.ruleForm.date3).split('-')
          let time_number_1 = time_1[0] + time_1[1] + time_1[2]
          let time_number_2 = time_2[0] + time_2[1] + time_2[2]
          let time_now = "" + a + "0" + b + c
          let judge1 = Number(time_number_1) - Number(time_now)
          let judge3 = Number(time_number_2) - Number(time_number_1)
          if (judge1 < 0) {
            alert("问卷开始时间不能早于当前时间")
          } else if (judge3 < 0) {
            alert("问卷结束时间不能晚于开始时间")
          } else {
            alert('创建问卷成功!');
            this.time_start = this.dateFormat(this.ruleForm.date1) + " " + this.dealWithTime(this.ruleForm.date2)
            this.time_end = this.dateFormat(this.ruleForm.date3) + " " + this.dealWithTime(this.ruleForm.date4)
            console.log("time_start", this.time_start, this.time_end)
            console.log(this.ruleForm)
            this.questionare_message = {
              title: this.ruleForm.title,
              level: this.ruleForm.q_type,
              start_time: this.time_start,
              end_time: this.time_end,
              password: this.ruleForm.password_1,
              jieshuyu: this.ruleForm.textarea
            }
            console.log(this.questionare_message)
            this.step = 2
          }
        } else {
          console.log('error submit!!');
          alert("错误提交")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.password_1 = ''
    }
  }

}
</script>

<style scoped>
.new-div-1 {
  /*width: 100%;*/
  /*height: 100%;*/
  padding: 0;
  margin: 0;
  background-size: cover;
  background-attachment: fixed;
  background-image: url("../assets/wallpaper.jpg");
  min-height: 1000px;
  /*height: 2000px;*/
  /*text-align: center;*/
  overflow: hidden;
}

.new-div-2 {
  margin: auto;
  margin-top: 50px;
  width: 1000px;
  height: auto;
  /*background-color: #FF670F;*/

}

.new-div-3 {
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
}
</style>
