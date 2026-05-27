import { sendEmail } from "../services/mail.service.js";

export async function handleSendEmail(req, res) {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const response = await sendEmail({
      to,
      subject,
      html: `
                <div style="font-family:sans-serif;">
                    <p>${message}</p>
                </div>
            `,
      text: message,
    });

    return res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
