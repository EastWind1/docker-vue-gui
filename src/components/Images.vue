<template>
  <div>
    <el-table :data="images" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column property="Repository" label="Repository" />
      <el-table-column property="Tag" label="Tag" />
      <el-table-column property="ID" label="Image ID">
        <template #default="scope">
          <el-link type="primary" @click="getSelectImageInfo(scope.row.ID)">{{ scope.row.ID }}</el-link>
        </template>
      </el-table-column>
      <el-table-column property="CreatedAt" label="Created" />
      <el-table-column property="Size" label="Size" />
      <el-table-column label="Operation">
        <template #default="scope">
          <el-link type="primary" @click="runSelectImage(scope.row.ID)">Run</el-link>
          <br/>
          <el-link type="primary" @click="removeSelectImage(scope.row.ID)">Remove</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { getInspectInfo, listImages, removeImage, runImage } from '../api/node-api';
import { DockerImage } from '../pojo/types';
import { ElNotification } from 'element-plus';
import { showConfirmDialog, showImageInfoDialog } from '../utils/dialog';

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
async function runSelectImage(id: string) {
  const res = await runImage(id);
  if (res) {
    ElNotification({ duration: 2000, type: 'success', title: 'Image start successful' });
  } else {
    ElNotification({ duration: 2000, type: 'error', title: 'Image start failed' });
  }
}
/**
 * 删除镜像
 */
 async function removeSelectImage(id: string) {
  const confirmRes = await showConfirmDialog("Confirm delete ?");
  if (!confirmRes) {
    return;
  }
  const res = await removeImage(id);
  if (res) {
    ElNotification({ duration: 2000, type: 'success', title: 'Image remove successful' });
  } else {
    ElNotification({ duration: 2000, type: 'error', title: 'Image remove failed' });
  }
  await initGrid();
}
/**
 * 查看详情信息
 */
async function getSelectImageInfo(id:string) {
  const info = await getInspectInfo(id);
  if (!info) {
    ElNotification({ duration: 2000, type: 'error', title: 'Get image info failed' });
    return;
  }
  showImageInfoDialog(info);
}
</script>

<style scoped></style>