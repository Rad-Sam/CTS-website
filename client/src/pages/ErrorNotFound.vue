<template>
  <div
    class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 20vh">404</div>
      <div class="text-h4" style="opacity: 0.4"> لا شيء هنا...</div>
      <q-btn
        flat
        size="xl"
        unelevated
        to="/"
        class="q-mt-md"
        label="الذهاب إلى الصفحة الرئيسية"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ErrorNotFound',
});
</script>
