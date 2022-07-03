<template>
  <el-form>
    <el-form-item label="菜单">
      <el-space>
        <el-select v-model="menuId" placeholder="请选择菜单，默认为不选择">
          <el-option v-for="i in menuList"
                     :key="i.id"
                     :value="i.id"
                     :label="i.name"></el-option>
        </el-select>
        <el-switch v-model="menuFlag"
                   size="large"
                   inline-prompt
                   active-text="是"
                   inactive-text="否"/>
      </el-space>
    </el-form-item>
    <el-form-item label="标签">
      <el-checkbox-group v-model="tagIds">
        <el-checkbox v-for="i in tagList"
                     :key="i.id"
                     :label="i.id"
                     :value="i.id">{{ i.tag }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="启用标签">
      <el-space>
        <el-switch v-model="tagFlag"
                   size="large"
                   inline-prompt
                   active-text="是"
                   inactive-text="否"/>
      </el-space>
    </el-form-item>
    <el-form-item label="反选标签">
      <el-space>
        <el-switch v-model="reverseFlag"
                   size="large"
                   inline-prompt
                   active-text="是"
                   inactive-text="否"/>
      </el-space>
    </el-form-item>
  </el-form>
  <el-button type="primary" round size="large" @click="solveProblem">解决人生难题</el-button>
</template>

<script>
// import router from "@/router/router";
import axios from "axios";

export default {
  name: "SolveProblem",
  data() {
    return {
      menuId: 0,
      menuList: [],
      menuFlag: true,
      tagList: [],
      tagIds: [],
      tagFlag: true,
      reverseFlag: false
    }
  },
  methods: {
    setMenuList: function (res) {
      this.menuList = res.data.data;
      this.menuId = res.data.data[0].id;
    },
    setTagList: function (res) {
      this.tagList = res.data.data;
    },
    setAnswer: function (res) {
      this.$router.push({
        name: "answer",
        query: {id: res.data.data.id}
      });
    },
    solveProblem: function () {
      let res = {}
      if (this.menuFlag) {
        res.menu = this.menuId;
      }
      if (this.tagFlag) {
        res.tag = this.tagIds;
      }
      if (!this.reverseFlag) {
        if (!this.tagFlag || this.tagIds.length === 0) {
          axios.post(process.env.VUE_APP_API + "/food/solve", res)
              .then(this.setAnswer)
        } else {
          axios.post(process.env.VUE_APP_API + "/food/solve/tag", res)
              .then(this.setAnswer)
        }
      } else {
        axios.post(process.env.VUE_APP_API + "/food/solve/tag/reverse", res)
            .then(this.setAnswer)
      }
    }
  },
  mounted() {
    axios.get(process.env.VUE_APP_API + "/menu/")
        .then(this.setMenuList)
        .catch()
        .then(function () {
        });
    axios.get(process.env.VUE_APP_API + "/tag/")
        .then(this.setTagList)
  }
}
</script>

<style scoped>

</style>