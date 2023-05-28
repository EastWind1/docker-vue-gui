<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { listContainers, stopContainer, openContainerBash,removeContainer, runImage, startContainer } from '../api/node-api';
import { DockerContainer } from '../pojo/types';
import { ElNotification } from 'element-plus';
import { showConfirmDialog } from '../utils/dialog';

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
async function startContainerAndRefresh(id: string) {
  const res = await startContainer(id);
  if (res) {
    ElNotification({ duration: 2000, type: 'success', title: 'Container start successful' });
  } else {
    ElNotification({ duration: 2000, type: 'error', title: 'Container start failed' });
  }
  await initGrid();

}
async function stopContainerAndRefresh(id: string) {
  const res = await stopContainer(id);
  if (res) {
    ElNotification({ duration: 2000, type: 'success', title: 'Container stop successful' });
  } else {
    ElNotification({ duration: 2000, type: 'error', title: 'Container stop failed' });
  }
  await initGrid();

}
async function removeContainerAndRefresh(id: string) {
  const confirmRes = await showConfirmDialog("Confirm delete ?");
  if (!confirmRes) {
    return;
  }
  const res = await removeContainer(id);
  if (res) {
    ElNotification({ duration: 2000, type: 'success', title: 'Container delete successful' });
  } else {
    ElNotification({ duration: 2000, type: 'error', title: 'Container delete failed' });
  }
  await initGrid();

}
</script>

<template>
  <div>
    <el-table :data="images" highlight-current-row style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column property="ID" label="ID" />
      <el-table-column property="Image" label="Name" />
      <el-table-column property="State" label="State" />
      <el-table-column property="Command" label="Command" />
      <el-table-column property="Status" label="Status" />
      <el-table-column property="Ports" label="Ports" />
      <el-table-column property="Names" label="Names" />
      <el-table-column label="Operation">
        <template #default="scope">
          <el-link type="primary" @click="startContainerAndRefresh(scope.row.ID)">Start</el-link>
          <br />
          <el-link type="primary" @click="openContainerBash(scope.row.ID)">Bash</el-link>
          <br />
          <el-link type="primary" @click="stopContainerAndRefresh(scope.row.ID)">Stop</el-link>
          <br />
          <el-link type="primary" @click="removeContainerAndRefresh(scope.row.ID)">Remove</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>