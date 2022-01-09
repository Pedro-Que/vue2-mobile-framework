<template>
  <div class="login">
    <div class="logo">
      <img src="@assets/logo.png" />
    </div>
    <div class="title pd-t-20 tx-16 line-h22">
      {{ $t("login.欢迎登录梦兮工作室") }}
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="params.username"
        :name="$t('login.用户名')"
        :label="$t('login.用户名')"
        :placeholder="$t('login.用户名')"
        :rules="[{ required: true, message: $t('login.请填写用户名') }]"
      />
      <van-field
        v-model="params.password"
        type="password"
        :name="$t('login.密码')"
        :label="$t('login.密码')"
        :placeholder="$t('login.密码')"
        :rules="[{ required: true, message: $t('login.请填写密码') }]"
      />
      <van-button round block type="info" native-type="submit">
        {{ $t("login.提交") }}
      </van-button>
    </van-form>
  </div>
</template>

<script>
import { Login } from "@api/user";

export default {
  data() {
    return {
      params: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      const res = await Login(this.params);
      if (res.code == 200) {
        this.$toast.success(this.$t("login.登录成功"));
        this.$router.replace("/home");
      } else {
        this.$toast(res.msg);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: rgba(255, 255, 255, 1);

  .logo {
    padding-top: 5rem;
    .fj(center);

    > img {
      display: block;
      .size(2.88rem, 2.88rem);
      border-radius: 0.4rem;
    }
  }

  .title {
    color: rgba(64, 158, 255, 1);
    letter-spacing: 0.04rem;
    text-align: center;
  }

  /deep/.van-form {
    padding: 2.2rem 0.8rem 0;

    .van-field {
      margin-top: 0.8rem;
    }

    .van-button {
      margin-top: 2.4rem;
    }
  }
}
</style>
