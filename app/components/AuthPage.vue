<script setup lang="ts">
const props = defineProps<{ mode: 'login' | 'create' }>()
const status = ref('')
const isCreate = computed(() => props.mode === 'create')
const submit = () => {
  status.value = isCreate.value
    ? 'Accounts aren’t open yet. Your draft is still saved on this device.'
    : 'Sign-in isn’t open yet. You can keep working on your draft.'
}
</script>

<template>
  <div class="auth-page notebook-paper">
    <a class="skip-link" href="#auth-form">Skip to form</a>
    <SiteHeader />
    <main>
      <section class="auth-intro">
        <p class="eyebrow">{{ isCreate ? 'Keep your drafts together' : 'Welcome back' }}</p>
        <h1>{{ isCreate ? 'Create your account.' : 'Log in.' }}</h1>
        <p>{{ isCreate ? 'Make pages for free. Sign in when you want to save them to your account or take over the live page.' : 'Open your saved drafts, manage a live page and request removal of pages in your history.' }}</p>
        <span aria-hidden="true">{{ isCreate ? '✎' : '↳' }}</span>
      </section>
      <form id="auth-form" class="auth-form" @submit.prevent="submit">
        <div v-if="isCreate" class="field"><label for="auth-name">Display name</label><input id="auth-name" autocomplete="name" maxlength="50" required></div>
        <div class="field"><label for="auth-email">Email</label><input id="auth-email" autocomplete="email" inputmode="email" type="email" required></div>
        <div class="field"><label for="auth-password">Password</label><input id="auth-password" :autocomplete="isCreate ? 'new-password' : 'current-password'" minlength="8" type="password" required><small v-if="isCreate">Use at least 8 characters.</small></div>
        <div v-if="isCreate" class="field"><label for="auth-password-confirm">Confirm password</label><input id="auth-password-confirm" autocomplete="new-password" minlength="8" type="password" required></div>
        <button class="button" type="submit">{{ isCreate ? 'Create account' : 'Log in' }}</button>
        <p class="auth-switch">{{ isCreate ? 'Already have an account?' : 'New here?' }} <NuxtLink :to="isCreate ? '/login' : '/create-account'">{{ isCreate ? 'Log in' : 'Create an account' }}</NuxtLink></p>
        <p class="auth-status" role="status">{{ status }}</p>
      </form>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.auth-page { min-height: 100dvh; border: 5px solid var(--ink); }
.auth-page main { display: grid; min-height: calc(100dvh - var(--header-height)); grid-template-columns: 1fr 1fr; }
.auth-intro { position: relative; display: grid; align-content: center; border-right: var(--line); background: #ffe2f1; padding: clamp(3rem, 8vw, 7rem); }
.auth-intro h1 { max-width: 10ch; margin: 0.5rem 0 1rem; font-family: var(--font-display); font-size: clamp(3rem, 7vw, 6.5rem); letter-spacing: -0.05em; line-height: 0.96; }
.auth-intro p:last-of-type { max-width: 38rem; margin: 0; font-size: 1.1rem; line-height: 1.55; }
.auth-intro > span { position: absolute; right: 10%; bottom: 10%; color: #d82179; font-family: var(--font-hand); font-size: 4rem; transform: rotate(-8deg); }
.auth-form { display: grid; width: min(100% - 2.5rem, 34rem); align-content: center; justify-self: center; gap: 1.1rem; padding-block: 4rem; }
.auth-form .button { width: 100%; margin-top: 0.4rem; }
.auth-switch, .auth-status { margin: 0; line-height: 1.5; }
.auth-switch a { font-weight: 900; text-underline-offset: 0.2rem; }
.auth-status { min-height: 3rem; color: var(--muted); }
@media (max-width: 760px) { .auth-page { border-width: 3px; } .auth-page main { grid-template-columns: 1fr; } .auth-intro { min-height: 24rem; border-right: 0; border-bottom: var(--line); padding: 3rem 1.5rem; } .auth-intro > span { right: 1.5rem; bottom: 1rem; font-size: 2.8rem; } }
</style>
