<template>
  <q-page>
    <q-page-container class="max-width-container">
      <q-card class="q-px-sm q-mx-md bg-white q-py-sm row justify-center text-center">
        <h2 class="text-h4 col-12">{{ $t('contact-us') }}</h2>

        <div class="col-12 col-md-6">
          <q-img src="contact.png"> </q-img>
        </div>
        <form
          class="col-12 col-md-6 row justify-center text-center"
          @submit.prevent="submitForm"
        >
          <q-input
            v-model="fname"
            outlined=""
            dense=""
            class="q-mt-md q-px-md q-py-sm col-6"
            :label="$t('first-name')"
            required
          />
          <q-input
            v-model="lname"
            outlined=""
            dense=""
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
            dense
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
            dense=""
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
            type="textarea"
            outlined=""
            class="q-mt-md col-12 q-px-md q-py-sm"
            v-model="message"
            :label="$t('message')"
            required
          />
          <div class="q-mt-md">
            <q-btn
              type="submit"
              :loading="isLoading"
              color="green-7"
              size="lg"
              :label="$t('submit')"
            />
          </div>
        </form>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script setup>
import errorMessage from '../utils/error';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { directusPublic } from '../services/api';

const { t } = useI18n();
let fname = ref('');
let lname = ref('');
let phone = ref('');
let phoneRef = ref(null);
let email = ref('');
let emailRef = ref(null);
let isLoading = ref(false);

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
let message = ref('');

let $q = useQuasar();

async function submitForm() {
  emailRef.value.validate();
  phoneRef.value.validate();
  if (emailRef.value.hasError || phoneRef.value.hasError) {
    return;
  }
  try {
    isLoading.value = true;
    let obj = {
      first_name: fname.value,
      last_name: lname.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    };
      await directusPublic.items('contact_us').createOne(obj);
    isLoading.value = false;
    $q.dialog({
      title: t('request-sent-successfully'),
      message: t('please-allow-up-to-24-hours-for-processing'),
    });
    fname.value = ''
    lname.value = ''
    phone.value = ''
    message.value = ''
    email.value = ''
  } catch (err) {
    let message = err.message;
    errorMessage(message);
    isLoading.value = false;
  }
}
</script>
