import { ipcRenderer } from 'electron'
import { ElNotification, ElLoading } from 'element-plus'
import { DockerContainer, DockerImage, DockerSearchedImage, DockerState } from '../pojo/types';
import { reactive } from 'vue';

// 执行命令
async function execCmd(args: string): Promise<string> {
  return ipcRenderer.invoke('invoke-cmd', args).catch((errMsg) => {
    ElNotification({ duration: 5000, showClose: true, type: 'error', title: `执行${args}失败: \n${errMsg}` });
  });
}
/**
 * 获取docker daemon是否正在运行
 * @returns 运行状态
 */
export async function isDockerRunning(): Promise<boolean> {
  let res = false;
  await execCmd("docker ps")
    .then((value) => res = !value.includes("Cannot connect to the Docker daemon"));
  return res;
}
/**
 * 获取docker信息
 */
export async function getDockerInfo(): Promise<DockerState | null> {
  if (!await isDockerRunning()) {
    ElNotification({ duration: 5000, type: 'error', title: 'docker daemon未在运行', showClose: true });
    return null;
  } else {
    const json = await execCmd("docker info --format json");
    const jsonArray = json.split('\n');
    if (jsonArray[0]) {
      return JSON.parse(jsonArray[0]);
    } else {
      return null;
    }
  }
}
/**
 * 启动colima
 */
export async function startColima() {
  if (!await isDockerRunning()) {
    const loading = ElLoading.service({});
    let res = '';
    try {
      res = await execCmd("colima start");
    } finally {
      loading.close();
    }
    if (res || res.includes("done")) {
      ElNotification({ duration: 2000, type: 'success', title: 'Colime启动成功' });
    } else {
      ElNotification({ duration: 0, type: 'error', title: 'Colime启动失败: ' + res, showClose: true });
    }
  } else {
    ElNotification({ duration: 2000, type: 'warning', title: 'Colime正在运行' });
  }
}
/**
 * 获取本地镜像列表
 * @returns 镜像列表
 */
export async function listImages(): Promise<DockerImage[]> {
  if (!await isDockerRunning()) {
    ElNotification({ duration: 5000, type: 'error', title: 'docker daemon未在运行', showClose: true });
    return [];
  } else {
    const json = await execCmd("docker image ls --format json");
    const jsonArray = json.split('\n');
    const images = [];
    for (let i = 0; i < jsonArray.length - 1; i++) {
      images.push(JSON.parse(jsonArray[i]));
    }
    return images;
  }
}

/**
 * 获取本地容器列表
 * @returns 镜像列表
 */
export async function listContainers(): Promise<DockerContainer[]> {
  if (!await isDockerRunning()) {
    ElNotification({ duration: 5000, type: 'error', title: 'docker daemon未在运行', showClose: true });
    return [];
  } else {
    const json = await execCmd("docker ps --format json");
    const jsonArray = json.split('\n');
    const containers = [];
    for (let i = 0; i < jsonArray.length - 1; i++) {
      containers.push(JSON.parse(jsonArray[i]));
    }
    return containers;
  }
}
/**
 * 查找镜像
 * @returns 镜像列表
 */
export async function searchImages(keyWord: string): Promise<DockerSearchedImage[]> {
  if (!await isDockerRunning()) {
    ElNotification({ duration: 5000, type: 'error', title: 'docker daemon未在运行', showClose: true });
    return [];
  } else {
    const loading = ElLoading.service({});
    let json = "{}"
    try {
      json = await execCmd(`docker search "${keyWord}" --format json`);
    } finally {
      loading.close();
    }
    const jsonArray = json.split('\n');
    const images = [];
    for (let i = 0; i < jsonArray.length - 1; i++) {
      images.push(JSON.parse(jsonArray[i]));
    }
    return images;
  }
}
/**
 * 运行Image
 */
export async function runImage(name: string) {
  if (!await isDockerRunning()) {
    ElNotification({ duration: 5000, type: 'error', title: 'docker daemon未在运行', showClose: true });
  } else {
    const loading = ElLoading.service({});
    let res = '';
    try {
      res = await execCmd(`docker run -P -d ${name}`);
    } finally {
      loading.close();
    }
    if (res) {
      ElNotification({ duration: 2000, type: 'success', title: `${name}启动成功` });
    } else {
      ElNotification({ duration: 0, type: 'error', title: `${name}启动失败`, showClose: true });
    }
  }
}
/**
 * 停止Container
 */
export async function stopContainer(id: string) {
  if (!await isDockerRunning()) {
    ElNotification({ duration: 5000, type: 'error', title: 'docker daemon未在运行', showClose: true });
  } else {
    const loading = ElLoading.service({});
    let res = '';
    try {
      res = await execCmd(`docker stop ${id}`);
    } finally {
      loading.close();
    }
    if (res) {
      ElNotification({ duration: 2000, type: 'success', title: `停止成功` });
    } else {
      ElNotification({ duration: 0, type: 'error', title: `停止失败`, showClose: true });
    }
  }
}
/**
 * 打开容器命令行
 */
export async function openContainerBash(id: string) {
  if (!await isDockerRunning()) {
    ElNotification({ duration: 5000, type: 'error', title: 'docker daemon未在运行', showClose: true });
  } else {
    const loading = ElLoading.service({});
    let res = '';
    try {
      if (!window.navigator.userAgent.toLowerCase().includes("macintosh")) {
        ElNotification({ duration: 20000, showClose: true, type: 'warning', title: `非MacOS不支持自动打开终端,请手动执行: docker exec -it ${id} bash` });
        return;
      }
      res = await execCmd(`osascript -e 'tell application "Terminal" \n
      do script "docker exec -it ${id} bash" \n
      end tell'`);
      ElNotification({ duration: 2000, type: 'success', title: `打开bash成功` });
    } finally {
      loading.close();
    }
  }
}