<template>
  <div class="order">
    <breadcrumb :list="['订单管理','订单列表']"></breadcrumb>
    <el-card>
      <el-input class="input" placeholder="请输入内容"  v-model="getDataParams.query" clearable @clear='searchClearClick'>
        <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
      </el-input>
      <order-table :tableData="list"
        @editClick='editClickR'
        @addrClick='addrClickR'
        @postClick='postClick'
      ></order-table>
      <el-pagination :total="total" 
        @size-change="handleSizeChange" 
        @current-change="handleCurrentChange" 
        layout="total, sizes, prev, pager, next, jumper"
        :current-page="getDataParams.pagenum" 
        :page-size="getDataParams.pagesize" :page-sizes='[1,2,5,10]'>
      </el-pagination>
    </el-card>
    <dialog-form ref="editForm"
      @dialogRenewEmit='getData(1)'
      :formList="editForm"
      :inputList="editInput"
      :metaText="200"
      titleData="修改订单信息"
      :userNet="editOrder"
    > 
    </dialog-form>
    <dialog-form ref="addrForm"
      @dialogRenewEmit='getData(1)'
      :formList="addrForm"
      :inputList="addrInput"
      titleData="修改地址信息"
    >
    </dialog-form>
    <kuaidi-dialog ref="kuaidi" :pathData="kuaidi"></kuaidi-dialog>
  </div>
</template>

<script>
import cities from '@/common/citydata.js'
import kuaidi from '@/common/kuaidiTest.js'
import {
  getOrder,
  searchOrder,
  editOrder,
} from '@/network/order.js'
import breadcrumb from '../../../components/content/breadcrumb/breadcrumb.vue'
import OrderTable from './child/orderTable.vue'
import DialogForm from '../../../components/content/dialogForm/dialogForm.vue'
import KuaidiDialog from './child/kuaidiDialog.vue'
export default {
  components: { breadcrumb, OrderTable, DialogForm, KuaidiDialog },
  name:'Order',
  data(){
    return{
      //快递
      kuaidi:kuaidi,
      //addr
      addrForm:{
        city:[],
        address:''
      },
      addrInput:[
        {
          prop:'city',lable:'市县/区',icon:'el-icon-building',type:'cascader',
          options:cities,
          rule:[ 
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },
        {
          prop:'address',lable:'详细地址',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入', trigger: 'blur' },
          ]
        },
      ],
      //edit
      editForm:{},
      editInput:[
        {
          prop:'order_price',lable:'订单价格',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },
        {
          prop:'order_number',lable:'订单编号',icon:'el-icon-files',
          rule:[ 
            { required: true, message: '请输入', trigger: 'blur' },
          ]
        },
        {
          prop:'order_pay',lable:'支付方式',type:'select',
          options:[
            {value:'0',label:'未支付'},
            {value:'1',label:'支付宝'},
            {value:'2',label:'微信'},
            {value:'3',label:'银行卡'}
          ],
          rule:[ 
            { required: true, message: '请选择', trigger: 'blur' },
          ]
        },
        {
          prop:'is_send',lable:'是否发货',type:'select',
          options:[
            {value:'是',label:'是'},
            {value:'否',label:'否'},
          ],
          rule:[ 
            { required: true, message: '请选择', trigger: 'blur' },
          ]
        },
        {
          prop:'pay_status',lable:'是否付款',type:'select',
          options:[
            {value:'1',label:'是'},
            {value:'0',label:'否'},
          ],
          rule:[ 
            { required: true, message: '请选择', trigger: 'blur' },
          ]
        }
      ],
      editOrder:editOrder,
      //get
      getDataParams: {
        query:'',
        pagesize:10,
        pagenum:1,
      },
      total:0,
      list:[]
    }
  },
  created(){
    this.getData()
  },
  methods:{
    postClick(data){
      this.$refs.kuaidi.dialogVisible = true
    },
    addrClickR(data){
      this.$refs.addrForm.dialogFormVisible = true
    },
    async editClickR(data){
      let {data:res} = await searchOrder(data.order_id)
      if(res.meta.status !== 200){
        this.$message.error(res.meta.msg)
      }else{
        this.$message.success(res.meta.msg)
        this.editForm = {
          order_id:res.data.order_id,
          order_pay:res.data.order_pay,
          order_price:res.data.order_price,
          order_number:res.data.order_number,
          pay_status:res.data.pay_status,
          is_send:res.data.is_send
        }
        console.log(res.data);
        this.$refs.editForm.dialogFormVisible = true
      }
    },
    searchClick(){
      this.getDataParams.pagenum = 1
      this.getData()
    },
    searchClearClick(){
      this.getDataParams.pagenum = 1
      this.getData()
    },
    handleSizeChange(val){
      this.getDataParams.pagesize = val
      this.getData()
    },
    handleCurrentChange(val){
      this.getDataParams.pagenum = val
      this.getData()
    },
    async getData(pagenum){
      if(pagenum){
        this.getDataParams.pagenum=pagenum
      }
      let {data: res} = await getOrder(this.getDataParams)
      if(res.meta.status !== 200){
        this.$message.error(res.meta.msg)
      }else{
        this.$message.success(res.meta.msg)
        this.total = res.data.total
        this.list = res.data.goods
        console.log(res.data);
      }
    }
  }
}
</script>

<style scoped>
.input{
  margin-bottom: 20px;
}
</style>