<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png">-->
  <!--  <el-header>-->
  <!--    <div>-->
  <!--      这里放导航-->
  <!--    </div>-->
  <!--  </el-header>-->
  <el-container>
    <el-aside width=null>
      <menu-router></menu-router>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
  <el-divider border-style="dashed"></el-divider>
  <div>
    今天吃什么呢？
  </div>
  <div>
    <font color="gray" size="1">
      Copyright © 2022 - ? nightsnowy
    </font>
  </div>
</template>

<script>

import MenuRouter from "@/router/MenuRouter";

export default {
  name: 'App',
  components: {MenuRouter},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
