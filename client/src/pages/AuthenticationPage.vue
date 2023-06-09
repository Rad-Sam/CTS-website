<template>
  <q-page>
    <q-page-container class="max-width-container-2">
      <transition appear enter-active-class="animated zoomIn">
        <q-card
          class="q-px-sm q-mx-md bg-white q-py-sm row justify-center text-center"
        >
          <h2 class="text-h4 col-12">التسجيل كمتبرع</h2>
          <form
          v-if="!no_new"
            class="col-12 row justify-center text-center"
            @submit.prevent="submitForm"
          >
            <q-select
              v-model="city"
              outlined=""
              class="q-mt-md q-px-md q-py-sm col-md-6 col-12"
              :rules="[(v) => !!v || 'الولاية مطلوبة']"
              ref="cityRef"
              label="الولاية"
              :options="cities"
              required
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-city" />
              </template>
            </q-select>
            <q-select
              v-model="type"
              outlined=""
              ref="typeRef"
              :rules="[(v) => !!v || 'فصيلة الدم مطلوبة']"
              class="q-mt-md q-px-md q-py-sm col-md-6 col-12"
              label="فصيلة الدم"
              :options="['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-']"
              required
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-hand-holding-droplet" />
              </template>
            </q-select>

            <q-input
              v-model="fname"
              outlined=""
              class="q-mt-md q-px-md q-py-sm col-6"
              :label="$t('first-name')"
              required
            />
            <q-input
              v-model="lname"
              outlined=""
              class="q-mt-md q-px-md q-py-sm col-6"
              :label="$t('last-name')"
              required
            />
            <q-input
              v-model="email"
              outlined=""
              class="q-mt-md q-px-md q-py-sm col-12 col-md-6"
              :label="$t('email-address')"
              :rules="emailRule"
              ref="emailRef"
              lazy-rules
              required
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-envelope" />
              </template>
            </q-input>
            <q-input
              v-model="phone"
              outlined=""
              ref="phoneRef"
              class="q-mt-md q-px-md q-py-sm col-12 col-md-6"
              :label="$t('phone')"
              :rules="rulePhone"
              required
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-phone" />
              </template>
            </q-input>

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
            <q-input
              v-model="cpassword"
              outlined=""
              type="password"
              class="q-mt-md q-px-md q-py-sm col-12 col-md-6"
              :label="$t('confirm-password')"
            >
              <template v-slot:prepend>
                <q-icon name="fas fa-key" />
              </template>
            </q-input>
            <div class="q-mt-md">
              <q-btn
                type="submit"
                :loading="isLoading"
                color="orange-9"
                size="lg"
                label="تسجيل"
              />
            </div>
          </form>

          <div v-if="no_new" class="v-error col-12 text-h6"><output>
            التسجيل غير متاح في الوقت الحالي

          </output></div>
          <q-card-section  class="text-center text-h6">
            <q-btn size="lg" flat @click="$router.push('/login')">
              لديك حساب ؟ &nbsp;
              <span class="text-orange-9"> تسجيل الدخول </span>
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
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '../stores/global';
import { directus } from '../services/api';
import { cities, api } from '../const';
import { useRouter } from 'vue-router';
const $router = useRouter();

const global = useGlobalStore();
const { t } = useI18n();

let no_new = ref(false);
  if (!global.global.allow_new_users) {
    no_new.value = true;
  }

let isLoading = ref(false);
let fname = ref('');
let lname = ref('');
let phone = ref('');
let email = ref('');
let city = ref(null);
let type = ref(null);
let password = ref('');
let cpassword = ref('');
let phoneRef = ref(null);
let cityRef = ref(null);
let typeRef = ref(null);
let emailRef = ref(null);

const rulePhone = [
  (v) => {
    if (
      v.startsWith('06') ||
      v.startsWith('07') ||
      v.startsWith('05') ||
      v.startsWith('6') ||
      v.startsWith('7') ||
      v.startsWith('5')
    ) {
      if (v.length > 10 || v.length < 9) {
        return t('validphone');
      } else {
        return true;
      }
    } else {
      return t('validphone');
    }
  },
];
const emailRule = [
  (v) => !!v || t('invalid-email'),
  (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v) || t('invalid-email'),
];

if (global.isAuthenticated) {
  $router.push('/dashboard');
}
async function submitForm() {
  if (!global.global.allow_new_users) {
    errorMessage('التسجيل غير متاح في الوقت الحالي', '');
    $router.push('/');
    return;
  }
  if (password.value != cpassword.value) {
    errorMessage(t('password-is-not-the-same'), '');
    return;
  }
  if (password.value.length < 8) {
    errorMessage(t('password_rule'), '');
    return;
  }
  cityRef.value.validate();
  typeRef.value.validate();
  phoneRef.value.validate();
  emailRef.value.validate();
  if (
    cityRef.value.hasError ||
    phoneRef.value.hasError ||
    emailRef.value.hasError ||
    typeRef.value.hasError
  ) {
    return;
  }

  try {
    isLoading.value = true;
    let postdata = {
      email: email.value,
      first_name: fname.value,
      last_name: lname.value,
      password: password.value,
      phone: phone.value,
      city: parseInt(city.value),
      type: type.value,
    };
    let data = await axios.post(api + '/signup', postdata);
    if (data.data.error) {
      console.log(data.error);
      throw new Error(data.data.error);
    }
    let payload = {
      email: email.value,
      password: password.value,
    };
    await directus.auth.login(payload);
    let user = await directus.users.me.read();
    global.user = user;
    global.isAuthenticated = true;
    $router.push('/dashboard');
  } catch (err) {
    errorMessage(err.message, err?.code);
  }
  isLoading.value = false;
}
</script>
