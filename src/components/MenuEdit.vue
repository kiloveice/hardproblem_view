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
  </el-form>
  <el-button @click="post">
    上传
  </el-button>
</template>

<script>
import axios from "axios";

export default {
  name: "MenuEdit",
  data() {
    return {
      editFlag: false,
      id: 0,
      name: "",
      description: "",
    }
  },
  methods: {
    async post() {
      if (this.editFlag) {
        axios.post(process.env.VUE_APP_API + "/menu/update", this.getData())
            .then(this.$router.back);
      } else {
        axios.post(process.env.VUE_APP_API + "/menu/put", this.getData())
            .then(this.$router.back);
      }
    },
    async setData(res) {
      res = res.data.data;
      this.id = res.id;
      this.name = res.name;
      this.description = res.description;
    },
    async getData() {
      return {
        id: this.id,
        name: this.name,
        description: this.description
      }
    },
    async setEditMode(id) {
      this.editFlag = true;
      axios.post(process.env.VUE_APP_API + "/menu/get/by_menu_id", {
        menuId: parseInt(id)
      }).then(this.setData);
    }
  }
}
</script>

<style scoped>

</style>