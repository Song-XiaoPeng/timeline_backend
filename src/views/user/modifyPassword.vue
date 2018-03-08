<template>
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" style="width:800px">
        <FormItem label="原密码" prop="password">
            <Input v-model="formValidate.password" type="password" placeholder="Enter your password"></Input>
        </FormItem>
        <FormItem label="新密码" prop="new_password">
            <Input v-model="formValidate.new_password" type="password" placeholder="Enter your new_password"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="re_password">
            <Input v-model="formValidate.re_password" type="password" placeholder="Enter your re_password"></Input>
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
  data() {
      const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please enter your password'));
            } else {
            if (this.formValidate.new_password !== '') {
                // 对第二个密码框单独验证
                this.$refs.formValidate.validateField('re_password');
            }
                callback();
            }
        }
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('Please enter your new_password again'));
            } else if (value !== this.formValidate.new_password) {
            callback(new Error('The two input passwords do not match!'));
            } else {
            callback();
            }
        }
      return {        
          formValidate : {
              password: '',
              new_password: '',
              re_password: ''
          },
          ruleValidate: {
                    password: [
                        { required: true, message: 'The new_password cannot be empty', trigger: 'blur' }
                    ],
                    new_password: [
            { validator: validatePass, required: true, trigger: 'blur' }
          ],
          re_password: [
            { validator: validatePassCheck, required: true, trigger: 'blur' }
          ]
                }
      }
  },
  methods: {
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.resetPassword()
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
      },
      resetPassword() {
          var that = this
          ajax.resetPassword({
              data: that.formValidate,
              success(res) {
                  that.$Message.success('success')
              },
              error(res) {
                that.$Message.error(res);
              }
          })
      }
  }
}
</script>
