<template>
  <el-form label-position="top">
    <el-form-item label="id" v-if="editFlag">
      <el-input v-model="id" disabled></el-input>
    </el-form-item>
    <el-form-item label="name">
      <el-input v-model="name"></el-input>
    </el-form-item>
    <el-form-item label="description">
      <el-input
          v-model="description"
          :rows="6"
          type="textarea"
          placeholder="Please input"
      />
    </el-form-item>
    <el-form-item label="score">
      <el-input-number v-model="score" :min="0" :max="100"/>
    </el-form-item>
    <el-form-item label="price">
      <el-input-number v-model="price" :precision="2" :step="0.1" :max="10000"/>
    </el-form-item>
  </el-form>
  <el-button @click="post">
    上传
  </el-button>
</template>

<script>
import axios from "axios";

export default {
  name: "FoodEdit",
  data() {
    return {
      id: null,
      editFlag: false,
      name: "",
      description: "",
      score: 60,
      price: 10.0,
    }
  },
  methods: {
    //编辑模式
    setEditMode: async function () {
      this.editFlag = true;
      axios.post(process.env.VUE_APP_API + "/food/get/by_id",
          {foodId: parseInt(this.$route.params.id)})
          .then(this.setData);
    },
    setData: async function (res) {
      res = res.data;
      this.id = res.data.id;
      this.name = res.data.name;
      this.description = res.data.description;
      this.score = res.data.score;
      this.price = res.data.price;
    },
    getData: async function () {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        score: this.score,
        price: this.price
      }
    },
    post: async function () {
      if (this.editFlag) {
        axios.post(process.env.VUE_APP_API + "/food/update", this.getData())
            .then(this.$router.back);
      } else {
        axios.post(process.env.VUE_APP_API + "/food/put", this.getData())
            .then(this.$router.back);
      }
    }
  },
}
</script>

<style scoped>

</style>