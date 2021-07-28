<template>
  <div>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="card-body pt-0 pt-md-4">
              <div class="text-center">
                <hr class="my-4" />
                <p>
                  Murphy — writes, performs and records all of his own music.
                </p>
                <a href="#">Show more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <accounts-table title="Accounts"></accounts-table>
      </div>
    </div>
  </div>
</template>
<script>
import AccountsTable from "./Tables/AccountsTable";
export default {
  name: "accounts-list",
  components: {
    AccountsTable,
  },
  data() {
    return {
      model: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
        about: "",
      },
    };
  },
};
</script>
<style></style>
