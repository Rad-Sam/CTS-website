import { Dialog } from 'quasar';
import { i18n } from '../boot/i18n';

export default function error(message: string, code: string) {
  const $t = i18n.global.t;
  Dialog.create({
    title: $t('error'),
    html: true,
    message: `<div class="v-error"><output>${
      code ? '[' + code + ']' : ''
    } ${message}</output></div>`,
  });
}
