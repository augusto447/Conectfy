btnLogin.addEventListener("click", () => {
  const inputEmail = document.getElementById("email").value;
  const inputPassword = document.getElementById("password").value;
  const btnLogin = document.getElementById("btnLogin").value;
  const btnSignup = document.getElementById("btnSignup").value;
  const input = document.querySelector("input").value;

  if (input == "") {
    alert("preencha os campos!");
    return 0;
  }
  if (inputEmail == "") {
    alert("preencha o campo!");
    return 0;
  }
  if (inputPassword == "") {
    alert("preencha o campo!");
    return 0;
  }

  // Condição para verificar se o primeiro caractere é número
  if (!isNaN(inputEmail.charAt(0))) {
    alert("imail invalido!");
    return 0;
  } else {
    localStorage.setItem("loggedUserEmail", email);

    alert("Login realizado com sucesso!");

    window.location.href = "index.html";
  }
});

btnSignup.addEventListener("click", () => {
  const inputEmail = document.getElementById("email").value;
  const inputPassword = document.getElementById("password").value;
  const btnLogin = document.getElementById("btnLogin").value;
  const btnSignup = document.getElementById("btnSignup").value;
  const input = document.querySelector("input").value;

  if (input == "") {
    alert("preencha os campos!");
    return 0;
  }
  if (inputEmail == "") {
    alert("preencha o campo!");
    return 0;
  }
  if (inputPassword == "") {
    alert("preencha o campo!");
    return 0;
  }

  // Condição para verificar se o primeiro caractere é número
  if (!isNaN(inputEmail.charAt(0))) {
    alert("imail invalido!");
    return 0;
  } else {
    localStorage.setItem("loggedUserEmail", email);

    alert("Login realizado com sucesso!");

    window.location.href = "index.html";
  }
});

const clientId =
  "1006400570337-boktntsvemt1e4ljs9bsqk8j6pkp0hs2.apps.googleusercontent.com";
const redirectUri = "http://localhost:5500/login.html";
const scope = "openid email profile";
const responseType = "token";

// Ao clicar no botão, vai para o Google
document.getElementById("botao2").addEventListener("click", () => {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${encodeURIComponent(
    scope
  )}&prompt=select_account`;

  window.location.href = authUrl;
});

function parseHashParams() {
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.substring(1)
    : window.location.hash;
  const params = new URLSearchParams(hash);
  const obj = {};
  for (const [k, v] of params.entries()) obj[k] = v;
  return obj;
}

async function handleGoogleRedirect() {
  const params = parseHashParams();
  const token = params.access_token;
  if (!token) return; // não voltamos do Google

  // opcional: mostrar algo ao usuário enquanto busca (console ou DOM)
  console.log("Token recebido — buscando perfil...");

  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error(`Erro na API: ${res.status}`);
    }

    const user = await res.json();

    // salvar dados no localStorage
    localStorage.setItem("googleUser", JSON.stringify(user));
    localStorage.setItem("googleAccessToken", token);

    // opcional: salvar expiry se vier no hash
    if (params.expires_in) {
      const expiryMillis = Date.now() + parseInt(params.expires_in, 10) * 1000;
      localStorage.setItem("googleTokenExpiry", String(expiryMillis));
    }

    // LIMPAR o hash da URL para não expor o token
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );

    // agora redireciona para a página principal
    window.location.href = "index.html";
  } catch (err) {
    console.error("Erro ao obter perfil do Google:", err);
    alert("Falha ao obter informações do Google. Tenta de novo.");
    // limpar possíveis dados parciais
    localStorage.removeItem("googleUser");
    localStorage.removeItem("googleAccessToken");
    localStorage.removeItem("googleTokenExpiry");
    // também limpar o hash pra permitir novo fluxo
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  }
}

// só tenta processar se houver access_token no hash
if (window.location.hash && window.location.hash.includes("access_token")) {
  handleGoogleRedirect();
}
