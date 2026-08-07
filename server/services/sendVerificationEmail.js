import transporter from "@/server/lib/mail";
import config from "@/config";

export default async function sendVerificationEmail({
  email,
  guestName,
  token,
}) {
  const verifyUrl = `${config.PORTAL}/api/news/contact/verify?token=${token}`;

  await transporter.sendMail({
    from: `"404 News" <${config.EMAIL_USER}>`,
    to: email,
    subject: "Confirma tu correo electrónico",
    html: `
      <h2>Hola ${guestName}</h2>

      <p>Hemos recibido una solicitud de contacto.</p>

      <p>
        Para confirmar que este correo electrónico te pertenece,
        haz clic en el siguiente botón:
      </p>

      <p>
        <a
          href="${verifyUrl}"
          style="
            background:#2563eb;
            color:white;
            padding:12px 20px;
            text-decoration:none;
            border-radius:6px;
            display:inline-block;
          "
        >
          Confirmar correo
        </a>
      </p>

      <p>
        Si no realizaste esta solicitud,
        simplemente ignora este correo.
      </p>
    `,
  });
}