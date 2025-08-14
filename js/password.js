// Passo 1 — Gerar e enviar código (simulado)

function gerarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const btnEnviarCodigo = document.getElementById("btnLogin");
const inputEmail = document.getElementById("emailforget");
const caixa = document.querySelector(".caixa1");

btnEnviarCodigo.addEventListener("click", () => {
  const email = inputEmail.value.trim();

  if (!email) {
    alert("Por favor, insira um email válido.");
    return;
  }

  const codigo = gerarCodigo();
  localStorage.setItem("resetEmail", email);
  localStorage.setItem("resetCode", codigo);

  alert(`Código enviado para o email ${email} : ${codigo}`);

  criarCampoValidacaoCodigo();
});

// Passo 2 — Criar campo para validar o código recebido
function criarCampoValidacaoCodigo() {
  if (document.getElementById("validarCodigoInput")) return;

  const inputCodigo = document.createElement("input");
  inputCodigo.type = "text";
  inputCodigo.id = "validarCodigoInput";
  inputCodigo.placeholder = "Digite o código recebido";

  const btnValidar = document.createElement("button");
  btnValidar.textContent = "Validar código";
  btnValidar.id = "validarCodigoBtn";

  caixa.appendChild(inputCodigo);
  caixa.appendChild(btnValidar);

  btnValidar.addEventListener("click", () => {
    const codigoDigitado = inputCodigo.value.trim();
    const codigoSalvo = localStorage.getItem("resetCode");

    if (codigoDigitado === codigoSalvo) {
      alert("Código correto! Agora defina sua nova senha.");
      criarFormularioNovaSenha();
    } else {
      alert("Código incorreto. Tente novamente.");
    }
  });
}

// Passo 3 — Criar formulário para nova senha e confirmar senha
function criarFormularioNovaSenha() {
  if (document.getElementById("novaSenha")) return;

  const inputNovaSenha = document.createElement("input");
  inputNovaSenha.type = "password";
  inputNovaSenha.id = "novaSenha";
  inputNovaSenha.placeholder = "Digite sua nova senha";

  const inputConfirmaSenha = document.createElement("input");
  inputConfirmaSenha.type = "password";
  inputConfirmaSenha.id = "confirmaSenha";
  inputConfirmaSenha.placeholder = "Confirme sua nova senha";

  const btnSalvarSenha = document.createElement("button");
  btnSalvarSenha.textContent = "Salvar nova senha";
  btnSalvarSenha.id = "salvarSenhaBtn";

  caixa.appendChild(inputNovaSenha);
  caixa.appendChild(inputConfirmaSenha);
  caixa.appendChild(btnSalvarSenha);

  btnSalvarSenha.addEventListener("click", () => {
    const novaSenha = inputNovaSenha.value.trim();
    const confirmaSenha = inputConfirmaSenha.value.trim();

    if (!novaSenha || !confirmaSenha) {
      alert("Preencha os dois campos de senha.");
      return;
    }

    if (novaSenha !== confirmaSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    alert("Senha redefinida com sucesso! Volte para o login.");

    localStorage.removeItem("resetCode");
    localStorage.removeItem("resetEmail");

    window.location.href = "login.html";
  });
}
