<template>
  <div class="">
    <Table border stripe :columns="columns" :data="timelineList"></Table>
    <Page show-total show-elevator :total="totalPage" :page-size=Number(pageSize) @on-change="pageChange" :current="currentPage" style="margin-top:20px"></Page>
    <!-- <sone>click me</sone> -->
    <Modal
        v-model="confirmDel"
        title=""
        @on-ok="deleteArticle"
        @on-cancel="confirmDel = false">
        <p style="color:red;font-size:14px">确定要删除？</p>
    </Modal>
  </div>
</template>
<script>
    import ajax from '../../api/index'
    import bus from 'api/bus'

    export default {
        data () {
            return {
                totalPage:0,
                currentPage:1,
                pageSize: 6,
                loading:true,
                timelineList:[],
                columns:[],
                confirmDel: false
            }
        },
        components:{
          'sone':{
            functional:true,
            render:function(h,params){
              return h('div',[
                h('Button',{
                  props:{
                    type:'primary',
                    size:'large'
                  },
                  on:{
                    click:function(){
                    }
                  }
                },'click')
              ])
            }
          }
        },
        methods: {
          deleteArticle(){
            var that = this
            ajax.delTimeLine({
              data:{
                id: that.delId
              },
              success:function(res){
                that.$Message.success('success')
              },
              error:function(res){
                that.$Message.error('error')
              }
            })
          },
          pageChange(page){
            this.currentPage = page
            this.getTimelineList()
          },
          getTimelineDetail(id){
            let that = this
            ajax.getTimelineDetail({
              data:{
                id: id
              },
              success:function(res){

              },
              error:function(res){

              }
            })
          },
          getTimelineList(){
            let that = this
            ajax.getTimelineList({
              data:{
                page: that.currentPage,
                page_size: that.pageSize
              },
              success: function(res) {
                that.timelineList = res.data
                that.totalPage = res.total
                that.pageSize = res.per_page
                that.currentPage = res.current_page
                that.columns = [
                  {
                    title: '标题',
                    key: 'title',
                    align: 'center'
                  },
                  {
                    title: '内容',
                    key: 'content',
                    align: 'center',
                    ellipsis: true
                  },
                  {
                    title: '时间',
                    align: 'center',
                    key: 'date'
                  },
                  {
                    title: '状态',
                    align: 'center',
                    key: 'status',
                    render: (h,obj) => {
                      var label,styleObj
                      if(obj.row.status === 0){
                        label = obj.row.status === 0 ? "已启用" : "未启用"
                        styleObj = {
                          color:'green',
                          "font-family": "Helvetica Neue"
                        }
                      }else{
                        label = obj.row.status === 0 ? "已启用" : "未启用"
                        styleObj = {
                          color:'red',
                          "font-family": "Helvetica Neue"
                        }
                      }
                      return h('span',{
                        style: styleObj
                      },label)
                    },
                    filters: [
                      {
                        label: '已启用',
                        value: 0
                      },
                      {
                        label: '已禁用',
                        value: 1
                      }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                      if(value === 1){
                        return row.status === value
                      }else{
                        return row.status === value
                      }
                    }
                  },
                  {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h,params) => {
                      var index = params.index
                      var ele
                      if(that.timelineList[index].status === 0){
                        ele = h('Button',{
                          props: {
                            type: 'error',
                            size: 'default'
                          },
                          on:{
                            click(){
                              that.delId = that.timelineList[index].id
                              that.deleteArticle
                            }
                          }
                        },'禁用')
                      }else{
                        ele = h('Button',{
                          props: {
                            type: 'error',
                            size: 'default'
                          },
                          on:{
                            click(){
                              that.delId = that.timelineList[index].id
                              that.deleteArticle
                            }
                          }
                        },'启用')
                      }
                      return h('div',[
                        h('Button',{
                          props: {
                            type: 'primary',
                            size: 'default'
                          },
                          style: {
                            marginRight: '5px'
                          },
                          on: {
                            click: () => {
                              // that.$router.push({ name: 'setTimeline', params: { id: 1 }}) //带params /index/:id
                              bus.$emit('activityNameChange','/index/setTimeline')
                              that.$router.push({ name: 'setTimeline', query: { id: that.timelineList[index].id }}) //带查询参数 /index?id=1
                              // that.$route.path
                              // that.getTimelineDetail(that.timelineList[index].id)
                            }
                          }
                        },'详情') ,ele                      
                      ])
                    }
                  }
                ]
              },
              error:function(res){
                console.log(res)
              }
            })
          }
        },
        created: function(){
          this.getTimelineList()
        }
    }
</script>
