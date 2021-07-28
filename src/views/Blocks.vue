<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <blocks-table title="Block List"></blocks-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import BlocksTable from "./Tables/BlocksTable";
    export default {
        name: "Blocks",
        components: {
            BlocksTable,
        },
    };
</script>
<style></style>
