<template>
  <q-page padding>
    <q-page-container class="text-center" style="margin: auto">
      <h1 class="text-center">{{ $t('f-a-q') }}</h1>
      <div v-if="loading" class="page-spinner-container">
        <q-spinner size="xl"></q-spinner>
      </div>
      <div class="row justify-center text-center">
        <div style="width: 800px" class="text-center">
          <q-input
            v-model="searchTerm"
            :label="$t('search')"
            type="text"
            class="my-3 col-12"
            outlined
          />
          <transition-group name="fade">
            <q-expansion-item
              :dir="dir"
              v-for="(item, index) in filteredFAQ"
              :key="index"
              :label="item.question"
              class="shadow-1 overflow-hidden q-my-lg"
              style="border-radius: 25px; font-size: medium"
              icon="fas fa-circle-question"
              header-class="bg-grey-4  text-black text-bold"
              expand-icon-class="text-white"
            >
              <q-card class="q-pt-md q-pb-md">
                <q-card-section
                  ><div v-html="item.answer"></div
                ></q-card-section>
              </q-card>
            </q-expansion-item>
          </transition-group>
        </div>
      </div>
    </q-page-container>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { directusPublic } from '../services/api';
import errorMessage from '../utils/error';

export default defineComponent({
  name: 'App',
  data: function () {
    return {
      faq: [],
      loading: true,
      searchTerm: '',
      dir: '',
    };
  },
  computed: {
    filteredFAQ() {
      return this.faq.filter((item) =>
        item.question.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  async mounted() {
    try {
      let get = await directusPublic.items('faq').readByQuery({});

      if (get.data) {
        this.faq = get.data;
      }

      this.loading = false;
    } catch (er) {
      this.loading = false;
      errorMessage(er.message);
    }
  },
});
</script>
