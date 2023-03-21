<template>
  <food-table-show ref="table" @deleteFood="deleteFoodComfirm"></food-table-show>
  <PaginationNormal ref="pagination" @pageChange="pageChange"></PaginationNormal>
</template>

<script>
import FoodTableShow from "@/components/FoodTableShow";
import {ElMessageBox} from "element-plus";
import axios from "axios";
import PaginationNormal from "@/components/pagination/PaginationNormal";

export default {
  name: "FoodShow",
  components: {PaginationNormal, FoodTableShow},
  data() {
    return {
      foodList: [],
    }
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
    },
    getFoodCount: async function () {
      axios.get(process.env.VUE_APP_API + "/food/getCount")
          .then(this.$refs.pagination.handleTotalResponse);
    },
    pageChange: async function (data) {
      await this.$refs.table.getAllFood(data);
      await this.getFoodCount();
    },
  }
}
</script>

<style scoped>

</style>