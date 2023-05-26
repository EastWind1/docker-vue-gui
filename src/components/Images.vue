<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { listImages, runImage } from '../api/node-api';
import { DockerImage } from '../pojo/types';
import { ElNotification } from 'element-plus';

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
/**
 * 启动镜像
 */
async function runSelectImage(id: string, name: string) {
  const res = await runImage(id);
  if (res) {
    ElNotification({ duration: 2000, type: 'success', title: 'Image start successful' });
  } else {
    ElNotification({ duration: 2000, type: 'error', title: 'Image start failed' });
  }
}
</script>

<template>
  <div>
    <el-table :data="images" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column property="Repository" label="Repository" />
      <el-table-column property="Tag" label="Tag" />
      <el-table-column property="ID" label="Image ID" />
      <el-table-column property="CreatedAt" label="Created" />
      <el-table-column property="Size" label="Size" />
      <el-table-column label="Operation">
        <template #default="scope">
          <el-link type="primary" @click="runSelectImage(scope.row.ID, scope.row.Repository)">Run</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>