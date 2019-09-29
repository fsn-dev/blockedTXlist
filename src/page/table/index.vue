<template>
  <div class="container">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        label="clolumns"
        width="100">
      </el-table-column>
      <el-table-column label="txhash">
        <template slot-scope="scope">
           <a :href="'https://blocks.fusionnetwork.io/#!/transaction/' + scope.row.txhash" target="_blank" class="color_blue">{{$$.cutOut(scope.row.txhash,10,6)}}</a>
        </template>
      </el-table-column>
      <el-table-column
        property="blockheight"
        label="blockheight">
      </el-table-column>
      <el-table-column label="from">
        <template slot-scope="scope">
           <a :href="'https://blocks.fusionnetwork.io/#!/address/' + scope.row.from" target="_blank" class="color_blue">{{$$.cutOut(scope.row.from,10,6)}}</a>
        </template>
      </el-table-column>
      <el-table-column label="to">
        <template slot-scope="scope">
           <a :href="'https://blocks.fusionnetwork.io/#!/address/' + scope.row.to" target="_blank" class="color_blue">{{$$.cutOut(scope.row.to,10,6)}}</a>
        </template>
      </el-table-column>
      <el-table-column
        property="value"
        label="value">
      </el-table-column>
      <el-table-column
        property="sendtype"
        label="sendtype">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.container{max-width: 1200px;margin: auto;}
</style>

<script>
const web3 = require('@/assets/js/web3')
export default {
  name: 'TableList',
  data () {
    return {
      tableData: []
    }
  },
  // sockets: {
  //   readCsv (res) {
  //     console.log(res)
  //     this.tableData = res
  //   },
  //   readCsvGroup (res) {
  //     this.tableData = res
  //   }
  // },
  mounted () {
    // this.$socket.emit('readCsv')
    // this.$socket.emit('joinDataList', 'readCsvGroup')
    this.getData()
    setInterval(() => {
      this.getData()
    }, 5000)
  },
  methods: {
    getData () {
      this.axios.get('https://fsn.dev/trace/trace-results.txt')
      .then(function (response) {
        console.log(response)
        this.ConvertToTable(response.data, (table) => {
          this.tableData = table
        })
      })
      .catch(function (error) {
        console.log(error)
      })
    },
    ConvertToTable (data, callBack) {
      data = data.toString();
      var table = new Array();
      var rows = new Array();
      rows = data.split("\r\n");
      for (var i = 0; i < rows.length; i++) {
        let arr = rows[i].split(",")
        table.push({
          txhash: arr[0],
          blockheight: arr[1],
          from: arr[2],
          to: arr[3],
          value: web3.fromWei(arr[4], 'ether'),
          sendtype: arr[5],
        })
      }
      callBack(table)
    }
  }
}
</script>