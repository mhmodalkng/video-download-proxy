const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// نقطة النهاية (Endpoint) لتمرير الطلب
app.get('/download', async (req, res) => {
  const videoUrl = req.query.url; // رابط الفيديو
  const format = req.query.format; // صيغة الفيديو (مثل 360p, mp4, mp3)
  
  const apiUrl = `https://p.oceansaver.in/ajax/download.php?url=${encodeURIComponent(videoUrl)}&f=${format}&color=ffdf00`;

  try {
    // إجراء الطلب إلى API
    const response = await fetch(apiUrl);
    const data = await response.json(); // الحصول على الرد بصيغة JSON
    
    if (data.success && data.download_url) {
      res.json({ download_url: data.download_url }); // إرسال رابط التحميل
    } else {
      res.status(500).json({ error: "فشل في الحصول على رابط التحميل." });
    }
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء الاتصال بـ API." });
  }
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
