<template>
  <div class="view-div-3" id="pdfDom">
    <div class="view-div-1">
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="view-div-4">
        <strong style="font-size: 30px">问卷编号： &nbsp{{ this.$route.query.id }} 问卷标题：{{ title }}</strong>
        <br><br>

        <strong>来自用户：&nbsp<i class="el-icon-user-solid"></i></strong>
        <strong style="color: deepskyblue">&nbsp{{ this.$route.query.account }}</strong>
        <el-button style="margin-left: 650px" type="primary" @click="getPdf('问卷星球')">导出PDF文件</el-button>
        <!--        <el-button round type="primary" @click="method2">分享问卷</el-button>-->
        &nbsp&nbsp&nbsp
        <el-popover
            placement="bottom"
            title="打开对应链接快速作答"
            width="200"
            trigger="click"
            :content="'http://localhost:8080/#/wenjuan?Questionnnareplanet=' + this.$route.query.id">
          <el-button slot="reference" @click.once="method2">发布问卷</el-button>
        </el-popover>
        <transition name="el-fade-in-linear">
          <div id="qrcode" ref="qrcode" v-show="isQRCode === true"></div>
        </transition>
        <!--        问卷密码：{{ password }}问卷时间范围：{{ start_time }} - {{ end_time }}问卷类型：{{ level }}题号是否隐藏：{{-->
        <!--          questionare_hide-->
        <!--        }}问卷结束语：{{ jieshuyu }}-->
      </div>
      <!--    {{ question }}-->
      <!--    <Danxuan :tigan="123" :bianhao="1" :xuanxiang="question[0].xuanxiang.split(';')" id="1"-->
      <!--             v-show="this.question[0].level === 2"></Danxuan>-->
      <div class="view-div-2" v-show="level === '1' || level === '2'">
        <ul>

          <li v-for="(item,index) in question" style="list-style: none">
            <span v-show="questionare_hide === false">
            <i class="el-icon-edit"></i><strong> 第 </strong><strong
                style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong></span>
            <Danxuan v-if="item.level === '1'" @func1="getMessage" :question="item"></Danxuan>
            <Duoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item"></Duoxuan>
            <Tiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item"></Tiankong>
            <Pingfen v-else-if="item.level === '4'" @func1="getMessage" :question="item"></Pingfen>
            <PingfenStar v-else-if="item.level === '5'" @func1="getMessage" :question="item"></PingfenStar>
            <Position v-else-if="item.level === '6'" @func1="getMessage" :question="item"></Position>
            <br>
            <hr>
            <br>
          </li>
        </ul>
      </div>
      <div class="view-div-2" v-show="level === '3'">
        <ul>
          <li v-for="(item,index) in question" style="list-style: none">
            <span v-show="questionare_hide === false">
            <i class="el-icon-edit"></i><strong> 第 </strong><strong
                style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong></span>
            <ViewExamDanxuan v-if="item.level === '1'" @func1="getMessage" :question="item"></ViewExamDanxuan>
            <ViewExamDuoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item"></ViewExamDuoxuan>
            <ViewExamTiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item"></ViewExamTiankong>
            <ViewExamPingfen v-else-if="item.level === '4'" @func1="getMessage" :question="item"></ViewExamPingfen>
            <br>
            <hr>
            <br>
          </li>
        </ul>
      </div>
    </div>
    <div class="view-div-2" v-show="level === '4'">
      <ul>
        <li v-for="(item,index) in question" style="list-style: none">
            <span v-show="questionare_hide === false">
            <i class="el-icon-edit"></i><strong> 第 </strong><strong
                style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong></span>
          {{ item }}
          <ViewVoteDanxuan v-if="item.level === '1'" @func1="getMessage" :question="item" :account="123"></ViewVoteDanxuan>
          <!--          <ViewExamDuoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item"></ViewExamDuoxuan>-->
          <ViewVoteTiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item" :account="123"></ViewVoteTiankong>
          <!--          <ViewExamPingfen v-else-if="item.level === '4'" @func1="getMessage" :question="item"></ViewExamPingfen>-->
          <br>
          <hr>
          <br>
        </li>
      </ul>
    </div>


  </div>

</template>

<script>
import Danxuan from "@/components/Danxuan";
import Duoxuan from "@/components/Duoxuan";
import Tiankong from "@/components/Tiankong";
import Pingfen from "@/components/Pingfen";
import PingfenStar from "@/components/PingfenStar";
import Position from "@/components/Position";
import ViewExamDanxuan from "@/components/ExamQuestionare/ViewExam/ViewExamDanxuan";
import ViewExamDuoxuan from "@/components/ExamQuestionare/ViewExam/ViewExamDuoxuan";
import ViewExamTiankong from "@/components/ExamQuestionare/ViewExam/ViewExamTiankong";
import ViewExamPingfen from "@/components/ExamQuestionare/ViewExam/ViewExamPingfen";
import ViewVoteDanxuan from "@/components/VoteQuestionare/ViewVote/ViewVoteDanxuan";
import ViewVoteTiankong from "@/components/VoteQuestionare/ViewVote/ViewVoteTiankong";
import QRCode from "qrcodejs2";

export default {
  name: "ViewWenjuan",
  components: {
    Pingfen,
    Tiankong,
    Duoxuan,
    Danxuan,
    PingfenStar,
    Position,
    ViewExamDanxuan,
    ViewExamDuoxuan,
    ViewExamTiankong,
    ViewExamPingfen,
    ViewVoteDanxuan,
    ViewVoteTiankong
  },
  mounted() {
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/getallQ',
      // url: 'http://42.193.111.182:8000/consumer/getallQ',
      data: {
        id: this.$route.query.id
      }
    }).then(response => {
      console.log(response)
      this.level = response.data.level
      this.start_time = response.data.start_time
      this.end_time = response.data.end_time
      this.password = response.data.password
      this.jieshuyu = response.data.jieshuyu
      this.title = response.data.title
      this.questionare_hide = response.data.hide
      this.question = response.data.question
    })
  },
  data() {
    return {
      isQRCode: false,
      level: '',
      start_time: '',
      end_time: '',
      password: '',
      jieshuyu: '',
      title: '',
      questionare_hide: '',
      question: []
    }
  },
  methods: {
    qrcode(e) {
      let qrcode = new QRCode("qrcode", {
        width: 100, // 二维码宽度，单位像素
        height: 100, // 二维码高度，单位像素
        text: "http://42.193.111.182:8000/#/answer?Questionnaireplanet=" + e + "&thankforusing"// 生成二维码的链接
      });
    },
    getMessage() {

    },
    method1() {
      console.log("点击了生成pdf文件方法")

    },
    method2() {
      console.log("点击了生成链接方法")
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/publish',
        // url: 'http://42.193.111.182:8000/consumer/publish',
        data: {
          level: 0,
          id: this.$route.query.id
        }
      }).then(response => {
        console.log(response)
        if (response.data === "不能发布") {
          alert("发布失败，问卷已经超过设定的结束时间，请您更改问卷相关信息后再尝试发布问卷")
        } else if (response.data === "已经发布过了") {
          alert("发布失败，该问卷已经发布")
        } else {
          console.log('发布成功')
          this.qrcode(this.$route.query.id)
          this.isQRCode = true
        }


      })
    }
  }
}
</script>

<style scoped>
.view-div-3 {
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

.view-div-1 {
  margin: auto;
  margin-top: 50px;
  width: 1100px;
  height: auto;
  /*background-color: #FF670F;*/
}

.view-div-2 {
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
}

.view-div-4 {
  border-radius: 10px;
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
