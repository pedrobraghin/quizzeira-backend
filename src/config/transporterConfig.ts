interface Transporter {
  host: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const transporter: Transporter = {
  host: String(process.env.EMAIL_HOST),
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: String(process.env.EMAIL_USER),
    pass: String(process.env.EMAIL_PASS),
  },
};

if (process.env.NODE_ENV === "production") {
  transporter.secure = true;
}

export { transporter };
