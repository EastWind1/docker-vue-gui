
import { createApp} from 'vue';
import ConfirmDialog from '../dialog/ConfirmDialog.vue';
import ImageInfoDialog from '../dialog/ImageInfoDialog.vue';
import { ImageInfo } from '../pojo/types';
export function showImageInfoDialog(data: ImageInfo) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const dialog = createApp(ImageInfoDialog, {
        data: data,
        closeCallback: () => {
            dialog.unmount();
            div.remove();
        }
    });
    dialog.mount(div);
}

export function showConfirmDialog(message: string): Promise<boolean> {
    const div = document.createElement('div');
    document.body.appendChild(div);
    return new Promise((resolve,reject) => {
        const dialog = createApp(ConfirmDialog, {
            message: message,
            closeCallback: (res:boolean) => {
                dialog.unmount();
                div.remove();
                resolve(res);
            }
        });
        dialog.mount(div);
    });
   
}