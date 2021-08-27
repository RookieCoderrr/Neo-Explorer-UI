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

        var xdata14 =[]

        var xdata30 =[]

        var sdata14 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0]

        var sdata30=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


        getDailyTransactions(14)

        getDailyTransactions(30)



        for (var k = -13; k <= 0 ; k ++) {
          xdata14.push(getDay(k))
        }
        for (var n = - 29; n <=0; n ++) {
          xdata30.push(getDay(n))
        }
        function getDay(day){
          var today = new Date();
          var todayMilliseconds = today.getTime() + 1000 * 60 * 60 *24 * day;
          today.setTime(todayMilliseconds);
          var tMonth = today.toDateString().split(" ")[1]
          var tDate = today.toDateString().split(" ")[2]
          tMonth = doHandleMonth(tMonth);
          tDate = doHandleMonth(tDate);
          return tMonth+" " +tDate;
        }

        function doHandleMonth(month){
          var m = month;
          if(month.toString().length ==1) {
            m = "0" +month
          }
          return m;
        }
        function refreshData(Data,index){
            var option =myTransactionChart.getOption()
            option.series[index].data = Data
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
            if(day === 14) {
              for (var j = 0; j < res["data"]["result"].length; j ++) {
                sdata14[13-j]= res["data"]["result"][j]["DailyTransactions"]
              }
              refreshData(sdata14,0)
              //console.log("this is 14 days ")
              //console.log(sdata14)
            }
            else {
              for (var m = 0; m < res["data"]["result"].length; m ++) {
                sdata30[29-m] = res["data"]["result"][m]["DailyTransactions"]
              }
              refreshData(sdata30,1)
              // console.log("this is 30 days")
              // console.log(sdata30)
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
            data: xdata14,
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
            data: sdata14,
            smooth: true,
          },
            {
              name: 'Recent 30 days',
              type: 'line',
              data: sdata30,
              smooth: true
            }
          ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myTransactionChart.setOption(option);
        window.addEventListener("resize", function () {

          myTransactionChart.resize()
        });
        myTransactionChart.on('legendselectchanged', function (params){

          let legend = params.name;
          let selected = params.selected;
          if (selected !== undefined) {
            if(legend ==="Recent 14 days") {

              if(selected["Recent 14 days"]===true && selected["Recent 30 days"]===true) {
                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: true,
                      ["Recent 30 days"]: false
                    }},
                  xAxis:{
                    data:xdata14
                  },

                })
              }
              if(selected["Recent 14 days"]===false && selected["Recent 30 days"]===false){
                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: false,
                      ["Recent 30 days"]: true
                    }},
                  xAxis:{
                    data:xdata30
                  },
                })
              }
            }else {

              if(selected["Recent 30 days"]==false && selected["Recent 14 days"]==false) {

                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: false,
                      ["Recent 14 days"] :true
                    }},
                  xAxis:{
                    data:xdata14
                  },
                })
              }
              if(selected["Recent 30 days"]==true && selected["Recent 14 days"]==true) {
                myTransactionChart.setOption({

                  legend:{
                    selected:{
                      [legend]: true ,
                      ["Recent 14 days"] :false
                    }},
                  xAxis:{
                    data:xdata30
                  },
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
