<template>
  <q-page>
    <q-page-container class="max-width-container">
      <div v-if="inews" class="q-px-md q-py-sm">
        <!-- content -->
        <q-card :dir="!inews.title ? 'rtl' : ''">
          <q-card-section class="text-right">
            <div
              class="q-ma-none q-pa-none news-date text-body1 text-end text-bold q-mt-md text-grey-6"
            >
              {{
                new Date(inews.date_created).toLocaleDateString() +
                ' - ' +
                new Date(inews.date_created).toLocaleTimeString()
              }}
            </div>
          </q-card-section>
          <q-card-section title="">
            <h2 class="text-h4 q-ma-none text-center col-12">
              {{ inews.title }}
            </h2>
          </q-card-section>
          <q-card-section>
            <div
              class="q-px-sm"
              style="word-wrap: break-word"
              v-html="inews.info"
            ></div>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-page>
</template>

<script>
import { directusPublic } from '../services/api';
import errorMessage from '../utils/error';
export default {
  data() {
    return {
      inews: false,
    };
  },
  methods: {
    removeWidthAndHeightAttributes(htmlString) {
      // Create a temporary div element
      const tempDiv = document.createElement('div');
      // Set the HTML string as the innerHTML of the div
      tempDiv.innerHTML = htmlString;
      // Remove the width and height attributes from img elements where width > 400
      const imgElements = tempDiv.querySelectorAll('img');
      imgElements.forEach((imgElement) => {
        const width = parseInt(imgElement.getAttribute('width'), 10);
        if (!width) {
          imgElement.setAttribute('width', '100%');
          imgElement.setAttribute('height', 'auto');
        }
        const screenWidth = window.innerWidth;
        if (width > 0.9 * screenWidth) {
          imgElement.removeAttribute('width');
          imgElement.removeAttribute('height');
          imgElement.setAttribute('width', '100%');
          imgElement.setAttribute('height', 'auto');
        }
        if (width > 1000) {
          imgElement.removeAttribute('width');
          imgElement.removeAttribute('height');
          imgElement.setAttribute('width', '100%');
          imgElement.setAttribute('height', 'auto');
        }
      });
      return tempDiv.innerHTML;
    },

    async load() {
      try {
        this.$q.loading.show();
        const data = await directusPublic
          .items('news')
          .readOne(this.$route.params.id, {});
        // This part is to make images responsive
        data.info = this.removeWidthAndHeightAttributes(data.info);
        this.inews = data;
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
