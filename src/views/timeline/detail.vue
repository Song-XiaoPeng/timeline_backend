<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width:800px">
        <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
        </FormItem>
        <FormItem label="内容" prop="content">
            <Input v-model="formValidate.content" type="textarea" :rows="4" placeholder="Enter your content"></Input>
        </FormItem>
        <FormItem label="摘要" prop="desc">
            <Input v-model="formValidate.desc" placeholder="Enter your desc"></Input>
        </FormItem>
        <FormItem label="心情" prop="mood">
            <Input v-model="formValidate.mood" placeholder="Enter your mood"></Input>
        </FormItem>
        <FormItem label="昵称" prop="author">
            <Input v-model="formValidate.author" placeholder="Enter your author"></Input>
        </FormItem>
        <FormItem label="地点" prop="address">
            <Input v-model="formValidate.address" placeholder="Enter your address"></Input>
        </FormItem>
        <FormItem label="天气" prop="weather">
            <Input v-model="formValidate.weather" placeholder="Enter your weather"></Input>
        </FormItem>    
        <FormItem label="Date">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" @on-change="dateHandle" placeholder="Select date" v-model="datetime.date"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" @on-change="timeHandle" placeholder="Select time" v-model="datetime.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
          <FormItem label="是否可见" prop="status">
            <RadioGroup v-model="formValidate.status">
                <Radio label="0">
                    <Icon type="social-android"></Icon>
                    <span>yes</span>
                </Radio>
                <Radio label="1">
                    <Icon type="social-windows"></Icon>
                    <span>no</span>
                </Radio>
            </RadioGroup>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
    import ajax from 'api'
    export default {
        data () {
            return {
                datetime: {
                    date: '',
                    time: ''
                },
                id:'',
                formValidate: {
                    address:'',
                    author:'',
                    ip:'',
                    mood:'',
                    status:'',
                    time:'',
                    uid:'',
                    title: '',
                    content:'',
                    mail: '',
                    date: '',
                    time: '',
                    desc: '',
                },
                ruleValidate: {
                    title: [
                        { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: 'content cannot be empty', trigger: 'blur' },
                    ],
                    status: [
                        { required: true, message: 'status cannot be empty', trigger: 'blur' },
                    ],
                    // city: [
                    //     { required: true, message: 'Please select the city', trigger: 'change' }
                    // ],
                    // date: [
                    //     { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    // ],
                    // time: [
                    //     { required: true, type: 'date', message: 'Please select time', trigger: 'change' }
                    // ],
                    // desc: [
                    //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                    //     { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    // ]
                }
            }
        },
        methods: {
            dateHandle(date){
                this.formValidate.date = date
            },
            timeHandle(time){
                this.formValidate.time = time
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.setTimeLine()
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getTimelineDetail(id){
                var that = this
                ajax.getTimelineDetail({
                    data:{
                        id: id
                    },
                    success:function(res){
                        that.formValidate = res
                        that.datetime.date = res.date
                        that.formValidate.status = String(that.formValidate.status)
                        that.datetime.time = res.time
                    },
                    error:function(res){
                        that.$Message.error(res);
                    }
                })
            },
            setTimeLine(){
                var that = this
                console.log(that.postData)
                
                ajax.setTimeLine({
                    data:that.postData,
                    success:function(res){
                        that.$Message.success('success');
                    },
                    error:function(res){
                        that.$Message.error(res);
                    }
                })
            }
        },
        computed:{
            postData(){
                let data = this.formValidate
                data.date = Date.parse(data.date) / 1000
                return data
            }
        },
        created() {
            // console.log(this.$router.query) //返回undefined;注意，此处应该使用$route（路由信息对象：当前激活的路由的状态信息），而this.$router表示vue-router实例而不是当前的路由
            this.id = this.$route.query.id
            this.formValidate.id = this.$route.query.id
            if(this.id > 0){
                this.getTimelineDetail(this.id)
            }
        },
        watch:{
        },
        mounted(){
        }
    }
</script>
