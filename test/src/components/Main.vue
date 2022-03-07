<template>
  <div id="div2">
    <div v-if="isLogin === false">
      <div id="div1">
        <form action="" class="login">
          <p>问卷星球</p>
          <div class="search-box">
            <input class="search-txt" type="text" placeholder="输入问卷编号快速作答" v-model="text1">
            <a class="search-btn" @click="click1">
              <svg class="icon" viewBox="0 0 1024 1024" width="30px">
                <path
                    d="M424.024 766.098c-91.619 0-177.754-35.679-242.538-100.464-133.735-133.737-133.735-351.344 0-485.078 64.784-64.784 150.919-100.462 242.538-100.462s177.754 35.677 242.539 100.462c133.733 133.735 133.735 351.34 0 485.078-64.785 64.783-150.922 100.464-242.539 100.464zM424.024 196.085c-60.637 0-117.643 23.613-160.523 66.489-88.512 88.51-88.51 232.53 0 321.040 42.876 42.876 99.885 66.491 160.523 66.491s117.643-23.614 160.523-66.491c88.51-88.51 88.51-232.53 0-321.040-42.876-42.876-99.885-66.489-160.523-66.489z"
                    fill="#e94118" p-id="1176"></path>
                <path
                    d="M886.838 943.904c-14.842 0-29.684-5.663-41.010-16.986l-261.286-261.285c-22.647-22.649-22.647-59.369 0-82.018 22.647-22.647 59.37-22.647 82.018 0l261.286 261.286c22.647 22.649 22.647 59.369 0 82.018-11.325 11.322-26.167 16.985-41.010 16.985z"
                    fill="#e94118" p-id="1177"></path>
              </svg>
            </a>
          </div>
          <br><br><br><br><br><br><br>
          <strong>
            <!--            <router-link to="/login" @click.native="loginClick">点击前往登录</router-link>-->
            <el-button @click="loginClick" type="primary" round>登录</el-button>
            <!--            <el-button @click="registerClick">注册</el-button>-->

          </strong>
        </form>

      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",
  mounted() {
    console.log(this.$route)
    if (this.$route.query.hasOwnProperty('Questionnaireplanet') && this.$route.name === "TrueWenJuan" && this.$route.path === "/wenjuan") {
      this.$router.push({path: '/wenjuan', query: {Questionnaireplanet: this.$route.query.Questionnaireplanet}})
      // this.$router.replace('/wenjuan')
      this.isLogin = true
    } else {
      if (this.isLogin1 === true) {
        // console.log("666")
        // console.log(sessionStorage.getItem("userName"))
        let userID = sessionStorage.getItem("userName")
        // alert(userID)
        if (userID !== "null") {
          // alert("登录信息已保存")

          // this.$router.replace('/person')
          this.$router.push({path: '/person', query: {id: userID}})
          this.isLogin = true
        } else {
          if (this.$route.query.hasOwnProperty('id')) {
            this.$router.push({path: '/wenjuan', query: {Qid: this.$route.query.id}})
            // this.$router.replace('/wenjuan')
            this.isLogin = true
          }
        }
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser
    },
    isLogin1() {
      console.log("in app name" + sessionStorage.getItem("userName"));
//      console.log("in app name" + sessionStorage.getItem("userName"));
      console.log("in app name" + sessionStorage.getItem("userName"));

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
      isLogin: false,
      text1: ''
    }
  },
  methods: {
    testMethod() {
      console.log("您点击了获取地理位置的按钮")
      this.$confirm('您将授权访问您的地理位置, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isGetPosition = true
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/get_ip',
          // url: 'http://42.193.111.182:8000/consumer/get_ip',
        }).then(response => {
          console.log(response)
          alert(response.data)
        })
        this.$message({
          type: 'success',
          message: '获取地理未知成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '您已取消获取地理位置'
        });
      });
    },
    searchMethod() {
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/getallQ',
        // url: 'http://42.193.111.182:8000/consumer/getallQ',
        data: {
          id: this.wenjuanid
        }
      }).then(response => {
        console.log(response)
        if (response.data.question === []) {
          alert("没有查询到对应问卷或对应问卷为空")
        } else {
          this.isLogin = true
          this.$router.push({path: '/wenjuan', query: {account: '您暂未登录', Qid: this.text1}})
        }
      })
    },
    click1() {
      console.log("点击了")
      this.searchMethod()

    },
    loginClick() {
      this.$router.replace('/register')
      this.isLogin = true
      console.log(this.isLogin)
    },
    registerClick() {
      this.$router.replace('/register')
      this.isLogin = true
      console.log(this.isLogin)
    }
  }
}
</script>

<style scoped>

#div1 {
  background-size: cover;
  background-attachment: fixed;
  background-image: url("../assets/wallpaper.jpg");
  height: 2880px;
}

strong {
  text-decoration: none;
}

.login {
  position: absolute;
  top: 50%;
  margin-top: -200px;
  left: 50%;
  margin-left: -200px;
  /* absolute居中的一种方法 */
  background-color: whitesmoke;
  width: 400px;
  height: 400px;
  border-radius: 25px;
  text-align: center;
  padding: 5px 40px;
  box-sizing: border-box;
  /* 这样padding就不会影响大小 */
}

p {
  font-size: 42px;
  font-weight: 600;
}

input {
  background-color: whitesmoke;
  width: 100%;
  height: 48px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid silver;
  /* 下面的会覆盖上面的步伐 */
  outline: none;
  font-size: 22px;
}

.btn {
  background-color: #59c2c5;
  width: 38%;
  height: 48px;
  border-radius: 8px;
  margin-top: 40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
}

.btn:hover {
  background-color: #59c2a0;
}

body {
  margin: 0;
  padding: 0;
  /* background: #e94118; */
  background-color: #FF670F;
}

.search-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2f3640;
  height: 40px;
  border-radius: 40px;
  padding: 10px;
  display: flex;
  justify-content: center;
}

.search-box:hover > .search-txt {
  width: 200px;
  padding: 0 6px;
}

.search-box:hover > .search-btn {
  background: white;
}

.search-btn {
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2f3640;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.search-txt {
  border: none;
  background: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}

</style>
