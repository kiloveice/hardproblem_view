<template>
  <el-form label-position="top">
    <el-form-item label="用户名">
      <el-input v-model="username"
                placeholder="请输入用户名"
                @blur="checkUsername">
      </el-input>
      <div class="form-error">{{ usernameError }}</div>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="nickname"
                placeholder="请输入昵称"
                @blur="checkNickname"
      ></el-input>
      <div class="form-error">{{ nicknameError }}</div>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password"
                placeholder="密码不能少于6位，不能多于20位"
                @blur="checkPassword"
                type="password"
      ></el-input>
      <div class="form-error">{{ passwordError }}</div>
    </el-form-item>
    <el-form-item label="再次输入密码">
      <el-input v-model="passwordAgain"
                placeholder="重复输入密码"
                @blur="checkPasswordAgain"
                type="password"
      ></el-input>
      <div class="form-error">{{ passwordAgainError }}</div>
    </el-form-item>
    <el-button type="primary" round size="large" @click="signUp">立即注册</el-button>
  </el-form>
  <el-alert :title="error" type="error" :closable="false" v-if="error.length!==0"/>
  <el-dialog v-model="success" title="注册成功">
    <span>
      {{ this.username }} 注册成功！请自行跳转界面。
      不要重复注册。
    </span>
  </el-dialog>
</template>

<script>


import axios from "axios";

export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      nickname: "",
      password: "",
      passwordAgain: "",
      usernameError: "",
      nicknameError: "",
      passwordError: "",
      passwordAgainError: "",
      error: "",
      success: false,
    }
  },
  methods: {
    checkUsername: async function () {
      if (this.username == null || this.username.length === 0) {
        this.usernameError = "用户名不能为空！";
        return;
      }
      if (this.username.length > 20) {
        this.usernameError = "用户名长度不能超过20！";
        return;
      }
      axios.post(process.env.VUE_APP_API + "/account/check/username",
          {username: this.username})
          .then((res) => {
            res = res.data;
            if (res.code === "200") {
              this.usernameError = "";
            } else {
              this.usernameError = "用户名不可用";
            }
          });
    },
    checkNickname: async function () {
      if (this.nickname.length < 1 || this.nickname.length > 20) {
        this.nicknameError = "长度不能超过20且不能为空";
      } else {
        this.nicknameError = "";
      }
    },
    checkPassword: async function () {
      if (this.password.length < 6 || this.password.length > 20) {
        this.passwordError = "密码不得少于6位，不能多于20位";
      } else {
        this.passwordError = "";
      }
    },
    checkPasswordAgain: async function () {
      if (this.passwordAgain !== this.password) {
        this.passwordAgainError = "两次密码不相同";
      } else {
        this.passwordAgainError = "";
      }
    },
    signUp: async function () {
      let flag = true;
      await this.checkUsername();
      await this.checkNickname();
      await this.checkPassword();
      await this.checkPasswordAgain();
      if (!(this.usernameError.length === 0
          && this.nicknameError.length === 0
          && this.passwordError.length === 0
          && this.passwordAgainError.length === 0)) {
        flag = false;
      }
      if (!flag) {
        this.error = "注册失败，请再次检查！";
      } else {
        axios.post(process.env.VUE_APP_API + "/account/put", {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }).then((res) => {
          res = res.data;
          if (res.code === "200") {
            this.error = "";
            this.success = true;
            setTimeout(() => {
              this.success = false;
            },3000);
          } else {
            this.error = "注册失败！请重新注册";
          }
        })
      }
    }
  },
}
</script>

<style scoped>
.form-error {
  margin-bottom: 1px;
  margin-top: 1px;
  color: red;
}
</style>