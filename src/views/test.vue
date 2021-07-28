<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
    <div style="margin-top: 400px"></div>
        </div>
    </div>
    <p>
        <a class="btn btn-primary"
           data-toggle="collapse"
           :href="`#${name}`"
           >
            Link with href
        </a>
<!--        <button class="btn btn-primary"-->
<!--                type="button"-->
<!--                data-toggle="collapse"-->
<!--                data-target="#collapseExample"-->
<!--                aria-expanded="false"-->
<!--                aria-controls="collapseExample">-->
<!--            Button with data-target-->
<!--        </button>-->
    </p>
    <div class="collapse" :id="name1">
        <div class="card card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
        </div>
    </div>
</template>
<!--<link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet">-->
<!--<script src="/scripts/jquery.min.js"></script>-->
<!--<script src="/bootstrap/js/bootstrap.min.js"></script>-->

<script>
import "bootstrap";
export default {
        name: "test",
    data() {
        return {
                name: "Example",
                name1:"Example",
                email: "",
                password: "",
        };
    },
    methods:{
        stttrp(){
            console.log("1111")
            return "#Example"
        }
    }
    }
</script>

<style scoped>

</style>
