const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url; // رابط الفيديو
  const format = req.query.format; // صيغة الفيديو (مثل 360p, mp4, mp3)

  const apiUrl = `https://p.oceansaver.in/ajax/download.php?url=${encodeURIComponent(videoUrl)}&f=${format}&color=ffdf00`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success && data.download_url) {
      res.json({ download_url: data.download_url });
    } else {
      res.status(500).json({ error: "فشل في الحصول على رابط التحميل." });
    }
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء الاتصال بـ API." });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
