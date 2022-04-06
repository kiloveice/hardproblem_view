<template>
  <menu-edit ref="menuEdit"></menu-edit>
</template>

<script>
import MenuEdit from "@/components/MenuEdit";

export default {
  name: "MenuUpdate",
  components: {MenuEdit},
  mounted() {
    this.$refs.menuEdit.setEditMode(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>