<template>
  <el-row :span="8">
    <el-card shadow="never"> {{ name }}</el-card>
  </el-row>
  <el-row :span="8">
    <el-card shadow="never"> 评分：{{ score }}</el-card>
  </el-row>
  <el-row :span="8">
    <el-card shadow="never"> 价格：{{ price }}</el-card>
  </el-row>
  <el-row :span="8">
    <el-card shadow="never" class="text-with-n"> {{ description }}</el-card>
  </el-row>
  <tag-show ref="tags"></tag-show>
  <el-button @click="goHome">再来一次</el-button>
</template>

<script>
import TagShow from "@/components/TagShow";
import axios from "axios";

export default {
  name: "SolveShow",
  components: {TagShow},
  data() {
    return {
      id: 0,
      name: "",
      description: "",
      score: 0,
      price: 0
    }
  },
  methods: {
    setFood(res) {
      let food = res.data.data;
      this.name = food.name;
      this.description = food.description;
      this.score = food.score;
      this.price = food.price;
    },
    goHome() {
      this.$router.push({name: "solve"});
    }
  },
  mounted() {
    this.id = parseInt(this.$route.query.id);
    axios.post(process.env.VUE_APP_API + "/food/get/by_id",
        {
          foodId: this.id
        }).then(this.setFood);
    this.$refs.tags.getTagByFoodId(this.id);
  }
}
</script>

<style scoped>
.text-with-n {
  white-space: pre-line;
  text-align: left;
}
</style>