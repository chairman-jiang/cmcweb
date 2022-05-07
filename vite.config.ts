import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import styleImport, { AndDesignVueResolve } from 'vite-plugin-style-import';
import path from 'path';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
// import Pages from 'vite-plugin-pages';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    vueSetupExtend(),
    styleImport({
      resolves: [AndDesignVueResolve()],
      libs: [{
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index.less`;
        }
      }]
    }),
    Components({
      // dirs: ['src'],
      // extensions: ['vue', 'ts'],
      resolvers: [
        // (name) => {
        //   console.log(name, 'name')
        // }
        AntDesignVueResolver({
          importStyle: 'less'
        })
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#3853fd',
          'link-color': '#3853fd',
          'table-header-bg': '#f9fbff',
          'table-border-color': '#edf1f4',
          // 'link-color': '#5e81ff',
          // 'menu-dark-color': '#1F263E',
          // 'menu-dark-bg': '#1F263E',
        },
        additionalData: `
                          @import "./src/style/variable.less";
                          @import "./src/style/mixins.less";
                        `,
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
