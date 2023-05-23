<template>
    <div>
        <div>当前docker状态: {{ dockerState ? '运行中' : '未运行' }}</div>
        <button v-if="!dockerState">启动Colima</button>
        <el-descriptions title="Docker Info" border>
            <el-descriptions-item label="Client Version">{{dockerInfo?.ClientInfo.Version}}</el-descriptions-item>
            <el-descriptions-item label="Client Context">{{dockerInfo?.ClientInfo.Context}}</el-descriptions-item>
            <el-descriptions-item label="Server Version">{{dockerInfo?.ServerVersion}}</el-descriptions-item>
            <el-descriptions-item label="Container Count">{{dockerInfo?.Containers}}</el-descriptions-item>
            <el-descriptions-item label="Running Container Count">{{dockerInfo?.ContainersRunning}}</el-descriptions-item>
            <el-descriptions-item label="Image Count">{{dockerInfo?.Images}}</el-descriptions-item>
            <el-descriptions-item label="Architecturen">{{dockerInfo?.Architecture}}</el-descriptions-item>
            <el-descriptions-item label="CPUs">{{dockerInfo?.NCPU}}</el-descriptions-item>
            <el-descriptions-item label="Total Memory">{{dockerInfo?.MemTotal}}</el-descriptions-item>
            <el-descriptions-item label="Registry Mirrors">{{dockerInfo?.RegistryConfig.Mirrors}}</el-descriptions-item>
        </el-descriptions>
    </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from 'vue';
import { isDockerRunning,getDockerInfo } from '../api/node-api';
import {DockerState} from '../pojo/types';
const dockerState = ref(false);
const dockerInfo : Ref<DockerState|null>= ref(null);
onMounted(async () => {
    dockerState.value = await isDockerRunning();
    if (dockerState.value) {
        dockerInfo.value = await getDockerInfo();
        
    }
})
</script>

<style scoped></style>