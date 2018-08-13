<template>
  <div>
    <head-top></head-top>
    <el-row style="margin-top: 20px;">
      <el-col :span="12" :offset="4">
        <el-form :modal="formData" :rules="rules" ref="formData" label-width="110px">
          <el-form-item label="店铺名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="address">
            <el-autocomplete v-model="formData.address" :fetch-suggestions="querySearchAsync" placeholder="请输入地址" style="width: 100%" @select="addressSelect"></el-autocomplete>
            <span>当前城市：{{city.name}}</span>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="formData.phone" maxLength="11"></el-input>
          </el-form-item>
          <el-form-item label="店铺简介" prop="description">
            <el-input v-model="formData.description"></el-input>
          </el-form-item>
          <el-form-item label="店铺标语" prop="promotion_info">
            <el-input v-model="formData.promotion_info"></el-input>
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-cascader :options="categoryOptions" v-model="selectedCategory" change-on-select></el-cascader>
          </el-form-item>
          <el-form-item label="店铺特点" style="white-space: nowrap;">
            <!--<span></span>-->
            <el-switch v-model="formData.is_premium" active-text="品牌保证"></el-switch>
            <!--<span>蜂鸟专送</span>-->
            <el-switch v-model="formData.delivery_mode" active-text="蜂鸟专送"></el-switch>
            <!--<span>新开店铺</span>-->
            <el-switch v-model="formData.new" active-text="新开店铺"></el-switch>
          </el-form-item>
          <el-form-item style="white-space: nowrap;">
            <el-switch v-model="formData.bao" active-text="外卖保"></el-switch>
            <el-switch v-model="formData.zhun" active-text="准时达"></el-switch>
            <el-switch v-model="formData.piao" active-text="开发票"></el-switch>
          </el-form-item>
          <el-form-item label="配送费" prop="float_delivery_fee">
            <el-input-number v-model="formData.float_delivery_fee" :min="0" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item label="起送价" prop="float_minimum_order_amount">
            <el-input-number v-model="formData.float_minimum_order_amount" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="营业时间" style="white-space: nowrap;">
            <el-time-select placeholder="起始时间" v-model="formData.startTime" :picker-options="{start: '05:30',step: '00:15',end: '23:30'}"></el-time-select>
            <el-time-select placeholder="结束时间" v-model="formData.endTime" :picker-options="{start: '05:30',step: '00:15',end: '23:30',minTime:formData.startTime}"></el-time-select>
          </el-form-item>
          <el-form-item label="上传店铺头像">
            <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :on-success="handleBusinessAvatarScucess"
                       :before-upload="beforeAvatarUpload">
            <img v-if="formData.image_path" :src="baseImgPath + formData.image_path" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i></el-upload>
          </el-form-item>
          <el-form-item label="上传营业执照">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleBusinessAvatarScucess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.business_license_image" :src="baseImgPath + formData.business_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="上传餐饮服务许可证">
            <el-upload
              class="avatar-uploader"
              :action="baseUrl + '/v1/addimg/shop'"
              :show-file-list="false"
              :on-success="handleServiceAvatarScucess"
              :before-upload="beforeAvatarUpload">
              <img v-if="formData.catering_service_license_image" :src="baseImgPath + formData.catering_service_license_image" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="优惠活动">
            <el-select v-model="activityValue" @change="selectActivity" :placeholder="activityValue">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-table
            :data="activities"
            style="min-width: 600px;margin-bottom: 20px;"
            align="cneter"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="icon_name"
              label="活动标题"
              align="cneter"
              width="120">
            </el-table-column>
            <el-table-column
              prop="name"
              label="活动名称"
              align="cneter"
              width="120">
            </el-table-column>
            <el-table-column
              prop="description"
              align="cneter"
              label="活动详情">
            </el-table-column>
            <el-table-column
              label="操作"
              width="120">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>


        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import headTop from '@/components/headTop'
  import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'
  import {baseUrl, baseImgPath} from '@/config/env'
  export default {
      data(){
        return {
          city: {},
          formData: {
            name: '', //店铺名称
            address: '', //地址
            latitude: '',
            longitude: '',
            description: '', //介绍
            phone: '',
            promotion_info: '',
            float_delivery_fee: 5, //运费
            float_minimum_order_amount: 20, //起价
            is_premium: true,
            delivery_mode: true,
            new: true,
            bao: true,
            zhun: true,
            piao: true,
            startTime: '',
            endTime: '',
            image_path: '',
            business_license_image: '',
            catering_service_license_image: '',
          },
          rules: {
            name: [{required: true, message: '请输入名称', trigger: 'blur'}],
            address: [{required: true, message: '请输入地址', trigger: 'blur'}],
            phone: [{required: true, message: '请输入手机号'}, {type: 'number', message: '电话号码必须是数字'}]
          },
          options: [{
            value: '满减优惠',
            label: '满减优惠'
          }, {
            value: '优惠大酬宾',
            label: '优惠大酬宾'
          }, {
            value: '新用户立减',
            label: '新用户立减'
          },{
            value: '进店领券',
            label: '进店领券'
          }],
          activityValue: '满减优惠',
          activities: [{
            icon_name: '减',
            name: '满减优惠',
            description: '满30减5，满60减8',
          }],
          baseUrl,
          baseImgPath,
          categoryOptions: [],
          selectedCategory: ['快餐便当', '简餐']
        }
      },
      components:{
        headTop,
      },
      methods: {
        async querySearchAsync(queryString, cb){

        },
        addressSelect(address){

        },
        handleBusinessAvatarScucess(res,file){

        },
        beforeAvatarUpload(file) {

        },


      }
  }
</script>

<style lang="less" scoped>
  @import '../../style/mixin';
  .button_submit{
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }
</style>
