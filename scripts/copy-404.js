import { copyFile } from 'fs/promises';
import { join } from 'path';

async function copy404() {
  try {
    // Copy index.html to 404.html
    await copyFile(
      join(process.cwd(), 'dist', 'index.html'),
      join(process.cwd(), 'dist', '404.html')
    );
    console.log('Successfully copied index.html to 404.html');

    // Also copy the public 404.html if it exists
    try {
      await copyFile(
        join(process.cwd(), 'public', '404.html'),
        join(process.cwd(), 'dist', '404.html')
      );
      console.log('Successfully copied custom 404.html');
    } catch (error) {
      // Ignore error if public/404.html doesn't exist
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error copying files:', error);
    process.exit(1);
  }
}

copy404(); 