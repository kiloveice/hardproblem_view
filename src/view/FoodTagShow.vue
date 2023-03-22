<template>
  <el-table :data="foodList" style="width: 100%" class="table-pre-lines">
    <el-table-column prop="id" label="Id" width="180"/>
    <el-table-column prop="name" label="Name" width="180"/>
    <el-table-column prop="description" label="Description"/>
    <el-table-column prop="score" label="Score" width="180"/>
    <el-table-column prop="price" label="Price" width="180"/>
  </el-table>
  <tag-show ref="tagShow"></tag-show>
  <el-select v-model="tagId" filterable placeholder="Select">
    <el-option
        v-for="item in tagsList"
        :key="item.id"
        :label="item.tag"
        :value="item.id"
    />
  </el-select>
  <el-button type="primary" @click="addTag">新增标签</el-button>
</template>

<script>
import TagShow from "@/components/TagShow";
import axios from "axios";

export default {
  name: "FoodTagShow",
  components: {TagShow},
  data() {
    return {
      foodList: [],
      tagsList: [],
      tagId: null,
    }
  },
  methods: {
    getTags: async function () {
      await this.$refs.tagShow.getTagByFoodId(parseInt(this.$route.params.id));
    },
    setFood: async function (res) {
      this.foodList.push(res.data.data);
    },
    setAllTags: async function (res) {
      this.tagsList = res.data.data;
    },
    reload: async function () {
      this.$router.go(0);
    },
    addTag: async function () {
      axios.post(process.env.VUE_APP_API + "/food/addtag", {
        foodId: parseInt(this.foodList[0].id),
        tagId: this.tagId
      }).then(this.reload);
    }
  },
  mounted() {
    axios.post(process.env.VUE_APP_API + "/food/get/by_id/", {
      foodId: parseInt(this.$route.params.id)
    })
        .then(this.setFood);
    this.getTags();
    axios.post(process.env.VUE_APP_API + "/tag/",{})
        .then(this.setAllTags);
  }
}
</script>

<style scoped>
.table-pre-lines >>> .cell{
  white-space: pre-line;
}
</style>