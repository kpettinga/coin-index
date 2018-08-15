<template>
  <span id="Change" :style="'color:' + color">
    {{ data > 0 ? '+' : '' }}{{ data ? data + '%' : '—' }}
  </span>
</template>

<script>
export default {
  name: "Change",
  props: {
    data: Number
  },
  computed: {
    color() {
      if ( ! this.data ) {
        return;
      }
      return this.data < 0 ? "#F56C6C" : "#409EFF"
    },
  },
}
</script>
