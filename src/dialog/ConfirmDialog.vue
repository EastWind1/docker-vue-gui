<template>
    <div>
        <el-dialog ref="dialog" v-model="show" title="Info" width="30%" @closed="onClosed">
            <span>{{ message }}</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="show=false">Cancel</el-button>
                    <el-button type="primary" @click="res=true;show = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDialog,ElButton } from 'element-plus';
const props = defineProps<{
    message: string,
    closeCallback?: (res:boolean) => void
}>();
const show = ref(true);

const res = ref(false);


function onClosed() {
    if (props.closeCallback) {
        props.closeCallback(res.value);
    }
}

</script>

<style scoped></style>