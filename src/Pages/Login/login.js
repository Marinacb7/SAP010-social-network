import { loginWithEmail, signInWithGoogle, signInWithFacebook } from '../../firebase/auth.js';

export default () => {
  const container = document.createElement('div');

  const loginForm = `
    <section class="form">
      <h2>Login</h2>
      <form>
        <label for="username">Login:</label>
        <input type="text" id="username" name="username" required></input>

        <label for="password">Senha:</label>
        <input type="password" id="password" name="password" required></input>

        <button type="submit">Entrar</button>
      </form>

      <div class="links">
        <a href="#forgot-password">Esqueceu a senha?</a>
        <p>Não tem uma conta? <a href="#cadastro">Cadastre-se</a></p>
      </div>

      <p>ou faça login com:</p>
      <div class="social-login">
        <a href="#login-google" class="google-login">Google</a>
        <a href="#login-facebook" class="facebook-login">Facebook</a>
      </div>
    </section>
  `;
  container.innerHTML = loginForm;

  const form = container.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = form.querySelector('#username').value;
    const password = form.querySelector('#password').value;

    // Lógica de login com email e senha utilizando o Firebase
    loginWithEmail(username, password)
      .then(() => {
        // Login bem-sucedido
        console.log('Usuário logado com email e senha');
        // Redirecionar para a página desejada
        window.location.hash = '#feed';
      })
      .catch((error) => {
        // Ocorreu um erro no login
        console.log('Erro de login:', error);
        // Exibir mensagem de erro ao usuário
        alert('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
      });
  });

  const googleLoginButton = container.querySelector('.google-login');
  googleLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    signInWithGoogle();
  });

  const facebookLoginButton = container.querySelector('.facebook-login');
  facebookLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    signInWithFacebook();
  });

  return container;
};
