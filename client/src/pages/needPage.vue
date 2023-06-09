<template>
  <q-page>
    <q-page-container class="max-width-container">
      <transition appear enter-active-class="animated zoomIn">
      <q-card
        class="q-px-sm q-mx-md bg-white q-py-sm row justify-center text-center"
      >
        <h2 class="text-h4 col-12">بحاجة الى الدم</h2>

        <div class="col-12 col-md-4">
          <q-img src="images/benifit.svg"> </q-img>
        </div>
        <form
          class="col-12 col-md-8 row justify-center text-center"
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
      </transition>
    </q-page-container>
  </q-page>
</template>

<script setup>
import errorMessage from '../utils/error';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { directusPublic } from '../services/api';
import { cities } from '../const';

const { t } = useI18n();
let fname = ref('');
let lname = ref('');
let phone = ref('');
let phoneRef = ref(null);
let email = ref('');
let isLoading = ref(false);

let city = ref(null);
let type = ref(null);
let cityRef = ref(null);
let typeRef = ref(null);

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
let message = ref('');

let $q = useQuasar();

async function submitForm() {
  cityRef.value.validate();
  typeRef.value.validate();
  phoneRef.value.validate();
  if (
    cityRef.value.hasError ||
    phoneRef.value.hasError ||
    typeRef.value.hasError
  ) {
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
      abo: type.value,
      wilaya: parseInt(city.value),
    };
    let id = await directusPublic.items('need_blood').createOne(obj);
    console.log(id);
    isLoading.value = false;
    $q.dialog({
      title: t('request-sent-successfully'),
      message: 'طلبك قيد المعالجة ، وسوف نتصل بك في أقرب وقت ممكن',
    });
    fname.value = ''
    lname.value = ''
    email.value = ''
    phone.value = ''
    message.value = ''
    type.value = ''
  } catch (err) {
    let message = err.message;
    errorMessage(message);
    isLoading.value = false;
  }
}
</script>
