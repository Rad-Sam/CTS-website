<template>
  <q-page>
    <q-page-container class="max-width-container-2">
      <transition appear enter-active-class="animated zoomIn">
        <q-card
          class="q-px-sm q-mx-md bg-white q-py-sm row justify-center text-center"
        >
          <h2 class="text-h4 col-12">تسجيل الدخول</h2>
          <form
            class="col-12 row justify-center text-center"
            @submit.prevent="submitForm"
          >
            <q-input
              v-model="email"
              outlined=""
              class="q-mt-md q-px-md q-py-sm col-12 col-md-6"
              :label="$t('email-address')"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-envelope" />
              </template>
            </q-input>
            <div class="col-12"></div>
            <q-input
              v-model="password"
              outlined=""
              type="password"
              class="q-mt-md q-px-md q-py-sm col-12 col-md-6"
              :label="$t('password')"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-key" />
              </template>
            </q-input>
            <div class="col-12"></div>
            <div class="q-mt-md">
              <q-btn
                type="submit"
                :loading="isLoading"
                color="orange-9"
                size="lg"
                label="تسجيل الدخول"
              />

              <div class="text-center q-mt-md col-12">
                <span class="cursor-pointer" @click="froget()">
                  {{ $t('did-you-forget-your-password') }}
                </span>
              </div>
            </div>
          </form>
          <q-card-section class="text-center text-h6">
            <q-btn size="lg" flat @click="$router.push('/user')">
              ليس لديك حساب ؟ &nbsp;
              <span class="text-orange-9"> تسجيل </span>
            </q-btn>
          </q-card-section>
        </q-card>
      </transition>
    </q-page-container>
  </q-page>
</template>

<script setup>
import errorMessage from '../utils/error';
import { ref } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '../stores/global';
import { directus } from '../services/api';
import { site, api } from '../const';
import { useRouter } from 'vue-router';
const $router = useRouter();

const global = useGlobalStore();
const { t } = useI18n();

let email = ref('');
let password = ref('');
let isLoading = ref(false);

let $q = useQuasar();

function froget() {
  if (!email.value) {
    errorMessage(t('invalid-email'), '');
    return;
  }
  $q.dialog({
    message: t('you-will-receive-an-email-with-a-link-to-reset-your-password'),
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    $q.loading.show();
    try {
      await axios.post(api + '/auth/password/request', {
        email: email.value,
        reset_url: site,
      });
      $q.dialog({
        message: t('check-your-email-to-reset-your-password'),
        cancel: false,
        persistent: true,
      });
    } catch (er) {
      errorMessage(er.message, '');
    }
    $q.loading.hide();
  });
}

if (global.isAuthenticated) {
  $router.push('/dashboard');
}

async function submitForm() {
  if (!email.value) {
    errorMessage(t('invalid-email'), '');
    return;
  }
  if (!password.value) {
    errorMessage(t('invalid-user-credentials'), '');
    return;
  }
  isLoading.value = true;
  try {
    await directus.auth.login({
      email: email.value,
      password: password.value,
    });
    let user = await directus.users.me.read();
    console.log(user);
    global.user = user;
    global.isAuthenticated = true;
    $router.push('/dashboard');
  } catch (err) {
    // window.grecaptcha.reset(captcha.value);
    let message = err.message;
    if (err.message == 'Invalid user credentials.') {
      message = 'بيانات المستخدم غير صالح';
    }
    errorMessage(message, err?.code);
  }
  isLoading.value = false;
}
</script>
