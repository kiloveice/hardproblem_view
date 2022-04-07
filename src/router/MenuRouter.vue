<template>
  <el-button small
             @click="collapse"
             class="collapse-button"
             v-if="true">
    <template #icon>
      <el-icon>
        <expand/>
      </el-icon>
    </template>
  </el-button>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
  >
    <el-menu-item v-for="i in routeList"
                  :key="i.name"
                  :index="i.route">
      <template #title>
        {{ i.name }}
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
import {Expand} from "@element-plus/icons-vue"

export default {
  name: "MenuRouter",
  components: {Expand},
  data() {
    return {
      isCollapse: true,
      food: {name: "food"},
      routeList: [],
      emptyRouteList: [
        {
          name: "主页",
          route: {name: "solve"}
        },
        {
          name: "食物",
          route: {name: "food"}
        },
        {
          name: "新增食物",
          route: {name: "foodCreate"}
        },
        {
          name: "菜单",
          route: {name: "menu"}
        },
        {
          name: "新增菜单",
          route: {name: "menuCreate"}
        },
        {
          name: "标签管理",
          route: {name: "tag"}
        }
      ],
    }
  },
  methods: {
    collapse() {
      let temp = this.routeList;
      this.routeList = this.emptyRouteList;
      this.emptyRouteList = temp;
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  /*max-width: 100px;*/
  min-width: 10px;
  min-height: 100px;
}

.collapse-button {
  display: flex;
}
</style>