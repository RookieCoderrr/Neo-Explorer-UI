<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    </base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="top">
              <loading
                :is-full-page="false"
                :opacity="0.9"
                :active="isLoading"
              ></loading>
              <div class="card-header bg-transparent">
                <h1 class="mb-0">{{ this.contract_info["name"] }}</h1>
                <h4 class="text-muted">{{this.contract_info["hash"]}}</h4>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Creator</div>
                  </div>
                  <div class="col-3"><h3>Currently Unavailable</h3></div>
                  <div class="col-2">
                    <div class="text-muted">Created</div>
                  </div>
                  <div class="col-3"><h3>{{ this.contract_info["createtime"] }}</h3></div>
                </div>
                <div class="row mt-5"></div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Updates</div>
                  </div>
                  <div class="col-3"><h3>{{ this.contract_info["updatecounter"] }}</h3></div>
                  <div class="col-2">
                    <div class="text-muted">ID</div>
                  </div>
                  <div class="col-3"><h3>{{ this.contract_info["id"] }}</h3></div>
                </div>
                <div class="row mt-5"></div>
                <div class="row">
                  <div class="col-2">
                    <div class="text-muted">Compiler</div>
                  </div>
                  <div class="col-3"><h3>{{ this.contract_info["nef"]["compiler"] }}</h3></div>
                  <div class="col-2">
                    <div class="text-muted">Transactions</div>
                  </div>
                  <div class="col-3"><h3>Currently not available</h3></div>
                </div>
              </div>
              <tabs fill class="flex-column flex-md-row">
                <tab-pane icon="ni ni-money-coins" title="Recent Transactions">
                  something
                </tab-pane>
                <tab-pane icon="ni ni-single-02 mr-2" title="Top Holders">
                  something
                </tab-pane>
                <tab-pane icon="ni ni-collection" title="Contract Info">
                  something
                </tab-pane>
              </tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { format } from "timeago.js";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      contract_id: this.$route.params.hash,
      isLoading: true,
      contract_info: [],
    };
  },
  created() {
    this.getContract(this.contract_id);
  },
  methods: {
    getContract(contract_id) {
      axios({
        method: "post",
        url: "/api",
        data: {
          jsonrpc: "2.0",
          id: 1,
          params: {"Hash": contract_id},
          method: "GetContractInfoByContractHash",
        },
        headers: {
          "Content-Type": "application/json",
          withCredentials: " true",
          crossDomain: "true",
        },
      }).then((res) => {
        const raw = res["data"]["result"];
        raw["createtime"] = format(raw["createtime"]);
        raw["nef"] = JSON.parse(raw["nef"]);
        raw["manifest"] = JSON.parse(raw["manifest"]);
        console.log(raw)
        this.contract_info = raw;
        this.isLoading = false;
      });
    },
  },
};
</script>

<style></style>
