const https = require('https');
const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, 'public', 'fonts');

// Ensure fonts directory exists
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

// Function to download a file
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close(resolve);
        console.log(`Downloaded: ${destination}`);
      });
      
      file.on('error', (err) => {
        fs.unlink(destination, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(destination, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

// List of Google Fonts to download
const googleFonts = [
  {
    name: 'JetBrains-Mono-Regular',
    url: 'https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff2'
  },
  {
    name: 'JetBrains-Mono-Medium',
    url: 'https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxTOlOV.woff2'
  },
  {
    name: 'IBM-Plex-Mono-Regular',
    url: 'https://fonts.gstatic.com/s/ibmplexmono/v12/-F63fjptAgt5VM-kVkqdyU8n1iIq131nj-otFQ.woff2'
  },
  {
    name: 'Space-Grotesk-Regular',
    url: 'https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUXskPMBBSSJLm2E.woff2'
  },
  {
    name: 'Space-Grotesk-Medium',
    url: 'https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7aUXskPMBBSSJLm2E.woff2'
  },
  {
    name: 'Space-Grotesk-SemiBold',
    url: 'https://fonts.gstatic.com/s/spacegrotesk/v13/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7nUHskPMBBSSJLm2E.woff2'
  },
  {
    name: 'Orbitron-Regular',
    url: 'https://fonts.gstatic.com/s/orbitron/v28/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2'
  },
  {
    name: 'Orbitron-Medium',
    url: 'https://fonts.gstatic.com/s/orbitron/v28/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKS6BoWgz.woff2'
  },
  {
    name: 'Orbitron-SemiBold',
    url: 'https://fonts.gstatic.com/s/orbitron/v28/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyKy6BoWgz.woff2'
  },
  {
    name: 'IBM-Plex-Sans-Regular',
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v14/zYXgKVElMYYaJe8bpLHnCwDKhdHeFaxOedc.woff2'
  },
  {
    name: 'IBM-Plex-Sans-Italic',
    url: 'https://fonts.gstatic.com/s/ibmplexsans/v14/zYX-KVElMYYaJe8bpLHnCwDKhdTuF6ZJW9XjDg.woff2'
  },
  {
    name: 'Inter-Regular',
    url: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2'
  }
];

// Download each font
async function downloadFonts() {
  for (const font of googleFonts) {
    const destination = path.join(fontsDir, `${font.name}.woff2`);
    try {
      await downloadFile(font.url, destination);
    } catch (error) {
      console.error(`Error downloading ${font.name}:`, error);
    }
  }

  console.log('Font download completed!');
}

downloadFonts(); 