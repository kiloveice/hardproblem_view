<template>
  <el-form label-position="top">
    <el-form-item label="用户名">
      <el-input v-model="username"
                placeholder="请输入用户名"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="password"
                placeholder="请输入密码"
                type="password"
      ></el-input>
    </el-form-item>
    <el-button type="primary" round size="large" @click="signIn">登录</el-button>
  </el-form>
  <el-alert :title="error" type="error" :closable="false" v-if="error.length!==0"/>
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie"
import eventBus from "vue3-eventbus";

export default {
  name: "SignIn",
  emits: ["loginSuccessfully"],
  data() {
    return {
      username: "",
      password: "",
      nickname: "",
      error: "",
    }
  },
  methods: {
    signIn: async function () {
      if (this.username.length === 0 || this.password.length === 0) {
        this.error = "请输入用户名或密码！";
        return
      }
      axios.post(process.env.VUE_APP_API + "/account/login", {
        username: this.username,
        password: this.password
      }).then(async (res) => {
        res = res.data;
        if (res.code === "200") {
          this.error = "";
          let account = res.data;
          Cookies.set("username", account.username);
          Cookies.set("nickname", account.nickname);
          Cookies.set("role", account.role);
          eventBus.emit("loginSuccessfully");
          await this.$router.push({name: "solve"});
        } else {
          this.error = "账号或密码错误！";
        }
      })
    },
  }
}
</script>

<style scoped>

</style>