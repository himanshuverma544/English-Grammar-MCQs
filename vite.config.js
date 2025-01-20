import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  base: "/English-Grammar-MCQs/",
  plugins: [react()],
});
