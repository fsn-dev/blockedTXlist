<template>
  <div class="container">
    <div class="download">
      <a :href="$$.config.csvUrl" download="trace-results.csv" target="_blank">点击下载CSV</a>
    </div>
    <el-table
      size="mini"
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        label="clolumns"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column label="txhash">
        <template slot-scope="scope">
           <a :href="'https://blocks.fusionnetwork.io/#!/transaction/' + scope.row.txhash" target="_blank" class="color_blue">{{$$.cutOut(scope.row.txhash,10,6)}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="blockheight">
        <template slot-scope="scope">
           <a :href="'https://blocks.fusionnetwork.io/#!/block/' + scope.row.blockheight" target="_blank" class="color_blue">{{scope.row.blockheight}}</a>
        </template>
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
        align="center"
        label="value">
        <template slot-scope="scope">
           {{$$.thousandBit(scope.row.value, 0)}}
        </template>
      </el-table-column>
      <el-table-column
        property="sendtype"
        label="sendtype">
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.container{max-width: 1200px;margin: auto;padding: 0 15px;}
.download{text-align: right;padding: 15px 0;}
.download a{font-size: 14px!important;color: blue;}
.el-table--mini td, .el-table--mini th,.el-table td, .el-table th{padding: 0!important;text-align: center!important;}

</style>

<script>
const web3 = require('@/assets/js/web3')
const d3 = require('d3-dsv')
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
      // this.axios.get('https://fsn.dev/trace/trace-results.csv')
      // this.axios.get('http://localhost:8900/data/test.txt')
      this.axios.get(this.$$.config.csvUrl)
      .then((response) => {
        // console.log(response)
        this.tableData = []
        let _tableData = d3.csvParse(response.data)
        // console.log(_tableData)
        for (let arr1 of _tableData) {
          let _obj = {}, arr = [], i = 0
          for (let obj in arr1) {
            arr[i] = arr1[obj]
            i++
          }
          this.tableData.push({
            txhash: arr[0].replace(/\s/g, ''),
            blockheight: arr[1].replace(/\s/g, ''),
            from: arr[2].replace(/\s/g, ''),
            to: arr[3].replace(/\s/g, ''),
            value: web3.fromWei(arr[4], 'ether'),
            sendtype: arr[5],
          })
        }
        // this.ConvertToTable(d3.csvParse(response.data), (table) => {
        //   this.tableData = table
        // })
      })
      .catch((error) => {
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