<style scoped lang="scss">
  @import "src/sass/uploadImg";

  
</style>
<template>
  <div>
    <
      v-model="isOpenUploadModel"
      title="我的图片"
      :width="800"
      ok-text="确定选择图片"
      cancel-text="关闭"
      @on-ok="ok"
      @on-cancel="cancel">

      <div style="height:390px; overflow:auto; overflow-y:scroll;">
        <ul class="img-ul"> 
          <li class="img-li" @click="clickImg(key)" v-for="(item, key) of imgList" v-bind:class="{ select: item.isSelected }" :key="key">
            <div class="img-size" :style="{backgroundImage: 'url(' + item.resources_route + ')'}" style="background-size:cover;"></div>
            <span class="img-text">{{item.name}}</span>
            <span class="img-text" v-if="isDel" style="margin-bottom:5px; height:35px;"><Button @click="delImgHandle(key)">删除图片</Button></span>
            <div class="corner" v-if="item.isSelected">
              <div class="corner-icon">
                <Icon type="checkmark-round"></Icon>
              </div>
            </div>
          </li>
        </ul> 
      </div>

      <div class="page-centent">
        <Page :total=total :page-size=pageSize @on-change="pageHandle"></Page>
      </div>

      <Button type="success" slot="close" @click="uploadButEvent(true)"><Icon type="document-text"></Icon> 上传图片</Button>
      <Button type="warning" slot="footer" @click="cancel()"><Icon type="close"></Icon> 关闭</Button>
      <Button type="error" slot="footer" v-if="!isDel" @click="isDel = !isDel"><Icon type="android-delete"></Icon> 删除图片</Button>
      <Button type="error" slot="footer" v-if="isDel" @click="isDel = !isDel"><Icon type="android-cancel"></Icon> 取消删除图片</Button>
      <Button type="success" slot="footer" @click="ok()"><Icon type="checkmark-round"></Icon> 确定选择图片</Button>
    </Modal>

    <Modal
      v-model="isUploadImgModel"
      title="上传新图片"
      :width="800"
      :max-size="2048"
      ok-text="上传图片"
      cancel-text="关闭">

      <Upload
        multiple
        type="drag"
        :action=uploadFileUrl
        :headers=headers
        :format="['jpg','jpeg','png','gif']"
        :max-size="1024"
        :before-upload="handleBeforeUpload"
        :on-success="uploadSuccessHandle"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        ref="file">
        <div style="padding:10px 20px 20px 20px">
          <div v-show="this.uploadImgSuccessList.length === 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p v-show="this.file.length === 0">点击或将文件拖拽到这里上传</p>
            <p style="color:red;" v-show="this.file.length !== 0">已选{{this.file.length}}张图片，请点击下方按钮进行上传！</p>
          </div>
          <div v-show="this.uploadImgSuccessList.length !== 0">
            <div v-for="(item, index) of uploadImgSuccessList" :key="index" @click.stop="delUploadImg(index)" class="uploadSuccessImg" :style="{backgroundImage: 'url(' + item.resourcesRoute + ')'}">
            </div>

            <div style="clear:both;"></div>
          </div>
        </div>
      </Upload>

      <Button type="ghost" slot="footer" @click="uploadButEvent(false)"><Icon type="arrow-return-left"></Icon> 返回上级</Button>
      <Button type="info" slot="footer" @click="uploadImg" :loading="uploadLoading">
        <Icon type="ios-upload"></Icon> 
        上传图片<font v-show="this.file.length !== 0">(已选{{this.file.length}}张图片)</font>
      </Button>
      <Button type="primary" slot="footer" @click="determineImg()"><Icon type="checkmark-round"></Icon> 确定选择</Button>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        isOpenUploadModel: false,
        isUploadImgModel: false,
        uploadFileUrl: null,
        isDel: false,
        headers: {},
        imgList: [],
        uploadImgSuccessList: [],
        total: 0,
        pageSize: 0,
        file: [],
        page: 1,
        uploadLoading: false
      };
    },
    props: {
      maxNum: {
        default: 1
      }
    },
    watch: {
      isDel: function (val) {
        if (val) {
          for (let i =0; i<this.imgList.length; i++) {
            this.imgList[i].isSelected = false;
          }
        }
      }
    },
    methods: {
      ok () {
        let arr = [];
        for (let item of this.imgList) {
          if (item.isSelected === true) {
            let obj = {};
            obj.resourcesId = item.mei_resources_id;
            obj.imgRoute = item.img_route;
            obj.resourcesRoute = item.resources_route;
            arr.push(obj);
          }
        }

        if (arr.length === 0) {
          this.$Message.info('至少选择一张图片');
          return;
        }

        this.isOpenUploadModel = false;

        this.$emit('input', arr);
      },
      uploadImgModel () {
        this.ajax.getUploadImgList({
          data: {
            page: 1
          },
          success: (response) => {
            this.total = parseInt(response.body.page_data.count);
            this.pageSize = parseInt(response.body.page_data.rows_num);

            this.imgList.splice(0, this.imgList.length);

            for (let item of response.body.file_list) {
              item.isSelected = false;
              this.imgList.push(item);
            }
          },
          error: (response) => {
            this.$Message.error(response.meta.message);
          }
        });

        this.total = 1;

        this.imgList.splice(0, this.imgList.length);

        this.isOpenUploadModel = true;
      },
      clickImg (key) {
        if (this.isDel) {
          return;
        }

        if (this.imgList[key].isSelected) {
          this.imgList[key].isSelected = false;
        } else {
          // 统计已选数量
          let i = 0;
          for (let item of this.imgList) {
            if (item.isSelected === true) {
              i++;
            }
          }

          if (i >= this.maxNum) {
            this.$Message.warning('最多只能选择' + this.maxNum + '张图片');
            return;
          }

          this.imgList[key].isSelected = true;
        }
      },
      pageHandle (page) {
        this.page = page;

        this.ajax.getUploadImgList({
          data: {
            page: page
          },
          success: (response) => {
            this.total = parseInt(response.body.page_data.count);
            this.pageSize = parseInt(response.body.page_data.rows_num);

            this.imgList.splice(0, this.imgList.length);

            for (let item of response.body.file_list) {
              item.isSelected = false;
              this.imgList.push(item);
            }
          },
          error: (response) => {
            this.$Message.error(response.meta.message);
          }
        });
      },
      uploadButEvent (data) {
        if (data) {
          this.isOpenUploadModel = false;
          this.isUploadImgModel = true;
        } else {
          this.file.splice(0, this.file.length);

          this.uploadImgSuccessList.splice(0, this.uploadImgSuccessList.length);

          this.$refs.file.clearFiles();

          this.uploadImgModel();

          this.isOpenUploadModel = true;
          this.isUploadImgModel = false;
        }
      },
      handleFormatError (file) {
        this.$Message.warning('文件' + file.name + '格式不正确,请检查');
      },
      handleMaxSize (file) {
        this.$Message.warning('文件' + file.name + '超出文件大小限制,请检查');
      },
      uploadImg () {
        if (this.file.length === 0) {
          this.$Message.warning('请至少选择一张图片上传');
          return;
        }

        this.uploadLoading = true;

        for (let item of this.file) {
          this.$refs.file.post(item);
        }

        this.file.splice(0, this.file.length);
      },
      handleBeforeUpload (file) {
        this.file.push(file);
        return false;
      },
      uploadSuccessHandle (response) {
        let obj = {};
        obj.resourcesId = response.body.mei_resources_id;
        obj.imgRoute = response.body.img_route;
        obj.resourcesRoute = response.body.resources_url;
        this.uploadImgSuccessList.push(obj);

        this.uploadLoading = false;
      },
      determineImg () {
        if (this.uploadImgSuccessList.length === 0) {
          this.$Message.warning('至少选择一张图片');
          return;
        }

        if (this.uploadImgSuccessList.length > this.maxNum) {
          this.$Message.warning('最多只能选择' + this.maxNum + '张图片');
          return;
        }

        let obj = JSON.stringify(this.uploadImgSuccessList);

        this.$emit('input', JSON.parse(obj));

        this.cancelUpload();
      },
      cancel () {
        this.isDel = false;
        this.isOpenUploadModel = false;
      },
      delImgHandle (key) {
        this.ajax.delImg({
          data: {
            mei_resources_id: this.imgList[key].mei_resources_id
          },
          success: () => {
            this.$Message.success('删除成功');
            this.pageHandle(this.page);
          },
          error: (response) => {
            this.$Message.error(response.meta.message);
          }
        });
      },
      cancelUpload () {
        this.file.splice(0, this.file.length);
        this.isOpenUploadModel = false;
        this.isUploadImgModel = false;
        this.imgList.splice(0, this.imgList.length);
        if (this.uploadImgSuccessList.length > 0) {
          this.uploadImgSuccessList.splice(0, this.uploadImgSuccessList.length);
        }
        this.$refs.file.clearFiles();
      },
      delUploadImg (index) {
        this.uploadImgSuccessList.splice(index, 1);
      }
    },
    created () {
      this.headers.token = JSON.parse(localStorage.getItem('userInfo')).token;

      this.uploadFileUrl = this.ajaxUrl + '/MeiBackstage/uploadImg';
    }
  };
</script>
