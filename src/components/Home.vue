<template>
    <div>
        <button v-if="!state.isDockerRunning" @click="startColimaAndGetInfo">Start Colima</button>
        <el-descriptions v-if="state.isDockerRunning" title="Docker Info" border>
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
import { isDockerRunning,getDockerInfo, startColima } from '../api/node-api';
import {DockerState} from '../pojo/types';
import { useStateStore } from '../store';
import { ElLoading, ElNotification } from 'element-plus';
const state = useStateStore();
const dockerInfo : Ref<DockerState|null>= ref(null);
onMounted(async () => {
    state.isDockerRunning = await isDockerRunning();
    if (state.isDockerRunning) {
        dockerInfo.value = await getDockerInfo();
    }
})
async function startColimaAndGetInfo() {
    const loading = ElLoading.service();
    const res = await startColima();
    loading.close();
    if (res) {
        ElNotification({duration: 2000, type: 'success', title: 'Colima start successful'});
    } else {
        ElNotification({duration: 2000, type: 'error', title: 'Colima start failed'});
    }
    state.isDockerRunning = await isDockerRunning();
    if (state.isDockerRunning) {
        dockerInfo.value = await getDockerInfo();
    }
}
</script>

<style scoped></style>