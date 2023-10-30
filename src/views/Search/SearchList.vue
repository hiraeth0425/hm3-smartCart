<script>
import { getGoodListService } from '@/api/search.js'
import GoodsItem from '@/components/GoodsItem.vue'

export default {
  data() {
    return {
      search: this.$route.query.search || '搜索商品',
      GoodList: [],
      sortType: 'all',
      categoryId: this.$route.query.categoryId || '0'
    }
  },
  components: {
    GoodsItem
  },
  created() {
    this.getGoodListService()
  },
  computed: {
    goodsName() {
      return this.$route.query.search
    }
  },
  methods: {
    async getGoodListService() {
      const {
        data: { list }
      } = await getGoodListService(
        this.goodsName,
        this.sortType,
        this.categoryId
      )
      this.GoodList = list.data
    },
    saleSort() {
      this.sortType = 'sales'
      this.getGoodListService()
    },
    priceSort() {
      this.sortType = 'price'
      this.getGoodListService()
    }
  }
}
</script>

<template>
  <div class="search">
    <van-nav-bar
      fixed
      title="商品列表"
      left-arrow
      @click="this.$router.go(-1)"
    />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      v-model="search"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="getGoodListService">綜合</div>
      <div class="sort-item" @click="saleSort">銷量</div>
      <div class="sort-item" @click="priceSort">價格</div>
    </div>

    <div class="goods-list">
      <GoodsItem
        v-for="item in GoodList"
        :key="item.goods_id"
        :item="item"
      ></GoodsItem>
    </div>
  </div>
</template>

<style scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }
}
</style>
