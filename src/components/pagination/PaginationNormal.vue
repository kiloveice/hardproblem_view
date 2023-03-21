<template>
  <div>
    <el-pagination
        layout="sizes,prev,pager,next,jumper"
        background
        :current-page="currentPage"
        :total="totalCount"
        :page-size="pageSize"
        :page-sizes="pageSizeList"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import {HttpResponseCode} from "@/util/HttpResponseCode";

export default {
  name: "PaginationNormal",
  // {page,num}
  emits: ["pageChange"],
  data() {
    return {
      currentPage: 1,
      pageSizeList: [30, 50, 100],
      pageSize: 30,
      totalCount: 100
    }
  },
  mounted() {
    this.$emit("pageChange", {
      page: this.currentPage, size: this.pageSize
    });
  },
  methods: {
    handleSizeChange: async function (size) {
      this.pageSize = size;
      this.$emit("pageChange", {
        page: this.currentPage, num: this.pageSize
      });
    },
    handleCurrentChange: async function (page) {
      this.currentPage = page;
      this.$emit("pageChange", {
        page: this.currentPage, num: this.pageSize
      });
    },
    setTotalCount: async function (total) {
      this.totalCount = total;
    },
    async handleTotalResponse(res) {
      res = res.data;
      if (res.code === HttpResponseCode.goodCode) {
        await this.setTotalCount(parseInt(res.data));
      } else {
        await this.$router.push({name: "errorPage", query: {message: res.message}});
      }
    }
  }
}
</script>

<style scoped>

</style>