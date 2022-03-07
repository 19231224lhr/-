<template>
  <div class="true-div-1">
    <hr>
    <div class="true-div-2">
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" v-show="n === 2"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="warning" title="警告提示" subTitle="当前问卷还未到作答时间，请您按指定时间答题">
          </el-result>
        </el-col>

      </div>
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" v-show="n === 3"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="warning" title="警告提示" subTitle="当前问卷已经结束，无法提交答案">
          </el-result>
        </el-col>

      </div>
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" v-show="n === 0"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="warning" title="警告提示" subTitle="当前问卷未发布，您不能进行作答">
          </el-result>
        </el-col>

      </div>
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" v-show="n === 4"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="warning" title="警告提示" subTitle="您搜索的问卷不存在，请核实后再搜索">
          </el-result>
        </el-col>

      </div>
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" v-show="questionare_password !== '' && n === 1"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="warning" title="警告提示" subTitle="当前问卷已加密，请您输入密码">
          </el-result>
        </el-col>
        <el-input placeholder="输入您的密码" style="margin-left: 390px;width: 300px" type="password" show-password
                  v-model="input_password"></el-input>
        <br><br>
        <el-button style="margin-left: 500px" @click="passwordSure">确认</el-button>
      </div>
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0"
           v-show="n === 1 && questionare_level === '2' && questionare_password === '' && isLogin === false"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="info" title="提示信息" subTitle="当前问卷为打卡问卷，请您登陆">
          </el-result>
        </el-col>
        <el-input placeholder="输入您的账号" style="margin-left: 390px;width: 300px"
                  v-model="login_account"></el-input>
        <br><br>
        <el-input placeholder="输入您的密码" style="margin-left: 390px;width: 300px" type="password" show-password
                  v-model="login_password"></el-input>
        <br><br>
        <el-button style="margin-left: 500px" @click="login_passwordSure">确认</el-button>
      </div>

      <div style="background-color: #FCFBFA;padding: 10px;margin: 0"
           v-show="n === 1 && questionare_level === '3' && questionare_password === '' && isLogin === false"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="info" title="提示信息" subTitle="当前问卷为答题问卷，请您登陆">
          </el-result>
        </el-col>
        <el-input placeholder="输入您的账号" style="margin-left: 390px;width: 300px"
                  v-model="login_account"></el-input>
        <br><br>
        <el-input placeholder="输入您的密码" style="margin-left: 390px;width: 300px" type="password" show-password
                  v-model="login_password"></el-input>
        <br><br>
        <el-button style="margin-left: 500px" @click="login_passwordSure">确认</el-button>
      </div>

      <div style="background-color: #FCFBFA;padding: 10px;margin: 0"
           v-show="n === 1 && questionare_level === '4' && questionare_password === '' && isLogin === false"
           class="true-div-5">
        <el-col :sm="12" :lg="6" style="margin-left: 400px">
          <el-result icon="info" title="提示信息" subTitle="当前问卷为报名问卷，请您登陆">
          </el-result>
        </el-col>
        <el-input placeholder="输入您的账号" style="margin-left: 390px;width: 300px"
                  v-model="login_account"></el-input>
        <br><br>
        <el-input placeholder="输入您的密码" style="margin-left: 390px;width: 300px" type="password" show-password
                  v-model="login_password"></el-input>
        <br><br>
        <el-button style="margin-left: 500px" @click="login_passwordSure">确认</el-button>
      </div>


      <div style="margin: 0px;padding: 0px"
           v-show="questionare_level === '1' && isEnd === false && n === 1 && questionare_password === ''">
        <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="true-div-3"
             v-show="questionare_password === '' || isTrue === true">
          <h1>问卷编号 {{ this.$route.query.Qid }} 问卷名称：{{ questionare_title }}</h1>
          <hr>
          <strong><i class="el-icon-time"></i>
            问卷时间：</strong>{{ time_start }} - {{ time_end }}
          <el-button type="success" round style="float: right;margin-right: 100px" @click="sendMessage">提交
          </el-button>
        </div>
      </div>


      <div style="margin: 0px;padding: 0px"
           v-show="questionare_level === '2' && isEnd === false && n === 1 && questionare_password === '' && isLogin === true">
        <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="true-div-3"
             v-show="questionare_password === '' || isTrue === true">
          <h1>问卷编号 {{ this.$route.query.Qid }} 问卷名称：{{ questionare_title }}</h1>
          <hr>
          <strong><i class="el-icon-time"></i>
            问卷时间：</strong>{{ time_start }} - {{ time_end }}
          <el-button type="success" round style="float: right;margin-right: 100px" @click="sendMessage">提交
          </el-button>
        </div>
      </div>

      <div style="margin: 0px;padding: 0px"
           v-show="questionare_level === '3' && isEnd === false && n === 1 && questionare_password === '' && isLogin === true">
        <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="true-div-3"
             v-show="questionare_password === '' || isTrue === true">
          <h1>问卷编号 {{ this.$route.query.Qid }} 问卷名称：{{ questionare_title }}</h1>
          <hr>
          <strong><i class="el-icon-time"></i>
            考试剩余时间：{{ time_left }}</strong>
          <el-button type="success" round style="float: right;margin-right: 100px" @click="sendMessage">提交
          </el-button>
        </div>
      </div>

      <div style="margin: 0px;padding: 0px"
           v-show="questionare_level === '4' && isEnd_4 === false && n === 1 && questionare_password === '' && isLogin === true">
        <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="true-div-3"
             v-show="questionare_password === '' || isTrue === true">
          <h1>问卷编号 {{ this.$route.query.Qid }} 问卷名称：{{ questionare_title }}</h1>
          <hr>
          <el-button type="success" round style="float: right;margin-right: 100px" @click="sendMessage">提交
          </el-button>
        </div>
      </div>

      <div style="margin: 0px;padding: 0px"
           v-show="isEnd === false && n === 1 && questionare_level === '2' && isLogin === true">
        <div class="true-div-4" v-show="questionare_password === '' || isTrue === true">
          <ul>
            <li v-for="(item,index) in question" style="list-style: none">
            <span v-show="question.questionare_hide === false">
              <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
                index + 1
              }}</strong>
              <strong> 题</strong>
            </span>

              <Danxuan v-if="item.level === '1'" @func1="getMessage" :question="item"
                       :account="login_account"></Danxuan>
              <Duoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item"
                       :account="login_account"></Duoxuan>
              <Tiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item"
                        :account="login_account"></Tiankong>
              <PingfenStar v-else-if="item.level === '5'" @func1="getMessage" :question="item"
                           :account="login_account"></PingfenStar>
              <Position v-else-if="item.level === '6'" @func1="getMessage" :question="item"
                        :account="login_account"></Position>
              <br>
              <hr>
              <br>
            </li>
          </ul>
        </div>
      </div>


      <!--    <Danxuan @func="getMessage"></Danxuan>-->
      <!--    <Duoxuan @func="getMessage"></Duoxuan>-->
      <!--    <Tiankong @func="getMessage"></Tiankong>-->
      <!--    <Pingfen @func="getMessage"></Pingfen>-->
      <!--    -->

      <br>
      <!--    {{ question }}-->
<!--      {{ total_answer }}-->
      <div style="margin: 0px;padding: 0px" v-show="isEnd === false && n === 1 && questionare_level === '1'">
        <div class="true-div-4" v-show="questionare_password === '' || isTrue === true">
          <ul>
            <li v-for="(item,index) in question" style="list-style: none">
            <span v-show="question.questionare_hide === false">
              <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
                index + 1
              }}</strong>
              <strong> 题</strong>
            </span>

              <Danxuan v-if="item.level === '1'" @func1="getMessage" :question="item" :account="null"></Danxuan>
              <Duoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item" :account="null"></Duoxuan>
              <Tiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item" :account="null"></Tiankong>
              <Pingfen v-else-if="item.level === '4'" @func1="getMessage" :question="item" :account="null"></Pingfen>
              <PingfenStar v-else-if="item.level === '5'" @func1="getMessage" :question="item"
                           :account="null"></PingfenStar>
              <br>
              <hr>
              <br>
            </li>
          </ul>
        </div>
      </div>
      <div style="margin: 0px;padding: 0px"
           v-show="isEnd === false && n === 1 && questionare_level === '3' && isLogin === true">
        <div class="true-div-4" v-show="questionare_password === '' || isTrue === true">
          <ul>
            <li v-for="(item,index) in question" style="list-style: none">
            <span v-show="question.questionare_hide === false">
              <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
                index + 1
              }}</strong>
              <strong> 题</strong>
            </span>

              <AnswerExamDanxuan v-if="item.level === '1'" @func1="getMessage" :question="item"
                                 :account="login_account"></AnswerExamDanxuan>
              <AnswerExamDuoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item"
                                 :account="login_account"></AnswerExamDuoxuan>
              <AnswerExamTiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item"
                                  :account="login_account"></AnswerExamTiankong>
              <AnswerExamPingfen v-else-if="item.level === '4'" @func1="getMessage" :question="item"
                                 :account="login_account"></AnswerExamPingfen>
              <br>
              <hr>
              <br>
            </li>
          </ul>
        </div>
      </div>

      <div style="margin: 0px;padding: 0px"
           v-show="isEnd_4 === false && n === 1 && questionare_level === '4' && isLogin === true">
        <div class="true-div-4" v-show="questionare_password === '' || isTrue === true">
          <ul>
            <li v-for="(item,index) in question" style="list-style: none">
            <span v-show="question.questionare_hide === false">
              <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
                index + 1
              }}</strong>
              <strong> 题</strong>
            </span>

              <ViewVoteDanxuan v-if="item.level === '1'" @func1="getMessage" :question="item"
                               :account="login_account"></ViewVoteDanxuan>
              <!--              <AnswerExamDuoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item"-->
              <!--                                 :account="login_account"></AnswerExamDuoxuan>-->
              <ViewVoteTiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item"
                                :account="login_account"></ViewVoteTiankong>
              <!--              <AnswerExamPingfen v-else-if="item.level === '4'" @func1="getMessage" :question="item"-->
              <!--                                 :account="login_account"></AnswerExamPingfen>-->
              <br>
              <hr>
              <br>
            </li>
          </ul>
        </div>
      </div>
      <!--    <el-button @click="test">test</el-button>-->
      <div class="true-div-2">
        <div style="background-color: #FCFBFA;padding: 10px;margin: 0"
             v-show="isEnd_4 === true && n === 1 && questionare_level !== '4'"
             class="true-div-5">
          <el-result icon="success" title="成功提示" subTitle="提交成功">

          </el-result>
          <p style="font-size: 20px;margin-left: 100px;margin-right: 100px" v-show="end_word !== ''">{{ end_word }}</p>
          <p style="font-size: 20px;margin-left: 460px" v-show="end_word === ''">欢迎使用问卷星球！</p>
          <br>
          <el-button style="margin-left: 510px">返回</el-button>
        </div>
      </div>
      <div class="true-div-2">
        <div style="background-color: #FCFBFA;padding: 10px;margin: 0"
             v-show="isEnd_4 === true && n === 1 && questionare_level === '4'"
             class="true-div-5">
          <el-result icon="success" title="成功提示" subTitle="提交成功">

          </el-result>
          <p style="font-size: 20px;margin-left: 100px;margin-right: 100px" v-show="end_word !== ''">{{ end_word }}</p>
          <p style="font-size: 20px;margin-left: 460px" v-show="end_word === ''">欢迎使用问卷星球！</p>
          <br>
          <el-button style="margin-left: 510px">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Danxuan from "@/components/Danxuan";
import Duoxuan from "@/components/Duoxuan";
import Tiankong from "@/components/Tiankong";
import Pingfen from "@/components/Pingfen"
import PingfenStar from "@/components/PingfenStar";
import Position from "@/components/Position";
import AnswerExamDanxuan from "@/components/ExamQuestionare/AnswerExamDanxuan";
import AnswerExamDuoxuan from "@/components/ExamQuestionare/AnswerExamDuoxuan";
import AnswerExamTiankong from "@/components/ExamQuestionare/AnswerExamTiankong";
import AnswerExamPingfen from "@/components/ExamQuestionare/AnswerExamPingfen";
import ViewVoteDanxuan from "@/components/VoteQuestionare/ViewVote/ViewVoteDanxuan";
import ViewVoteTiankong from "@/components/VoteQuestionare/ViewVote/ViewVoteTiankong";
import QRCode from "qrcodejs2"

export default {
  name: "TrueWenJuan",
  components: {
    ViewVoteDanxuan,
    ViewVoteTiankong,
    Danxuan,
    Duoxuan,
    Tiankong,
    Pingfen,
    PingfenStar,
    Position,
    AnswerExamDanxuan,
    AnswerExamDuoxuan,
    AnswerExamTiankong,
    AnswerExamPingfen
  },
  mounted() {
    // alert(this.$route.query.Questionnaireplanet)
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/getallQ',
      // url: 'http://42.193.111.182:8000/consumer/getallQ',
      data: {
        id: this.$route.query.Questionnaireplanet
      }
    }).then(response => {
      console.log(response)
      this.questionare_title = response.data.title
      this.questionare_level = response.data.level
      this.questionare_password = response.data.password
      this.questionare_hide = response.data.hide
      this.time_start = response.data.start_time
      this.time_end = response.data.end_time
      this.end_word = response.data.jieshuyu
      this.question = response.data.question
      this.n = response.data.n
      this.time_left = this.secondToTimeStr((new Date(response.data.end_time.replace(/-/g, "/")) - new Date()) / 1000)
    })
    this.start()

    // 还要返回问卷状态
  },
  data() {
    return {
      login_password: '',
      login_account: '',
      isLogin: false,
      n: '',
      name: '',
      questionare_title: '',
      questionare_level: '',
      questionare_password: '',
      time_start: '',
      time_end: '',
      questionare_hide: '',
      end_word: '',
      question: [],
      isTrue: false,
      input_password: '',
      total_answer: [],
      isEnd: false,
      is_true_login: false,
      time_left: '',
      h: '',
      m: '',
      s: '',
      lLeftTime: 3600000,
      rLeftTime: 5 * 60 * 1000,
      isEnd_4: false
    }
  },
  methods: {
    timeEvent(e) {
      var time = e;
      var len = time.split(':')
      if (len.length === 3) {
        var hour = time.split(':')[0];
        var min = time.split(':')[1];
        var sec = time.split(':')[2];
        return Number(hour * 3600) + Number(min * 60) + Number(sec);
      }
      if (len.length === 2) {
        var min = time.split(':')[0];
        var sec = time.split(':')[1];
        return Number(min * 60) + Number(sec);
      }
      if (len.length === 1) {
        var sec = time.split(':')[0];
        return Number(sec);
      }

      // var hour = time.split(':')[0];
      // var min = time.split(':')[1];
      // var sec = time.split(':')[2];
      // return  Number(hour*3600) + Number(min*60) + Number(sec);
    },

    start() {
      this.lLeftTime = this.timeEvent(this.time_left) * 1000
      this.leftCountDown()

    },
    leftCountDown() {
      this.lLeftTime = this.lLeftTime - 1000;
      //定义变量 d,h,m,s保存倒计时的时间
      if (this.lLeftTime >= 0) {
        // d = Math.floor(app.lLeftTime / 1000 / 60 / 60 / 24);
        this.h = Math.floor(this.lLeftTime / 1000 / 60 / 60 % 24);
        this.m = Math.floor(this.lLeftTime / 1000 / 60 % 60);
        this.s = Math.floor(this.lLeftTime / 1000 % 60);
      }

      if (this.lLeftTime > 0) {
        setTimeout(this.leftCountDown, 1000);
      }

      this.time_left = this.h + ':' + this.m + ':' + this.s


    },
    secondToTimeStr(t) {
      if (!t) return;
      if (t < 60) return "00:" + ((i = t) < 10 ? "0" + i : i);
      if (t < 3600) return "" + ((a = parseInt(t / 60)) < 10 ? "0" + a : a) + ":" + ((i = t % 60) < 10 ? "0" + i : i);
      if (3600 <= t) {
        var a, i, e = parseInt(t / 3600);
        return (e < 10 ? "0" + e : e) + ":" + ((a = parseInt(t % 3600 / 60)) < 10 ? "0" + a : a) + ":" + ((i = t % 60) < 10 ? "0" + i : i);
      }
    },
    open1() {
      this.$notify({
        title: '成功',
        message: '验证成功，祝您答题愉快！',
        type: 'success'
      });
    },
    open4() {
      this.$notify.error({
        title: '错误',
        message: '密码错误，请您重新输入！'
      });
    },
    passwordSure() {
      if (this.input_password === this.questionare_password) {
        this.open1()
        this.isTrue = true
        this.questionare_password = ''
      } else {
        this.open4()
      }
    },
    login_passwordSure() {
      this.start()
      console.log("您点击了登录方法");
      // this.$router.replace('/person')
      this.axios({
        method: 'POST',
        // url: 'http://127.0.0.1:8000/consumer/login',
        url: 'http://42.193.111.182:8000/consumer/login',
        data: {
          account: this.login_account,
          password: this.login_password,
        }
      }).then(response => {
        console.log(response);
        if (response.data === '不存在该用户') {
          alert("不存在用户，请检查用户名")
        } else if (response.data === '密码错误') {
          alert("密码错误")
        } else if (response.data === '信息不全') {
          alert("信息不全")
        } else {
          console.log("登录成功111111111111111111")
          this.axios({
            method: 'POST',
            // url: 'http://127.0.0.1:8000/consumer/login2',
            url: 'http://42.193.111.182:8000/consumer/login2',
            data: {
              account: this.login_account,
              QNid: this.$route.query.Questionnaireplanet
            }
          }).then(response => {
            console.log(response);
            if (response.data === "已经答过了") {
              alert("您已经回答过该问卷，不能重复作答")
            } else {
              console.log("登录成功2222222222222222222")
              this.isLogin = true
            }

          })
        }
      })

    },
    getMessage(data) {
      let count = false
      for (let i = 0; i <= this.total_answer.length - 1; i++) {
        if (this.total_answer[i].id === data.id) {
          // console.log("您改变了原来的答案，所以这里数组不能采用push方法")
          this.total_answer.splice(i, 1, data)
          console.log("answer[] = ", this.total_answer)
          count = true
        }
      }
      if (count === false) {
        this.total_answer.push(data)
        console.log("answer=", this.total_answer)
      }
    },
    sendMessage() {
      let i = 0
      let judge = true
      for (i = 0; i <= this.total_answer.length - 1; i++) {
        if (this.total_answer[i].isTrue === false) {
          judge = false
        }
      }
      if (judge === false) {
        this.$alert('您有必答题还未作答/题目回答不符合规范', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        this.isEnd = true
        console.log("您当前的答题情况为", this.total_answer)
        this.axios({
          method: 'POST',
          // url: 'http://127.0.0.1:8000/consumer/huishoudaan',
          url: 'http://42.193.111.182:8000/consumer/huishoudaan',
          data: {
            QNid: this.$route.query.Questionnaireplanet,
            question: this.total_answer,
          }
        }).then(response => {
          console.log(response)
          if (response.data === '您无法报名') {
            alert("您当前所选项已经没有名额啦！请您更换后再提交问卷")
          } else {
            alert("答案已经提交")
            this.isEnd_4 = true
          }
        })
        // this.$router.push({path: '/person', query: {account: this.account}})
      }
    }
  }
}
</script>

<style scoped>
.true-div-1 {
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

.true-div-2 {
  margin: auto;
  margin-top: 50px;
  width: 1100px;
  height: auto;
  /*background-color: #FF670F;*/
}

.true-div-3 {
  border-radius: 10px;
  opacity: 0.8;
  height: 170px;
}

.true-div-4 {
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
}

.true-div-5 {
  margin: auto;
  width: 1100px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
  height: 400px;

}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
