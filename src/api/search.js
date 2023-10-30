import request from '@/utils/request'

// 商品搜索
/**
      sortType  all-按综合搜索(默认)，sales-按销量搜索，price-按价格搜索
      sortPrice    0-价格从低到高， 1-价格从高到低
      categoryId  
      goodsName 商品名称
      page  页码，默认值：1
 */
export const getGoodListService = (goodsName, sortType, categoryId) => {
  return request.get('/goods/list', {
    params: {
      sortType,
      sortPrice: '0',
      categoryId,
      goodsName,
      page: '1'
    }
  })
}

// 獲取商品全部分類
export const getCategoryService = () => {
  return request.get('/category/list')
}
