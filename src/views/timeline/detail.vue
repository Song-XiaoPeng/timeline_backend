<template>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="Enter your title"></Input>
        </FormItem>
        <FormItem label="内容" prop="content">
            <Input v-model="formValidate.content" placeholder="Enter your content"></Input>
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

        <FormItem label="City" prop="city">
            <Select v-model="formValidate.city" placeholder="Select your city">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem label="Date">
            <Row>
                <Col span="11">
                    <FormItem prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                    <FormItem prop="time">
                        <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
                    </FormItem>
                </Col>
            </Row>
        </FormItem>
        <!-- <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem> -->
        <!-- <FormItem label="Desc" prop="desc">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem> -->
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
                    // title: [
                    //     { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                    // ],
                    // mail: [
                    //     { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                    //     { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    // ],
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
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
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
                    },
                    error:function(res){

                    }
                })
            }
        },
        created() {
            // console.log(this.$router.query) //返回undefined;注意，此处应该使用$route（路由信息对象：当前激活的路由的状态信息），而this.$router表示vue-router实例而不是当前的路由
            this.id = this.$route.query.id
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
