<template>
  <nav class="site-header__nav d-none d-lg-flex">
    <ul>
      <li>
        <router-link class="" to="/">{{ $t('home_page') }}</router-link>
      </li>
      <li>
        <router-link class="" to="/news">{{ $t('news') }}</router-link>
      </li>
      <li>
        <router-link class="" to="/faq">{{ $t('f-a-q') }}</router-link>
      </li>
      <li>
        <router-link class="" to="/need-blood">بحاجة الى الدم</router-link>
      </li>
      <li>
        <router-link class="" to="/contact">{{ $t('contact-us') }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  // name: 'ComponentName',
});
</script>

<style scoped>
nav {
  display: block;
}
[tabindex='-1']:focus:not(:focus-visible) {
  outline: 0 !important;
}
ul {
  margin-bottom: 1rem;
}
ul {
  margin-top: 0;
}
a {
  text-decoration: none;
  background-color: transparent;
  font-weight: 700;
  font-size: 14px;
  line-height: 130%;
  color: #24fd10;
  margin: 0;
}
a:hover {
  color: #0056b3;
  text-decoration: underline;
}
[type='button']:not(:disabled),
[type='reset']:not(:disabled),
[type='submit']:not(:disabled) {
  cursor: pointer;
}
::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}
.d-none {
  display: none !important;
}
@media (min-width: 992px) {
  .d-lg-flex {
    display: flex !important;
  }
}
ul {
  line-height: 130%;
  padding: 0;
  list-style: none;
}
@media (max-width: 575.98px) {
  a {
    font-size: 12px;
  }
}
.site-header__nav {
  margin-left: 40px;
}
@media (max-width: 1199.98px) {
  .site-header__nav {
    margin-left: 10px;
  }
}
.site-header__nav ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
}
.site-header__nav a {
  font-size: 14px;
  line-height: 120%;
  text-transform: uppercase;
  color: #000000;
  border: 2px solid transparent;
  padding: 12px 20px;
  text-decoration: none;
  white-space: nowrap;
}
@media (max-width: 1286px) {
  .site-header__nav a {
    padding-left: 15px;
    padding-right: 15px;
  }
}
@media (max-width: 1199.98px) {
  .site-header__nav a {
    padding-left: 9px;
    padding-right: 9px;
    font-size: 13px;
  }
}
.site-header__nav a:hover {
  border-color: #1aa60e;
  color: #19b124;
  border-radius: 48px;
}
</style>
