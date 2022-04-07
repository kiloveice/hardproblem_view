<template>
  <tag-show ref="tags"></tag-show>
  <el-divider/>
  <el-row>
    <el-form>
      <el-input v-model="tagName" placeholder="创建一个新tag"/>
      <el-button @click="putTag">
        上传
      </el-button>
    </el-form>
  </el-row>
</template>

<script>
import TagShow from "@/components/TagShow";
import axios from "axios";

export default {
  name: "TagAll",
  components: {TagShow},
  data() {
    return {
      tagName: null
    }
  },
  methods: {
    reload() {
      this.$router.go(0);
    },
    putTag() {
      axios.post(process.env.VUE_APP_API + "/tag/put", {
        tag: this.tagName
      }).then(this.reload);
    }
  },
  mounted() {
    this.$refs.tags.getAllTag();
  }
}
</script>

<style scoped>

</style>