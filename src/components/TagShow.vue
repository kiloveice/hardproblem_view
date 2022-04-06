<template>
  <el-row class="mb-4">
    <el-button type="primary" round v-for="i in tags" :key="i.id">
      {{ i.tag }}
    </el-button>
  </el-row>
</template>

<script>
import axios from "axios";

export default {
  name: "TagShow",
  data() {
    return {
      tags: []
    }
  },
  methods: {
    setData: function (res) {
      this.tags = res.data.data;
    },
    getAllTag: function () {
      axios.get(process.env.VUE_APP_API + "/tag/")
          .then(this.setData);
    },
    getTagByFoodId: function (foodId) {
      axios.post(process.env.VUE_APP_API + "/tag/by_food_id",
          {foodId: parseInt(foodId)})
          .then(this.setData);
    }
  }
}
</script>

<style scoped>

</style>