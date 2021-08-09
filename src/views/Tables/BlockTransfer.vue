<template>
    <div v-if="this.totalCount != 0" class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
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
                    :data="NEP17TxList"
            >
                <template v-slot:columns>
                    <th>{{$t('tokenTx.type')}}</th>
                    <th>{{$t('tokenTx.from')}}<button class="btn btn-sm btn-primary"  @click="changeFromFormat()">{{this.fromButton}}</button></th>
                    <th></th>
                    <th>{{$t('tokenTx.to')}} <button class="btn btn-sm btn-primary"  @click="changeToFormat()">{{this.toButton}}</button></th>
                    <th>{{$t('tokenTx.amount')}}</th>
                    <th>{{$t('tokenTx.time')}}</th>
                </template>

                <template v-slot:default="row">
                    <td class="Type">
                        <div >
                            <span class="text-primary" v-if="row.item.from === null && row.item.value === '50000000'" type="primary">{{$t('blockReward')}}</span>
                            <span class="text-warning" v-else-if="row.item.from === null" type="primary">{{$t('networkFeeReward')}}</span>
                            <span class="text-danger" v-else type="primary">{{$t('feeBurn')}}</span>
                        </div>
                    </td>
                    <td class="From">
                        <div>
                            <div class="text-muted" v-if="row.item.from === null"> {{$t('nullAddress')}} </div>
                            <div v-else-if="fromState" class="addr">
                                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.from)">{{ scriptHashToAddress(row.item.from) }}</a>
                            </div>
                            <div v-else class="addr">
                                <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.from)">{{ row.item.from }}</a>
                            </div>
                        </div>
                    </td>
                    <td>
                        <h1 style="color: #42b983;">&#8594;</h1>
                    </td>
                    <td class="To">
                        <div>
                                <div class="text-muted" v-if="row.item.to === null"> {{$t('nullAddress')}} </div>
                                <div v-else-if="toState" class="addr">
                                    <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.to)">{{ scriptHashToAddress(row.item.to) }}</a>
                                </div>
                                <div v-else class="addr">
                                    <a class="name mb-0 text-sm" style="cursor: pointer" @click="getAddress(row.item.to)">{{ row.item.to }}</a>
                                </div>
                        </div>
                    </td>
                    <td class="Value">
                        {{ convertToken(row.item.value, 8) }}
                    </td>
                    <td class="time">
                        {{ convertTime(row.item.timestamp) }}
                    </td>
                </template>
            </base-table>
        </div>

        <div v-if="this.totalCount > 10"
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
                    &nbsp; of &nbsp;{{countPage}}
                </div>
            </div>
            <base-pagination
                    :total="this.totalCount"
                    :value="pagination"
                    v-on:input="pageChange($event)"
            ></base-pagination>
        </div>
    </div>
    <card shadow v-else class="text-center ">{{$t('tokenTx.nullPrompt')}}</card>
</template>
<script>
    import axios from "axios";
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';
    import { format } from "timeago.js";
    import Neon from "@cityofzion/neon-js";

    export default {
        name: "block-transfer",
        props: {
            type: {
                type: String,
            },
            blockHash: String,
            decimal: Number,
        },
        components: {
            Loading
        },
        data() {
            return {
                NEP17TxList: [],
                totalCount: 0,
                resultsPerPage: 10,
                pagination: 1,
                isLoading: true,
                countPage: 1,
                fromState: true,
                toState: true,
                fromButton: "Hash",
                toButton: "Hash",
            };
        },
        created() {
            this.getTransferList(0);
        },
        computed: {
            text() {
                return function (value) {
                    let inputLength = value.toString().length * 10 + 30;
                    return (
                        "width: " +
                        inputLength +
                        "px!important;text-align: center;height:80%;margin-top:5%;"
                    );
                };
            },
        },
        watch:{
            blockHash:'watchblock'
        },
        methods: {
            watchblock() {//如果路由有变化，执行的对应的动作
                    this.getTransferList(0);
            },
            pageChangeByInput(pageNumber) {
                if (pageNumber >= this.countPage) {
                    this.isLoading = true;
                    this.pagination = this.countPage;
                    const skip = (this.countPage - 1) * this.resultsPerPage;
                    this.getTransferList(skip);
                } else if(pageNumber <= 0){
                    this.isLoading = true;
                    this.pagination = 1;
                    const skip = this.resultsPerPage;
                    this.getTransferList(skip);
                } else {
                    this.isLoading = true;
                    this.pagination = pageNumber;
                    const skip = (pageNumber - 1) * this.resultsPerPage;
                    this.getTransferList(skip);
                }
            },
            pageChange(pageNumber) {
                this.isLoading = true;
                this.pagination = pageNumber;
                const skip = (pageNumber - 1) * this.resultsPerPage;
                this.getTransferList(skip);
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
            scriptHashToAddress(hash) {
                hash = hash.substring(2);
                const acc = Neon.create.account(hash);
                return acc.address;
            },
            changeFromFormat() {
                if (this.fromState === true) {
                    this.fromState = false;
                    this.fromButton = "WIF";
                } else {
                    this.fromState = true;
                    this.fromButton = "Hash";
                }
            },
            changeToFormat() {
                if (this.toState === true) {
                    this.toState = false;
                    this.toButton = "WIF";
                } else {
                    this.toState = true;
                    this.toButton = "Hash";
                }
            },
            getTransferList(skip) {
                axios({
                    method: "post",
                    url: "/api",
                    data: {
                        jsonrpc: "2.0",
                        id: 1,
                        params: {"BlockHash": this.blockHash, Limit: this.resultsPerPage, Skip: skip, },
                        method: "GetTransferByBlockHash",
                    },
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: " true",
                        crossDomain: "true",
                    },
                }).then((res) => {
                    this.NEP17TxList = res["data"]["result"]["result"];
                    this.totalCount = res["data"]["result"]["totalCount"];
                    this.countPage = (this.totalCount ===0) ?  1  : (Math.ceil(this.totalCount / this.resultsPerPage))
                    this.isLoading = false;
                });
            },
            getAddress(accountAddress) {
                this.$router.push({
                    path: `/accountprofile/${accountAddress}`,
                });
            },
            getTransaction(txhash) {
                this.$router.push({
                    path: `/transactionInfo/${txhash}`,
                });
            },
            convertToken(val, decimal) {
                return parseFloat((val * Math.pow(10, -decimal)).toFixed(8));
            },
        },
    };
</script>
<style>
    .txid {
        width: 200px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .addr {
        width: 200px !important;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
