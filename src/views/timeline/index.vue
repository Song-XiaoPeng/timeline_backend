<template>
  <div class="">
    <Table height="400" border stripe :columns="columns" :data="timelineList"></Table>
    <Page show-total show-elevator :total="totalPage" :page-size="15" @on-change="pageChange" :current="currentPage"></Page>
    <!-- <sone>click me</sone> -->
  </div>
</template>
<script>
    import ajax from '../../api/index'

    export default {
        data () {
            return {
                totalPage:0,
                currentPage:1,
                pageSize: 15,
                loading:true,
                timelineList:[],
                columns:[]
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
                      alert(1)
                    }
                  }
                },'click')
              ])
            }
          }
        },
        methods: {
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
                page: that.currentPage
              },
              success:function(res){
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
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    render: (h,params) => {
                      var index = params.index
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
                              that.getTimelineDetail(that.timelineList[index].id)
                            }
                          }
                        },'详情'),
                        h('Button',{
                          props: {
                            type: 'error',
                            size: 'default'
                          },
                          on:{
                            click(){

                            }
                          }
                        },'删除')
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
