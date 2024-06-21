export const successfulyRestPasswordTemplate = `<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>نجاح إعادة تعيين كلمة المرور</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Cairo', sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .success-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 340px;
        }
        .success-container h2 {
            margin-bottom: 0;
            color: #007bff;
            font-weight: 700;
        }
        .success-container p {
            color: #0056b3;
            margin-bottom: 20px;
            font-weight: 400;
        }
    </style>
    <script>
        function updateLanguage() {
            const urlParams = new URLSearchParams(window.location.search);
            const lang = urlParams.get('lang') || 'en'; // Default to Arabic if no language specified

            const texts = {
                ar: {
                    title: 'نجاح إعادة تعيين كلمة المرور',
                    message: 'تم إعادة تعيين كلمة المرور بنجاح!'
                },
                en: {
                    title: 'Password Reset Success',
                    message: 'Your password has been successfully reset!'
                }
                // Add more languages here if needed
            };

            const selectedTexts = texts[lang] || texts['ar'];

            document.getElementById('title').innerText = selectedTexts.title;
            document.getElementById('message').innerText = selectedTexts.message;
        }
        window.onload = updateLanguage;
    </script>
</head>
<body>

<div class="success-container">
    <h2 id="title">نجاح إعادة تعيين كلمة المرور</h2>
    <p id="message">تم إعادة تعيين كلمة المرور بنجاح!</p>
</div>

</body>
</html>
`;
