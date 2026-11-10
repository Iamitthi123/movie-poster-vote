# 🎬 CineVote - 1v1 Movie Poster Tournament Web Application
> ระบบเว็บแอปพลิเคชันสำหรับโหวตโปสเตอร์ภาพยนตร์แบบทัวร์นาเมนต์จับคู่ 1 ต่อ 1 (1v1 Knockout Bracket คล้ายเว็บ Ideal Type WorldCup) แสดงเฉพาะรูปภาพโปสเตอร์ล้วนๆ พร้อมระบบบันทึกผลลง Google Sheets

---

## 🌟 ฟีเจอร์หลักและการทำงานตามเงื่อนไข (Features Overview)

### 1. ข้อมูลโปสเตอร์และการจัดการรูปภาพ (Image-Only Mode)
- **โปสเตอร์ 12 รูป (P01 ถึง P12):** แสดงเฉพาะรูปภาพล้วนๆ อัตราส่วน 2:3 ไม่มีช่องกรอกชื่อเรื่องหรือชื่อผู้ส่ง
- **ระบบแอดมิน (Admin Tab):**
  - **📁 Bulk Upload:** อัปโหลดไฟล์จากเครื่องทีเดียวหลายรูปพร้อมกัน (สูงสุด 12 รูป)
  - **🖼️ เปลี่ยนทีละรูป:** อัปโหลดไฟล์แทนที่เฉพาะรูปใดรูปหนึ่ง
  - **🔗 Image URL:** วางลิงก์รูปภาพจากภายนอก พร้อมหน้าต่างพรีวิวสดก่อนบันทึก
  - **✨ 12 Default SVG Placeholders:** มาพร้อมภาพโปสเตอร์แนว Dark Cinema 12 ธีมภาพยนตร์ พร้อมทดสอบและใช้งานได้ทันทีแบบ Offline
  - **⚙️ Auto Canvas Optimization:** บีบอัดและปรับสัดส่วน 2:3 อัตโนมัติ ป้องกันปัญหาพื้นที่ `localStorage` เต็ม พร้อมสำรองข้อมูลลง `IndexedDB`

### 2. การยืนยันตัวตนก่อนโหวต (Student ID Gate)
- ต้องระบุ **"รหัสนักศึกษา"** ก่อนเริ่มการแข่งขัน
- **กติกาอัปเดตทับ:** ถ้ารหัสนักศึกษาเดิมเข้ามาโหวตซ้ำ ระบบจะตรวจจับและอัปเดตทับผลโหวตเดิมของรหัสนักศึกษานั้นให้เป็นรูปสุดท้ายที่เลือกล่าสุดโดยอัตโนมัติ

### 3. ระบบจับคู่โหวตแบบทัวร์นาเมนต์ (12-Item Tournament - รวม 11 แมตช์)
- **สุ่มลำดับ (Randomize):** สุ่มรูปทั้ง 12 รูปใหม่ทุกครั้งที่เริ่มโหวต
- **ระบบควบคุม:** รองรับทั้งการคลิกที่รูปภาพ และการกดแป้นพิมพ์ลูกศรซ้าย <kbd>←</kbd> / ขวา <kbd>→</kbd>
- **ลำดับการแข่งขัน 11 แมตช์:**
  - **รอบที่ 1 (12 รูป เหลือ 6 รูป):** ดวลกัน 6 คู่ คัดเลือก 6 รูป
  - **รอบที่ 2 (6 รูป เหลือ 3 รูป):** ดวลกัน 3 คู่ คัดเลือก 3 รูป
  - **รอบรองชนะเลิศ (Semi-Final, 3 รูป เหลือ 2 รูป):** สุ่ม 1 รูปได้รับสิทธิ์ **บาย (BYE)** เข้าสู่รอบชิงชนะเลิศอัตโนมัติ และนำอีก 2 รูปมาดวลกัน 1 คู่
  - **รอบชิงชนะเลิศ (The Grand Final, 2 รูป เหลือ 1 รูป):** นำผู้ชนะรอบรองมาดวลกับรูปที่ได้บาย จนได้โปสเตอร์ชนะเลิศเพียง 1 รูปของผู้โหวตคนนั้น

### 4. กติกาการสรุปผลโหวต 2 อันดับแรก (Top 2 Leaderboard & Tie-Breaker Rule)
- นับคะแนนเฉพาะ **"รูปสุดท้ายเพียง 1 รูป"** ที่แต่ละรหัสนักศึกษาเลือกเท่านั้น
- **กติกาพิเศษกรณีคะแนนเท่ากัน:**
  - **กรณีคะแนนอันดับ 1 เท่ากันตั้งแต่ 2 รูปขึ้นไป:** ระบบจะดึงโปสเตอร์ที่ได้อันดับ 1 ร่วม (Co-Champion) ทั้งหมดมาแสดงเป็นผู้ชนะทันที **โดยไม่ดึงอันดับ 2 มาแสดง**
  - **กรณีมีอันดับ 1 เพียงรูปเดียว:** ระบบจะแสดงอันดับ 1 (Champion) และอันดับ 2 (Runner-Up) ตามปกติ
- **ตารางคะแนนรวม 12 รูป:** แสดงอันดับ, รูป Thumbnail, รหัส, ป้ายกำกับ, จำนวนคะแนน, สัดส่วนร้อยละ (%) และแถบ Progress Bar
- **ตารางประวัติผู้โหวต:** แสดงประวัติรายรหัสนักศึกษา สามารถกดลบรายคน หรือกดล้างคะแนนโหวตทั้งหมดได้

### 5. การเชื่อมต่อ Google Sheet (Google Sheets Integration)
- **คอลัมน์ที่บันทึก:** `[Timestamp, รหัสนักศึกษา, รหัสโปสเตอร์, โปสเตอร์สุดท้ายที่เลือก]`
- **Webhook POST:** ส่งข้อมูล JSON ผ่าน `fetch()` อัตโนมัติทันทีที่จบการแข่งขัน
- **เครื่องมือสนับสนุน:**
  - ปุ่มทดสอบการเชื่อมต่อ Google Sheet Webhook
  - ปุ่มส่งออกไฟล์ CSV รองรับภาษาไทยสมบูรณ์ (UTF-8 BOM ป้องกันภาษาต่างดาวใน Microsoft Excel)
  - หน้าต่าง Modal แสดงโค้ด Google Apps Script (`doPost`) พร้อมปุ่มคัดลอกและขั้นตอนติดตั้งอย่างละเอียด

### 6. ดีไซน์ Dark Cinema Theme & ห้ามใช้ Alert/Confirm
- **โทนสีโรงภาพยนตร์พรีเมียม:** พื้นหลัง `#0a0a0f` ผสานสีทอง Amber `#f59e0b` และสีแดง Rose Velvet `#f43f5e`
- **Typography:** ฟอนต์ **Kanit** และ Tailwind CSS Responsive Mobile & Desktop
- **100% No Browser `alert()` / `confirm()`:** ใช้ระบบ Custom Toast Notification และ Custom Modal Window ทั้งหมด

---

## 🚀 วิธีการเปิดใช้งาน (How to Run)

### วิธีที่ 1: เปิดผ่าน Local Node.js Server
```bash
# รันเซิร์ฟเวอร์
npm start
# หรือ
node server.js
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

### วิธีที่ 2: เปิดไฟล์ `index.html` โดยตรง
สามารถดับเบิ้ลคลิกไฟล์ `index.html` เพื่อเปิดใช้งานบน Google Chrome, Edge หรือ Safari ได้ทันที ไม่ต้องติดตั้งโปรแกรมเพิ่มเติม

---

## 📝 วิธีติดตั้ง Google Apps Script สำหรับบันทึกผลลง Google Sheets

1. เปิด [Google Sheets](https://sheets.new) แล้วสร้างชีตใหม่
2. ไปที่เมนู **ส่วนขยาย (Extensions)** &gt; **Apps Script**
3. ลบโค้ดเดิมทั้งหมด แล้ววางโค้ดด้านล่างนี้ลงไป:

```javascript
// Google Apps Script สำหรับ CineVote
// รองรับทั้ง POST บันทึกผลโหวต และ GET ดึงข้อมูลผลโหวตทั้งหมดแบบ Real-Time

function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rows = sheet.getDataRange().getValues();
    var data = [];

    // แถวที่ 0 คือหัวตาราง [วันเวลา, รหัสนักศึกษา, รหัสโปสเตอร์, โปสเตอร์สุดท้ายที่เลือก]
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if (row[1]) { // มีรหัสนักศึกษา
        data.push({
          timestamp: row[0] ? String(row[0]) : '',
          studentId: String(row[1]).trim(),
          winnerId: String(row[2]).trim(),
          posterCode: String(row[2]).trim(),
          winnerLabel: String(row[3]).trim(),
          posterLabel: String(row[3]).trim()
        });
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", count: data.length, votes: data, data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // สร้างหัวตารางอัตโนมัติหากชีตยังว่างอยู่
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["วันเวลา (Timestamp)", "รหัสนักศึกษา", "รหัสโปสเตอร์", "โปสเตอร์สุดท้ายที่เลือก"]);
      var headerRange = sheet.getRange(1, 1, 1, 4);
      headerRange.setFontWeight("bold").setBackground("#1e293b").setFontColor("#ffffff");
    }

    var payload = JSON.parse(e.postData.contents);
    var studentId = String(payload.studentId || "").trim();
    var posterCode = String(payload.winnerId || payload.posterCode || "").trim();
    var posterLabel = String(payload.winnerLabel || payload.posterLabel || "").trim();
    var timestamp = payload.timestamp || Utilities.formatDate(new Date(), "Asia/Bangkok", "dd/MM/yyyy HH:mm:ss");

    if (!studentId || !posterCode) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Missing studentId or winnerId" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // ตรวจสอบว่ารหัสนักศึกษานี้เคยมีในระบบแล้วหรือไม่ (คอลัมน์ B)
    // หากมีอยู่แล้ว -> อัปเดตทับแถวเดิมตามกติกา
    var values = sheet.getDataRange().getValues();
    var foundRow = -1;
    for (var i = 1; i < values.length; i++) {
      if (String(values[i][1]).trim().toLowerCase() === studentId.toLowerCase()) {
        foundRow = i + 1;
        break;
      }
    }

    if (foundRow > 0) {
      sheet.getRange(foundRow, 1, 1, 4).setValues([[timestamp, studentId, posterCode, posterLabel]]);
    } else {
      sheet.appendRow([timestamp, studentId, posterCode, posterLabel]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success", updated: foundRow > 0, studentId: studentId }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

4. กด **บันทึก (Save)**
5. กดปุ่มสีน้ำเงิน **ทำให้ใช้งานได้ (Deploy)** &gt; **การทำให้ใช้งานได้รายการใหม่ (New deployment)**
6. เลือกประเภท: **เว็บแอปพลิเคชัน (Web app)**
7. กำหนดการตั้งค่า:
   - **เรียกใช้ในฐานะ (Execute as):** `ฉัน (Me)`
   - **ผู้มีสิทธิ์เข้าถึง (Who has access):** `ทุกคน (Anyone)` *(สำคัญมาก)*
8. กด **ทำให้ใช้งานได้ (Deploy)** และอนุมัติสิทธิ์ (Authorize)
9. คัดลอก **URL เว็บแอปพลิเคชัน** มาวางในช่อง **Google Sheet Webhook URL** ในแท็บ **จัดการระบบ (Admin)** ของเว็บแอปพลิเคชัน แล้วกด "บันทึก URL"
