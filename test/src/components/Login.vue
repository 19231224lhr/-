<template>
  <div id="login">
    <h1>登录界面</h1>

    <span>
    <strong style="color: deepskyblue"> 账号 </strong>
    <input v-model="message">
    </span> <br><br>

    <span>
    <strong style="color: deepskyblue"> 密码 </strong>
    <input v-model="password">
    </span> <br><br>

    <button @click="loginMethod">登录</button>
    <br><br>
    <router-link to="/register">点击前往注册</router-link>
    <router-view></router-view>
  </div>

</template>

<script>


export default {
  name: "Login",
  data() {
    return{
      message: '',
      password: ''
    }
  },
  methods: {
    loginMethod(){
      console.log(this.message,this.password)
      this.axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/consumer/login',
        // url: 'http://42.193.111.182:8000/consumer/login',
        // url: 'http://42.193.111.182:8000/consumer/login',
        // data: {
        //   account: this.message,
        //   password: this.password
        // }
      }).then(response => {
        console.log(response);
        // 通过后端传回来的数据判断登录是否成功
      })
    }
  }
}
</script>
