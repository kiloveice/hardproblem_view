<template>
  <el-table :data="menuList" style="width: 100%">
    <el-table-column prop="id" label="Id" width="180"/>
    <el-table-column prop="name" label="Name" width="180"/>
    <el-table-column prop="description" label="Description"/>
    <el-table-column width="150">
      <template #default="scope">
        <el-button size="small" @click="editMenu(scope.row)"
        >编辑
        </el-button
        >
        <el-button size="small" @click="menuFood(scope.row)"
        >详情
        </el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuTableShow",
  data() {
    return {
      menuList: [],
    }
  },
  methods: {
    async setMenu(res) {
      this.menuList = res.data.data;
    },
    async getAllMenu(data) {
      axios.post(process.env.VUE_APP_API + "/menu/",data)
          .then(this.setMenu);
    },
    async menuFood(menu) {
      await this.$router.push({
        name: "menuFoodShow",
        params: {
          id: menu.id
        }
      });
    },
    async editMenu(menu) {
      await this.$router.push({
        name: "menuEdit",
        params: {
          id: menu.id
        }
      });
    }
  }
}
</script>

<style scoped>

</style>