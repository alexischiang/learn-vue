<template>
  <footer id="footer">
    <span>Written by {{author}}</span>
  </footer>
</template>


<script>
export default {
  data() {
    return {
      author: "Alex"
    };
  }
};
</script>

<style lang="stylus">
#footer {
  margin-top: 100px;
  text-align: center;
  color: white;
  text-shadow: 0 1px 0 #b4b4b4;
}
</style>