# rayyanmanzoor.github.io
index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome Page</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #1d2b64, #f8cdda);
      font-family: 'Arial', sans-serif;
      opacity: 1;
      transition: opacity 1s ease;
    }

    h1 {
      color: white;
      font-size: 2.5rem;
      white-space: nowrap;
      overflow: hidden;
      border-right: 3px solid white;
      animation: blinkCursor 0.7s steps(1) infinite;
    }

    @keyframes blinkCursor {
      0% { border-color: white; }
      50% { border-color: transparent; }
      100% { border-color: white; }
    }
  </style>
</head>
<body>

  <h1 id="welcomeText"></h1>

  <script>
    const text = "Welcome to my portfolio!";
    let index = 0;
    const speed = 100; // typing speed in ms
    const welcomeText = document.getElementById("welcomeText");

    function typeText() {
      if (index < text.length) {
        welcomeText.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, speed);
      } else {
        // Stop cursor blink
        welcomeText.style.borderRight = "none";
        // Fade out and redirect after a short pause
        setTimeout(() => {
          document.body.style.opacity = "0";
          setTimeout(() => {
            window.location.href = "portfolio.html";
          }, 1000); // wait for fade to finish
        }, 1000);
      }
    }

    typeText();
  </script>

</body>
</html>
