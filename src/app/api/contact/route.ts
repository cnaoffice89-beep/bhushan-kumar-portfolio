import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const projectType = body.projectType?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return Response.json(
        {
          success: false,
          message: "Name, email and message are required.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Bhushan Portfolio <onboarding@resend.dev>",
      to: ["cnaoffice89@gmail.com"],
      replyTo: email,
      subject: `Portfolio Inquiry — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Portfolio Contact</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Project Type:</strong> ${
            projectType || "Not selected"
          }</p>

          <h3>Message</h3>
          <p>${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);

      return Response.json(
        {
          success: false,
          message: "Unable to send message.",
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Message sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}