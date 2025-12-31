import fetch from "node-fetch";

const domain = "1secmail.com";

function randomEmail() {
  return Math.random().toString(36).substring(2, 10);
}

const login = randomEmail();
const email = `${login}@${domain}`;

console.clear();
console.log("📧 TEMP MAIL CLI (FREE)");
console.log("========================");
console.log("Email:", email);
console.log("========================\n");

async function loadInbox() {
  try {
    const inboxURL = `https://www.1secmail.com/api/v1/?action=getMessages&login=${login}&domain=${domain}`;
    const res = await fetch(inboxURL);
    const mails = await res.json();

    console.clear();
    console.log("📧 TEMP MAIL CLI");
    console.log("========================");
    console.log("Email:", email);
    console.log("========================\n");

    if (mails.length === 0) {
      console.log("📭 Inbox empty...");
    } else {
      for (const mail of mails) {
        console.log("📨 ID:", mail.id);
        console.log("From:", mail.from);
        console.log("Subject:", mail.subject);
        console.log("------------------------");

        const readURL = `https://www.1secmail.com/api/v1/?action=readMessage&login=${login}&domain=${domain}&id=${mail.id}`;
        const msgRes = await fetch(readURL);
        const msg = await msgRes.json();

        console.log(msg.textBody || msg.htmlBody);
        console.log("========================\n");
      }
    }
  } catch (err) {
    console.log("❌ Error:", err.message);
  }
}

// Auto refresh every 5 seconds
setInterval(loadInbox, 5000);
