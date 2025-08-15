const input = document.querySelector("input");
const button = document.querySelector("button");
const container = document.querySelector(".mensagens-chat");

button.addEventListener("click", () => {
  const mensagem = input.value;
  const novaMensagem = document.createElement("chatDeMensagem");
  novaMensagem.textContent = mensagem;
  novaMensagem.classList.add("mensagens-chat1");
  if (mensagem == "") {
    alert("digita alguma coisa");
    return 0;
  }

  container.appendChild(novaMensagem);

  input.value = "";
});
