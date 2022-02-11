<template>
  <div style="padding-bottom: 10%!important; background: #f7f8fa">
    <div class="container-fluid mt--8 list" style="background: #f7f8fa; width: 85%">
      <div class="row">
        <div class="col">
          <el-tabs
              type="card"
              v-model="activeTokenName"
              @tab-click="handleLoad"
          >
            <el-tab-pane :label="$t('tokensTable.Nep17title')" name="Nep17" >
              <nep17-tokens-table v-if="this.$route.params.tab==='Nep17'"></nep17-tokens-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('tokensTable.Nep11title')" name="Nep11">
              <nep11-tokens-table v-if="this.$route.params.tab==='Nep11'"></nep11-tokens-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('tokensTable.NeoTopHolders')" name="Neo">
              <neo-top-holder
                  v-if="this.$route.params.tab==='Neo'"
                  :contractHash="'0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5'" :decimal=0></neo-top-holder>
            </el-tab-pane>
            <el-tab-pane :label="$t('tokensTable.GasTopHolders')" name="Gas">
              <gas-top-holder
                  v-if="this.$route.params.tab==='Gas'"
                  :contractHash="'0xd2a4cff31913016155e38e474a2c06d08be276cf'" :decimal=8></gas-top-holder>
            </el-tab-pane>
            <el-tab-pane :label="$t('tokensTable.BNeoTopHolders')" name="bNeo">
              <b-neo-top-holder
                  v-if="this.$route.params.tab==='bNeo'"
                  :contractHash="'0x48c40d4666f93408be1bef038b6722404d9a4c2a'" :decimal=8></b-neo-top-holder>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nep17TokensTable from "./Nep17TokensTable";
import Nep11TokensTable from "./Nep11TokensTable";
import NeoTopHolder from "./NeoTopHolder";
import GasTopHolder from "./GasTopHolder";
import bNeoTopHolder from "./bNeoTopHolder";

export default {
  name: "tokens",
  components: {
    bNeoTopHolder,
    GasTopHolder,
    NeoTopHolder,
    Nep17TokensTable,
    Nep11TokensTable
  },

  watch: {
    $route: "watchrouter",
  },
  data(){
    return{
      activeTokenName:'',
    }
  },
  mounted(){
    this.showtabs();
  },
  methods:{
    showtabs(){
      // console.log(this.$route.params.tab)
      if(this.$route.params.tab ==="Nep17"){
        this.activeTokenName ="Nep17"
      }else if (this.$route.params.tab ==="Nep11"){
        this.activeTokenName = "Nep11"
      } else if (this.$route.params.tab ==="Neo") {
        this.activeTokenName="Neo"
      } else if (this.$route.params.tab ==="Gas") {
        this.activeTokenName="Gas"
      } else {
        this.activeTokenName= "bNeo"
      }
    },
    watchrouter() {
      //如果路由有变化，执行的对应的动作


    },
    handleLoad(data){
      let name = data.props.name
      // console.log(name)
      if (name ==="Nep17"){
        this.$router.push({
          path: `/tokens/Nep17/1`,
        });


      } else if (name === "Nep11"){
        this.$router.push({
          path: `/tokens/Nep11/1`,
        });

      } else if (name === "Neo"){
        this.$router.push({
          path: `/tokens/Neo/1`,
        });

      } else if (name === "Gas"){
        this.$router.push({
          path: `/tokens/Gas/1`,
        });
      } else {
        this.$router.push({
          path: `/tokens/bNeo/1`,
        });
      }
    }
  }

};
</script>
<style></style>
