<template>
  <div class="answer-div-1">
    <div class="answer-div-2">
      <div class="answer-div-3" style="background-color: #FCFBFA;padding: 10px;margin: 0">

        <strong style="font-size: 30px">问卷编号： &nbsp{{ this.$route.query.Qid }} 问卷标题：{{ title }}</strong>
        <br><br>

        <el-button style="margin-left: 650px" type="primary" @click="getPdf('问卷星球')">导出PDF文件</el-button>
        &nbsp&nbsp&nbsp
<strong>你本此作答分数为&nbsp&nbsp&nbsp</strong><strong style="color: red">80分</strong>
      </div>
    </div>


    <div class="answer-div-4">
      <span v-show="n === 2">{{ question }}
      {{ answer }}</span>

      <ul>
        <li v-for="(item,index) in question" style="list-style: none">
          <i class="el-icon-edit"></i><strong> 第 </strong><strong
            style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>
          <span v-show="n === 2">{{ item }}</span>
          <AnswerDanxuan v-if="item.level === '1'" :question="item" :answer="item.answer.answerText"></AnswerDanxuan>
          <AnswerDuoxuan v-else-if="item.level === '2'" :question="item" :answer="item.answer.answerText"></AnswerDuoxuan>
          <AnswerTiankong v-else-if="item.level === '3'" :question="item" :answer="item.answer.answerText"></AnswerTiankong>
          <AnswerPingfen v-else-if="item.level === '4'" :question="item" :answer="item.answer.answerText"></AnswerPingfen>
          <AnswerPingfenStar v-else-if="item.level === '5'" :question="item" :answer="item.answer.answerText"></AnswerPingfenStar>
          <AnswerPosition v-else-if="item.level === '6'" :question="item" :answer="item.answer.answerText"></AnswerPosition>
          <br>
          <hr>
          <br>
        </li>
      </ul>


    </div>


  </div>
</template>

<script>
import AnswerDanxuan from "@/components/ViewAnswer/AnswerDanxuan";
import AnswerDuoxuan from "@/components/ViewAnswer/AnswerDuoxuan";
import AnswerTiankong from "@/components/ViewAnswer/AnswerTiankong";
import AnswerPingfen from "@/components/ViewAnswer/AnswerPingfen";
import AnswerPingfenStar from "@/components/ViewAnswer/AnswerPingfenStar";
import AnswerPosition from "@/components/ViewAnswer/AnswerPosition";

export default {
  name: "ViewAnswer",
  mounted() {
    this.axios({
      method: 'POST',
      // url: 'http://127.0.0.1:8000/consumer/getallQ',
      url: 'http://42.193.111.182:8000/consumer/getallQ',
      data: {
        id: this.$route.query.Qid
      }
    }).then(response => {
      console.log("问题信息", response.data.question)
      this.level = response.data.level
      this.start_time = response.data.start_time
      this.end_time = response.data.end_time
      this.password = response.data.password
      this.jieshuyu = response.data.jieshuyu
      this.title = response.data.title
      this.questionare_hide = response.data.hide
      this.question = response.data.question
    })

    this.axios({
      method: 'POST',
      // url: 'http://127.0.0.1:8000/consumer/find_answer',
      url: 'http://42.193.111.182:8000/consumer/find_answer',
      data: {
        account: this.$route.query.account,
        QNid: this.$route.query.Qid
      }
    }).then(response => {
      console.log("全部信息",response)
      console.log("答案信息", response.data.QNID)
      this.answer = response.data.QNID
    })

  },
  components: {
    AnswerPosition,
    AnswerPingfenStar,
    AnswerPingfen,
    AnswerDanxuan,
    AnswerDuoxuan,
    AnswerTiankong
  },
  data() {
    return {
      level: '',
      start_time: '',
      end_time: '',
      password: '',
      jieshuyu: '',
      title: '',
      questionare_hide: '',
      question: [],
      answer: [],
      n: 1
    }
  },
  watch: {
    answer: {
      handler() {
        let i = 0
        for (i = 0; i <= this.answer.length - 1; i++) {
          console.log("一次循环")
          this.question[i]['answer'] = this.answer[i]
        }
      }
    }
  }
}
</script>

<style scoped>
.answer-div-1 {
  /*width: 100%;*/
  /*height: 100%;*/
  padding: 0;
  margin: 0;
  background-size: cover;
  background-attachment: fixed;
  background-image: url("../../assets/wallpaper.jpg");
  min-height: 1000px;
  /*height: 2000px;*/
  /*text-align: center;*/
  overflow: hidden;
}

.answer-div-2 {
  margin: auto;
  margin-top: 50px;
  width: 1100px;
  height: auto;
}

.answer-div-3 {
  border-radius: 10px;
  opacity: 0.8;
  min-height: 100px;
}

.answer-div-4 {
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
}
</style>
