<template>
  <el-tag :key="menuName" class="mx-1" effect="dark" size="large">{{ menuName }}</el-tag>
  <food-table-show ref="foodTable" @delete-food="deleteFoodComfirm"></food-table-show>
  <el-select v-model="foodId" filterable placeholder="Select">
    <el-option
        v-for="item in foodList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
    />
  </el-select>
  <el-button type="primary" @click="addFood">新增食物</el-button>
</template>

<script>
import FoodTableShow from "@/components/FoodTableShow";
import axios from "axios";
import {ElMessageBox} from "element-plus";

export default {
  name: "MenuFoodShow",
  components: {FoodTableShow},
  data() {
    return {
      menuId: 0,
      menuName: "",
      foodList: [],
      foodId: null,
    }
  },
  methods: {
    setFoods: function (res) {
      this.foodList = res.data.data;
    },
    getAllFoods: function () {
      axios.post(process.env.VUE_APP_API + "/food/get", {})
          .then(this.setFoods);
    },
    reload: function () {
      this.$router.go(0);
    },
    addFood: function () {
      axios.post(process.env.VUE_APP_API + "/menu/add_food", {
        foodId: this.foodId,
        menuId: this.menuId
      }).then(this.reload);
    },
    setMenuId(id) {
      this.menuId = parseInt(id);
    },
    setMenuName(res) {
      this.menuName = res.data.data.name;
    },
    getMenuName() {
      axios.post(process.env.VUE_APP_API + "/menu/get/by_menu_id", {
        menuId: this.menuId
      }).then(this.setMenuName);
    },
    deleteFoodComfirm(food) {
      ElMessageBox.confirm(
          '确定从菜单中删除该食物吗',
          '警告',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        axios.post(process.env.VUE_APP_API + "/menu/delete/food", {
          menuId: this.menuId,
          foodId: food.id
        }).then(() => {
          this.$router.go(0);
        })
      }).catch(() => {
      });
    }
  },
  mounted() {
    this.setMenuId(this.$route.params.id);
    this.getMenuName();
    this.$refs.foodTable.getFoodByMenuId(
        this.$route.params.id
    );
    this.getAllFoods();
  }
}
</script>

<style scoped>

</style>