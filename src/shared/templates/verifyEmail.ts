export const verifyEmailTemplate = (url) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email Address</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        h1 {
            color: #333;
        }
        p {
            color: #666;
        }
        a {
            color: #1a73e8;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #1a73e8;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Verify Your Email Address</h1>
        
        <p>Thank you for signing up with Ator! To complete your registration, please verify your email address by clicking the link below:</p>
        <p><a class="button" href="${url}">Verify Email</a></p>
        <p>If you did not sign up for an account with us, please disregard this email.</p>
        <p>Thank you for your cooperation!</p>
        <p>Best regards,</p>
        <p>Ator Team</p>
    </div>
</body>
</html>
`;
