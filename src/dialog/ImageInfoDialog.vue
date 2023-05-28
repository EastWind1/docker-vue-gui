<template>
    <div>
        <el-dialog v-model="show" title="Info" width="auto" @closed="onClosed">
            <el-descriptions title="Image Info" border>
                <el-descriptions-item label="RepoTags">{{ data.RepoTags }}</el-descriptions-item>
                <el-descriptions-item label="Env">{{ data.Config.Env }}</el-descriptions-item>
                <el-descriptions-item label="WorkingDir">{{ data.Config.WorkingDir }}</el-descriptions-item>
                <el-descriptions-item label="ExposedPorts">{{ data.Config.ExposedPorts }}</el-descriptions-item>
                <el-descriptions-item label="Os">{{ data.Os }}</el-descriptions-item>
                <el-descriptions-item label="Architecture">{{ data.Architecture }}</el-descriptions-item>
                <el-descriptions-item label="Size">{{ data.Size}}</el-descriptions-item>
                
            </el-descriptions>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import {ref } from 'vue';
import { ImageInfo } from '../pojo/types';
import { ElDialog,ElDescriptions,ElDescriptionsItem } from 'element-plus';
const props = defineProps<{
    data: ImageInfo
    closeCallback?: () => void
}>();
const show = ref(true);

function onClosed() {
    if (props.closeCallback) {
        props.closeCallback();
    }
}

</script>

<style scoped></style>