<template>
  <q-page>
    <IndexHero></IndexHero>
    <section class="divider"></section>
    <newsPage :isout="true"></newsPage>
  </q-page>
</template>

<script setup>
import { api } from '../const';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import IndexHero from '../components/Index-Hero.vue';

import newsPage from 'pages/newsPage.vue';

import errorDialog from '../utils/error';
import axios from 'axios';

const route = useRoute();
let $q = useQuasar();
const { t } = useI18n();
let tokenz = ref('');
function Dia() {
  $q.dialog({
    message: t('enter-the-new-password-min-8'),
    persistent: true,
    cancel: true,
    prompt: {
      model: '',
      isValid: (value) => value.length > 8,
    },
  })
    .onOk((data) => {
      $q.dialog({
        message: t('confirm-password'),
        persistent: true,
        cancel: true,
        prompt: {
          model: '',
          isValid: (value) => value == data,
        },
      })
        .onOk(async (data2) => {
          try {
            await axios.post(api + '/auth/password/reset', {
              token: tokenz.value,
              password: data2,
            });
            $q.dialog({
              message: t('you-can-now-login-again'),
            });
          } catch (error) {
            errorDialog(error.message, '');
          }
        })
        .onCancel(() => {
          $q.dialog({
            message: t(
              'if-you-still-need-to-reset-your-password-press-the-link-again'
            ),
          });
        });
    })
    .onCancel(() => {
      $q.dialog({
        message: t(
          'if-you-still-need-to-reset-your-password-press-the-link-again'
        ),
      });
    });
}
onMounted(() => {
  const url = new URL(window.location.href);
  const token = url.searchParams.get('token');
  if (token) {
    tokenz.value = token;
    setTimeout(() => {
      Dia();
    }, 1000);
  } else {
    if (route.query.token) {
      tokenz.value = route.query.token;
      setTimeout(() => {
        Dia();
      }, 1000);
    }
  }
});
</script>

<style>
.divider {
  max-width: 1000px;
  margin: auto;
  border-top: 3px solid #000000;
}
</style>
