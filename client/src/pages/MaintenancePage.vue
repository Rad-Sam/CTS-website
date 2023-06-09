<template>
  <q-layout view="lHr lpR lFr">
    <div class="maintenance-page">
      <q-page-container>
        <q-page>
          <q-card class="q-mt-xl q-mx-auto" style="max-width: 400px">
            <q-card-section>
              <div class="text-center">
                <q-icon name="fas fa-tools" size="4em" class="text-primary" />
                <h4 class="text-primary q-mt-md">
                  {{ $t('under-maintenance') }}
                </h4>
                <p class="q-mt-md">
                  {{ $t('maintena') }}
                </p>
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </div>
  </q-layout>
</template>

<script>
import { useGlobalStore } from '../stores/global';
const global = useGlobalStore();
export default {
  name: 'MaintenancePage',
  mounted() {
    if (!global.global.maintenance) {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.maintenance-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}
</style>
