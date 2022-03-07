<template>
  <div class="view-div-3" id="pdfDom">
    <div class="view-div-1">
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="view-div-4">
        <strong style="font-size: 30px">问卷编号： &nbsp{{ this.$route.query.id }}</strong>
        <br>
        <p style="float: left;color: #a79d9d">这是一份已删除的问卷，您可以选择恢复已删除问卷</p>
        <el-button type="primary" style="float: right;margin-right: 50px" @click="recover">还原</el-button>
      </div>
      <!--    {{ question }}-->
      <!--    <Danxuan :tigan="123" :bianhao="1" :xuanxiang="question[0].xuanxiang.split(';')" id="1"-->
      <!--             v-show="this.question[0].level === 2"></Danxuan>-->
      <div class="view-div-2">
        <ul>
          <li v-for="(item,index) in question" style="list-style: none">
            <i class="el-icon-edit"></i><strong> 第 </strong><strong
              style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>
            <Danxuan v-if="item.level === '1'" @func1="getMessage" :question="item"></Danxuan>
            <Duoxuan v-else-if="item.level === '2'" @func1="getMessage" :question="item"></Duoxuan>
            <Tiankong v-else-if="item.level === '3'" @func1="getMessage" :question="item"></Tiankong>
            <Pingfen v-else-if="item.level === '4'" @func1="getMessage" :question="item"></Pingfen>
            <PingfenStar v-else-if="item.level === '5'" @func1="getMessage" :question="item"></PingfenStar>
            <br>
            <hr>
            <br>
          </li>
        </ul>
      </div>
    </div>


  </div>

</template>

<script>
import Danxuan from "@/components/Danxuan";
import Duoxuan from "@/components/Duoxuan";
import Tiankong from "@/components/Tiankong";
import Pingfen from "@/components/Pingfen";
import PingfenStar from "@/components/PingfenStar";

export default {
  name: "ViewRecovery",
  components: {Pingfen, Tiankong, Duoxuan, Danxuan, PingfenStar},
  mounted() {
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/getallQ',
      // url: 'http://42.193.111.182:8000/consumer/getallQ',
      data: {
        id: this.$route.query.id,
        bin: true
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
    recover() {
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/out_of_bin',
        // url: 'http://42.193.111.182:8000/consumer/out_of_bin',
        data: {
          id: this.$route.query.id
        }
      }).then(response => {
        console.log(response)
      })
      this.$alert('恢复成功', '通知信息', {
        confirmButtonText: '确定',
        callback: action => {
          this.$router.go(-1)
        }
      });
    },

    getMessage() {

    },
    method1() {
      console.log("点击了生成pdf文件方法")

    },
    method2() {
      console.log("点击了生成链接方法")
      this.open()


    },
    open() {
      this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
        dangerouslyUseHTMLString: true
      });
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
  min-height: 100px;
}

hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
