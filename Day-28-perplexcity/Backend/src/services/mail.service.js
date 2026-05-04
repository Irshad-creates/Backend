import nodemailer from "nodemailer"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, "../../.env")
})

const transporter  =  nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user : process.env.GOOGLE_USER,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        refreshToken : process.env.GOOGLE_REFRESH_TOKEN,
        clientId : process.env.GOOGLE_CLIENT_ID
    }
})

transporter.verify()
    .then(()=>{console.log("Email transporter is ready to send emails")})
    .catch((err)=>{console.error("Email transporter verification failed",err)})

export async function sendEmail({to, subject, html, text=""}) {
    const mailOptions={
        from:process.env.GOOGLE_USER,
        to,
        subject,
        html, 
        text
    }

    try {
        await transporter.sendMail(mailOptions); 
        return "Email sent succesfully to " + to;
    } catch (error) {
        console.error("Email send failed:", error);
        throw new Error(`Email send failed: ${error.message}`);
    }
}
