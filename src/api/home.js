import request from '@/utils/request'

export const getHomeDataService = () => {
  return request.get('/page/detail')
}
