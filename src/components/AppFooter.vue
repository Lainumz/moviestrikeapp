<template>
    <footer class="footer">
      <div class="footer-left">
        <img src="@/assets/logo.png" alt="Logo" class="footer-logo" />
      </div>
      <div class="footer-center">
        <p>Sergi Linuesa</p>
        <p>Todos los derechos reservados ©</p>
      </div>
      <div class="footer-right">
        <a href="https://www.linkedin.com/in/sergi-linuesa-2a762b155/" target="_blank">
          <img src="@/assets/linkedin.png" alt="LinkedIn" class="footer-linkedin" />
        </a>
      </div>
    </footer>
  </template>

<script>
export default {
  name: 'AppFooter'
}
</script>

  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
  }

  body {
    display: flex;
    flex-direction: column;
  }

  #app {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: black;
    color: white;
    border-top: 1px solid #e7e7e7;
    height: 60px; /* Ajusta la altura del footer según sea necesario */
  }

  .footer-left,
  .footer-center,
  .footer-right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .footer-linkedin {
    width: 50px;
    height: auto;
  }

  .footer-center p {
    margin: 0;
    text-align: center;
  }

  .footer-logo {
    width: 80px;
  }
  </style>
