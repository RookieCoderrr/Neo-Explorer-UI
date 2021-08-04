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
                <div class="col text-right">
                    <base-button type="primary" size="sm" @click="toBlocksTable()">See all</base-button>
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
                    :data="blockList"

            >
                <template v-slot:columns>
                    <th>Hash</th>
                    <th>index</th>
                    <th>TimeStamp</th>
                    <th>Txs</th>
                    <th>Size</th>
                </template>

                <template v-slot:default="row" style="text-align: center;">
                    <td >
                        <div class="blockid">
                            <a
                                    class="name mb-0 text-sm"
                                    style="cursor: pointer"
                                    @click="getBlock(row.item.hash)"
                            >{{ row.item.hash }}</a
                            >
                        </div>
                    </td>
                    <th scope="row">
                        {{row.item.index }}
                    </th>

                    <td >
                        {{ convertTime(row.item.timestamp) }}
                    </td>
                    <td >
                        {{ row.item.transactioncount }}
                    </td>
                    <td >
                        {{ row.item.size }}
                    </td>
                </template>
            </base-table>
        </div>

    </div>
</template>
<script>
    import axios from "axios";
    import Loading from "vue-loading-overlay";
    import "vue-loading-overlay/dist/vue-loading.css";
    import {format} from "timeago.js";

    export default {
        name: "blocks-table-homepage",
        props: {
            type: {
                type: String,
            },
            title: String,
        },
        components: {
            Loading,
        },
        data() {
            return {
                blockList: [],
                totalCount: 0,
                resultsPerPage: 10,
                pagination: 1,
                isLoading: true,
                placeHolder: 0,
            };
        },
        created() {
            this.getBlockList(0);
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
        methods: {
            convertTime(time) {
              return format(time);
            },
            toBlocksTable(){
                this.$router.push({
                    path: `/blocks`,
                });
            },
            getBlock(hash) {
                this.$router.push(`/blockinfo/${hash}`);
            },
            getBlockList(skip) {
                axios({
                    method: "post",
                    url: "/api",
                    data: {
                        jsonrpc: "2.0",
                        id: 1,
                        params: { Limit: this.resultsPerPage, Skip: skip },
                        method: "GetBlockInfoList",
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                }).then((res) => {
                    this.blockList = res["data"]["result"]["result"];
                    this.totalCount = res["data"]["result"]["totalCount"];
                    this.isLoading = false;
                });
            },
        },
    };
</script>
<style>
    .blockid {
      width: 150px !important;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    /*.class123 /deep/ .a input::-webkit-outer-spin-button,*/
    /*.class123 /deep/ .a input::-webkit-inner-spin-button {*/
    /*    -webkit-appearance: none;*/
    /*}*/
    /*.class123 /deep/ .a input[type="number"] {*/
    /*    -moz-appearance: textfield;*/
    /*}*/
    /*input::-webkit-inner-spin-button {*/
    /*    -webkit-appearance: none !important;*/
    /*    margin: 0;*/
    /*    -moz-appearance: textfield;*/
    /*}*/

    /*.text {*/
    /*    display: inline-block;*/
    /*    height: 100%;*/
    /*    line-height: 2.5;*/
    /*    vertical-align: middle;*/
    /*    font-size: 5;*/
    /*}*/
</style>
