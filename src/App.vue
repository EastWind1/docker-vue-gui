<template>
  <el-row class="full">
    <el-col :span="3">
      <el-menu
        default-active="/"
        class="el-menu-vertical-demo"
        :router="true">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/containers">Containers</el-menu-item>
        <el-menu-item index="/images">Image</el-menu-item>
        <el-menu-item index="/search">Search</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>

</script>
<style scoped>
.full {
  width: 100%;
  height: 100%;
}
</style>