<template>
  <food-edit ref="foodEdit"></food-edit>
</template>

<script>
import FoodEdit from "@/components/FoodEdit";

export default {
  name: "FoodUpdate",
  components: {FoodEdit},
  mounted() {
    this.$refs.foodEdit.setEditMode();
  }
}
</script>

<style scoped>

</style>