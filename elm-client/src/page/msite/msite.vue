<template>
<div>
  <head-top>
    <router-link :to="'/search/geohash'" class="link_search" slot="search">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
        <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </router-link>
    <router-link to="/home" slot="msite-title" class="msite_title">
      <span class="title_text ellipsis">{{msiteTitle}}</span>
    </router-link>
  </head-top>

  <nav class="msite_nav">
    <div class="swiper-container" v-if="foodTypes.length">
      <div class="swiper-wrapper">
        <div class="swiper-slide food_types_container" v-for="(item,index) in foodTypes" :key="index">
          <router-link :to="{path:'/food',query:{geohash,title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
            <figure>
              <img :src="imgBaseUrl + foodItem.image_url">
              <figcaption>{{foodItem.title}}</figcaption>
            </figure>
          </router-link>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <img src="../../images/fl.svg" class="fl_back animation_opactiy" v-else/>
  </nav>
  <div class="shop_list_container">
    <header class="shop_header">
      <svg class="shop_icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
      </svg>
      <span class="shop_header_title">附近商家</span>
    </header>
    <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
  </div>
  <foot-guide></foot-guide>
</div>
</template>

<script>
import {mapMutations} from 'vuex'

import headTop from '@/components/header/header'
import {msiteAddress, msiteFoodTypes, cityGuess} from '@/service/getData'
import footGuide from '@/components/footer/footGuide'
import shopList from '@/components/common/shopList'
import '@/assets/js/swiper.min.js'
import '@/assets/style/swiper.min.css'
export default {
    data(){
      return {
        geohash: '', // city页面传递过来的地址geohash
        msiteTitle: '请选择地址...', // msite页面头部标题
        foodTypes: [], // 食品分类列表
        hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
        imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
      }
    },
  components:{
    headTop,
    footGuide,
    shopList
  },
  async beforeMount(){
      if(!this.$route.query.geohash){
        const address = await cityGuess();
        this.geohash = address.latitude + ',' + address.longitude;
      }else{
        this.geohash = this.$route.query.geohash
      }
      //保存geohash 到vuex
      this.SAVE_GEOHASH(this.geohash);
      //获取位置信息
      let res = await msiteAddress(this.geohash);
      this.msiteTitle = res.name;
      //debugger
      //记录当前经纬度
      this.RECORD_ADDRESS(res);
      this.hasGetData = true;
  },
  mounted(){
      //获取导航食品类型列表
     msiteFoodTypes(this.geohash).then(res => {
       let resLength = res.length;
       let resArr = [...res];//返回一个新的数组
       let foodArr = [];
       for (let i = 0, j = 0; i < resLength; i += 8, j++) {
         foodArr[j] = resArr.splice(0, 8);
       }
       this.foodTypes = foodArr;
     }).then(() => {
       //初始化swiper
       new Swiper('.swiper-container',{
         pagination:'.swiper-pagination',
         loop:true
       })
     })
  },
  methods:{
    ...mapMutations([
      'RECORD_ADDRESS', 'SAVE_GEOHASH'
    ]),
    // 解码url地址，求去restaurant_category_id值
    getCategoryId(url){
      let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      }else{
        return ''
      }
    }
  }

}
</script>

<style scoped>
  .link_search {
    left: 0.8rem;
    width: 0.9rem;
    height: 0.9rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .msite_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #fff;
    text-align: center;
    margin-left: -0.5rem;
  }
  .msite_title .title_text {
    font-size: 0.8rem;
    color: #fff;
    text-align: center;
    display: block;
  }

  .msite_nav {
    padding-top: 2.1rem;
    background-color: #fff;
    border-bottom: 0.025rem solid #e4e4e4;
    height: 10.6rem;
  }
  .msite_nav .swiper-container {
    width: 100%;
    height: auto;
    padding-bottom: 0.6rem;
  }
  .msite_nav .swiper-container .swiper-pagination {
    bottom: 0.2rem;
  }
  .msite_nav .fl_back {
    width: 100%;
    height: 100%;
  }

  .food_types_container {
    display: flex;
    flex-wrap: wrap;
  }
  .food_types_container .link_to_food {
    width: 25%;
    padding: 0.3rem 0rem;
    display: flex;
    justify-content: center;
  }
  .food_types_container .link_to_food figure img {
    margin-bottom: 0.3rem;
    width: 1.8rem;
    height: 1.8rem;
  }
  .food_types_container .link_to_food figure figcaption {
    text-align: center;
    font-size: 0.55rem;
    color: #666;
  }

  .shop_list_container {
    margin-top: 0.4rem;
    border-top: 0.025rem solid #e4e4e4;
    background-color: #fff;
  }
  .shop_list_container .shop_header .shop_icon {
    fill: #999;
    margin-left: 0.6rem;
    vertical-align: middle;
    width: 0.6rem;
    height: 0.6rem;
  }
  .shop_list_container .shop_header .shop_header_title {
    color: #999;
    font: 0.55rem/1.6rem "Microsoft YaHei";
  }
</style>
