import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  AntDesignVueResolver
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import styleImport, { AndDesignVueResolve } from 'vite-plugin-style-import';
import path from 'path';

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
          return `ant-design-vue/es/${name}/style/index.css`;
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
        AntDesignVueResolver()
      ]
    })
  ],
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
