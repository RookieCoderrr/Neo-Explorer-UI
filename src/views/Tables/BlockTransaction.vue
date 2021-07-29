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
                    <th>Transaction ID</th>
                    <th>Block Height</th>
                    <th>Size</th>
                    <th>Time</th>
                    <th>GAS Consumed</th>
                    <th></th>
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
                    <td class="budget">
                        {{ row.item.blockIndex }}
                    </td>
                    <td class="budget">
                        {{ row.item.size }} bytes
                    </td>
                    <td class="budget">
                        {{ this.convertTime(row.item.blocktime) }}
                    </td>

                    <td class="budget">
                        {{ this.convertGas(row.item.netfee + row.item.sysfee) }}
                    </td>
                </template>
            </base-table>
        </div>

        <div
                class="card-footer d-flex justify-content-end"
                :class="type === 'dark' ? 'bg-transparent' : ''"
        >
            <div style="margin-right: 10px; width: 250px" class="row">
                <div class="text">Page &nbsp;</div>
                <base-input
                        type="number"
                        :style="text(pagination)"
                        :placeholder="pagination"
                        v-on:changeinput="pageChangeByInput($event)"
                ></base-input>
                <div class="text">
                    &nbsp; of &nbsp;{{
                    parseInt(totalCount / resultsPerPage) + 1
                    }}
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
    methods: {
        convertGas(gas) {
            if (gas === 0) {
                return 0;
            }
            return (gas * Math.pow(0.1, 8)).toFixed(6);
        },

        convertTime(time) {
            return format(time);
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
            if (pageNumber >= parseInt(this.totalCount / this.resultsPerPage) + 1) {
                this.pagination = parseInt(this.totalCount / this.resultsPerPage) + 1;
                const skip =
                    parseInt(this.totalCount / this.resultsPerPage) * this.resultsPerPage;
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
                console.log(this.totalCount)
                this.isLoading = false;
            });
        },
    },
}
</script>

<style scoped>

</style>
