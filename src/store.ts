import { defineStore } from 'pinia';
import { ref } from 'vue';
import {Subject} from 'rxjs';
export const useStateStore = defineStore('state', () => {
    const isDockerRunning = ref(false);
    const cmdOutput = new Subject<string>();
    // ipcRenderer.on('cmd-output', (event, data) => {
    //     cmdOutput.next(data);
    // });
    return { isDockerRunning, cmdOutput };
});