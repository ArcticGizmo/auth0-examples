<template>
  <div class="avatar">
    <img :src="imgData" />
    <img style="display: none" class="checker" :src="src" @error="onError" @load="onLoaded" />
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    fallback: { type: String, default: 'default-avatar.png' },
  },
  data() {
    return {
      imgData: null,
    };
  },

  created() {
    this.setFallback();
  },

  methods: {
    setFallback() {
      this.imgData = this.fallback;
    },
    onError(e) {
      this.setFallback();
    },
    onLoaded() {
      this.imgData = this.src;
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 2rem;
  height: 2rem;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
</style>
