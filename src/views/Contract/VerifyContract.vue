=<template>
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
            By uploading the source code, Jiuquan Explorer will match the compiled code with that on the blockchain.
            Please make sure your source code and compiler version is exactly the same as the one when you generate the .nef file and deploy it to the chain. If your contract has been updated, please upload the source code in the latest version. If your contract code has been preprocessed, please upload the processed source code.
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
                <el-option label ="Neo.Compiler.CSharp 3.1.0" value="Neo.Compiler.CSharp 3.1.0"></el-option>
                <el-option label ="Neo3-boa (python)" value="neo3-boa"></el-option>
                <el-option label ="Neow3j (java)" value="neow3j"></el-option>
                <el-option label ="Neo-go (go)" value="neo-go"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  v-if="this.form.version !== 'neo3-boa'&&this.form.version !== 'neow3j' &&this.form.version !== 'neo-go'" label="Compile Command" prop="command">
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
                    :disabled="form.hash===''||form.version===''||fileList.length<1"
                >Upload</el-button>

              </el-upload>
            </el-form-item>
            <div class="mb-3">
              <div v-if="this.form.version==='neow3j'" class="el-upload__tip">
                Please upload your source contract file with <span style="color: red">.java </span>extension and the <span style="color: red">build.gradle </span> file in your project.
                <div class="mt-1">The className property of neow3jCompiler in the build.gradle file should be be consistent with your contract's fully qualified name which is indicated in the first line in your java file.</div>

              </div>
              <div v-else-if="this.form.version==='neo3-boa'" class="el-upload__tip">
                Please upload your source contract file with <span style="color: red">.py </span>extension in your project.

              </div>
              <div v-else-if="this.form.version==='neo-go'" class="el-upload__tip">
                Please upload your source contract file with <span style="color: red">.go </span>extension in your project.

              </div>
              <div v-else-if="this.form.version==='Neo.Compiler.CSharp 3.0.0' || this.form.version==='Neo.Compiler.CSharp 3.0.2' || this.form.version==='Neo.Compiler.CSharp 3.0.3'||this.form.version==='Neo.Compiler.CSharp 3.1.0'" class="el-upload__tip">
                Please upload your source contract file with <span style="color: red">.cs </span> and <span style="color: red">.csproj </span> extension in your project.

              </div>
            </div>





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
      accept:".cs,.csproj,.py,.java,.gradle,.go",
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
      if (this.form.command!== "") {
        formData.append('CompileCommand',this.form.command)
      }
      if (this.form.version=== "neow3j"){
        formData.append('JavaPackage', "io.examples.HelloWorld");
      }
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data',

        }
      }
      let node = ""

      if(`${location.hostname}`=== "explorer.onegate.space"){
        if (this.form.version==="Neo.Compiler.CSharp 3.0.0" || this.form.version==="Neo.Compiler.CSharp 3.0.2" || this.form.version==="Neo.Compiler.CSharp 3.0.3") {
          node = "https://neofura.ngd.network/upload"
        } else {
          node = "https://neofura.ngd.network:3027/upload"
        }

      }else if(`${location.hostname}`=== "testnet.explorer.onegate.space") {
        if (this.form.version==="Neo.Compiler.CSharp 3.0.0" || this.form.version==="Neo.Compiler.CSharp 3.0.2" || this.form.version==="Neo.Compiler.CSharp 3.0.3") {
          node = "https://testneofura.ngd.network:444/upload"
        } else {
          node = "https://testneofura.ngd.network:3026/upload"
        }
      }
      // node = "https://neofura.ngd.network:3027/upload"
      axios.post(node,formData,config).then((res) => {
        console.log(res)
        if (res.data.Code === 2) {
          if (this.form.version === "Neo.Compiler.CSharp 3.0.0" ||this.form.version === "Neo.Compiler.CSharp 3.0.2"||this.form.version === "Neo.Compiler.CSharp 3.0.3" || this.form.version === "Neo.Compiler.CSharp 3.1.0") {
            ElMessage({
              showClose:true,
              duration:0,
              type:"error",
              message:"Compilation failed! We can not generate a .nef file based on the files you uploaded, please check if you have uploaded all files with .cs and .csproj extension in your project."
            })
          } else if (this.form.version === "neo3-boa"){
            ElMessage({
              showClose:true,
              duration:0,
              type:"error",
              message:"Compilation failed! We can not generate a .nef file based on the files you uploaded, please check if you have uploaded all files with .py extension in your project."
            })
          } else if (this.form.version === "neow3j"){
            ElMessage({
              showClose:true,
              duration:0,
              type:"error",
              message:"Compilation failed! We can not generate a .nef file based on the files you uploaded, please check if you have uploaded all files with .java and .gradle extension in your project."
            })
          } else {
            ElMessage({
              showClose:true,
              duration:0,
              type:"error",
              message:"Compilation failed! We can not generate a .nef file based on the files you uploaded, please check if you have uploaded all files with .go extension in your project."
            })
          }

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
            message:"Contract verification succeeded!"
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
            message:" Verification failed! Your contract source code doesn't match that on the blockchain! please check if you have changed your source code since the deployment !"
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
