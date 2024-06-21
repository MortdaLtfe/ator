export const restPasswordEmailTemplate = (name, url) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: auto;
        }
        .button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 4px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Hello ${name},</h2>
        <p>You have requested to reset your password. To use the reset token, please follow the instructions below.</p>
        <p>Please use this token to reset your password within the next 30 minutes. If you did not request a password reset, please ignore this email.</p>
        <p>To reset your password, please click on the link below:</p>
        <p><a href="${url}" class="button">Reset Password</a></p>
        <p>Thank you, <br><b>Ator<b/> Support Team</p>
    </div>
</body>
</html>
`;
