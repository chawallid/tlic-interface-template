# 🧩 Prompt Templates — นำ TLIC Design System ไปใช้งานต่อ

รวม prompt สำเร็จรูปสำหรับสั่ง AI agent (Claude Code / Cursor / Copilot) ให้นำ design system นี้ไปใช้งาน
โดยแยกเป็น **2 ฟังก์ชัน** ตามลักษณะงาน

> 💡 **มีหน้า UI ให้เลือกและ generate prompt อัตโนมัติแล้วที่ [`/prompts`](http://localhost:3000/prompts)**
> เลือกรูปแบบ → กรอกรายละเอียดโปรเจกต์ → กดคัดลอก (รองรับทั้ง EN / ไทย)
> ไฟล์นี้เก็บไว้เป็นฉบับอ้างอิงแบบอ่านอย่างเดียว

| ฟังก์ชัน | ใช้เมื่อไร | ผลลัพธ์ |
|---------|-----------|---------|
| [**A. Bootstrap**](#a-bootstrap--สร้างระบบใหม่จาก-template) | เริ่มโปรเจกต์ใหม่จากศูนย์ | ระบบใหม่ที่ re-brand แล้วทั้งชุด |
| [**B. Retrofit**](#b-retrofit--ปรับปรุง-design-code-ของระบบเดิม) | มีระบบอยู่แล้ว อยากยกระดับ UI | โค้ดเดิมถูกปรับให้เข้ากับ design language นี้ |

**Repository อ้างอิง:**

```
https://github.com/chawallid/tlic-interface-template.git
```

---

## A. Bootstrap — สร้างระบบใหม่จาก template

> ใช้เมื่อต้องการ **โปรเจกต์ใหม่** ที่ใช้โครงสร้าง component และ design token ชุดเดียวกัน

```
อ้างอิง design system template จาก git repository นี้:
https://github.com/chawallid/tlic-interface-template.git  (branch: main)

ให้ clone มาเป็นจุดตั้งต้นของโปรเจกต์ใหม่ชื่อ "[ชื่อโปรเจกต์]" แล้วทำตามขั้นตอนนี้:

1) SETUP
   - git clone https://github.com/chawallid/tlic-interface-template.git [ชื่อโปรเจกต์]
   - ลบ git history เดิมแล้วเริ่ม repo ใหม่ (rm -rf .git && git init)
   - npm install --include=dev   ← ต้องใส่ --include=dev
   - npm run dev                 ← ต้องใช้ script นี้ ห้ามเรียก next dev ตรง ๆ

2) RE-BRAND  เปลี่ยนจาก "TLIC" เป็น "[ชื่อแบรนด์ใหม่]" ทุกจุด:
   - lib/i18n.ts               ข้อความ EN / ไทย ทั้งหมด
   - components/layout/Logo.tsx + ไฟล์โลโก้ใน /public
   - app/layout.tsx            metadata (title, description, favicon)
   - package.json, README.md

3) DESIGN TOKENS  ปรับใน app/globals.css และ tailwind.config.ts:
   - primary / secondary / accent ให้ตรง brand guideline ใหม่
   - ตรวจ contrast ให้ผ่าน WCAG AA ทั้ง light และ dark mode
   - คงชื่อ token เดิมไว้ (primary-500, text-muted ฯลฯ) เพื่อไม่ให้ component พัง

4) MOCK DATA  แทนที่ lib/mock-data.ts ด้วยข้อมูลของโดเมนใหม่
   (เช่น e-commerce → orders/products แทน learners/courses)
   ⚠️ ใช้ชื่อ-อีเมลสมมุติเท่านั้น (@example.com) ห้ามใส่ข้อมูลบุคคลจริง

5) VERIFY  รัน npm run dev แล้วเปิดตรวจทุกหน้า
   (/ /colors /typography /buttons /forms /cards /navigation /data-display /feedback /layouts)
   ทั้ง light/dark mode และ EN/ไทย ก่อน commit แรก
```

---

## B. Retrofit — ปรับปรุง design code ของระบบเดิม

> ใช้เมื่อ **มีระบบอยู่แล้ว** และต้องการยกระดับ UI ให้เข้ากับ design language นี้ โดยไม่ rewrite ทั้งหมด

```
ใช้ design system นี้เป็น "reference implementation":
https://github.com/chawallid/tlic-interface-template.git  (branch: main)

ผมมีระบบเดิมอยู่ที่ [path/URL ของโปรเจกต์] เขียนด้วย [Next.js / React / Vue / ฯลฯ]
ต้องการปรับ design code ให้เข้ากับ design language ของ template นี้ โดย:

1) STUDY  อ่าน reference ก่อนเริ่มแก้ (ดึงผ่าน git ได้เลย):
   - app/globals.css           ชุด design token + base layer
   - components/ui/*           Button, Card, Input, Badge, Avatar, Modal
   - components/layout/*       Sidebar, Navbar, Logo
   - README.md                 หลักการของระบบ
   สรุปให้ผมก่อนว่า token / pattern หลักมีอะไรบ้าง

2) AUDIT  เทียบระบบเดิมกับ reference แล้วทำรายงานเป็นตาราง:
   | จุดที่พบ | ไฟล์:บรรทัด | ปัญหา | แนวทางแก้ตาม reference |
   เน้น 4 เรื่องนี้:
   - hardcoded color / spacing ที่ควรเป็น token
   - component ซ้ำซ้อนที่ควรยุบเป็นตัวเดียว
   - สถานะที่ขาด (hover / focus-visible / disabled / loading / empty)
   - dark mode และ accessibility (contrast, focus ring, touch target)

3) PLAN  เสนอลำดับการแก้แบบ incremental — token ก่อน แล้วค่อย component
   แล้ว layout — พร้อมประเมินผลกระทบต่อหน้าจอที่มีอยู่ อย่าเพิ่งแก้จนกว่าผมจะอนุมัติ

4) APPLY  เมื่ออนุมัติแล้ว แก้ทีละกลุ่ม + commit แยกเป็นเรื่อง ๆ
   ข้อกำหนด:
   - ห้ามเปลี่ยน business logic / API contract
   - คง API ของ component เดิมไว้ ถ้าจำเป็นต้องเปลี่ยนให้แจ้งก่อน
   - ทุกหน้าต้องผ่านทั้ง light/dark mode

5) VERIFY  รัน build + เปิดดูจริงทุกหน้าที่แตะ แล้วสรุป before/after ให้ผม
```

---

## 💡 Tips

- **ล็อกเวอร์ชัน reference** — เติม `--depth 1 --branch main` ตอน clone หรืออ้าง commit hash เจาะจง เพื่อให้ผลลัพธ์คงที่
- **ไม่อยาก clone ทั้ง repo?** ใช้ prompt B แล้วให้ agent อ่านเฉพาะไฟล์ที่ระบุใน STUDY ผ่าน GitHub raw URL
- **ข้อควรระวังของเครื่องนี้** — มี `NODE_ENV=production` ตั้งไว้ระดับ global ทำให้ต้องใช้ `npm install --include=dev` และ `npm run dev` เสมอ (ดูรายละเอียดใน [README.md](README.md))
