<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { searchImages, runImage } from '../api/node-api';
import { DockerSearchedImage } from '../pojo/types';
import { ElLoading, ElNotification } from 'element-plus';

const images: Ref<DockerSearchedImage[]> = ref([]);
const keyWord = ref("");
const bound = ref({ width: 0, height: 0 });
onMounted(() => {
  bound.value.height = document.documentElement.clientHeight;
  bound.value.width = document.documentElement.clientWidth;
  window.addEventListener('resize', () => {
    bound.value.height = document.documentElement.clientHeight;
    bound.value.width = document.documentElement.clientWidth;
    console.log(bound.value.height, bound.value.width);
  });
});

/**
 * 搜索
 */
async function search() {
  if (!keyWord.value) {
    ElNotification({ duration: 5000, type: 'error', title: 'Please Enter keyword', showClose: true });
  }
  const loading = ElLoading.service();
  try {
    images.value = await searchImages(keyWord.value);
  } catch (e) {
    throw e;
  } finally {
    loading.close();
  }
}

async function runSelectImage(name: string) {
  const res = await runImage(name);
  if (res) {
    ElNotification({ duration: 2000, type: 'success', title: 'Image start successful' });
  } else {
    ElNotification({ duration: 2000, type: 'error', title: 'Image start failed' });
  }
}
</script>

<template>
  <div>
    <el-input v-model="keyWord" placeholder="Please Enter keyword" @keyup.enter="search" />
    <el-table :data="images" highlight-current-row style="width: 100%" :max-height="bound.height - 50">
      <el-table-column type="index" width="50" />
      <el-table-column property="Name" label="Name" />
      <el-table-column property="Description" label="Description" />
      <el-table-column property="StarCount" label="Stars" />
      <el-table-column property="IsOfficial" label="Official" />
      <el-table-column property="IsAutomated" label="Automated" />
      <el-table-column label="Operation">
        <template #default="scope">
          <el-link type="primary" @click="runSelectImage(scope.row.Name)">Run</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>