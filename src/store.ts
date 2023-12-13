import { defineStore } from 'pinia';
import { ref } from 'vue';
import {Subject} from 'rxjs';
export const useStateStore = defineStore('state', () => {
    const isDockerRunning = ref(false);
    const cmdOutput = new Subject<string>(); 
    // ipcRenderer.on('cmd-output', (event, data) => {
    //     cmdOutput.next(data);
    // });
    return {
        /**
         * docker daemon是否在运行
         */ 
        isDockerRunning, 
        /**
         * 控制台输出
         */ 
        cmdOutput 
    };
});