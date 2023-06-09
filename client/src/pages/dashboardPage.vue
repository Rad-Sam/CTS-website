<template>
  <q-page>
    <q-page-container class="max-width-container">
      <div class="row items-center">
        <div class="col-md-5 col-12">
          <q-card
            class="q-px-sm q-my-md q-mx-md bg-white q-py-sm justify-center text-center"
          >
            <h2 class="text-h5 col-12">تعطيل مؤقت</h2>
            <h2 class="text-body2 col-12">
              إذا كنت غير قادر على التبرع بالدم لسبب ما، يمكنك إيقاف تشغيل هذا
              الخيار ولن يظهر رقم هاتفك في نتائج البحث، يمكنك بالطبع إعادة
              تشغيله في أي وقت.
            </h2>
            <q-card-section>
              <q-toggle
                v-model="available"
                color="green"
                size="xl"
                icon="water_drop"
                label="أنا مستعد لأتبرع"
              />
            </q-card-section>
            <q-card-section>
              <q-btn
                :loading="isLoading"
                @click="save"
                icon="save"
                color="orange"
                outline
                label="حفظ"
              >
              </q-btn>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-7 col-12">
          <q-card
            class="q-px-sm q-my-md q-mx-md bg-white q-py-sm row justify-center text-center"
          >
            <h2 class="text-h5 col-12">الموعد التالي</h2>

            <h2 class="text-body2 col-12">
              هناك فاصل زمني يجب احترامه بين التبرع وغيره ، سيقوم الطبيب بتحقق
              وتحديد التاريخ لك
            </h2>

            <q-card-section v-if="nextap">
              <q-item-section v-if="!$q.screen.gt.sm">
                <q-item-label class="text-bold">
                  <q-chip color="grey-2 text-black">
                    {{ nextap.hospital.type }} - {{ nextap.hospital.name }}
                  </q-chip>
                </q-item-label>
                <q-item-label class="text-bold">
                  <q-chip icon="phone" dir="ltr" color="primary text-white">
                    {{ nextap.hospital.phone }}
                  </q-chip>
                </q-item-label>
              </q-item-section>
              <q-item>
                <q-item-section class="text-center text-bold" avatar>
                  <q-chip color="orange-7 text-white">
                    {{ nextap.appointment_date }}
                  </q-chip>
                </q-item-section>
                <q-item-section v-if="$q.screen.gt.sm">
                  <q-item-label class="text-bold">
                    <q-chip color="grey-2 text-black">
                      {{ nextap.hospital.type }} - {{ nextap.hospital.name }}
                    </q-chip>
                  </q-item-label>
                  <q-item-label class="text-bold">
                    <q-chip icon="phone" dir="ltr" color="primary text-white">
                      {{ nextap.hospital.phone }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>
                <q-item-section avatar="">
                  <q-btn
                    icon="map"
                    outline=""
                    label="عرض في الخريطة"
                    @click="openGoogleMaps(nextap)"
                  ></q-btn>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section v-else>
              <h2 class="text-body1 text-green-8 text-bold col-12">
                لا يوجد موعد قادم للتبرع بالنسبة لك ، إذا كنت ترغب في التبرع ،
                اتصل بنا لحجز موعد
              </h2>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-5 col-12">
          <q-card
            class="q-px-sm q-my-md q-mx-md bg-white q-py-sm justify-center text-center"
          >
            <h2 class="text-h5 col-12">طرق التواصل</h2>
            <h2 class="text-body2 col-12">
              اختر كيف يمكننا الاتصال بك عندما يحتاج شخص ما إلى الدم
            </h2>
            <q-card-section>
              <q-toggle
                v-model="Email"
                color="primary"
                size="xl"
                icon="mail"
                label="بريد إلكتروني"
              />
              <q-toggle
                v-model="Phone"
                color="primary"
                size="xl"
                icon="phone"
                label="مكالمة هاتفية "
              />
              <q-toggle
                v-model="SMS"
                color="primary"
                size="xl"
                icon="sms"
                label="رسالة قصيرة (SMS)  "
              />
            </q-card-section>
            <q-btn
              :loading="isLoading"
              @click="save"
              icon="save"
              color="orange"
              outline
              label="حفظ"
            >
            </q-btn>
          </q-card>
        </div>

        <div class="col-md-7 col-12">
          <q-card
            class="q-px-sm q-my-md q-mx-md bg-white q-py-sm row justify-center text-center"
          >
            <h2 class="text-h5 col-12">آخر تبرع</h2>
            <q-card-section v-if="prevap">
              <q-item-section v-if="!$q.screen.gt.sm">
                <q-item-label class="text-bold">
                  <q-chip color="grey-2 text-black">
                    {{ prevap.hospital.type }} - {{ prevap.hospital.name }}
                  </q-chip>
                </q-item-label>
                <q-item-label class="text-bold">
                  <q-chip icon="phone" dir="ltr" color="primary text-white">
                    {{ prevap.hospital.phone }}
                  </q-chip>
                </q-item-label>
              </q-item-section>
              <q-item>
                <q-item-section class="text-center text-bold" avatar>
                  <q-chip color="orange-7 text-white">
                    {{ prevap.appointment_date }}
                  </q-chip>
                </q-item-section>
                <q-item-section v-if="$q.screen.gt.sm">
                  <q-item-label class="text-bold">
                    <q-chip color="grey-2 text-black">
                      {{ prevap.hospital.type }} - {{ prevap.hospital.name }}
                    </q-chip>
                  </q-item-label>
                  <q-item-label class="text-bold">
                    <q-chip icon="phone" dir="ltr" color="primary text-white">
                      {{ prevap.hospital.phone }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>
                <q-item-section avatar="">
                  <q-btn
                    icon="map"
                    outline=""
                    label="عرض في الخريطة"
                    @click="openGoogleMaps(prevap)"
                  ></q-btn>
                </q-item-section>
              </q-item>
            </q-card-section>
            <q-card-section v-else>
              <h2 class="text-body1 text-green-8 text-bold col-12">ليس بعد</h2>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>

<script setup>
import errorMessage from '../utils/error';
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { directus } from '../services/api';
import { useGlobalStore } from '../stores/global';
let $router = useRouter();
let global = useGlobalStore();
let $q = useQuasar();

let donor = ref(null);
let isLoading = ref(false);

// notification
let available = ref(false);
let Email = ref(false);
let Phone = ref(false);
let SMS = ref(false);
async function save() {
  isLoading.value = true;
  try {
    await directus.items('donors').updateOne(donor.value.data[0].id, {
      Email: Email.value,
      Phone: Phone.value,
      SMS: SMS.value,
      available: available.value,
    });
    $q.notify({
      type: 'positive',
      message: 'تم حفظ المعلومات بنجاح',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'هناك خطأ ما',
    });
  }
  isLoading.value = false;
}

// appoitnements
let nextap = ref(false);
let prevap = ref(false);

function openGoogleMaps(nextap) {
  const coordinates = nextap.hospital.location.coordinates;
  const url = `https://www.google.com/maps?q=${coordinates[1]},${coordinates[0]}`;
  window.open(url, { target: '_blank' });
}

onMounted(async () => {
  if (!global.isAuthenticated) {
    $router.push('/login');
  }
  // notification
  donor.value = await directus.items('donors').readByQuery({});
  console.log(donor.value.data[0]);
  if (!donor.value.data.length) {
    errorMessage('لا يوجد ملف شخصي للمتبرع');
    return;
  }
  available.value = donor.value.data[0].available;
  Email.value = donor.value.data[0].Email;
  Phone.value = donor.value.data[0].Phone;
  SMS.value = donor.value.data[0].SMS;
  // appointement

  const lastDoneAppointment = await directus.items('appointment').readByQuery({
    filter: {
      status: 'done',
    },
    fields: ['*', 'hospital.*'],
    sort: '-date_created',
    limit: 1,
  });

  const lastPendingAppointment = await directus
    .items('appointment')
    .readByQuery({
      filter: {
        status: 'pending',
      },
      fields: ['*', 'hospital.*'],
      sort: '-date_created',
      limit: 1,
    });

  console.log(lastDoneAppointment);
  if (lastDoneAppointment.data[0]) {
    prevap.value = lastDoneAppointment.data[0];
  }
  if (lastPendingAppointment.data[0]) {
    nextap.value = lastPendingAppointment.data[0];
  }
});
</script>
