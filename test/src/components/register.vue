<template>
  <div>
    <div id="Register-div">
      <input type="checkbox" style="display: none;" id="change">
      <label for="change" @click="change">切换功能</label>

      <div class="turn">
        <div class="over">
          <form action="" class="login">
            <div id="strongsize">
              <strong>
                <span style="font-size: 35px">登录</span>
                <span style="font-size: 35px;color: deepskyblue">问卷星球</span>

              </strong>

            </div>
            <input type="text" placeholder="用户名" v-model="account">
            <input type="password" placeholder="密码" v-model="password">

            <br><br>

          </form>
          <form action="" class="sign">
            <h1 style="color: deepskyblue">注册账户</h1>
            <input type="text" placeholder="用户名" v-model="text1">
            <input type="password" placeholder="密码" v-model="text2">
            <input type="password" placeholder="确认密码" v-model="text3">

          </form>
        </div>
        <br>
        <el-button round @click="loginMethod" type="primary" v-show="isLogin">登录</el-button>
        <el-button round @click="loginMethod" type="primary" v-show="!isLogin" disabled>登录</el-button>
        <el-button round @click="registerMethod" v-show="isRegister">注册</el-button>
        <el-button round @click="registerMethod" v-show="!isRegister" disabled>注册</el-button>
      </div>

    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import Person from "@/components/Person";
export default {
  name: "register",
  components: {Person},
  data() {
    return {
      account: '',
      password: '',
      text1: '',
      text2: '',
      text3: '',
      isLogin: true,
      isRegister: false
    }
  },
  methods: {
    change() {
      console.log("切换功能")
      this.isLogin = !this.isLogin
      this.isRegister = !this.isRegister
    },
    loginMethod() {
      console.log("您点击了登录方法");
      this.$router.replace('/person')
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/login',
        //url: 'http://42.193.111.182:8000/consumer/login',
        data: {
          account: this.account,
          password: this.password,
        }
      }).then(response => {
        console.log(response);
        if (response.data === '不存在该用户'){
          alert("不存在用户，请检查用户名")
        } else if (response.data === '密码错误'){
          alert("密码错误")
        } else if (response.data === '信息不全'){
          alert("信息不全")
        } else {
          console.log("登录成功")
          //将用户名和token放入sessionStorage
          sessionStorage.setItem("userName", this.account);
          // sessionStorage.setItem("userToken", response.data.res.token);
          // console.log("in login image is" + response.data.res.image)
          // sessionStorage.setItem("userImage", response.data.res.image);
          //将用户信息放入vuex
          this.$store.dispatch("setUser", this.account);
          // this.$store.dispatch("setToken", response.data.res.token);
          // this.$store.dispatch("setImage", response.data.res.image);
          this.$router.push({path: '/person', query: {id: this.account}})
        }
        // 通过后端传回来的数据判断登录是否成功
      })
    },
    registerMethod() {
      console.log("您点击了注册方法")
      if (this.text2 !== this.text3){
        alert("您两次输入的密码不一致")
      } else {
        this.axios({
          method: 'POST',
          url: 'http://127.0.0.1:8000/consumer/register',
          //url: 'http://42.193.111.182:8000/consumer/register',
          data: {
            account: this.text1,
            password: this.text2
          }
        }).then(response => {
          console.log("注册结果",response)
          if (response.data === '信息不全'){
            alert("信息不全")
          } else if (response.data === '用户名已经存在啦'){
            alert("用户名已经存在啦")
          } else {
            alert("注册成功")
            this.$router.replace('/register')
          }

        })
      }

    }
  }
}
</script>

<style scoped>
#Register-div {
  background-size: cover;
  background-attachment: fixed;
  background-image: url("../assets/wallpaper.jpg");
  height: 2000px;
  text-align: center;
  overflow: hidden;
  margin: 0;
}

.switch {
  margin-top: 500px;
  background-color: #FCFBFA;
  width: 400px;
  height: 140px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  top: 73%;
  border-radius: 8px;
}

#change:checked + label,
  /* +用来选择同级后面最近的元素  */
#change:not(:checked) + label {
  background-color: #75eeff;
  color: black;
  width: 280px;
  padding: 8px 0;
  /* 用padding方便文字垂直居中 */
  font-size: 24px;
  font-weight: 600;
  position: absolute;
  left: 50%;
  margin-left: -140px;
  top: 82%;
  border-radius: 8px;
  cursor: pointer;
}

/* 旋转体 */
.turn {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  top: 8%;
  perspective: 800px;
  /* 旋转的时候的透视效果 */
}

.over {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: all 1.6s ease;
  /* 旋转持续时间 */
  /* ease是慢快慢 */
}

#change:checked
~
.turn .over {
  transform: rotateY(180deg);
}

form {
  position: absolute;
  background-color: #FCFBFA;
  height: 100%;
  border-radius: 8px;
  transform-style: preserve-3d;
}

.sign {
  transform: rotateY(180deg);
}

h1, h2 {
  color: #1f2029;
  user-select: none;
}

h1 {
  margin-top: 38px;
}

input {
  background-color: #4E495D;
  width: 70%;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 0 16px;
  font-size: 18px;
  color: #c4c3ca;
  font-weight: 500;
  outline: none;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(78, 73, 79, .5);
  transform-style: preserve-3d;
  transform: translate3d(0, 0, 1px);
}

.login input:nth-child(-n+3) {
  /* 选择class为login的子元素中的前三个input */
  margin: 20px 0;
}

.btn {
  background-color: #981E61;
  border: none;
  width: 280px;
  font-size: 24px;
  font-weight: 600;
  padding: 6px 0;
  color: white;
  border-radius: 8px;
  margin-top: 15px;
  cursor: pointer;
}

#strongsize {
  margin-top: 30px;
  margin-bottom: 50px;
}
</style>
