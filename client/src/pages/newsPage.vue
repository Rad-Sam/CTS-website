<template>
  <div
    style="padding-top: none !important"
    class="max-width-container q-mt-none"
  >
    <div
      style="padding-top: none !important"
      class="max-width-container q-pb-xl q-mt-none"
      :style="!isout ? 'min-height: 60vh' : ''"
    >
      <h1 v-if="!isout" class="text-center q-mt-md">{{ $t('news') }}</h1>
      <div v-else class="flex justify-between items-center px-xl">
        <div class="flex-auto">
          <h1 class="text-center my-0 q-ml-lg">{{ $t('news') }}</h1>
        </div>
        <div>
          <q-btn
            outline
            @click="$router.push('/news')"
            class="q-mr-md text-bold"
            size="md"
            rounded
          >
            {{ $t('view-all') }}
          </q-btn>
        </div>
      </div>
      <div
        class="full-height row wrap justify-center items-stretch items-center content-stretch"
      >
        <q-card
          v-for="newsi in news"
          :dir="!newsi.title_en ? 'rtl' : ''"
          :key="newsi.id"
          class="col-10 col-md-3 q-ma-sm cursor-pointer"
          @click="$router.push('/read/' + newsi.id)"
        >
          <div
            style="padding-top: 50%"
            :style="`background: url(${
              api + '/assets/' + newsi.image
            }) center / cover;`"
          ></div>
          <q-card-section>
            <div class="text-caption text-grey">
              {{
                new Date(newsi.date_created).toLocaleDateString() +
                ' - ' +
                new Date(newsi.date_created).toLocaleTimeString()
              }}
            </div>
            <div class="text-h6">
              {{ newsi.title }}
            </div>
            <div style="opacity: 0.6" class="text-body2 q-mt-md">
              {{ newsi.short_desc }}
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div v-if="!isout" class="row text-center q-mt-lg q-mb-lg justify-center">
        <q-pagination
          v-model="currentPage"
          color="orange"
          class="q-mt-md"
          max-pages="6"
          :max="totalPages"
          direction-links=""
        ></q-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { directusPublic } from '../services/api';
import errorMessage from '../utils/error';
import { api } from '../const';
export default {
  name: 'NewsPage',
  props: ['isout'],
  data() {
    return {
      news: [],
      api: api,
      currentPage: 1,
      perPage: this.isout ? 4 : 6,
      totalItems: 0,
      isLoading: false,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.perPage);
    },
  },
  watch: {
    currentPage() {
      this.load();
    },
  },
  methods: {
    async load() {
      try {
        this.news = [];
        if (!this.isout) {
          this.$q.loading.show();
        }
        const { data, meta } = await directusPublic.items('news').readByQuery({
          fields: ['id', 'date_created', 'short_desc', 'title', 'image'],
          sort: '-date_created',
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage,
          meta: ['total_count'], // include metadata in the response
        });
        this.news = data;
        this.totalItems = meta.total_count; // retrieve total count from metadata
      } catch (error) {
        errorMessage(error.message);
        console.error(error);
      } finally {
        this.$q.loading.hide();
      }
    },
  },
  async mounted() {
    this.load();
  },
};
</script>
