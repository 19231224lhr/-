<template>
  <div class="edit-div1">
    <div class="edit-div2">
      <div style="background-color: #FCFBFA;padding: 10px;margin: 0" class="edit-div-4">
        <!--    <vue-qr :text="downloadData.url" :margin="10" colorDark="#000" colorLight="#fff" :dotScale="1"-->
        <!--            :logoScale="0.2" :size="200"></vue-qr>-->
        <strong style="font-size: 30px">问卷编号： &nbsp{{ this.$route.query.id }}</strong>
        <br><br>
        <strong>来自用户：&nbsp<i class="el-icon-user-solid"></i></strong>
        <strong style="color: deepskyblue">&nbsp{{ this.$route.query.account }}</strong>&nbsp&nbsp&nbsp
        <strong v-show="n === 0">问卷发布状态： 未发布，可以编辑</strong>
        <strong v-show="n !== 0">问卷发布状态： 已发布，不能编辑</strong>
        <!--    <el-button @click="qrcode">click生成二维码</el-button>-->
        <hr class="hr-class-2">
        <div style="margin-right: 300px">
          <el-button type="success" @click="fabuMethod" v-show="n === 0">保存当前修改</el-button>
          <el-button type="success" @click="fabuMethod" v-show="n !== 0" disabled>当前问卷状态无法编辑</el-button>
          <el-button type="danger" @click="method1">切换</el-button>
          <el-button type="primary" @click="isTuozhuai = !isTuozhuai">开启/关闭拖拽</el-button>
          <!--      <el-button @click="returnPage">返回</el-button>-->
        </div>
      </div>
      <!--      <div id="test1" style="float: right;margin: 20px">-->
      <!--      </div>-->
      <!--      <div style="height: 80px"></div>-->
      <!--    <EditDanxuan></EditDanxuan>-->
      <!--      {{ question }}-->
      <div class="edit-div3" v-show="changeValue === 1 && level === '1'">
        <draggable v-model="question" chosenClass="chosen" forceFallback="true" group="people" animation="1000"
                   @start="onStart" @end="onEnd" :disabled="isTuozhuai">
          <transition-group>
            <div class="item" v-for="(item,index) in question" :key="item.id">
              <i class="el-icon-edit"></i><strong> 第 </strong><strong
                style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>
              <EditDanxuan v-if="item.level === '1'" @func1="getMessage" :context="item.title" :index="index"
                           :id="item.id" :describe="item.describe"
                           :xuanxiang="item.true_xuanxiang.split(';')" :length="question.length"
                           :must="item.must"></EditDanxuan>
              <EditDuoxuan v-else-if="item.level === '2'" @func1="getMessage" :context="item.title" :index="index"
                           :must="item.must" :describe="item.describe" :id="item.id"
                           :xuanxiang="item.true_xuanxiang.split(';')" :length="question.length" :min_num="item.min_num"
                           :max_num="item.max_num"></EditDuoxuan>
              <EditTiankong v-else-if="item.level === '3'" @func1="getMessage" :context="item.title" :id="item.id"
                            :max_length="item.max_length" :describe="item.describe" :must="item.must"
                            :index="index" :length="question.length"></EditTiankong>
              <EditPingfen v-else-if="item.level === '4'" @func1="getMessage" :context="item.title" :id="item.id"
                           :max_score="item.max_score" :must="item.must" :describe="item.describe"
                           :index="index" :length="question.length"></EditPingfen>
              <EditPingfenStar v-else-if="item.level === '5'" @func1="getMessage" :context="item.title" :index="index"
                               :id="item.id"
                               :describe="item.describe" :must="item.must"
                               :length="question.length"></EditPingfenStar>
              <br>
              <hr class="hr-class-1">
              <br>
            </div>
          </transition-group>

        </draggable>
        <!--        <ul>-->
        <!--          &lt;!&ndash;      {{ question }}&ndash;&gt;-->
        <!--          <li v-for="(item,index) in question" style="list-style: none">-->
        <!--            <i class="el-icon-edit"></i><strong> 第 </strong><strong-->
        <!--              style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>-->
        <!--            <EditDanxuan v-show="item.level === '1'" @func1="getMessage" :context="item.context" :index="index" :id="item.id"-->
        <!--                         :xuanxiang="item.xuanxiang.split(';')" :length="question.length"></EditDanxuan>-->
        <!--            <EditDuoxuan v-show="item.level === '2'" @func1="getMessage" :context="item.context" :index="index"-->
        <!--                         :xuanxiang="item.xuanxiang.split(';')" :length="question.length"></EditDuoxuan>-->
        <!--            <EditTiankong v-show="item.level === '3'" @func1="getMessage" :context="item.context"-->
        <!--                          :index="index" :length="question.length"></EditTiankong>-->
        <!--            <EditPingfen v-show="item.level === '4'" @func1="getMessage" :context="item.context"-->
        <!--                         :index="index" :length="question.length"></EditPingfen>-->
        <!--            <br>-->
        <!--            <hr class="hr-class-1">-->
        <!--            <br>-->
        <!--          </li>-->
        <!--        </ul>-->
      </div>
      <div class="edit-div3" v-show="changeValue === 1 && level === '2'">
        <draggable v-model="question" chosenClass="chosen" forceFallback="true" group="people" animation="1000"
                   @start="onStart" @end="onEnd" disabled="false">
          <transition-group>
            <div class="item" v-for="(item,index) in question" :key="item.id">
              <i class="el-icon-edit"></i><strong> 第 </strong><strong
                style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>
              <EditDanxuan v-if="item.level === '1'" @func1="getMessage" :context="item.title" :index="index"
                           :id="item.id" :describe="item.describe"
                           :xuanxiang="item.true_xuanxiang.split(';')" :length="question.length"
                           :must="item.must"></EditDanxuan>
              <EditDuoxuan v-else-if="item.level === '2'" @func1="getMessage" :context="item.title" :index="index"
                           :must="item.must" :describe="item.describe" :id="item.id"
                           :xuanxiang="item.true_xuanxiang.split(';')" :length="question.length" :min_num="item.min_num"
                           :max_num="item.max_num"></EditDuoxuan>
              <EditTiankong v-else-if="item.level === '3'" @func1="getMessage" :context="item.title" :id="item.id"
                            :max_length="item.max_length" :describe="item.describe" :must="item.must"
                            :index="index" :length="question.length"></EditTiankong>

              <EditPingfenStar v-else-if="item.level === '5'" @func1="getMessage" :context="item.title" :index="index"
                               :id="item.id"
                               :describe="item.describe" :must="item.must"
                               :length="question.length"></EditPingfenStar>
              <EditPosition v-else-if="item.level === '6'" @func1="getMessage" :context="item.title" :index="index"
                            :id="item.id" :describe="item.describe" :length="question.length"
                            :must="item.must"></EditPosition>
              <br>
              <hr class="hr-class-1">
              <br>
            </div>
          </transition-group>

        </draggable>
        <!--        <ul>-->
        <!--          &lt;!&ndash;      {{ question }}&ndash;&gt;-->
        <!--          <li v-for="(item,index) in question" style="list-style: none">-->
        <!--            <i class="el-icon-edit"></i><strong> 第 </strong><strong-->
        <!--              style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>-->
        <!--            <EditDanxuan v-show="item.level === '1'" @func1="getMessage" :context="item.context" :index="index" :id="item.id"-->
        <!--                         :xuanxiang="item.xuanxiang.split(';')" :length="question.length"></EditDanxuan>-->
        <!--            <EditDuoxuan v-show="item.level === '2'" @func1="getMessage" :context="item.context" :index="index"-->
        <!--                         :xuanxiang="item.xuanxiang.split(';')" :length="question.length"></EditDuoxuan>-->
        <!--            <EditTiankong v-show="item.level === '3'" @func1="getMessage" :context="item.context"-->
        <!--                          :index="index" :length="question.length"></EditTiankong>-->
        <!--            <EditPingfen v-show="item.level === '4'" @func1="getMessage" :context="item.context"-->
        <!--                         :index="index" :length="question.length"></EditPingfen>-->
        <!--            <br>-->
        <!--            <hr class="hr-class-1">-->
        <!--            <br>-->
        <!--          </li>-->
        <!--        </ul>-->
      </div>
      <div class="edit-div3" v-show="changeValue === 1 && level === '3'">
        <draggable v-model="question" chosenClass="chosen" forceFallback="true" group="people" animation="1000"
                   @start="onStart" @end="onEnd" disabled="false">
          <transition-group>
            <div class="item" v-for="(item,index) in question" :key="item.id">
              <i class="el-icon-edit"></i><strong> 第 </strong><strong
                style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>
              <EditExamDanxuan v-if="item.level === '1'" @func1="getMessage" :context="item.title" :index="index"
                               :id="item.id" :describe="item.describe" :score="item.score"
                               :true_answer="item.true_answer"
                               :xuanxiang="item.true_xuanxiang.split(';')" :length="question.length"
                               :must="item.must"></EditExamDanxuan>
              <EditExamDuoxuan v-else-if="item.level === '2'" @func1="getMessage" :context="item.title" :index="index"
                               :must="item.must" :describe="item.describe" :id="item.id" :score="item.score"
                               :true_answer="item.true_answer"
                               :xuanxiang="item.true_xuanxiang.split(';')" :length="question.length"
                               :min_num="item.min_num"
                               :max_num="item.max_num"></EditExamDuoxuan>
              <EditExamTiankong v-else-if="item.level === '3'" @func1="getMessage" :context="item.title" :id="item.id"
                                :max_length="item.max_length" :describe="item.describe" :must="item.must"
                                :score="item.score" :true_answer="item.true_answer"
                                :index="index" :length="question.length"></EditExamTiankong>

              <EditExamPingfen v-else-if="item.level === '4'" @func1="getMessage" :context="item.title" :index="index"
                               :id="item.id" :score="item.score" :true_answer="item.true_answer"
                               :describe="item.describe" :must="item.must"
                               :length="question.length"></EditExamPingfen>
              <br>
              <hr class="hr-class-1">
              <br>
            </div>
          </transition-group>

        </draggable>
        <!--        <ul>-->
        <!--          &lt;!&ndash;      {{ question }}&ndash;&gt;-->
        <!--          <li v-for="(item,index) in question" style="list-style: none">-->
        <!--            <i class="el-icon-edit"></i><strong> 第 </strong><strong-->
        <!--              style="color: deepskyblue">{{ index + 1 }}</strong><strong> 题</strong>-->
        <!--            <EditDanxuan v-show="item.level === '1'" @func1="getMessage" :context="item.context" :index="index" :id="item.id"-->
        <!--                         :xuanxiang="item.xuanxiang.split(';')" :length="question.length"></EditDanxuan>-->
        <!--            <EditDuoxuan v-show="item.level === '2'" @func1="getMessage" :context="item.context" :index="index"-->
        <!--                         :xuanxiang="item.xuanxiang.split(';')" :length="question.length"></EditDuoxuan>-->
        <!--            <EditTiankong v-show="item.level === '3'" @func1="getMessage" :context="item.context"-->
        <!--                          :index="index" :length="question.length"></EditTiankong>-->
        <!--            <EditPingfen v-show="item.level === '4'" @func1="getMessage" :context="item.context"-->
        <!--                         :index="index" :length="question.length"></EditPingfen>-->
        <!--            <br>-->
        <!--            <hr class="hr-class-1">-->
        <!--            <br>-->
        <!--          </li>-->
        <!--        </ul>-->
      </div>


      <div class="edit-div3" v-show="changeValue === 2">
        问卷名称&nbsp
        <el-input placeholder="修改问卷名称" style="width: 500px" v-model="newName"></el-input>
        <br><br>
        <el-form>
          <el-form-item label="开始时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="startTime_date"
                              style="width: 200px;"></el-date-picker>
            </el-col>
            <!--            <el-col class="line" :span="2">-</el-col>-->
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="startTime_time" style="width: 200px;"></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="endTime_date"
                              style="width: 200px;"></el-date-picker>
            </el-col>
            <el-col :span="11">
              <el-time-picker placeholder="选择时间" v-model="endTime_time" style="width: 200px;"></el-time-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <el-radio v-model="radio" label="1">不修改问卷认证方式</el-radio>
        <el-radio v-model="radio" label="2">修改问卷认证方式</el-radio>
        <br><br>
        <span style="color: #a79d9d">发布时是否隐藏题号</span>&nbsp&nbsp&nbsp
        <el-tooltip :content="'发布时是否隐藏题号: ' + isHide" placement="top">
          <el-switch
              v-model="isHide"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </el-tooltip>
        <br><br>
        <div v-show="radio === '2'">
          密码&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
          <el-input placeholder="修改问卷密码，不填写密码代表更改为无需密码回答问卷模式" style="width: 500px" type="password"
                    v-model="newPassword1"></el-input>
          <br><br>
          确认密码&nbsp&nbsp
          <el-input placeholder="确认密码" style="width: 500px" type="password" v-model="newPassword2"></el-input>
          <br><br>
        </div>
        问卷结束语&nbsp&nbsp
        <br><br>
        <el-input type="textarea" placeholder="修改问卷结束语" v-model="newjieshuyu"></el-input>
        <br><br>
        <el-button @click="testmethod" type="primary" style="margin-left: 400px">保存问卷信息</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import EditDanxuan from "@/components/EditQuestion/EditDanxuan";
import EditDuoxuan from "@/components/EditQuestion/EditDuoxuan";
import EditTiankong from "@/components/EditQuestion/EditTiankong";
import EditPingfen from "@/components/EditQuestion/EditPingfen";
import EditPingfenStar from "@/components/EditQuestion/EditPingfenStar";
import EditPosition from "@/components/EditQuestion/EditPosition";
import EditExamDanxuan from "@/components/ExamQuestionare/EditExam/EditExamDanxuan";
import EditExamDuoxuan from "@/components/ExamQuestionare/EditExam/EditExamDuoxuan";
import EditExamTiankong from "@/components/ExamQuestionare/EditExam/EditExamTiankong";
import EditExamPingfen from "@/components/ExamQuestionare/EditExam/EditExamPingfen";
import vueQr from 'vue-qr'
import QRCode from "qrcodejs2"
import draggable from 'vuedraggable'


export default {
  name: "Edit",
  components: {
    EditDanxuan,
    EditDuoxuan,
    EditTiankong,
    EditPingfen,
    EditPingfenStar,
    EditPosition,
    EditExamDanxuan,
    EditExamDuoxuan,
    EditExamTiankong,
    EditExamPingfen,
    draggable
  },
  mounted() {
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/getallQ',
      // url: 'http://42.193.111.182:8000/consumer/getallQ',
      // url: 'http://42.193.111.182:8000/consumer/getallQ',
      data: {
        id: this.$route.query.id
      }
    }).then(response => {
      console.log(response)
      this.question = response.data.question
      this.isHide = response.data.hide
      this.start_time = response.data.start_time
      this.end_time = response.data.end_time
      this.password = response.data.password
      this.title = response.data.title
      this.level = response.data.level
      this.jieshuyu = response.data.jieshuyu
      this.n = response.data.n
    })
  },
  data() {
    return {
      drag: false,
      changeValue: 1,
      newPassword1: '',
      newPassword2: '',
      newName: '',
      radio: '1',
      startTime_date: '',
      startTime_time: '',
      endTime_date: '',
      endTime_time: '',
      questionName: '问卷编号:' + this.$route.query.id,
      question: [],
      changdu: '',
      message: {},
      questionare_hide: false,
      start_time: '',
      end_time: '',
      password: '',
      title: '',
      level: '',
      jieshuyu: '',
      time1: '',
      time2: '',
      newjieshuyu: '',
      isHide: false,
      n: 0,
      isTuozhuai: false
    }
  },
  methods: {
    //开始拖拽事件
    onStart() {
      this.drag = true;
    },
    //拖拽结束事件
    onEnd() {
      this.drag = false;
    },
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
    testmethod() {
      console.log("点击了测试按钮", this.dateFormat(this.startTime_date), this.dealWithTime(this.startTime_time), this.dateFormat(this.endTime_date), this.dealWithTime(this.endTime_time))
      var myDate = new Date();
      let a = myDate.getFullYear();    //获取完整的年份(4位,1970-????)
      let b = myDate.getMonth() + 1;       //获取当前月份(0-11,0代表1月)
      let c = myDate.getDate();        //获取当前日(1-31)

      let time_1 = this.dateFormat(this.startTime_date).split('-')
      let time_2 = this.dateFormat(this.endTime_date).split('-')
      let time_number_1 = time_1[0] + time_1[1] + time_1[2]
      let time_number_2 = time_2[0] + time_2[1] + time_2[2]
      let time_now = "" + a + "0" + b + c
      let judge1 = Number(time_number_1) - Number(time_now)
      let judge2 = Number(time_number_2) - Number(time_now)
      let judge3 = Number(time_number_2) - Number(time_number_1)
      if (judge1 < 0) {
        alert("问卷开始时间不能早于当前时间")
        return false
      }
      if (judge3 < 0) {
        alert("问卷结束时间不能晚于开始时间")
        return false
      }
      this.time1 = this.dateFormat(this.startTime_date) + " " + this.dealWithTime(this.startTime_time)
      this.time2 = this.dateFormat(this.endTime_date) + " " + this.dealWithTime(this.endTime_time)
      return true

    },
    method1() {
      if (this.changeValue === 1) {
        this.changeValue = 2
      } else if (this.changeValue === 2) {
        this.changeValue = 1
      }
    },
    fabuMethod() {
      if (this.newPassword1 !== this.newPassword2) {
        alert("您两次输入的密码不一致")
      } else {
        if (this.startTime_date === '' || this.startTime_time === '' || this.endTime_time === '' || this.endTime_date === '') {
          alert("请您完善日期信息")
        } else {
          if (this.newName === '') {
            this.newName = this.title
          }
          let judge = this.testmethod()

          if (judge === true) {
            this.axios({
              method: 'POST',
              url: 'http://127.0.0.1:8000/consumer/edit_questionnare',
              // url: 'http://42.193.111.182:8000/consumer/edit_questionnare',
              // url: 'http://42.193.111.182:8000/consumer/publish',
              data: {
                id: this.$route.query.id,
                level: this.level,
                start_time: this.time1,
                end_time: this.time2,
                password: this.newPassword1,
                jieshuyu: this.newjieshuyu,
                title: this.newName,
                questionare_hide: this.isHide,
                question: this.question
              }
            }).then(response => {
              console.log(response)
              alert('发布成功')
            })
          }
        }
      }
    },
    returnPage() {
      this.$router.push({path: '/person', query: {id: this.account}})
    },
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
    getMessage(data) {
      console.log("父组件收到了子组件的信息", data)
      if (data.direction_message === 'up') {
        console.log("上移方法,index=", data.index_2)
        this.clickUp(data.index_2)
        console.log(this.question)
      } else if (data.direction_message === 'down') {
        console.log("下移方法,index=", data.index_2)
        this.clickDown(data.index_2)
        console.log(this.question)

      } else if (data.direction_message === 'remove') {
        console.log("删除方法,index=", data.index_2)
        this.question.splice(data.index_2, 1)
      }

      let i = 0
      for (i = 0; i <= this.question.length - 1; i++) {
        if (this.question[i].id === data.id) {
          console.log("这里有判断")
          this.question[i] = data
          console.log(this.question[i])
        }
      }
      console.log(this.question)
      // let i = 0
      // for (i = 0; i <= this.question.length - 1; i++) {
      //   if (this.question[i].bianhao === data.bianhao) {
      //     console.log("更新了数据")
      //     this.question[i] = data
      //     console.log(this.question)
      //   }
      // }
    },
    qrcode() {

      let qrcode = new QRCode('test1', {
        width: 100,
        height: 100, // 高度
        text: '问卷编号:' + this.$route.query.id + '，欢迎使用问卷星球' // 二维码内容
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        // background: '#f0f'
        // foreground: '#ff0'
      });
    },
  }
}
</script>

<style scoped>
.edit-div1 {
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

.edit-div3 {
  margin: 20px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #FCFBFA;
}

.edit-div2 {
  margin: auto;
  margin-top: 50px;
  width: 1100px;
  height: auto;
  /*background-color: #FF670F;*/
}

.edit-div-4 {
  border-radius: 10px;
  opacity: 0.8;
}

hr.hr-class-1 {
  height: 12px;

  border: 0;

  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.1);
}

hr.hr-class-2 {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
</style>
