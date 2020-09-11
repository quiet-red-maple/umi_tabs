import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    'primary-color': '#00c1de',
  },
  plugins: ['@alitajs/keep-alive'],
  keepalive: ['/business/myInfo', '/business/infoMaintain'],
});
