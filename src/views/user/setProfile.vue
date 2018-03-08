<template>
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width:800px">
        <FormItem label="头像" prop="avator">
            <img :src="avator" alt="" class="demo-upload-list">
            <Upload
                ref="upload"
                name="image"
                :headers="header"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                type="drag"
                :action="uploadImgUrl"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>  
            </Upload>
        </FormItem>
        <FormItem label="昵称" prop="nickname">
            <Input v-model="formValidate.nickname"  placeholder="Enter your nickname"></Input>
        </FormItem>
        <FormItem label="电话" prop="phone_no">
            <Input v-model="formValidate.phone_no" placeholder="Enter your phone_no"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="Enter your email"></Input>
        </FormItem>
        <FormItem label="个人介绍" prop="desc">
            <Input v-model="formValidate.desc" placeholder="Enter your desc"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input v-model="formValidate.password" type="password" placeholder="Enter your password"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
import ajax from 'api'
import Cookie from 'js-cookie'
import util from '@src/libs/util'

export default {
    data() {
        return {
            formValidate : {
                nickname: '',
                phone_no: '',
                email: '',
                avator: '',
                desc: '',
                password:''
            },
            header: {
                'access-token': JSON.parse(localStorage.getItem('userInfo')) === null ? null : JSON.parse(localStorage.getItem('userInfo')).access_token
            },
            avator: '',
            ruleValidate: {
                // nickname: [
                //     { required: false, message: 'The nickname cannot be empty', trigger: 'blur' }
                // ],
                // avator: [
                //     { required: false, message: 'The avator cannot be empty', trigger: 'blur' }
                // ],
                // password: [
                //     { required: false, message: 'The password cannot be empty', trigger: 'blur' }
                // ]
            },
            avatorLists: [],
            profile: '',
            uploadImgUrl: util.uploadImgUrl
        }
    },
    components: {
    },
    methods: {
        handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.setProfile()
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
        handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // const fileList = this.$refs.upload.fileList;
                // this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                if(res.code === 0){
                    file.url = res.data.img_url
                    file.name = res.data.name
                    console.log(res)
                    this.avator = res.data.img_url
                    this.formValidate.avator = res.data.media_id
                    this.$Message.success('上传成功')
                } else {
                    this.$Message.error(res.msg)
                }
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                // const check = this.uploadList.length < 5;
                // if (!check) {
                //     this.$Notice.warning({
                //         title: 'Up to five pictures can be uploaded.'
                //     });
                // }
                // return check;
            },        
        getAvatorLists() {
            var that = this
            ajax.getAvatorLists({
                data:{
                    id: Cookie.get('uid')
                },
                success(res) {
                    this.avatorLists = res
                },
                error(res) {

                }
            })
        },
        getProfile() {
            var that = this
            ajax.getProfile({
                data:{},
                success(res) {
                    that.profile = res
                    that.formValidate.nickname = res.nickname
                    that.formValidate.phone_no = res.phone_no
                    that.formValidate.email = res.email
                    that.formValidate.avator = res.avator
                    that.formValidate.desc = res.desc
                    that.avator = res.img
                },
                error(res) {

                }
            })
        },
        setProfile() {
            var that = this
            console.log(that.formValidate)
            ajax.setProfile({
                data: that.formValidate,
                success(res) {
                    that.$Message.success('success')
                },
                error(res) {
                    that.$Message.error(res)
                }
            })
        }
    },
    created() {        
        this.getProfile()
    }
}
</script>
<style scoped>
.demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

