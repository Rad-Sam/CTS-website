<template>
  <div class="footer" style="background-color: #282e38">
    <div class="q-py-xl" style="margin: auto; max-width: 900px">
      <div
        v-if="$q.screen.lt.md"
        style="margin: auto; max-width: 500px"
        class="row items-center justify-center"
      >
        <div class="col q-ml-xl">
          <span class="text-black text-bold text-h6">{{ $t('support') }}</span>
          <div
            v-for="(item, index) in links"
            :key="index"
            class="d-flex q-my-sm align-items-center row"
          >
            <q-icon color="black" class="q-mt-sm" :name="item.icon" />
            <router-link
              :to="item.href"
              style="text-decoration: none"
              class="q-mx-sm text-caption text-black no-wrap"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
        <div class="col">
          <span class="text-black text-bold text-h6">{{ $t('links') }}</span>
          <div
            v-for="(item, index) in links2"
            :key="index"
            class="d-flex q-my-sm align-items-center row"
          >
            <q-icon color="black" class="q-mt-sm" :name="item.icon" />
            <router-link
              :to="item.href"
              style="text-decoration: none"
              class="q-mx-sm text-caption text-black no-wrap"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
      </div>
      <div
        :class="$q.screen.gt.md ? ' justify-between' : 'justify-center'"
        class="row wrap items-center"
      >
        <div
          :class="$q.screen.lt.md ? 'text-center' : ''"
          class="col-shrink column q-mx-md q-pa-md q-mt-md q-my-md"
        >
          <div class="text-grey-9">
            حقوق النشر <br />
            radjah abdessamed <br />
            benhamedi takwa
            <br />
          </div>
        </div>
        <div v-if="$q.screen.gt.sm" class="col q-ml-xl">
          <span class="text-black text-bold text-h6">{{ $t('support') }}</span>
          <div
            v-for="(item, index) in links"
            :key="index"
            class="d-flex q-my-sm align-items-center row"
          >
            <q-icon color="black" class="q-mt-sm" :name="item.icon" />
            <router-link
              :to="item.href"
              style="text-decoration: none"
              class="q-mx-sm text-body1 text-black no-wrap"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
        <div v-if="$q.screen.gt.sm" class="col">
          <span class="text-black text-bold text-h6">{{ $t('links') }}</span>
          <div
            v-for="(item, index) in links2"
            :key="index"
            class="d-flex q-my-sm align-items-center row"
          >
            <q-icon color="black" class="q-mt-sm" :name="item.icon" />
            <router-link
              :to="item.href"
              style="text-decoration: none"
              class="q-mx-sm text-body1 text-black no-wrap"
              >{{ item.title }}</router-link
            >
          </div>
        </div>
        <div class="col col-shrink column q-mx-xl">
          <span class="text-black text-center q-mb-sm text-h6">
            تابعنا على :</span
          >
          <a
            href="https://www.facebook.com/profile.php?id=100008572423465"
            style="max-width: 300px"
            target="_blank"
            class="follow-social-button follow-social-button-facebook q-mt-sm text-center"
          >
            <q-icon
              size="sm"
              color="white"
              class="q-mr-sm"
              name="fab fa-facebook"
            />
            Facebook</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterComp',
  data() {
    return {
      links: [
        { title: this.$t('f-a-q'), href: '/faq', icon: 'fas fa-file-alt' },
        {
          title: this.$t('contact-us'),
          href: '/contact',
          icon: 'far fa-envelope',
        },
      ],
      links2: [
        { title: this.$t('news'), href: '/news', icon: 'fas fa-newspaper' },
        {
          title: 'بحاجة الى الدم',
          icon: 'fas fa-hospital',
          href: '/need-blood',
        },
      ],
    };
  },
};
</script>

<style>
.follow-social-button {
  display: inline-block;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}

.follow-social-button-facebook {
  background-color: #0858c1; /* Facebook blue color */
}

.follow-social-button-facebook:hover {
  background-color: #3b5998; /* Facebook darker blue color */
}
.logo {
  width: 200px;
}
</style>
