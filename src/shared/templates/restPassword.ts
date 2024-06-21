export const restPasswordTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>إعادة تعيين كلمة المرور</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        padding: 0;
      }
      .reset-container {
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: right;
        width: 300px;
      }
      .reset-container h2 {
        margin-bottom: 20px;
      }
      .reset-container label {
        display: block;
        margin-bottom: 5px;
      }
      .reset-container input[type='password'],
      .reset-container input[type='submit'] {
        width: 100%;
        padding: 10px 0;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .reset-container input[type='submit'] {
        background-color: #007bff;
        color: #fff;
        border: none;
        cursor: pointer;
      }
      .reset-container input[type='submit']:hover {
        background-color: #0056b3;
      }
    </style>
    <script>
      function updateLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang') || 'en'; 

        const texts = {
          ar: {
            title: 'إعادة تعيين كلمة المرور',
            newPassword: 'كلمة المرور الجديدة',
            confirmPassword: 'تأكيد كلمة المرور الجديدة',
            submit: 'إعادة تعيين كلمة المرور',
          },
          en: {
            title: 'Reset Password',
            newPassword: 'New Password',
            confirmPassword: 'Confirm New Password',
            submit: 'Reset Password',
          },
          // Add more languages here if needed
        };

        const selectedTexts = texts[lang] || texts['en'];

        document.getElementById('title').innerText = selectedTexts.title;
        document.getElementById('new-password-label').innerText =
          selectedTexts.newPassword;
        document.getElementById('confirm-password-label').innerText =
          selectedTexts.confirmPassword;
        document.getElementById('submit-button').value = selectedTexts.submit;
      }
      window.onload = updateLanguage;
    </script>
  </head>
  <body>
    <div class="reset-container">
      <h2 id="title">إعادة تعيين كلمة المرور</h2>
      <form

        method="post"
      >
        <label for="password" id="new-password-label"
          >كلمة المرور الجديدة</label
        >
        <input type="password" id="password" name="password" required />

        <label for="confirm-password" id="confirm-password-label"
          >تأكيد كلمة المرور الجديدة</label
        >
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          required
        />

        <input
          type="submit"
          id="submit-button"
          value="إعادة تعيين كلمة المرور"
          required
        />
      </form>
    </div>
  </body>
</html>
`;
