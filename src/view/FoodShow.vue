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
    deleteFoodComfirm(food) {
      ElMessageBox.confirm(
          '确定删除该食物吗',
          '警告',
          {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        axios.post(process.env.VUE_APP_API + "/admin/delete/food", {
          id: food.id
        }).then((res) => {
          res = res.data;
          console.log(res);
          console.log(res.message);
          if (res.code === "200") {
            this.$router.go(0);
          } else {
            this.$router.push({name: "errorPage", query: {message: res.message}});
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