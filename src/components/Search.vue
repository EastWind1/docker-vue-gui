<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { searchImages } from '../api/node-api';
import { DockerSearchedImage } from '../pojo/types';
import { ElNotification } from 'element-plus';

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
    ElNotification({ duration: 5000, type: 'error', title: '请输入镜像关键词', showClose: true });
  }
  images.value = await searchImages(keyWord.value);
}

async function runImage(name: string) {
  console.log(name);
}
</script>

<template>
  <div>
    <el-input v-model="keyWord" placeholder="请输入镜像关键词" @keyup.enter="search" />
    <el-table :data="images" highlight-current-row style="width: 100%" :max-height="bound.height - 50">
      <el-table-column type="index" width="50" />
      <el-table-column property="Name" label="Name" />
      <el-table-column property="Description" label="Description" />
      <el-table-column property="StarCount" label="Stars" />
      <el-table-column property="IsOfficial" label="Official" />
      <el-table-column property="IsAutomated" label="Automated" />
      <el-table-column label="Operation">
        <template #default="scope">
          <el-link type="primary" @click="runImage(scope.row.Name)">Run</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>