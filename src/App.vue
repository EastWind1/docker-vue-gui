<template>
  <el-row class="full">
    <el-col :span="3">
      <el-menu default-active="/" class="el-menu-vertical-demo" :router="true">
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/containers">Containers</el-menu-item>
        <el-menu-item index="/images">Image</el-menu-item>
        <el-menu-item index="/search">Search</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="21">
      <router-view></router-view>
    </el-col>
  </el-row>
  <div class="log">
    <el-text size="small">show log</el-text><el-switch size="small" v-model="showCmdLog"/>
    <textarea ref="textarea" v-if="showCmdLog" rows="10" disabled class="full" :value="cmdLog"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { Ref, onMounted, ref } from 'vue';
import { useStateStore } from './store';
import { useRouter } from 'vue-router';
const state = useStateStore();
const cmdLog = ref("");
const showCmdLog = ref(false);
const textarea: Ref<HTMLTextAreaElement|null> = ref(null);
onMounted(() => {
  state.cmdOutput.subscribe((value) => {
    cmdLog.value += '\n';
    cmdLog.value += value;
    cmdLog.value += '\n';
    if (textarea.value) {
      textarea.value.scrollTop = textarea.value.scrollHeight;
    }
  });
  // 在打包后，el-menu的default-active不生效，手动调用
  const router = useRouter();
  router.push('/');
});
</script>
<style scoped>
.full {
  width: 100%;
  height: 100%;
}
.log {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>