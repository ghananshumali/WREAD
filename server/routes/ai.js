import express from "express";
import Groq from "groq-sdk";

const router = express.Router();



/* ---------- AI SUMMARY ---------- */

router.post("/summary", async (req, res) => {

 try {

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
   return res.status(500).json({
    message: "Groq API key missing"
   });
  }

  const groq = new Groq({
   apiKey: apiKey
  });

  const { text } = req.body;

  const chatCompletion = await groq.chat.completions.create({

   model: "llama-3.1-8b-instant",

   messages: [

    {
     role: "system",
     content:
      "Summarize the article into short bullet points highlighting the key insights clearly."
    },

    {
     role: "user",
     content: text
    }

   ]

  });

  const summary =
   chatCompletion.choices?.[0]?.message?.content
   || "Summary could not be generated.";

  res.json({ summary });

 } catch (error) {

  console.log("AI SUMMARY ERROR:", error);

  res.status(500).json({
   message: "AI summary failed"
  });

 }

});



/* ---------- AI WRITING IMPROVER ---------- */

router.post("/improve", async (req, res) => {

 try {

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
   return res.status(500).json({
    message: "Groq API key missing"
   });
  }

  const groq = new Groq({
   apiKey: apiKey
  });

  const { text } = req.body;

  const chatCompletion = await groq.chat.completions.create({

   model: "llama-3.1-8b-instant",

   messages: [

    {
     role: "system",
     content:
      "Improve grammar, spelling, clarity, and paragraph structure while keeping meaning same."
    },

    {
     role: "user",
     content: text
    }

   ]

  });

  const improvedText =
   chatCompletion.choices?.[0]?.message?.content
   || text;

  res.json({ improvedText });

 } catch (error) {

  console.log("AI IMPROVE ERROR:", error);

  res.status(500).json({
   message: "AI improvement failed"
  });

 }

});


export default router;