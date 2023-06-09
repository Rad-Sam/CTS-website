<template>
  <div dir="rtl" class="q-col-xxl-8 px-4 py-5 hero">
    <div class="row q-px-sm justify-center items-center">
      <div style="min-height: calc(100vh - 52px)" class="col-md-6 mt-xl-0">
        <transition appear enter-active-class="animated zoomIn">
          <img
            src="/images/hero.png"
            style="
              max-width: 100%;
              position: absolute;
              height: calc(100vh - 52px);
            "
          />
        </transition>
        <div style="padding-right: 250px">
          <transition appear enter-active-class="animated backInRight">
            <h1 class="text-h3 q-pt-xl q-mt-xl text-bold text-center">
              تبرع في سطيف
              <br />
              المرضى بحاجة لك
            </h1>
          </transition>
        </div>
        <div
          class="text-center"
          style="position: relative; bottom: -110px; left: -280px"
        >
          <div class="text-h5 q-pr-md text-center">
            التبرع بالدم ينقذ الارواح, سجل معنا اليوم
            <br />
            <br />
          </div>
          <transition appear enter-active-class="animated zoomIn">
            <q-btn
              size="lg"
              :to="{ name: 'user' }"
              :class="$q.screen.gt.sm ? 'q-ma-md' : 'full-width q-my-sm'"
              color="green-9"
            >
              تبرع
            </q-btn>
          </transition>
          <transition appear enter-active-class="animated zoomIn">
            <q-btn
              size="lg"
              @click="$router.push('/need-blood')"
              class="text-bold"
              outline
              :class="$q.screen.gt.sm ? 'q-ma-md' : 'full-width q-my-sm'"
              color="green-9"
            >
              ابحث عن متبرعين
            </q-btn>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  // name: 'ComponentName'
});
</script>

<style scoped></style>
