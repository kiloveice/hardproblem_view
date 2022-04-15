<template>
  <el-table :data="foodList" style="width: 100%">
    <el-table-column prop="id" label="Id" width="180"/>
    <el-table-column prop="name" label="Name" width="180"/>
    <el-table-column prop="description" label="Description"/>
    <el-table-column prop="score" label="Score" width="180"/>
    <el-table-column prop="price" label="Price" width="180"/>
    <el-table-column width="200">
      <template #default="scope">
        <el-button size="small" type="danger" @click="$emit('deleteFood',scope.row)"
        >删除
        </el-button
        >
        <el-button size="small" @click="editFood(scope.row)"
        >编辑
        </el-button
        >
        <el-button size="small" @click="foodTags(scope.row)"
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
  name: "FoodTableShow",
  data() {
    return {
      foodList: [],
    }
  },
  methods: {
    setFood: function (res) {
      this.foodList = res.data.data;
    },
    editFood: function (food) {
      this.$router.push({
        name: "foodEdit", params: {id: food.id}
      });
    },
    foodTags: function (food) {
      this.$router.push({
        name: "foodTagShow", params: {id: food.id}
      });
    },
    getAllFood: function () {
      axios.post(process.env.VUE_APP_API + "/food/get", {})
          .then(this.setFood);
    },
    getFoodByMenuId: function (id) {
      axios.post(process.env.VUE_APP_API + "/menu/by_menu_id", {
        menuId: parseInt(id)
      }).then(this.setFood);
    }
  },
}
</script>

<style scoped>

</style>