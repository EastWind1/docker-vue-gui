<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import {listImages,runImage } from '../api/node-api';
import {DockerImage} from '../pojo/types';

const images: Ref<DockerImage[]> = ref([]);

onMounted(() => {
  initGrid();
});
/**
 * 初始化列表
 */
async function initGrid() {
  images.value = await listImages();
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
    <el-table-column property="Repository" label="Repository"/>
    <el-table-column property="Tag" label="Tag" />
    <el-table-column property="ID" label="Image ID" />
    <el-table-column property="CreatedAt" label="Created" />
    <el-table-column property="Size" label="Size" />
    <el-table-column label="Operation">
        <template #default="scope">
          <el-link type="primary" @click="runImage(scope.row.ID)">Run</el-link>
        </template>
      </el-table-column>
  </el-table>
  </div>
</template>

<style scoped></style>