<template>
<div class="shoplist_container">
    <ul v-load-more="loadMore" v-if="shopListArr.length" type="1">
      <router-link :to="{path: 'shop', query:{geohash, id: item.id}}" v-for="item in shopListArr" tag='li' :key="item.id" class="shop_li">
        <section>
          <img :src="imgBaseUrl + item.image_path" class="shop_img">
        </section>
      </router-link>
    </ul>

    <ul v-else class="animation_opactiy">
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img src="../../images/shopback.svg" class="list_back_svg">
      </li>
    </ul>
</div>
</template>

<script>
import {mapState} from 'vuex'
import {shopList} from '@/service/getData'
import {showBack, animate} from '@/service/mUtils'
import {loadMore, getImgPath} from './mixin'
import {imgBaseUrl} from '@/config/env'

export default {
    data(){
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        shopListArr:[], // 店铺列表数据
        preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
        showBackStatus: false, //显示返回顶部按钮
        showLoading: true, //显示加载动画
        touchend: false, //没有更多数据
        imgBaseUrl,
      }
    },
    props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
    mixins: [loadMore, getImgPath],
    computed: {
      ...mapState([
        'latitude','longitude'
      ]),
    },
}
</script>

<style scoped>

  .shoplist_container {
    background-color: #fff;
    margin-bottom: 2rem;
  }

  .shop_li {
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }

  .shop_img {
    width: 2.7rem;
    height: 2.7rem;
    display: block;
    margin-right: 0.4rem;
  }

  .list_back_li {
    height: 4.85rem;
  }
  .list_back_li .list_back_svg {
    width: 100%;
    height: 100%;
  }

  .shop_right {
    flex: auto;
  }
  .shop_right .shop_detail_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .shop_right .shop_detail_header .shop_title {
    width: 8.5rem;
    color: #333;
    padding-top: 0.01rem;
    font: 0.65rem/0.65rem "PingFangSC-Regular";
    font-weight: 700;
  }
  .shop_right .shop_detail_header .premium::before {
    content: "品牌";
    display: inline-block;
    font-size: 0.5rem;
    line-height: 0.6rem;
    color: #333;
    background-color: #ffd930;
    padding: 0 0.1rem;
    border-radius: 0.1rem;
    margin-right: 0.2rem;
  }
  .shop_right .shop_detail_header .shop_detail_ul {
    display: flex;
    transform: scale(0.8);
    margin-right: -0.3rem;
  }
  .shop_right .shop_detail_header .shop_detail_ul .supports {
    font-size: 0.5rem;
    color: #999;
    border: 0.025rem solid #f1f1f1;
    padding: 0 0.04rem;
    border-radius: 0.08rem;
    margin-left: 0.05rem;
  }
  .shop_right .rating_order_num {
    display: flex;
    justify-content: space-between;
    height: 0.6rem;
    margin-top: 0.52rem;
  }
  .shop_right .rating_order_num .rating_order_num_left {
    display: flex;
    justify-content: flex-start;
  }
  .shop_right .rating_order_num .rating_order_num_left .rating_section {
    display: flex;
  }
  .shop_right .rating_order_num .rating_order_num_left .rating_section .rating_num {
    font-size: 0.4rem;
    color: #ff6000;
    margin: 0 0.2rem;
  }
  .shop_right .rating_order_num .rating_order_num_left .order_section {
    transform: scale(0.8);
    margin-left: -0.2rem;
    font-size: 0.4rem;
    color: #666;
  }
  .shop_right .rating_order_num .rating_order_num_right {
    display: flex;
    align-items: center;
    transform: scale(0.7);
    min-width: 5rem;
    justify-content: flex-end;
    margin-right: -0.8rem;
  }
  .shop_right .rating_order_num .rating_order_num_right .delivery_style {
    font-size: 0.4rem;
    padding: 0.04rem 0.08rem 0;
    border-radius: 0.08rem;
    margin-left: 0.08rem;
    border: 1px;
  }
  .shop_right .rating_order_num .rating_order_num_right .delivery_left {
    color: #fff;
    background-color: #3190e8;
    border: 0.025rem solid #3190e8;
  }
  .shop_right .rating_order_num .rating_order_num_right .delivery_right {
    color: #3190e8;
    border: 0.025rem solid #3190e8;
  }
  .shop_right .fee_distance {
    margin-top: 0.52rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.5rem;
    color: #333;
  }
  .shop_right .fee_distance .fee {
    transform: scale(0.9);
    font-size: 0.5rem;
    color: #666;
  }
  .shop_right .fee_distance .distance_time {
    transform: scale(0.9);
  }
  .shop_right .fee_distance .distance_time span {
    color: #999;
  }
  .shop_right .fee_distance .distance_time .order_time {
    color: #3190e8;
  }
  .shop_right .fee_distance .distance_time .segmentation {
    color: #ccc;
  }

  .loader_more {
    font: 0.6rem/3 "Microsoft YaHei";
    text-align: center;
    color: #999;
  }

  .empty_data {
    font-size: 0.5rem;
    color: #666;
    text-align: center;
    line-height: 2rem;
  }

  .return_top {
    position: fixed;
    bottom: 3rem;
    right: 1rem;
  }
  .return_top .back_top_svg {
    width: 2rem;
    height: 2rem;
  }

  .loading-enter-active, .loading-leave-active {
    transition: opacity 1s;
  }

  .loading-enter, .loading-leave-active {
    opacity: 0;
  }
</style>
