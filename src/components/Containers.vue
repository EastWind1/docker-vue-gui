<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import {listContainers } from '../api/node-api';
import {DockerContainer} from '../pojo/types';

const images: Ref<DockerContainer[]> = ref([]);

onMounted(() => {
  initGrid();
});
/**
 * 初始化列表
 */
async function initGrid() {
  images.value = await listContainers();
}
</script>

<template>
  <div>
    <el-table
    :data="images"
    highlight-current-row
    style="width: 100%"
  >
    <el-table-column type="index" width="50" />
    <el-table-column property="ID" label="ID"/>
    <el-table-column property="Image" label="Name" />
    <el-table-column property="Command" label="Command" />
    <el-table-column property="Status" label="Status" />
    <el-table-column property="Ports" label="Ports" />
    <el-table-column property="Names" label="Names" />
  </el-table>
  </div>
</template>

<style scoped></style>