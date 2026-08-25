import { experiences, projects, techSkillsGrouped } from "../../../lib/data";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

function buildSystemPrompt() {
  const skillsText = techSkillsGrouped
    .map((group) => `- **${group.category}**: ${group.skills.map((s) => s.name).join(", ")}`)
    .join("\n    ");

  const expText = experiences
    .map(
      (exp) =>
        `    - **${exp.title}** (${exp.company})\n      ระยะเวลา: ${exp.period}\n      รายละเอียด: ${exp.description}\n      Tags: ${exp.tags.join(", ")}`
    )
    .join("\n\n");

  const projText = projects
    .map(
      (proj) =>
        `    - **${proj.title}**\n      รายละเอียด: ${proj.description}\n      Tags: ${proj.tags.join(", ")}`
    )
    .join("\n\n");

  return `คุณคือ 'Best AI' ผู้ช่วย AI ประจำเว็บ Portfolio ของ Best Patcharapon 😊
คุณรู้ข้อมูลทุกอย่างเกี่ยวกับ Best และต้องตอบได้ครบถ้วน

======= ข้อมูลส่วนตัว =======
- ชื่อเต็ม: Patcharapon Yoriya (ภัชราพร โยริยะ)
- ชื่อเล่น: Best (เบส)
- ตำแหน่ง: Test Engineer / Software Developer
- โลเคชั่น: Chiang Mai, TH
- Email: patcharaponyo65@gmail.com
- GitHub: https://github.com/bestpatcharapon
- LinkedIn: https://www.linkedin.com/in/patcharapon-yoriya-153459357/
- วันเกิด: 4 ธันวาคม 2003

======= การศึกษา =======
- มหาวิทยาลัย: Rajamangala University of Technology Lanna (มทร.ล้านนา)
- ปริญญา: Bachelor of Electrical Engineering in Computer Engineering
- ปีการศึกษา: 2025-2026
- เกรดเฉลี่ยสะสม: 3.37 (Second Class Honors)

======= ประสบการณ์ (Experiences) =======
${expText}

======= โปรเจค (Projects) =======
${projText}

======= ทักษะ (Tech Skills) =======
${skillsText}

Soft Skills:
- Strong analytical thinking and problem-solving
- Fast learner, high attention to detail
- Effective communication and teamwork
- ประสบการณ์ทำงานร่วมกับ developers เพื่อ verify และ resolve defects
- คุ้นเคยกับ SDLC process และ Agile methodology

======= การจัดรูปแบบคำตอบ (IMPORTANT) =======
- พูดแบบเพื่อนสนิท สบายๆ เป็นกันเอง มีความมั่นใจ
- ตอบกระชับ แต่ครบถ้วน
- จัดหน้าให้อ่านง่าย **บังคับใช้ Bullet points (- หรือ *)** เสมอเมื่อมีการอธิบายหลายเรื่อง
- ใช้ **ตัวหนา (Bold)** สำหรับเน้นคำสำคัญตลอด (เช่น **ปัญหา**, **ระบบ**)
- ห้ามพิมพ์เป็นก้อนข้อความยาวๆ ติดกันแบบ Paragraph เดียว ควรเว้นบรรทัดให้พอดี
- ใส่ Emoji บ้างนิดหน่อย ให้ดูมีสีสันไม่น่าเบื่อ
- ตอบด้วยข้อมูลที่มาจากประวัติข้างบนนี้เท่านั้น`;
}

async function callGroq(apiKey, prompt) {
  const now = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());

  const systemMessage = `${buildSystemPrompt()}\n\n[ข้อมูลระบบ: วันที่และเวลาปัจจุบันคือ ${now} (เวลาประเทศไทย)]`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: prompt },
        ],
        reasoning_effort: "low",
        temperature: 0.7,
        max_tokens: 1024,
      }),
      signal: AbortSignal.timeout(30000),
    });

    const body = await response.json().catch(() => ({}));
    const content = body?.choices?.[0]?.message?.content;

    if (response.status === 200 && content) {
      return { success: true, message: content };
    }
    if (response.status === 429) {
      return { success: false, message: "AI มีผู้ใช้งานจำนวนมาก กรุณาลองใหม่อีกครั้งครับ 😅" };
    }
    console.error(
      `Groq API error (${response.status}):`,
      body?.error?.message || "Unknown error"
    );
    return { success: false, message: "เกิดข้อผิดพลาด กรุณาลองใหม่ 😅" };
  } catch (e) {
    console.error("Chatbot API error:", e.message);
    return { success: false, message: "เกิดข้อผิดพลาด กรุณาลองใหม่ 😅" };
  }
}

export async function POST(request) {
  const { prompt } = await request.json().catch(() => ({}));
  const trimmed = (prompt || "").trim();

  if (!trimmed) {
    return Response.json({ result: "กรุณาพิมพ์ข้อความ 😊" });
  }

  const apiKeys = [process.env.GROQ_API_KEY, process.env.GROQ_API_KEY_2].filter(Boolean);
  if (apiKeys.length === 0) {
    return Response.json({ result: "ยังไม่ได้ตั้งค่า API Key ครับ" });
  }

  let result = null;
  for (const key of apiKeys) {
    result = await callGroq(key, trimmed);
    if (result.success) break;
  }

  return Response.json({ result: result.message });
}
