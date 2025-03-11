const { createHash } = require('crypto');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const multipart = require('parse-multipart');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse multipart form data
    const boundary = multipart.getBoundary(event.headers['content-type']);
    const parts = multipart.Parse(Buffer.from(event.body, 'base64'), boundary);
    
    if (!parts || parts.length === 0) {
      throw new Error('No file uploaded');
    }

    const file = parts[0];
    if (!file.type.startsWith('image/')) {
      throw new Error('Invalid file type');
    }

    // Generate unique filename
    const hash = createHash('md5').update(file.data).digest('hex');
    const ext = file.type.split('/')[1];
    const filename = `${hash}.${ext}`;

    // Ensure images directory exists
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    await mkdir(imagesDir, { recursive: true });

    // Save the file
    const filepath = path.join(imagesDir, filename);
    await writeFile(filepath, file.data);

    return {
      statusCode: 200,
      body: JSON.stringify({
        url: `/images/${filename}`
      })
    };
  } catch (error) {
    console.error('Error processing upload:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to process image upload'
      })
    };
  }
};