<template>
    <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
        <div
                class="card-header border-0"
                :class="type === 'dark' ? 'bg-transparent' : ''"
        >
            <div class="row align-items-center">
                <div class="col">
                    <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
                        {{ title }}
                    </h3>
                </div>
            </div>
        </div>

        <div class="table-responsive">
            <loading
                    :is-full-page="false"
                    :opacity="0.9"
                    :active="isLoading"
            ></loading>
            <base-table
                    class="table align-items-center table-flush"
                    :class="type === 'dark' ? 'table-dark' : ''"
                    :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
                    tbody-classes="list"
                    :data="tableData"
            >
                <template v-slot:columns>
                    <th>{{$t('blockinfo.txTable.txID')}}</th>
                    <th>{{$t('blockinfo.txTable.height')}}</th>
                    <th>{{$t('blockinfo.txTable.size')}}</th>
                    <th>{{$t('blockinfo.txTable.time')}}</th>
                    <th>{{$t('blockinfo.txTable.gas')}}</th>
                </template>

                <template v-slot:default="row">
                    <td>
                        <div class="txid" @οnmοuseοver="mouseHover(row.item.hash)">
                            <a
                                    class="name mb-0 text-sm"
                                    style="cursor: pointer"
                                    @click="getTransaction(row.item.hash)"
                            >{{ row.item.hash }}</a
                            >
                        </div>
                    </td>
                    <td >
                        {{ row.item.blockIndex }}
                    </td>
                    <td>
                        {{ row.item.size }} bytes
                    </td>
                    <td >
                        {{ convertTime(row.item.blocktime) }}
                    </td>

                    <td >
                        {{ convertGas(row.item.netfee + row.item.sysfee) }}
                    </td>
                </template>
            </base-table>
        </div>

        <div v-if="totalCount > 10 "
                class="card-footer d-flex justify-content-end"
                :class="type === 'dark' ? 'bg-transparent' : ''"

        >
            <div style="margin-right: 10px; width: 250px" class="row" >
                <div class="text">Page &nbsp;</div>
                <base-input
                        type="number"
                        :style="text(pagination)"
                        :placeholder="pagination"
                        v-on:changeinput="pageChangeByInput($event)"
                ></base-input>
                <div class="text">
                    &nbsp; of &nbsp;{{ countPage }}
                </div>
            </div>
            <base-pagination
                    :total="totalCount"
                    :value="pagination"
                    v-on:input="pageChange($event)"
            ></base-pagination>
        </div>
    </div>
</template>

<script>
import {format} from "timeago.js";
import axios from "axios";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
    name: "block-transaction",
    props: {
        type: {
            type: String,
        },
        title: String,
        blockHash: String,
    },
    components: {
        Loading,
    },
    data() {
        return {
            tableData: [],
            totalCount: 0,
            resultsPerPage: 10,
            pagination: 1,
            placeHolder: 0,
            isLoading: true,
            countPage:0,
        };
    },
    created() {
        this.getTransactionList(0);
    },
    computed: {
        text() {
            return function (value) {
                let inputLength = value.toString().length * 10 + 50;
                return (
                    "width: " +
                    inputLength +
                    "px!important;text-align: center;height:80%;margin-top:5%;"
                );
            };
        },
    },
    watch:{
        blockHash: 'watchBlockHash'
    },
    methods: {
        watchBlockHash(){
            this.getTransactionList(0);
        },

        convertGas(gas) {
            if (gas === 0) {
                return 0;
            }
            return (gas * Math.pow(0.1, 8)).toFixed(6);
        },
        convertTime(ts) {
          const lang = this.$i18n.locale;
          switch (lang) {
            case "cn":
              return format(ts, "zh_CN");
            default:
              return format(ts);
          }
        },
        getTransaction(txhash) {
            this.$router.push({
                path: `/transactionInfo/${txhash}`,
            });
        },
        pageChange(pageNumber) {
            this.isLoading = true;
            this.pagination = pageNumber;
            const skip = (pageNumber - 1) * this.resultsPerPage;
            this.getTransactionList(skip);
        },
        pageChangeByInput(pageNumber) {
            if (pageNumber >= this.countPage) {
                this.pagination = this.countPage;
                const skip =
                   ( this.countPage - 1 ) * this.resultsPerPage;
                this.getTransactionList(skip);
            } else if (pageNumber <= 0) {
                this.pagination = 1;
                const skip = this.resultsPerPage;
                this.getTransactionList(skip);
            } else {
                this.pagination = pageNumber;
                const skip = (pageNumber - 1) * this.resultsPerPage;
                this.getTransactionList(skip);
            }
        },

        getTransactionList(skip) {
            axios({
                method: "post",
                url: "/api",
                data: {
                    jsonrpc: "2.0",
                    id: 1,
                    params: { BlockHash: this.blockHash, Limit: this.resultsPerPage, Skip: skip },
                    method: "GetRawTransactionByBlockHash",
                },
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: " true",
                    crossDomain: "true",
                },
            }).then((res) => {
                this.tableData = res["data"]["result"]["result"];
                this.totalCount = res["data"]["result"]["totalCount"];
                this.countPage = (this.totalCount ===0) ?  1  : (Math.ceil(this.totalCount / this.resultsPerPage))
                this.isLoading = false;
            });
        },
    },
}
</script>

<style scoped>

</style>
