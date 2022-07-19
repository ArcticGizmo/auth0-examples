import { ref } from 'vue';

export default function useTimer(duration) {
  const timer = ref(new Date());
  setInterval(() => {
    timer.value = new Date();
  }, duration);

  return timer;
}
