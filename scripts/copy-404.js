import { copyFile } from 'fs/promises';
import { join } from 'path';

async function copy404() {
  try {
    await copyFile(
      join(process.cwd(), 'dist', 'index.html'),
      join(process.cwd(), 'dist', '404.html')
    );
    console.log('Successfully copied index.html to 404.html');
  } catch (error) {
    console.error('Error copying file:', error);
    process.exit(1);
  }
}

copy404(); 