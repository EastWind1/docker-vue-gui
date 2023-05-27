import { ipcRenderer } from 'electron'
import { DockerContainer, DockerImage, DockerSearchedImage, DockerState } from '../pojo/types';
import { useStateStore } from '../store';

// 执行命令
async function execCmd(args: string): Promise<string> {
  const state = useStateStore();
  state.cmdOutput.next(args);
  const res = await ipcRenderer.invoke('invoke-cmd', args);
  state.cmdOutput.next(res);
  return res;
}
/**
 * 获取docker daemon是否正在运行
 * @returns 运行状态
 */
export async function isDockerRunning(): Promise<boolean> {
  const state = useStateStore();
  let res = false;
  await execCmd("docker ps")
    .then((value) => res = !value.includes("Cannot connect"));
  return res;
}
/**
 * 获取docker信息
 */
export async function getDockerInfo(): Promise<DockerState | null> {
  const state = useStateStore();
  if (!state.isDockerRunning) {
    return null;
  }
  const json = await execCmd("docker info --format json");
  const jsonArray = json.split('\n');
  if (jsonArray[0]) {
    return JSON.parse(jsonArray[0]);
  } else {
    return null;
  }
}
/**
 * 启动colima
 */
export async function startColima(): Promise<boolean> {
  const state = useStateStore();
  if (!state.isDockerRunning) {
    return false;
  }
  let res = await execCmd("colima start");
  if (res || res.includes("done")) {
    return true;
  } else {
    return false;
  }
}
/**
 * 获取本地镜像列表
 * @returns 镜像列表
 */
export async function listImages(): Promise<DockerImage[]> {
  const state = useStateStore();
  if (!state.isDockerRunning) {
    return [];
  }
  const json = await execCmd("docker image ls --format json");
  const jsonArray = json.split('\n');
  const images = [];
  for (let i = 0; i < jsonArray.length - 1; i++) {
    images.push(JSON.parse(jsonArray[i]));
  }
  return images;
}

/**
 * 获取本地容器列表
 * @returns 镜像列表
 */
export async function listContainers(): Promise<DockerContainer[]> {
  const state = useStateStore();
  if (!state.isDockerRunning) {
    return [];
  }
  const json = await execCmd("docker ps --format json");
  const jsonArray = json.split('\n');
  const containers = [];
  for (let i = 0; i < jsonArray.length - 1; i++) {
    containers.push(JSON.parse(jsonArray[i]));
  }
  return containers;
}
/**
 * 查找镜像
 * @returns 镜像列表
 */
export async function searchImages(keyWord: string): Promise<DockerSearchedImage[]> {
  const state = useStateStore();
  if (!state.isDockerRunning) {
    return [];
  }
  let json = await execCmd(`docker search "${keyWord}" --format json`);
  const jsonArray = json.split('\n');
  const images = [];
  for (let i = 0; i < jsonArray.length - 1; i++) {
    images.push(JSON.parse(jsonArray[i]));
  }
  return images;
}
/**
 * 运行Image
 */
export async function runImage(name: string): Promise<boolean> {
  const state = useStateStore();
  if (!state.isDockerRunning) {
    return false;
  }
  let res = await execCmd(`docker run -P -d ${name}`);
  return res != null && res.length != 0;
}
/**
 * 停止Container
 */
export async function stopContainer(id: string): Promise<boolean> {
  const state = useStateStore();
  if (state.isDockerRunning) {
    return true;
  }
  let res = await execCmd(`docker stop ${id}`);

  return res != null && res.length != 0;
}
/**
 * 打开容器命令行
 */
export async function openContainerBash(id: string) {
  const state = useStateStore();
  if (!state.isDockerRunning) {
    return;
  }
  await execCmd(`osascript -e 'tell application "Terminal" \n
      do script "docker exec -it ${id} bash" \n
      end tell'`);
}