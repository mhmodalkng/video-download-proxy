const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// الـ endpoint الذي يستقبل طلبات GET
app.get('/download', async (req, res) => {
  const videoUrl = req.query.url; // استخراج رابط الفيديو من الرابط (URL query parameter)
  const format = req.query.format; // استخراج صيغة الفيديو (مثل mp4, mp3)

  if (!videoUrl || !format) {
    return res.status(400).json({ error: "مطلوب URL الفيديو وصيغة الفيديو" });
  }

  const apiUrl = `https://p.oceansaver.in/ajax/download.php?url=${encodeURIComponent(videoUrl)}&f=${format}&color=ffdf00`;

  try {
    // إرسال طلب API إلى الرابط الذي يوفر رابط التحميل
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success && data.download_url) {
      // إرسال رابط التحميل إلى العميل
      res.json({ download_url: data.download_url });
    } else {
      res.status(500).json({ error: "فشل في الحصول على رابط التحميل." });
    }
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء الاتصال بـ API." });
  }
});

// تشغيل الخادم على المنفذ 3000 أو المنفذ الذي يحدده Vercel
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
