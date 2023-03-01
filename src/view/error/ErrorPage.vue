<template>
  <div>
    错误！
  </div>
  <div>
    {{ errorText }}
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: ["message"],
  data() {
    return {
      errorText: "",
    }
  },
  mounted() {
    this.errorText = this.message;
  }
}
</script>

<style scoped>

</style>