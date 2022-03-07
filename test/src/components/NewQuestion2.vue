<template>
  <div>
    <div class="new2-div-2">
      <h1>欢迎来到问卷内容编写板块</h1>
    </div>
    <div class="new2-div-1" v-if="questionare_message.level === '1'">
      <strong>添加题目&nbsp&nbsp&nbsp</strong>
      <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
      <el-button type="primary" round @click="addQuestion">添加题目</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <el-button type="success" round @click="submitQuestion">保存问卷</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <span style="color: #a79d9d">发布时是否隐藏题号</span>&nbsp&nbsp&nbsp
      <el-tooltip :content="'发布时是否隐藏题号: ' + questionare_must" placement="top">
        <el-switch
            v-model="questionare_must"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-tooltip>

      <ul>
        <CreateDanxuan @func1="getmessage" v-if="truevalue === 1 & test1 === true"></CreateDanxuan>
        <CreateDuoxuan @func1="getmessage" v-if="truevalue === 2 & test2 === true"></CreateDuoxuan>
        <CreateTiankong @func1="getmessage" v-if="truevalue === 3 & test3 === true"></CreateTiankong>
        <CreatePingfen @func1="getmessage" v-if="truevalue === 4 & test4 === true"></CreatePingfen>
        <CreatePingfenStar @func1="getmessage" v-if="truevalue === 5 & test5 === true"></CreatePingfenStar>
      </ul>
      <h2 style="color: deepskyblue">>> 问卷浏览</h2>
<!--      {{ question }}-->
      <!--      {{ question[0] }}-->
      <!--      <ViewDanxuan @func3="getViewEditMessage" :message="question[0]" :index="5" :length="10"></ViewDanxuan>-->
      <!--      {{question}}-->
      <!--      <ViewDuoxuan @func3="getViewEditMessage" :message="question[1]" :index="5" :length="10"></ViewDuoxuan>-->
      <!--      <ViewTiankong @func3="getViewEditMessage" :message="question[2]" :index="5" :length="10"></ViewTiankong>-->
      <!--      <ViewPingfen @func3="getViewEditMessage" :message="question[3]" :index="5" :length="10"></ViewPingfen>-->
      <ul>
        <li v-for="(item,index) in question" style="list-style: none">
          <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
            index + 1
          }}</strong><strong>题</strong>
<!--          {{ item }}-->
          <ViewDanxuan v-show="item.level === 1" @func3="getViewEditMessage" :message="item" :index="index"
                       :length="question.length"></ViewDanxuan>
          <ViewDuoxuan v-show="item.level === 2" @func3="getViewEditMessage" :message="item" :index="index"
                       :length="question.length"></ViewDuoxuan>
          <ViewTiankong v-show="item.level === 3" @func3="getViewEditMessage" :message="item" :index="index"
                        :length="question.length"></ViewTiankong>
          <ViewPingfen v-show="item.level === 4" @func3="getViewEditMessage" :message="item" :index="index"
                       :length="question.length"></ViewPingfen>
          <ViewPingfenStar v-show="item.level === 5" @func3="getViewEditMessage" :message="item" :index="index"
                           :length="question.length"></ViewPingfenStar>
          <br>
          <hr>
        </li>
        <!--    {{message}}-->
      </ul>

    </div>

    <div class="new2-div-1" v-if="questionare_message.level === '2'">
      <h2>打卡问卷新建方法</h2>
      <strong>添加题目&nbsp&nbsp&nbsp</strong>
      <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
      <el-button type="primary" round @click="addQuestion">添加题目</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <el-button type="success" round @click="submitQuestion">保存问卷</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <span style="color: #a79d9d">发布时是否隐藏题号</span>&nbsp&nbsp&nbsp
      <el-tooltip :content="'发布时是否隐藏题号: ' + questionare_must" placement="top">
        <el-switch
            v-model="questionare_must"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-tooltip>

      <ul>
        <CreateDanxuan @func1="getmessage" v-if="truevalue === 1 & test1 === true"></CreateDanxuan>
        <CreateDuoxuan @func1="getmessage" v-if="truevalue === 2 & test2 === true"></CreateDuoxuan>
        <CreateTiankong @func1="getmessage" v-if="truevalue === 3 & test3 === true"></CreateTiankong>
        <CreatePingfenStar @func1="getmessage" v-if="truevalue === 5 & test5 === true"></CreatePingfenStar>
        <GetPosition @func1="getmessage" v-if="truevalue === 6 & test6 === true"></GetPosition>
      </ul>
      <h2 style="color: deepskyblue"><i class="el-icon-bottom-right"></i> 问卷浏览</h2>
<!--      {{ question_2 }}-->
      <!--      {{ question[0] }}-->
      <!--      <ViewDanxuan @func3="getViewEditMessage" :message="question[0]" :index="5" :length="10"></ViewDanxuan>-->
      <!--      {{question}}-->
      <!--      <ViewDuoxuan @func3="getViewEditMessage" :message="question[1]" :index="5" :length="10"></ViewDuoxuan>-->
      <!--      <ViewTiankong @func3="getViewEditMessage" :message="question[2]" :index="5" :length="10"></ViewTiankong>-->
      <!--      <ViewPingfen @func3="getViewEditMessage" :message="question[3]" :index="5" :length="10"></ViewPingfen>-->

      <ul v-if="questionare_message.level === '2'">
        <li v-for="(item,index) in question_2" style="list-style: none">
          <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
            index + 1
          }}</strong><strong>题</strong>
<!--          {{ item }}-->
          <ViewDanxuan v-show="item.level === 1" @func3="getViewEditMessage_2" :message="item" :index="index"
                       :length="question_2.length"></ViewDanxuan>
          <ViewDuoxuan v-show="item.level === 2" @func3="getViewEditMessage_2" :message="item" :index="index"
                       :length="question_2.length"></ViewDuoxuan>
          <ViewTiankong v-show="item.level === 3" @func3="getViewEditMessage_2" :message="item" :index="index"
                        :length="question_2.length"></ViewTiankong>
          <ViewPingfen v-show="item.level === 4" @func3="getViewEditMessage_2" :message="item" :index="index"
                       :length="question_2.length"></ViewPingfen>
          <ViewPingfenStar v-show="item.level === 5" @func3="getViewEditMessage_2" :message="item" :index="index"
                           :length="question_2.length"></ViewPingfenStar>
          <ViewPosition v-show="item.level === 6" @func3="getViewEditMessage_2" :message="item" :index="index"
                        :length="question_2.length"></ViewPosition>
          <br>
          <hr>
        </li>
        <!--    {{message}}-->
      </ul>

    </div>
    <div class="new2-div-1" v-if="questionare_message.level === '3'">
      <h3>考试问卷新建方法</h3>
      <strong>添加题目&nbsp&nbsp&nbsp</strong>
      <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
      <el-button type="primary" round @click="addQuestion">添加题目</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <el-button type="success" round @click="submitQuestion">保存问卷</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <span style="color: #a79d9d">发布时是否隐藏题号</span>&nbsp&nbsp&nbsp
      <el-tooltip :content="'发布时是否隐藏题号: ' + questionare_must" placement="top">
        <el-switch
            v-model="questionare_must"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-tooltip>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <span style="color: #a79d9d">发布时是否乱序排列</span>&nbsp&nbsp&nbsp
      <el-tooltip :content="'发布时是否乱序排列: ' + questionare_order" placement="top">
        <el-switch
            v-model="questionare_order"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-tooltip>

      <ul>
        <ExamDanxuan @func1="getmessage" v-if="truevalue === 1 & test1 === true"></ExamDanxuan>
        <ExamDuoxuan @func1="getmessage" v-if="truevalue === 2 & test2 === true"></ExamDuoxuan>
        <ExamTiankong @func1="getmessage" v-if="truevalue === 3 & test3 === true"></ExamTiankong>
        <ExamPingfen @func1="getmessage" v-if="truevalue === 4 & test4 === true"></ExamPingfen>
        <!--        <CreatePingfenStar @func1="getmessage" v-if="truevalue === 5 & test5 === true"></CreatePingfenStar>-->
      </ul>
      <h2 style="color: deepskyblue"><i class="el-icon-bottom-right"></i> 问卷浏览</h2>
<!--      {{ question_3 }}-->
      <!--      {{ question[0] }}-->
      <!--      <ViewDanxuan @func3="getViewEditMessage" :message="question[0]" :index="5" :length="10"></ViewDanxuan>-->
      <!--      {{question}}-->
      <!--      <ViewDuoxuan @func3="getViewEditMessage" :message="question[1]" :index="5" :length="10"></ViewDuoxuan>-->
      <!--      <ViewTiankong @func3="getViewEditMessage" :message="question[2]" :index="5" :length="10"></ViewTiankong>-->
      <!--      <ViewPingfen @func3="getViewEditMessage" :message="question[3]" :index="5" :length="10"></ViewPingfen>-->
      <ul>
        <li v-for="(item,index) in question_3" style="list-style: none">
          <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
            index + 1
          }}</strong><strong>题</strong>
<!--          {{ item }}-->
          <ViewDanExam v-show="item.level === 1" @func3="getViewEditMessage_3" :message="item" :index="index"
                       :length="question_3.length"></ViewDanExam>
          <ViewDuoExam v-show="item.level === 2" @func3="getViewEditMessage_3" :message="item" :index="index"
                       :length="question_3.length"></ViewDuoExam>
          <ViewTianExam v-show="item.level === 3" @func3="getViewEditMessage_3" :message="item" :index="index"
                        :length="question_3.length"></ViewTianExam>
          <ViewPingExam v-show="item.level === 4" @func3="getViewEditMessage_3" :message="item" :index="index"
                        :length="question_3.length"></ViewPingExam>
          <br>
          <hr>
        </li>
        <!--    {{message}}-->
      </ul>

    </div>
    <div class="new2-div-1" v-if="questionare_message.level === '4'">
      <h3>报名问卷新建方法</h3>
      <strong>添加题目&nbsp&nbsp&nbsp</strong>
      <el-select v-model="value" placeholder="请选择">
        <el-option
            v-for="item in options3"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
      <el-button type="primary" round @click="addQuestion">添加题目</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <el-button type="success" round @click="submitQuestion">保存问卷</el-button>
      &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <span style="color: #a79d9d">发布时是否隐藏题号</span>&nbsp&nbsp&nbsp
      <el-tooltip :content="'发布时是否隐藏题号: ' + questionare_must" placement="top">
        <el-switch
            v-model="questionare_must"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </el-tooltip>
      <br>


      <ul>
        <CreateVoteDanxuan @func1="getmessage" v-if="truevalue === 1 & test1 === true"></CreateVoteDanxuan>
        <CreateVoteTiankong @func1="getmessage" v-if="truevalue === 3 & test3 === true"></CreateVoteTiankong>
        <!--        <CreatePingfenStar @func1="getmessage" v-if="truevalue === 5 & test5 === true"></CreatePingfenStar>-->
      </ul>
      <h2 style="color: deepskyblue"><i class="el-icon-bottom-right"></i> 问卷浏览</h2>
<!--      {{ question_4 }}-->
      <!--      {{ question[0] }}-->
      <!--      <ViewDanxuan @func3="getViewEditMessage" :message="question[0]" :index="5" :length="10"></ViewDanxuan>-->
      <!--      {{question}}-->
      <!--      <ViewDuoxuan @func3="getViewEditMessage" :message="question[1]" :index="5" :length="10"></ViewDuoxuan>-->
      <!--      <ViewTiankong @func3="getViewEditMessage" :message="question[2]" :index="5" :length="10"></ViewTiankong>-->
      <!--      <ViewPingfen @func3="getViewEditMessage" :message="question[3]" :index="5" :length="10"></ViewPingfen>-->
      <ul>
        <li v-for="(item,index) in question_4" style="list-style: none">
          <i class="el-icon-edit"></i><strong> 第 </strong><strong style="color: deepskyblue">{{
            index + 1
          }}</strong><strong>题</strong>
<!--          {{ item }}-->
          <ViewEditVoteDanxuan v-show="item.level === 1" @func3="getViewEditMessage_4" :message="item" :index="index"
                       :length="question_4.length"></ViewEditVoteDanxuan>
          <ViewEditVoteDuoxuan v-show="item.level === 2" @func3="getViewEditMessage_4" :message="item" :index="index"
                       :length="question_4.length"></ViewEditVoteDuoxuan>
          <ViewTianExam v-show="item.level === 3" @func3="getViewEditMessage_4" :message="item" :index="index"
                        :length="question_4.length"></ViewTianExam>
          <ViewPingExam v-show="item.level === 4" @func3="getViewEditMessage_4" :message="item" :index="index"
                        :length="question_4.length"></ViewPingExam>
          <br>
          <hr>
        </li>
        <!--    {{message}}-->
      </ul>

    </div>
  </div>
</template>

<script>
import CreateDanxuan from "@/components/CreateQuestion/CreateDanxuan";
import CreateDuoxuan from "@/components/CreateQuestion/CreateDuoxuan"
import CreateTiankong from "@/components/CreateQuestion/CreateTiankong"
import CreatePingfen from "@/components/CreateQuestion/CreatePingfen";
import ViewDanxuan from "@/components/ViewEditQuestion/ViewDanxuan";
import ViewDuoxuan from "@/components/ViewEditQuestion/ViewDuoxuan"
import ViewTiankong from "@/components/ViewEditQuestion/ViewTiankong";
import ViewPingfen from "@/components/ViewEditQuestion/ViewPingfen"
import CreatePingfenStar from "@/components/CreateQuestion/CreatePingfenStar";
import ViewPingfenStar from "@/components/ViewEditQuestion/ViewPingfenStar";
import GetPosition from "@/components/DakaQuestionnare/GetPosition";
import ViewPosition from "@/components/ViewEditQuestion/ViewPosition";
import ExamDanxuan from "@/components/ExamQuestionare/ExamDanxuan";
import ExamDuoxuan from "@/components/ExamQuestionare/ExamDuoxuan";
import ExamPingfen from "@/components/ExamQuestionare/ExamPingfen";
import ExamTiankong from "@/components/ExamQuestionare/ExamTiankong";
import ViewDanExam from "@/components/ViewEditQuestion/ViewDanExam";
import ViewDuoExam from "@/components/ViewEditQuestion/ViewDuoExam";
import ViewTianExam from "@/components/ViewEditQuestion/ViewTianExam";
import ViewPingExam from "@/components/ViewEditQuestion/ViewPingExam";
import CreateVoteDanxuan from "@/components/VoteQuestionare/CreateVoteQuestionare/CreateVoteDanxuan";
import CreateVoteDuoxuan from "@/components/VoteQuestionare/CreateVoteQuestionare/CreateVoteDuoxuan";
import CreateVoteTiankong from "@/components/VoteQuestionare/CreateVoteQuestionare/CreateVoteTiankong";
import ViewEditVoteDanxuan from "@/components/VoteQuestionare/ViewEditVote/ViewEditVoteDanxuan";
import ViewEditVoteDuoxuan from "@/components/VoteQuestionare/ViewEditVote/ViewEditVoteDuoxuan";
import ViewEditVoteTiankong from "@/components/VoteQuestionare/ViewEditVote/ViewEditVoteTiankong";

export default {
  name: "NewQuestion2",
  components: {
    ExamDanxuan,
    ExamDuoxuan,
    ExamPingfen,
    ExamTiankong,
    CreateDanxuan,
    CreateDuoxuan,
    CreateTiankong,
    CreatePingfen,
    ViewDanxuan,
    ViewDuoxuan,
    ViewTiankong,
    ViewPingfen,
    CreatePingfenStar,
    ViewPingfenStar,
    GetPosition,
    ViewPosition,
    ViewDanExam,
    ViewDuoExam,
    ViewTianExam,
    ViewPingExam,
    CreateVoteDanxuan,
    CreateVoteDuoxuan,
    CreateVoteTiankong,
    ViewEditVoteDanxuan,
    ViewEditVoteDuoxuan,
    ViewEditVoteTiankong
  },
  data() {
    return {
      questionare_order: false,
      question: [],
      question_2: [
        {
          level: 3,
          title: "请输入您的姓名",
          describe: "输入您的姓名以便合适您的身份",
          max_length: 10,
          must: true
        },
        {
          level: 3,
          title: "请输入您的学号",
          describe: "输入您的学号以便合适您的身份",
          max_length: 10,
          must: true
        },
        {
          level: 1,
          title: '请选择您当前体温',
          describe: '请选择您的体温',
          must: true,
          true_xuanxiang: '36度以下;36.0度-36.5度;36.5度-37.0度;37.0度-37.5度;37.5度以上'
        },
        {
          level: 1,
          title: '有无去过中高风险区',
          describe: '请您如实报备',
          must: true,
          true_xuanxiang: "是;不是"
        },
        {
          level: 1,
          title: '有无新冠症状',
          describe: '请您如实报备',
          must: true,
          true_xuanxiang: '有;没有'
        },
        {
          level: 6,
          title: '定位',
          describe: "请您授权获取您的位置",
          must: true
        }
      ],
      question_3: [
        {
          level: 3,
          title: "请输入您的姓名",
          describe: "输入您的姓名以便核实您的身份",
          max_length: 10,
          must: true,
          true_answer: '',
          score: 0
        },
        {
          level: 3,
          title: "请输入您的学号",
          describe: "输入您的学号以便核实您的身份",
          max_length: 10,
          must: true,
          true_answer: '',
          score: 0
        },
      ],
      question_4: [
        {
          level: 3,
          title: "请输入您的姓名",
          describe: "输入您的姓名以便核实您的身份",
          max_length: 10,
          must: true,
          true_number: null
        },
        {
          level: 3,
          title: "请输入您的手机号",
          describe: "输入您的学号以便核实您的身份",
          max_length: 10,
          must: true,
          true_number: null
        },
        {
          level: 1,
          title: "预设报名单选题",
          describe: "预设报名单选题题目信息",
          true_xuanxiang: 'A选型;B选项;C选项;D选项;E选项',
          true_number: '1;2;3;4;5',
          must: true,
        }
      ],
      options: [{
        value: '单选题',
        label: '单选题'
      }, {
        value: '多选题',
        label: '多选题'
      }, {
        value: '填空题',
        label: '填空题'
      }, {
        value: '评分题(打分制)',
        label: '评分题(打分制)'
      }, {
        value: '评分题(五星制)',
        label: '评分题(五星制)'
      }],
      options1: [{
        value: '单选题',
        label: '单选题'
      }, {
        value: '多选题',
        label: '多选题'
      }, {
        value: '填空题',
        label: '填空题'
      }, {
        value: '评分题(五星制)',
        label: '评分题(五星制)'
      }, {
        value: '地理题',
        label: '获取地理位置小组件'
      }],
      options2: [{
        value: '单选题',
        label: '单选题'
      }, {
        value: '多选题',
        label: '多选题'
      }, {
        value: '填空题',
        label: '填空题'
      }, {
        value: '评分题(打分制)',
        label: '评分题(打分制)'
      }],
      options3: [{
        value: '单选题',
        label: '单选题'
      }, {
        value: '填空题',
        label: '填空题'
      }],
      value: '',
      truevalue: '',
      message: [],
      bianhao: 0,
      test1: true,
      test2: true,
      test3: true,
      test4: true,
      test5: true,
      test6: true,
      questionare_must: false,
      total_message: {}
    }
  },
  mounted() {

  },
  methods: {
    //点击上移
    clickUp(index) {
      this.swapArray(this.question, index - 1, index);
    },
    //点击下移
    clickDown(index) {
      this.swapArray(this.question, index, index + 1);
    },
    //数组元素互换位置
    swapArray(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    clickUp_2(index) {
      this.swapArray_2(this.question_2, index - 1, index);
    },
    //点击下移
    clickDown_2(index) {
      this.swapArray_2(this.question_2, index, index + 1);
    },
    //数组元素互换位置
    swapArray_2(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    clickUp_3(index) {
      this.swapArray_3(this.question_3, index - 1, index);
    },
    //点击下移
    clickDown_3(index) {
      this.swapArray_3(this.question_3, index, index + 1);
    },
    //数组元素互换位置
    swapArray_4(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    clickUp_4(index) {
      this.swapArray_3(this.question_4, index - 1, index);
    },
    //点击下移
    clickDown_4(index) {
      this.swapArray_3(this.question_4, index, index + 1);
    },
    //数组元素互换位置
    swapArray_3(arr, index1, index2) {
      arr[index1] = arr.splice(index2, 1, arr[index1])[0];
      return arr;
    },
    getViewEditMessage(data) {
      console.log("新建问卷模块收到了子组件传来的数据", data)
      if (data.direction_message === "up") {
        this.clickUp(data.index_2)
        console.log("上移方法", this.question)
      } else if (data.direction_message === "down") {
        this.clickDown(data.index_2)
        console.log("下移方法", this.question)
      } else if (data.direction_message === "remove") {
        this.question.splice(data.index_2, 1)
        console.log("删除方法", this.question)

      }
    },
    getViewEditMessage_2(data) {
      console.log("新建问卷模块收到了子组件传来的数据", data)
      if (data.direction_message === "up") {
        this.clickUp_2(data.index_2)
        console.log("上移方法", this.question_2)
      } else if (data.direction_message === "down") {
        this.clickDown_2(data.index_2)
        console.log("下移方法", this.question_2)
      } else if (data.direction_message === "remove") {
        this.question_2.splice(data.index_2, 1)
        console.log("删除方法", this.question_2)

      }
    },
    getViewEditMessage_3(data) {
      console.log("新建问卷模块收到了子组件传来的数据", data)
      if (data.direction_message === "up") {
        this.clickUp_3(data.index_2)
        console.log("上移方法", this.question_3)
      } else if (data.direction_message === "down") {
        this.clickDown_3(data.index_2)
        console.log("下移方法", this.question_3)
      } else if (data.direction_message === "remove") {
        this.question_3.splice(data.index_2, 1)
        console.log("删除方法", this.question_3)

      }
    },
    getViewEditMessage_4(data) {
      console.log("新建问卷模块收到了子组件传来的数据", data)
      if (data.direction_message === "up") {
        this.clickUp_4(data.index_2)
        console.log("上移方法", this.question_4)
      } else if (data.direction_message === "down") {
        this.clickDown_4(data.index_2)
        console.log("下移方法", this.question_4)
      } else if (data.direction_message === "remove") {
        this.question_4.splice(data.index_2, 1)
        console.log("删除方法", this.question_4)

      }
    },
    getmessage(data) {
      console.log("父组件接收到了子组件传来的数据func1", data)
      this.message.push(data)
      this.question.push(data)
      this.question_2.push(data)
      this.question_3.push(data)
      this.question_4.push(data)
      this.test1 = false
      this.test2 = false
      this.test3 = false
      this.test4 = false
      this.test5 = false
      this.test6 = false

    },
    addQuestion() {
      if (this.value === "单选题") {
        this.truevalue = 1
        this.test1 = true
      } else if (this.value === '多选题') {
        this.truevalue = 2
        this.test2 = true
      } else if (this.value === '填空题') {
        this.truevalue = 3
        this.test3 = true
      } else if (this.value === '评分题(打分制)') {
        this.truevalue = 4
        this.test4 = true
      } else if (this.value === '评分题(五星制)') {
        this.truevalue = 5
        this.test5 = true
      } else if (this.value === '地理题') {
        this.truevalue = 6
        this.test6 = true
      }
      this.bianhao++
    },
    submitQuestion() {
      if (this.questionare_message.level === '1' && this.question.length === 0) {
        alert("请您至少编写一道题再提交问卷")
      } else if (this.questionare_message.level === '1') {
        this.total_message = {
          account: this.$route.query.id,
          level: this.questionare_message.level,
          start_time: this.questionare_message.start_time,
          end_time: this.questionare_message.end_time,
          password: this.questionare_message.password,
          jieshuyu: this.questionare_message.jieshuyu,
          title: this.questionare_message.title,
          questionare_hide: this.questionare_must,
          question: this.question
        }
        console.log(this.total_message)
        alert("您已成功提交问卷")
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/addQuestion',
          data: {
            account: this.$route.query.id,
            level: this.questionare_message.level,
            start_time: this.questionare_message.start_time,
            end_time: this.questionare_message.end_time,
            password: this.questionare_message.password,
            jieshuyu: this.questionare_message.jieshuyu,
            title: this.questionare_message.title,
            questionare_hide: this.questionare_must,
            questionare_order: this.questionare_order,
            question: this.question
          }
        }).then(response => {
          console.log(response)
        })
      }


      if (this.questionare_message.level === '2' && this.question_2.length === 0) {
        alert("请您至少编写一道题再提交问卷")
      } else if (this.questionare_message.level === '2') {
        this.total_message = {
          account: this.$route.query.id,
          level: this.questionare_message.level,
          start_time: this.questionare_message.start_time,
          end_time: this.questionare_message.end_time,
          password: this.questionare_message.password,
          jieshuyu: this.questionare_message.jieshuyu,
          title: this.questionare_message.title,
          questionare_hide: this.questionare_must,
          question: this.question_2
        }
        console.log(this.total_message)
        alert("您已成功提交问卷")
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/addQuestion',
          data: {
            account: this.$route.query.id,
            level: this.questionare_message.level,
            start_time: this.questionare_message.start_time,
            end_time: this.questionare_message.end_time,
            password: this.questionare_message.password,
            jieshuyu: this.questionare_message.jieshuyu,
            title: this.questionare_message.title,
            questionare_hide: this.questionare_must,
            question: this.question_2
          }
        }).then(response => {
          console.log(response)
        })
      }

      if (this.questionare_message.level === '3' && this.question_3.length === 0) {
        alert("请您至少编写一道题再提交问卷")
      } else if (this.questionare_message.level === '3') {
        this.total_message = {
          account: this.$route.query.id,
          level: this.questionare_message.level,
          start_time: this.questionare_message.start_time,
          end_time: this.questionare_message.end_time,
          password: this.questionare_message.password,
          jieshuyu: this.questionare_message.jieshuyu,
          title: this.questionare_message.title,
          questionare_hide: this.questionare_must,
          questionare_order: this.questionare_order,
          question: this.question_3
        }
        console.log("level = 问卷创建方法", this.total_message)
        alert("您已成功提交问卷")
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/addQuestion',
          data: {
            account: this.$route.query.id,
            level: this.questionare_message.level,
            start_time: this.questionare_message.start_time,
            end_time: this.questionare_message.end_time,
            password: this.questionare_message.password,
            jieshuyu: this.questionare_message.jieshuyu,
            title: this.questionare_message.title,
            questionare_hide: this.questionare_must,
            questionare_order: this.questionare_order,
            question: this.question_3
          }
        }).then(response => {
          console.log(response)
        })
      }

      if (this.questionare_message.level === '4' && this.question_4.length === 0) {
        alert("请您至少编写一道题再提交问卷")
      } else if (this.questionare_message.level === '4') {
        this.total_message = {
          account: this.$route.query.id,
          level: this.questionare_message.level,
          start_time: this.questionare_message.start_time,
          end_time: this.questionare_message.end_time,
          password: this.questionare_message.password,
          jieshuyu: this.questionare_message.jieshuyu,
          title: this.questionare_message.title,
          questionare_hide: this.questionare_must,
          question: this.question_4
        }
        console.log("level = 问卷创建方法", this.total_message)
        alert("您已成功提交问卷")
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/create_qustionnare',
          // url: 'http://42.193.111.182:8000/consumer/addQuestion',
          data: {
            account: this.$route.query.id,
            level: this.questionare_message.level,
            start_time: this.questionare_message.start_time,
            end_time: this.questionare_message.end_time,
            password: this.questionare_message.password,
            jieshuyu: this.questionare_message.jieshuyu,
            title: this.questionare_message.title,
            questionare_hide: this.questionare_must,
            question: this.question_4
          }
        }).then(response => {
          console.log(response)
        })
      }
    }
  }
  ,
  props: ['questionare_message']
}
</script>

<style scoped>
.new2-div-1 {
  margin: auto;
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
  min-height: 500px;
  width: 1200px;
}

.new2-div-2 {
  margin: auto;
  margin-top: 50px;
  padding: 10px;
  width: 1000px;
  height: 100px;
  /*background-color: #FF670F;*/
  border-radius: 10px;
  opacity: 0.8;
  background-color: white;
}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
