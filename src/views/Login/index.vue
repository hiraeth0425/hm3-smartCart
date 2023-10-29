<script>
import { getPcode, loginService } from '@/api/login'
import { showToast } from 'vant'
import 'vant/es/toast/style'
import { useUserStore } from '@/stores/user.js'

export default {
  data() {
    return {
      pCode: '',
      pKey: '',
      totalSec: 60,
      sec: 60,
      timer: '',
      mobile: '',
      codeNum: '',
      smsCode: ''
    }
  },
  created() {
    this.getPcode()
  },
  methods: {
    // 獲取圖形認證碼
    async getPcode() {
      const {
        data: { base64, key }
      } = await getPcode()
      this.pCode = base64
      this.pKey = key
    },
    // 獲取驗證碼
    getCode() {
      // 如果前面驗證未通過,則不發送訊息驗證碼
      if (!this.validFn()) return
      showToast('已發送驗證碼')
      if (this.sec === this.totalSec) {
        // 開啟倒數計時
        this.timer = setInterval(() => {
          // console.log('正在倒計時')
          this.sec--
          if (this.sec <= 0) {
            // 時間 = 0 停止定時器
            clearInterval(this.timer)
            this.timer = null
            this.sec = this.totalSec
          }
        }, 1000)
      }
    },
    // 驗證手機號碼 和 圖形驗證碼
    validFn() {
      if (!/^0[0-9]\d{8}$/.test(this.mobile)) {
        showToast('請輸入正確手機號碼')
        return false
      }
      if (!/^\w{4}$/.test(this.codeNum)) {
        showToast('請輸入正確圖形號碼')
        return false
      }
      return true
    },
    // 登入功能
    async login() {
      const userStore = useUserStore()
      if (!this.validFn()) return
      if (!/^\d{6}$/.test(this.smsCode)) {
        showToast('請輸入正確訊息驗證碼')
        return false
      }
      const {
        data: { token, userId }
      } = await loginService(this.mobile, this.smsCode)
      // console.log(res)
      userStore.setUserInfo(token, userId)
      // userStore.token = token
      // userStore.userId = userId
      await showToast('登入成功')
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <div>
    <!-- 頭部 -->
    <div class="login">
      <van-nav-bar
        title="會員登入"
        left-arrow
        @click="this.$router.go(-1)"
      ></van-nav-bar>
    </div>
    <!-- 主體 -->
    <div class="container">
      <div class="title">
        <h3>手機號註冊</h3>
        <p>未註冊的手機號登入後將自動註冊</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input
            v-model="mobile"
            class="inp"
            maxlength="10"
            placeholder="請輸入手機號碼"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="codeNum"
            class="inp"
            maxlength="5"
            placeholder="請輸入圖形驗證碼"
            type="text"
          />
          <img alt="" v-if="pCode" :src="pCode" @click="getPcode" />
        </div>
        <div class="form-item">
          <input
            v-model="smsCode"
            class="inp"
            placeholder="請輸入訊息驗證碼"
            type="text"
          />
          <button @click="getCode">
            {{ sec < totalSec ? sec + '秒後重新發送' : '獲取驗證碼' }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登入</div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
