<template>
  <el-header class="header">
    <el-row>
      <el-col>
        <div style="text-align: center">{{ title }} {{ nickname }}</div>
        <div style="text-align: right" v-if="!loginFlag">
          <el-button @click="signUp">注册</el-button>
          <el-button @click="signIn">登录！</el-button>
        </div>
        <div style="text-align: right" v-if="loginFlag">
          <el-button>管理</el-button>
          <el-button @click="logout">退出</el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import Cookies from "js-cookie"
import eventBus from "vue3-eventbus";
import axios from "axios";

export default {
  name: "wte-header",
  data() {
    return {
      title: "欢迎回来",
      nickname: "",
      loginFlag: false,
    }
  },
  mounted() {
    eventBus.on("loginSuccessfully", () => {
      this.loginSuccessfully();
    });
    this.loginSuccessfully();
  },
  methods: {
    signIn: async function () {
      await this.$router.push({name: "signIn"});
    },
    loginSuccessfully: async function () {
      if (Cookies.get("username") != null) {
        this.loginFlag = true;
        this.nickname = Cookies.get("nickname");
      }
    },
    logout: async function () {
      axios.post(process.env.VUE_APP_API + "/account/logout")
          .then(async (res) => {
            res = res.data;
            if (res.code === "200") {
              this.loginFlag = false;
              this.nickname = "";
              Cookies.remove("username");
              Cookies.remove("nickname");
              Cookies.remove("role");
              this.$router.go(0);
            }
          });
    },
    signUp: async function () {
      await this.$router.push({name: "signUp"});
    }
  }
}
</script>
<style scoped>
.header {
  margin-top: 1px;
  margin-bottom: 1px;
}
</style>