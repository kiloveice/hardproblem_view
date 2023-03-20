<template>
  <food-table-show ref="table" @deleteFood="deleteFoodComfirm"></food-table-show>
</template>

<script>
import FoodTableShow from "@/components/FoodTableShow";
import {ElMessageBox} from "element-plus";
import axios from "axios";

export default {
  name: "FoodShow",
  components: {FoodTableShow},
  data() {
    return {
      foodList: [],
    }
  },
  mounted() {
    this.$refs.table.getAllFood();
  },
  methods: {
    async deleteFoodComfirm(food) {
      ElMessageBox.confirm(
          '确定删除该食物吗',
          '警告',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(async () => {
        axios.post(process.env.VUE_APP_API + "/admin/delete/food", {
          id: food.id
        }).then(async (res) => {
          res = res.data;
          if (res.code === "200") {
            this.$router.go(0);
          } else {
            await this.$router.push({name: "errorPage", query: {message: res.message}});
          }
        });
      }).catch(() => {
      });
    }
  }
}
</script>

<style scoped>

</style>