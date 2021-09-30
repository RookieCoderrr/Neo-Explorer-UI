<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--8" style="background: rgb(250,250,250); width: 85%">
      <div class="row">
        <div class="col">
          <el-tabs
              v-model="activeTokenName"
          >
            <el-tab-pane :label="$t('tokensTable.Nep17title')" name="first">
              <nep17-tokens-table ></nep17-tokens-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('tokensTable.Nep11title')" name="second">
              <nep11-tokens-table></nep11-tokens-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('tokensTable.NeoTopHolders')" name="third">
              <token-holder :contractHash="'0xef4073a0f2b305a38ec4050e4d3d28bc40ea63f5'" :decimal=0></token-holder>
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
import TokenHolder from "./TokenHolder";

export default {
  name: "tokens",
  components: {
    TokenHolder,
    Nep17TokensTable,
    Nep11TokensTable
  },
  data(){
    return{
      activeTokenName:'first',
    }
  },


};
</script>
<style></style>
