<template>
  <div class="container-fluid" >
    <div v-if="this.totalCount!==0">
      <loading
          :is-full-page="false"
          :opacity="0.9"
          :active="isLoading"
      ></loading>
      <div class="mb-3" v-for="(item,index) in this.sourceCodeList" :key="index" >
        <h4 style="text-align: left"><i class="el-icon-document"></i> {{item["filename"]}}</h4>
        <v-ace-editor
            v-model:value="item['code']"
            theme="chrome"
            :readonly="this.write"
            :options="this.editorOptions"
            style="height: 300px" />

      </div>
    </div>

  </div>


</template>
<script>
import { VAceEditor } from 'vue3-ace-editor';
import axios from "axios";
import Loading from "vue-loading-overlay";
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-chrome';

export default {
  components: {
   VAceEditor,
    Loading,
  },
  props: {
    contractHash: String,
    updatecounter: Number,
  },

  created() {
    this.getSourceCodeByContractHash(this.contractHash,this.updatecounter)
  },
  data: () => ({
    code:[{"filename":"CounterStorage.cs","code":"using Neo.SmartContract.Framework.Services;\n" +
          "using System;\n" +
          "using System.Numerics;\n" +
          "\n" +
          "namespace Neoverse\n" +
          "{\n" +
          "    /// <summary>\n" +
          "    /// 碎片编号小于等于500的数量，用来计算偏移量，以保证开出小碎片越来越难\n" +
          "    /// </summary>\n" +
          "    public static class CounterStorage\n" +
          "    {\n" +
          "        private static readonly StorageMap CounterMap = new(Storage.CurrentContext, 0x11);\n" +
          "\n" +
          "        private static readonly string key = \"counter\";\n" +
          "\n" +
          "        public static void Initial()\n" +
          "        {\n" +
          "            CounterMap.Put(key, 0);\n" +
          "        }\n" +
          "        public static BigInteger Get() => (BigInteger)CounterMap.Get(key);\n" +
          "\n" +
          "        public static void Increase() => CounterMap.Put(key, Get() + 1);\n" +
          "    }\n" +
          "}\n"},{"filename":"FragmentStorage.cs","code":"using Neo.SmartContract.Framework;\n" +
          "using Neo.SmartContract.Framework.Native;\n" +
          "using Neo.SmartContract.Framework.Services;\n" +
          "using System;\n" +
          "using System.Numerics;\n" +
          "\n" +
          "namespace Neoverse\n" +
          "{\n" +
          "    public static class FragmentStorage\n" +
          "    {\n" +
          "        private static readonly StorageMap LastIndexMap = new(Storage.CurrentContext, 0x12);\n" +
          "        private static readonly StorageMap RandomMap = new(Storage.CurrentContext, 0x13);\n" +
          "\n" +
          "        public const int MaxCount = 3000;\n" +
          "\n" +
          "        public static void Initial()\n" +
          "        {\n" +
          "            for (int i = 0; i <= 8; i++)\n" +
          "            {\n" +
          "                LastIndexMap.Put(i.ToString(), MaxCount);\n" +
          "            }\n" +
          "        }\n" +
          "\n" +
          "        public static BigInteger GetLastIndex(byte type)\n" +
          "        {\n" +
          "            if (type < 0 || type > 8) throw new Exception(\"Neoverse::LastIndexStorage: Unkown type\");\n" +
          "            return (BigInteger)LastIndexMap.Get(type.ToString());\n" +
          "        }\n" +
          "\n" +
          "        private static void ReduceLastIndex(byte type)\n" +
          "        {\n" +
          "            BigInteger oldIndexNumber = GetLastIndex(type);\n" +
          "            if (oldIndexNumber <= 0) throw new Exception(\"Neoverse::LastIndexStorage: Sold out\");\n" +
          "            LastIndexMap.Put(type.ToString(), oldIndexNumber - 1);\n" +
          "        }\n" +
          "\n" +
          "        public static BigInteger GetFragmentNumber(this TokenState token, byte type)\n" +
          "        {\n" +
          "            if (type < 0 || type > 8) throw new Exception(\"Neoverse::GetFragmentNumber: Unknown Type\");\n" +
          "\n" +
          "            BigInteger lastIndex = GetLastIndex(type);\n" +
          "            var random = Runtime.GetRandom() % lastIndex + 1;\n" +
          "            var randomKey = GetKey(type, random);\n" +
          "            var randomValue = RandomMap.Get(randomKey);\n" +
          "\n" +
          "            if (random <= 500 && randomValue == null)\n" +
          "            {\n" +
          "                var count = CounterStorage.Get();\n" +
          "                if (count >= 100)\n" +
          "                {\n" +
          "                    var m = count / 100 * 10;\n" +
          "                    m = lastIndex - random < m ? lastIndex - random : m;\n" +
          "                    var offset = random % m;\n" +
          "                    random += offset;\n" +
          "                    randomKey = GetKey(type, random);\n" +
          "                    randomValue = RandomMap.Get(randomKey);\n" +
          "                }\n" +
          "            }\n" +
          "\n" +
          "            BigInteger result = (randomValue == null) ? random : (BigInteger)randomValue;\n" +
          "\n" +
          "            var lastIndexKey = GetKey(type, lastIndex);\n" +
          "            var lastValue = RandomMap.Get(lastIndexKey);\n" +
          "            RandomMap.Put(randomKey, lastValue == null ? GetLastIndex(type) : (BigInteger)lastValue);\n" +
          "\n" +
          "            ReduceLastIndex(type);\n" +
          "\n" +
          "            return result;\n" +
          "        }\n" +
          "\n" +
          "        private static byte[] GetKey(byte type, BigInteger random) => new byte[] { type }.Concat(random.ToByteArray());\n" +
          "    }\n" +
          "}"}],
    sourceCodeList:[],
    totalCount:0,
    write:true,
    editorOptions: {
      // 设置代码编辑器的样式
      enableBasicAutocompletion:true,
      enableSnippets: true,
      showPrintMargin: false, //去除编辑器里的竖线
    },
    isLoading:true,
  }),
  methods: {
    getSourceCodeByContractHash(contract_id,updatecounter) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: { ContractHash: contract_id,updatecounter:updatecounter},
          method: "GetSourceCodeByContractHash",
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        this.sourceCodeList= res["data"]["result"]["result"]
        console.log(this.sourceCodeList)
        this.totalCount= res["data"]["result"]["totalCount"]
        this.isLoading=false


      });
    },

  },
};
</script>

<style>

</style>

