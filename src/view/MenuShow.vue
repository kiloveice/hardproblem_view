<template>
  <menu-table-show ref="table"></menu-table-show>
</template>

<script>
import MenuTableShow from "@/components/MenuTableShow";

export default {
  name: "MenuShow",
  components: {MenuTableShow},
  mounted() {
    this.$refs.table.getAllMenu();
  }
}
</script>

<style scoped>

</style>