<template>
  <div class="login">
    <div class="login-main">
      <div>
        <h2>太原太工天昊土木工程检测有限公司项目</h2>
        <p class="login-text">用户名</p>
        <el-input
          type="text"
          v-model.trim="username"
          placeholder="请输入用户名"
        >
          <template slot="prepend">
            <img
              src="@/assets/yonghuming.png"
              alt=""
              class="login-image"
            />
          </template>
        </el-input>
        <p class="login-text">密码</p>
        <el-input
          type="password"
          v-model.trim="password"
          placeholder="请输入密码"
          show-password
        >
          <template slot="prepend">
            <img
              src="@/assets/mima.png"
              alt=""
              class="login-image"
            /> </template
        ></el-input>
        <p class="login-text">验证码</p>
        <p class="login-yanzhengma">
          <el-input v-model="yanzhengma"   class="input" placeholder="请输入验证码">
            <template slot="prepend">
              <img
                src="@/assets/yanzhengma.png"
                alt=""
                class="login-image"
              />
            </template>
            <template slot="append">
              <div
                @click="refreshCode"
                style="display: inline-block; height: 100%; margin-right: 5px"
              >
                <s-identify
                  :identifyCode="identifyCode"
                  @click="refreshCode"
                ></s-identify>
              </div>
              <img
                src="@/assets/shuaxin.png"
                alt=""
                class="login-yanzhengmashuaxin"
                @click="refreshCode"
            /></template>
          </el-input>
        </p>
        <el-button type="primary" @click="login">登录</el-button>
        <p class="login-jizhumima">
          <el-checkbox v-model="jizhumima">记住密码</el-checkbox>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import SIdentify from "@/components/yanzhengma.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
      yanzhengma: "",
      jizhumima: false,
      identifyCode: "1254",
    };
  },
  components: {
    SIdentify,
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.$message({
          type: "info",
          message: "用户名或密码不允许为空",
        });
        return;
      }
      if (!this.yanzhengma) {
        this.$message({
          type: "info",
          message: "验证码不能为空",
        });
        return;
      }
      let isyanzhengma = this.getyanzhengma(this.yanzhengma);
      //let isTrue = this.yonghudenglu(this.username, this.password);
      if (!isyanzhengma) {
        this.$message({
          type: "info",
          message: "验证码错误",
        });
        this.yanzhengma = "";
        return;
      }
      this.yonghudenglu(this.username,this.password);
      
    },
    refreshCode() {
      let tempNum = parseInt(Math.random() * 10000);
      if (tempNum > 999) {
        this.identifyCode = String(tempNum);
      } else {
        this.refreshCode();
      }
    },
    // 请求验证码判断
    getyanzhengma(yanzhengma) {
      if (yanzhengma == this.identifyCode) {
        return true;
      } else {
        this.refreshCode();
        return false;
      }
    },
    // 验证用户名和密码
    yonghudenglu(name, password) {
      if (name == "admin" && password == "123456abC") {
        this.$router.push("/admin");
      } else {
        this.$message({
          type: "info",
          message: "用户名或密码错误",
        });
        this.refreshCode();
        return false;
      }
    },
  },
  mounted() {
    let jzmm = Boolean(window.sessionStorage.getItem("jizhumima"));
    if (jzmm) {
      this.jizhumima = jzmm;
      this.password = window.sessionStorage.getItem("isPassword");
      this.username = window.sessionStorage.getItem("isUserName");
    }
    this.refreshCode();
    console.log(window.sessionStorage.getItem("jizhumima"), this.jizhumima);
  },
};
</script>
<style scoped>
.login {
  background-size: 100% 100%;
  margin: 0;
  padding: 0;
  position: relative;
}
.login-main {
  width: 700px;
  height: 400px;
  text-align: center;
  background-image: url("../../assets/denglu-bg.png");
  background-size: 100% 100%;
  position: relative;
  margin-top: 250px;
  left: 50%;
  transform: translate(-50%, -50%);
}
h2 {
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #2070f7;
  font-size: 15px;
}
.login-text {
  font-size: 10px;
  font-family: Microsoft YaHei;
  color: #3e4855;
  text-align: left;
  margin: 20px 5px 0px 0;
  margin-top: -7px;
}
.input{
 height: 20px;
}
.login-image {
  width: 10px;
  height: 15px;
}
.el-input-group__prepend {
  padding: 0 10px;
}
.login-main > div {
  position: absolute;
  text-align: center;
  right: 0;
  top: 0;
  width: 45%;
  height: 80%;
  padding: 6% 8%;

}
.login-main > div > .el-input {
  margin: 10px 0;
 
}
.login-yanzhengma {
  line-height: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}
.login-yanzhengma > img:nth-child(2) {
  width: 32px;
  height: 20px;
}
.login-yanzhengma > img:nth-child(3) {
  width: 32px;
  height: 20px;
}
.login-yanzhengmatupian {
  height: 23px;
  margin-right: 10px;
  width: 30px;
  
}
.login-yanzhengmashuaxin {
  height: 15px;
  width: 13px;
  margin-right: -9px;
  margin-bottom: 5px;


}
.el-button {
  margin-top: 0px;
  width: 100%;
}
.login-jizhumima {
  text-align: left;
  height: 10px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  color: #9ba5b2;
  line-height: 65px;
  margin-top: -10px;
}
</style>
