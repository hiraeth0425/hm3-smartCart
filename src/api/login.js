import request from '@/utils/request'

// 獲取圖形驗證碼
export const getPcode = () => {
  return request.get('/captcha/image')
}

// 手機驗證碼登入
export const loginService = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile,
      partyData: {},
      smsCode
    }
  })
}
