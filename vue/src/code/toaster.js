import { createToaster } from '@meforma/vue-toaster';

export function useToaster(options) {
  const opts = { ...(options || {}), position: 'top-right' };

  return createToaster(opts);
}
