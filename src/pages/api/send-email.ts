import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, vision } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Movie Blog <onboarding@resend.dev>',
      to: ['your-email@example.com'], // Replace with your email
      subject: 'New Vision Shared',
      text: `
        Name: ${name}
        Email: ${email}
        Vision: ${vision}
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}