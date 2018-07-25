<template>
  <div class="rating_container">
    <section class="star_container">
      <svg class="grey_fill" v-for="num in 5" :key="num">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
      </svg>
    </section>
    <div :style="'width:' + rating*2/5 + 'rem'" class="star_overflow">
      <section class="star_container" >
        <svg  class="orange_fill" v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
        </svg>
      </section>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{

          }
        },
        props:['rating'],
    }
</script>

<style scoped>
  .rating_container {
    position: relative;
    top: 0.2rem;
    width: 2rem;
    height: 0.4rem;
  }
  .rating_container .star_overflow {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
  .rating_container .star_container {
    position: absolute;
    display: flex;
    width: 2rem;
    height: 0.4rem;
    top: -0.02rem;
    left: -0.02rem;
  }
  .rating_container .star_container .grey_fill {
    fill: #d1d1d1;
  }
  .rating_container .star_container .orange_fill {
    fill: #ff9a0d;
  }
</style>
