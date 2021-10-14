<template>
  <div style="padding-bottom: 10%!important; background: rgb(250,250,250)">
    <div class="container-fluid mt--8" style="background: rgb(250,250,250); width: 85%">
      <div class="row">
        <div class="col">
          <h1>
            上传文件
          </h1>
          <form enctype="multipart/form-data" action="localhost:9090/upload" method="post">
            <input type="file" name="uploadfile"  />
            <input type="submit" value="upload"/>
          </form>

      </div>
    </div>
  </div>
  </div>
</template>
<script>

export default {
  name: "Form",

};
</script>
<style></style>
