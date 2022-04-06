<template>
  <food-table-show ref="table"></food-table-show>
</template>

<script>
import FoodTableShow from "@/components/FoodTableShow";

export default {
  name: "FoodShow",
  components: {FoodTableShow},
  data() {
    return {
      foodList: [],
    }
  },
  mounted() {
    this.$refs.table.getAllFood();
  }
}
</script>

<style scoped>

</style>