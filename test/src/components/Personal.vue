<template>
  <div>
    <div class="personal-div">
      <div class="person-img" style="float: left">
        <img src="../assets/希儿头像.png">
      </div>
<!--      <div style="float: right;border: 1px solid #c4c3ca;margin-right: 100px;margin-top: 30px">-->
<!--        <el-upload-->
<!--            class="avatar-uploader"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :show-file-list="false"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            :before-upload="beforeAvatarUpload">-->
<!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--        </el-upload>-->
<!--      </div>-->
      <div class="name-div" style="float: left">
        <strong style="font-size: 25px">欢迎您：&nbsp&nbsp&nbsp{{ this.$route.query.id }}</strong>
        <hr>
        <strong style="font-size: 25px">用户名：&nbsp&nbsp&nbsp{{ user_name }}</strong>
        <br><br>
        <strong style="font-size: 20px">性别：&nbsp</strong>
        <strong style="font-size: 20px;color: deepskyblue" v-show="sex === 'man'"><i class="el-icon-male"></i></strong>
        <strong style="font-size: 20px;color: deeppink" v-show="sex === 'woman'"><i class="el-icon-female"></i></strong>
        <strong style="font-size: 20px;color: #a79d9d" v-show="sex === ''"><i class="el-icon-view"> 不公开</i></strong>
      </div>

      <br><br>
      <div class="change-div" style="margin-top: 250px">
        修改性别&nbsp&nbsp&nbsp
        <el-radio-group v-model="newSex">
          <el-radio label="man">先生</el-radio>
          <el-radio label="woman">女士</el-radio>
          <el-radio label="">不能说的秘密</el-radio>
        </el-radio-group>
        <br>
        修改密码&nbsp&nbsp&nbsp
        <el-input placeholder="点击修改用户密码" style="width: 300px;margin-top: 20px"
                  v-model="newPassword_1" show-password></el-input>
        <br>
        确认密码&nbsp&nbsp&nbsp
        <el-input placeholder="重复密码" style="width: 300px;margin-top: 20px"
                  v-model="newPassword_2" show-password></el-input>
        <br>
        修改昵称&nbsp&nbsp&nbsp
        <el-input placeholder="点击修改用户密码" style="width: 300px;margin-top: 20px"
                  v-model="user_name"></el-input>
        <br><br>
        <el-button @click="submit">提交修改</el-button>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "Personal",
  mounted() {
    this.axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/consumer/getINF',
      // url: 'http://42.193.111.182:8000/consumer/getINF',
      data: {
        account: this.$route.query.id
      }
    }).then(response => {
      console.log(response.data.inf)
      this.sex = response.data.inf[0]
      this.user_name = response.data.inf[1]
      if (this.user_name === null) {
        console.log("用户没有设置用户名")
        this.user_name = "问卷星球"
      }
      if (this.sex === null) {
        this.sex = ''
        console.log("sexsexsex")
      }
      this.newSex = this.sex
      this.password = response.data.inf[2]
    })
  },
  data() {
    return {
      imageUrl: '',
      password: '',
      sex: '',
      newSex: '',
      newPassword_1: '',
      newPassword_2: '',
      user_name: '',
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submit() {
      console.log("点击了提交方法")
      if (this.newPassword_1 !== this.newPassword_2) {
        alert("您两次输入的密码不一致，请修改后再提交")
      }
      if (this.newPassword_1 === '') {
        this.newPassword_1 = this.password
        this.newPassword_2 = this.password
      }
      this.axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/consumer/changeINF',
        // url: 'http://42.193.111.182:8000/consumer/changeINF',
        data: {
          account: this.$route.query.id,
          password: this.newPassword_1,
          sex: this.newSex,
          user_name: this.user_name
        }
      }).then(response => {
        console.log(response)
        alert("您已成功修改")
      })
    }
  }

}
</script>

<style scoped>
.personal-div {
  background-color: white;
  width: 1000px;
  height: 590px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px
}

img {
  width: 150px;
  height: 150px;
  margin: 50px;
  border-radius: 50%
}

.person-img {
  float: left;
}

.name-div {
  margin-right: 200px;
  margin-top: 60px;
}

.change-div {
  width: 500px;
  margin-left: 35px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
