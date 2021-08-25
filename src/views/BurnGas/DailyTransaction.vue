<template>
    <div class="map">
        <div id="main" style="width: 100%; height: 400px; background: white">
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted } from "vue";
import axios from "axios";
export default {

  created() {
    this.setup()
  },

  methods: {
    setup() {
      //methods
      const echartInit = () =>{
        var myTransactionChart = echarts.init(document.getElementById('main'));

        var xdata =[]

        var sdata =[0,0,0,0,0,0,0,0,0,0,0]

        var ndata=[]

        for(var i = 0; i <7; i ++) {
          ndata.push(i)
        }
        console.log(ndata)

        getDailyTransactions(7)

        console.log(sdata)

        for (var k = -13; k <= 0 ; k ++) {
          xdata.push(getDay(k))
        }
        function getDay(day){
          var today = new Date();
          var todayMilliseconds = today.getTime() + 1000 * 60 * 60 *24 * day;
          today.setTime(todayMilliseconds);
          var tMonth = today.toDateString().split(" ")[1]
          var tDate = today.toDateString().split(" ")[2]
          tMonth = doHandleMonth(tMonth);
          tDate = doHandleMonth(tDate);
          return tMonth+"-" +tDate;
        }

        function doHandleMonth(month){
          var m = month;
          if(month.toString().length ==1) {
            m = "0" +month
          }
          return m;
        }
        function refreshData(Data){
            var option =myTransactionChart.getOption()
            option.series[0].data = Data
            myTransactionChart.setOption(option)
        }


        function getDailyTransactions(day){
          axios({
            method: "post",
            url: "/api",
            data: {
              params: {days:day},
              jsonrpc: "2.0",
              id: 1,
              method: "GetDailyTransactions",
            },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if(day === 7) {
              for (var j = 0; j < res["data"]["result"].length; j ++) {
                sdata.push(res["data"]["result"][j]["DailyTransactions"])
              }
              console.log(sdata)
              refreshData(sdata)
            }
            else {
              console.log("nouse")
            }
          });
        }

        // 指定图表的配置项和数据
        var option = {
          color:['#c20a0a','#ffcc66'],
          title: [{
            left: 'center',
            text: 'Daily Transaction',
            top:'2%',
          }],
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Recent 14 days', 'Recent 30 days'],
            selected:{'Recent 30 days':false,'Recent 14 days':true},
            top:5,
            right:5,
            orient: 'vertical',
          },
          xAxis: {
            type: 'category',
            data: xdata,
            splitLine: {
              show: false
            },
            axisTick:{
              show:false
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: false
            }
          },
          series: [{
            name: 'Recent 14 days',
            type: 'line',
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            smooth: true,
          },
            {
              name: 'Recent 30 days',
              type: 'line',
              data: ndata,
              smooth: true
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myTransactionChart.setOption(option);
        myTransactionChart.on('legendselectchanged', function (params){
          console.log(params)
          let legend = params.name;
          let selected = params.selected;
          if (selected !== undefined) {
            if(legend ==="Recent 14 days") {
              console.log(legend)
              if(selected["Recent 14 days"]===true && selected["Recent 30 days"]===true) {
                console.log("winner")
                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: true,
                      ["Recent 30 days"]: false
                    }}
                })
              }
              if(selected["Recent 14 days"]===false && selected["Recent 30 days"]===false){
                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: false,
                      ["Recent 30 days"]: true
                    }}
                })
              }
            }else {
              console.log(legend)
              console.log(selected["Recent 30 days"])
              console.log(selected["Recent 14 days"])
              if(selected["Recent 30 days"]==false && selected["Recent 14 days"]==false) {

                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: false,
                      ["Recent 14 days"] :true
                    }}
                })
                console.log("we change it")
              }
              if(selected["Recent 30 days"]==true && selected["Recent 14 days"]==true) {
                console.log("we change it")
                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: true ,
                      ["Recent 14 days"] :false
                    }}
                })

              }
            }
          }
        });
      }
      //onMounted
      onMounted(()=>{
        echartInit()
      })
      //return
      return {
        echartInit
      };
    },
  },



}


</script>

<style>

</style>
