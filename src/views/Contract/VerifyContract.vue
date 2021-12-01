<template>
  <div class="container-fluid mt--7" style="background-color: #f7f8fa">
    <div class="row">
      <div class="col">
        <loading
            :is-full-page="true"
            :opacity="0.9"
            :active="isLoading"
        ></loading>
        <div class="text-center mb-3">
          <div class="verifyTile">Verify & Publish Contract Source Code</div>
          <p style="width: 60%;margin-left: 20%">
            Source code verification provides transparency for users interacting with smart contracts.
            By uploading the source code, OneGate Explorer will match the compiled code with that on the blockchain.
            Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do.
          </p>
        </div>
        <hr>
        <div  style="margin-left: 20%;width: 60%;display: flex">
          <el-form  ref="form" :model="form" :rules="rules" label-width="auto"  style="margin: auto">

            <el-form-item label="Contract hash" prop="hash" >
              <el-input class="contractInput" v-model="form.hash" style="width: 400px"></el-input>
            </el-form-item>
            <el-form-item label="Compiler version" prop="version">
              <el-select  class="contractInput" v-model="form.version" placeholder="please select your compiler version" style="width: 400px">
                <el-option label ="Neo.Compiler.CSharp 3.0.0" value="Neo.Compiler.CSharp 3.0.0"></el-option>
                <el-option label ="Neo.Compiler.CSharp 3.0.2" value="Neo.Compiler.CSharp 3.0.2"></el-option>
                <el-option label ="Neo.Compiler.CSharp 3.0.3" value="Neo.Compiler.CSharp 3.0.3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Compile Command" prop="command">
              <el-select  class="contractInput" v-model="form.command" placeholder="please select your compile command" style="width: 400px">
              <el-option label ="nccs" value="nccs"></el-option>
              <el-option label ="dotnet build (nccs --debug --no-optimize)" value="nccs --no-optimize"></el-option>
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
                  <el-button type="primary" size="medium">Select file</el-button>
                </template>
                <el-button
                    style="margin-left: 10px"
                    size="medium"
                    type="primary"
                    @click="uploadFilesAndParams"
                    :disabled="form.hash===''||form.version===''||fileList.length<=1"
                >Upload</el-button>
                <template #tip>
                  <div class="el-upload__tip">
                    Please upload all files in <span style="font-weight: bold;color: red">cs</span>, <span style="font-weight: bold;color: red">csproj</span> format in your project.
                  </div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item>

            </el-form-item>

          </el-form>
        </div>
      </div>
    </div>



  </div>

</template>
<script lang="ts">
import axios from "axios";
import {ElMessage} from 'element-plus'
import Loading from "vue-loading-overlay"
export default {
  components:{
    Loading,
  },
  created() {
    window.scroll(0, 0);
  },
  data(){
    return {
      isLoading:false,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      fileList:[],
      accept:".cs,.csproj",
      form:{
        hash:this.$route.params.contractHash,
        version:'',
        command:''
      },
      rules:{
        hash:[{required:true,message:"Please input contract hash",trigger:"blur"}],
        version:[{required:true,message:"Please select compiler version",trigger:"blur"}],
        command:[{required:true,message:"Please select compile command",trigger:"blur"}],

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
      formData.append('CompileCommand',this.form.command)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',

        }
      }
      let node = ""
      if(`${location.hostname}`=== "explorer.onegate.space"){
        node = "https://neofura.ngd.network/upload"
      }else if(`${location.hostname}`=== "testnet.explorer.onegate.space") {
       node = "https://testneofura.ngd.network:444/upload"
      }
      // node = "https://testneofura.ngd.network:444/upload"
      axios.post(node,formData,config).then((res) => {
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
            message:"Server error, please try it later!"
          })
          this.isLoading=false;
          console.log(res.data.Code)
        } else if (res.data.Code === 4) {
          ElMessage({
            showClose:true,
            duration:0,
            type:"error",
            message:"Failed in querying contract info on blockChain! "+res.data.Msg
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
          this.$router.push({
            path: `/contractinfo/${this.form.hash}`,
          });

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
            message:res.data.Msg
          })
          this.isLoading=false;
        } else {
          ElMessage({
            showClose:true,
            duration:0,
            type:"error",
            message:" Verification failed! Your contract source code doesn't match that on blockchain! please check if you have updated this contract,and upload the latest version!"
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
@media screen and (max-width: 992px ){
  .contractInput{
    width: 100px!important;
  }
}
</style>
