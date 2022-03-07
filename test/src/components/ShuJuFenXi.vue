<template>
  <div class="analyse-div-2" id="pdfDom">
    <div class="analyse-div-3" v-show="isfenxi === true">
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="analyse-div-1">
        <h1>欢迎来到数据分析板块</h1>
        您要分析的问卷编号是
        {{ this.$route.query.id }}
        <!--        <el-button type="primary" round>开始分析</el-button>-->
        <el-button type="primary" round @click="getPdf('问卷星球数据分析')" style="float: right;margin-right: 50px">导出PDF文件
        </el-button>
        <el-button type="success" round @click="getExcel" style="float: right;margin-right: 30px">导出Excel文件
        </el-button>
      </div>
      <div class="analyse-div-4">
        <ul>
          <li v-for="(item,index) in test_question" style="list-style: none">
            <i class="el-icon-edit"></i><strong> 第 </strong><strong
              style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>
            <AnalyseDanxuan v-if="item.level === '1'" :message="item"></AnalyseDanxuan>
            <AnalyseDuoxuan v-else-if="item.level === '2'" :message="item"></AnalyseDuoxuan>
            <AnalyseTiankong v-else-if="item.level === '3'" :message="item"></AnalyseTiankong>
            <AnalysePingfen v-else-if="item.level === '4'" :message="item"></AnalysePingfen>
            <AnalysePingfenStar v-else-if="item.level === '5'" :message="item"></AnalysePingfenStar>
            <AnalysePosition v-else-if="item.level === '6'"></AnalysePosition>
            <hr>
            <br>
          </li>
        </ul>
        <!--    <EchartsTest :context="这里是内容" :bianhao="1" :details="123" :echartsid="1"></EchartsTest>-->
        <!--    <EchartsTest :context="这里是内容" :bianhao="1" :details="123" :echartsid="12"></EchartsTest>-->
        <!--    <EchartsTest :context="这里是内容" :bianhao="1" :details="123" :echartsid="123"></EchartsTest>-->
      </div>
    </div>
    <div class="analyse-div-4" v-show="isfenxi === false" style="width: 1000px;height: 230px;margin-left: 230px">
      <el-col :sm="12" :lg="6" style="margin-left: 370px">
        <el-result icon="error" title="错误提示" subTitle="当前问卷没有任何数据">
          <template slot="extra">
          </template>
        </el-result>
      </el-col>
    </div>
  </div>
</template>

<script>
import AnalyseDanxuan from "@/components/AnalyseNumber/AnalyseDanxuan";
import AnalyseDuoxuan from "@/components/AnalyseNumber/AnalyseDuoxuan";
import AnalyseTiankong from "@/components/AnalyseNumber/AnalyseTiankong";
import AnalysePingfen from "@/components/AnalyseNumber/AnalysePingfen";
import AnalysePingfenStar from "@/components/AnalyseNumber/AnalysePingfenStar";
import AnalysePosition from "@/components/AnalyseNumber/AnalysePosition";

export default {
  name: "ShuJuFenXi",
  components: {
    AnalyseDuoxuan,
    AnalyseDanxuan,
    AnalyseTiankong,
    AnalysePingfen,
    AnalysePingfenStar,
    AnalysePosition
  },
  mounted() {
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/shujufenxi',
      // url: 'http://42.193.111.182:8000/consumer/shujufenxi',
      data: {
        id: this.$route.query.id
      }
    }).then(response => {
      console.log(response)
      if (response.data.fenxi[0].details.length === 0) {
        this.isfenxi = false
      }
      this.test_question = response.data.fenxi
    })
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    isLogin() {
      console.log("in app name" + sessionStorage.getItem("userName"));
//      console.log("in app name" + sessionStorage.getItem("userName"));
      console.log("in app name" + sessionStorage.getItem("userName"));
      this.currentUserName = this.currentUser;

      //通过sessionstorage获取vuex里islogin的状态
      if (sessionStorage.getItem("userName")) {
        // alert(666)
        this.$store.commit("userStatus", sessionStorage.getItem("userName"));
      } else {
        this.$store.commit("userStatus", null);
      }
      return this.$store.getters.isLogin;
    },
  },
  data() {
    return {
      isfenxi: true,
      test_question: '',
      question: [
        {
          level: '1',
          id: '1',
          title: '单选题数据分析',
          details: {
            A: 10,
            B: 20,
            C: 30,
            D: 40,
          },
        },
        {
          level: '2',
          id: '2',
          title: '多选题数据分析',
          details: {
            A: 100,
            B: 50,
            C: 30,
            D: 60,
          },
        },
        {
          level: '3',
          id: '3',
          title: '填空题数据分析',
          details: {
            A: '珊瑚宫心海',
            B: '雷电芽衣',
            C: '甘雨'
          }
        },
        {
          level: '4',
          id: '4',
          title: '评分题数据分析',
          max_score: 100,
          details: {
            A: 20,  // 评分题的 A,B,C,D分别代表每个四分之一区间的评分数量占比
            B: 20,
            C: 30,
            D: 30,
          },
        },
        {
          level: '5',
          id: '5',
          title: '评分题(五星题)数据分析',
          details: {
            A: 3.6  //平均分
          }
        }
      ]
    }
  },
  methods: {
    clone(ojb){
      return JSON.parse(JSON.stringify(ojb));
    },
    downloadContent(value,name){
      const link=document.createElement("a");
      const blob=new Blob([value],{type:"application/vnd.ms-excel"});
      const url=window.URL.createObjectURL(blob);
      link.href=url;
      link.download=name+".xls";
      link.click();
      window.URL.revokeObjectURL(url);

    },
    getExcel() {
      console.log("您点击了导出Excel文件方法")

      this.axios({
        method: 'POST',
        responseType: "arraybuffer",
        url: 'http://127.0.0.1:8000/consumer/export_excel',
        // url: 'http://42.193.111.182:8000/consumer/export_excel',
        data: {
          id: this.$route.query.id,
        }

      }).then(res => {
        this.downloadContent(res.data, "导出数据");
        console.log(res);


      });
    },
    testmethod() {
      console.log(this.test_question[0].details)
      let i = 0
      let test = {}
      let data = []
      for (i = 0; i <= this.test_question[0].details.length - 1; i++) {

        test = {value: this.test_question[0].details[i][1], name: this.test_question[0].details[i][0]}
        data.push(test)
      }
      console.log(data)
    }
  }
}
</script>

<style scoped>
.analyse-div-1 {
  border-radius: 10px;
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  height: 150px;
}

.analyse-div-2 {
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

.analyse-div-3 {
  margin: auto;
  margin-top: 50px;
  width: 1100px;
  height: auto;
  /*background-color: #FF670F;*/
}

.analyse-div-4 {
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
