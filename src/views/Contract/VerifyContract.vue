<template>
  <div class="container-fluid mt--7"  >
    <div class="text-center mb-3">
      <div class="verifyTile">Verify & Publish Contract Source Code</div>
      <p style="width: 60%;margin-left: 20%">
        Source code verification provides transparency for users interacting with smart contracts.
        By uploading the source code, OneGate Explorer will match the compiled code with that on the blockchain.
        Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.
      </p>
    </div>
    <hr>
    <div class="mb-4" v-if="this.isLoading">
      <loading
               :is-full-page="false"
               :opacity="0.9"
               :active="isLoading"
               style="margin-left: 45%"
      ></loading>
    </div>
    <el-form v-else ref="form" :model="form" :rules="rules" label-width="200px" style="width: 60%;margin-left:20%;">

      <el-form-item label="Contract hash" prop="hash" >
        <el-input v-model="form.hash" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="Compiler version" prop="version">
        <el-select v-model="form.version" placeholder="please select your compiler version" style="width: 400px">
          <el-option label ="3.0.0" value="3.0.0"></el-option>
          <el-option label ="3.0.2" value="3.0.2"></el-option>
          <el-option label ="3.0.3" value="3.0.3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Source code" required="true">
        <el-upload
            ref="upload"
            class="upload-demo"
            action="http://127.0.0.1:8080/upload"
            :before-upload="onBeforeUpload"
            :auto-upload="false"
            :file-list="fileList"
            :accept="accept"
            :on-change="change"
            :on-remove="remove"
            :headers="headers"

        >

          <template #trigger>
            <el-button size="small" type="primary">select file</el-button>
          </template>
          <el-button
              style="margin-left: 10px"
              size="small"
              type="primary"
              @click="uploadFilesAndParams"
              :disabled="form.hash===''||form.version===''||fileList.length<=1"
          >Upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              Please upload all files in cs, csproj format in your project.
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>

      </el-form-item>

    </el-form>

  </div>

</template>
<script lang="ts">
import "element-plus/lib/theme-chalk/index.css"
import axios from "axios";
import {ElMessage} from 'element-plus'
import Loading from "vue-loading-overlay"
export default {
  components:{
    Loading,
  },
  data(){
    return {
      isLoading:false,
      uploadData:{
        Contract:"0xcd10d9f697230b04d9ebb8594a1ffe18fa95d9ad",
        Version:"3.0.3"
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      fileList:[],
      accept:".cs,.csproj",
      form:{
        hash:'',
        version:'',
      },
      rules:{
        hash:[{required:true,message:"Please input contract hash",trigger:"blur"}],
        version:[{required:true,message:"Please select compiler version",trigger:"blur"}],
      },
      isContractPattern: /^((0x)?)([0-9a-f]{40})$/,

    }
  },

  methods: {
    uploadFilesAndParams() {
      this.isLoading= true;
      console.log(this.fileList)
      let formData = new FormData();
      this.fileList.forEach((item) => {
        formData.append("file", item.raw);
      });
      formData.append('Contract', this.form.hash);
      if (!this.isContractPattern.test(this.form.hash)) {
        ElMessage({
          showClose:true,
          duration:0,
          type:"error",
          message:"Contract hash format error, please check you contract hash! "
        })
        this.isLoading=false
        return
      }

      formData.append('Version', this.form.version);
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',

        }
      }
      axios.post("http://127.0.0.1:8080/upload",formData,config).then((res) => {
        console.log(res)
        if (res.data.Code === 2) {
          ElMessage({
            showClose:true,
            duration:0,
            type:"error",
            message:"Compilation failed! Your .cs and .csproj files are not complete, please check and upload again! "
          })
          this.isLoading=false;

        } else if (res.data.Code ===0 || res.data.Code === 1 || res.data.Code ===3){
          ElMessage({
            showClose:true,
            duration:0,
            type:"error",
            message:"Server error, please try again later!"
          })
          this.isLoading=false;
        } else if (res.data.Code === 4) {
          ElMessage({
            showClose:true,
            duration:0,
            type:"error",
            message:"Failed in querying contract info on blockChain!"
          })
          this.isLoading=false;
        } else if (res.data.Code=== 5 ) {
          ElMessage({
            showClose:true,
            duration:0,
            type:"success",
            message:"Contract verification success!"
          })
          this.isLoading=false;

        } else if (res.data.Code===6) {
          ElMessage({
            showClose:true,
            duration:0,
            message:"This contract has already been verified, please refresh this page!"
          })
          this.isLoading=false;
        } else if (res.data.Code===7) {
          ElMessage({
            showClose:true,
            duration:0,
            type:"error",
            message:"Please select correct compiler version and try again!"
          })
          this.isLoading=false;
        } else {
          ElMessage({
            showClose:true,
            duration:0,
            type:"error",
            message:"Your contract source code doesn't match that on blockcahin!"
          })
          this.isLoading=false;

        }
      })

      },


    change(file){
      this.fileList.push(file)
    },

    remove(file){
      this.fileList.forEach((item, index) => {
        if (item.name == file.name) {
          this.fileList.splice(index, 1);
        }
      });

    },
    onBeforeUpload(file){
      console.log(file.type)
    },
    onSubmit(){
      console.log(this.form.version)
      console.log(this.form.hash)
    }

  },
}
</script>
<style>
.verifyTile{
  font-family: Inter;
  font-style: normal;
  font-weight: bold !important;
  font-size: 30px!important;
  line-height: 58px;
  text-align: center;
  /* identical to box height */
  color: black;
}
</style>
