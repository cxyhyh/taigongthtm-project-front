<template>
  <div class="contains">
    <el-container >
      <el-main>
        <Login></Login>
        
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Login from "../login/login.vue"
export default {
  inject: ["reload"],
  name: "index",
  data() {
    return {
    };
  },
components: { Login},
  mounted() {
  },
  methods: {
  },
};
</script>
<style scoped>
body::-webkit-scrollbar {display: none;}

.contains {
  background-image: URL("../../assets/bg.png");
  background-size: 100% 100%;
  padding: 0;
  margin: 0;
  height: 100%;
}

</style>