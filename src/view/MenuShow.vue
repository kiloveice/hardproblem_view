<template>
  <menu-table-show ref="table"></menu-table-show>
  <PaginationNormal ref="pagination" @pageChange="pageChange"></PaginationNormal>
</template>

<script>
import MenuTableShow from "@/components/MenuTableShow";
import PaginationNormal from "@/components/pagination/PaginationNormal";
import axios from "axios";

export default {
  name: "MenuShow",
  components: {MenuTableShow, PaginationNormal},
  methods: {
    async getMenuCount() {
      axios.get(process.env.VUE_APP_API + "/menu/getCount")
          .then(this.$refs.pagination.handleTotalResponse);
    },
    async pageChange(data) {
      await this.$refs.table.getAllMenu(data);
      await this.getMenuCount();
    }
  },
}
</script>

<style scoped>

</style>