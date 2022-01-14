import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import styleImport, { AndDesignVueResolve } from 'vite-plugin-style-import';
import path from 'path';
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
          'primary-color': '#5e81ff',
          'link-color': '#5e81ff',
          // 'menu-dark-color': '#1F263E',
          // 'menu-dark-bg': '#1F263E',
        },
        // additionalData: '@import "./src/style/theme.less";',
        javascriptEnabled: true
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.112.210:8092',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
