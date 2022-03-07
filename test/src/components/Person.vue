<template>

  <div id="person-div">

    <el-row class="tac">
      <el-col :span="12">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
          <div @click="viewQuestion">
            <el-menu-item index="1">
              <i class="el-icon-s-order"></i>
              <span>问卷功能</span>
            </el-menu-item>
          </div>
          <div @click="answerQuestion">
            <el-menu-item index="2">
              <i class="el-icon-s-claim"></i>
              <span slot="title">回答问卷</span>
            </el-menu-item>
          </div>
          <div @click="changeMessage">
            <el-menu-item index="3">
              <i class="el-icon-user-solid"></i>
              <span slot="title">修改个人信息</span>
            </el-menu-item>
          </div>
          <div @click="recovery">
            <el-menu-item index="4">
              <i class="el-icon-delete-solid"></i>
              <span slot="title">回收站</span>
            </el-menu-item>
          </div>
          <div @click="searchAnswer">
            <el-menu-item index="6">
              <i class="el-icon-s-comment"></i>
              <span slot="title">查询个人已答问卷</span>
            </el-menu-item>
          </div>
          <div @click="logout">
            <el-menu-item index="5">
              <i class="el-icon-s-promotion"></i>
              <span slot="title">退出登录</span>
            </el-menu-item>
          </div>
        </el-menu>

      </el-col>
    </el-row>
    <Wenjuan class="wenjuan" v-show="level === 1"></Wenjuan>
    <Answer class="wenjuan" v-show="level === 2"></Answer>
    <Personal class="wenjuan" v-show="level === 3"></Personal>
    <Recovery class="wenjuan" v-show="level === 4"></Recovery>
    <SearchAnswer class="wenjuan" v-show="level === 5"></SearchAnswer>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
import Wenjuan from "@/components/Wenjuan";
import Personal from "@/components/Personal";
import Answer from "@/components/Answer";
import Recovery from "@/components/Recovery";
import SearchAnswer from "@/components/SearchAnswer";

export default {
  name: "Person",
  components: {
    Wenjuan,
    Personal,
    Answer,
    Recovery,
    SearchAnswer
  },
  // beforeRouteEnter:(to,from,next) => {
  //   //组件内守卫
  //   //已登录状态回到登录界面，即 登出
  //   next(vm => {
  //     vm.$store.dispatch("setUser",null);
  //   });
  //
  // },
  data() {
    return {
      isCollapse: true,
      level: 1
    };
  },
  methods: {
    searchAnswer() {
      console.log("您点击了查询个人所有已答问卷方法")
      this.level = 5
    },
    recovery() {
      console.log("您点击了回收站功能")
      this.level = 4
    },
    logout() {
      this.$confirm('您点击了退出登录功能, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // alert("您点击了退出登陆方法")
        this.$store.dispatch("setUser", null);

        this.$router.replace('/register')
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出登录'
        });
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeMessage() {
      console.log("您点击了修改个人信息")
      this.level = 3;
      console.log("level = ", this.level)
    },
    viewQuestion() {
      console.log("您点击了查看问卷主要功能");
      this.level = 1;
      console.log("level = ", this.level)
    },
    answerQuestion() {
      console.log("您点击了回答问卷功能")
      this.level = 2;
      console.log("level = ", this.level)
    }
  }
  ,
}
</script>

<style scoped>
.tac {
  float: left;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  /*background-color: rgba(0,0,0,0.1);*/
  width: 200px;
  min-height: 5000px;
}

#person-div {
  /*height: 2000px;*/
  /*background-size: 100% auto;*/
  /*background-repeat: no-repeat;*/
  /*margin: 0;*/
  /*background-image: url("../assets/wallpaper.jpg");*/
  background-size: cover;
  background-attachment: fixed;
  background-image: url("../assets/wallpaper.jpg");
  height: 5000px;
}

.wenjuan {
  padding-top: 100px;
  margin-left: 300px;
  width: 1000px;
}
</style>
