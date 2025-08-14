const checkboxes = document.querySelectorAll("input[type='checkbox']");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // Pega todos os valores marcados
    const selecionados = Array.from(checkboxes)
      .filter((ch) => ch.checked)
      .map((ch) => ch.value.trim());

    // Pega todos os cards
    document.querySelectorAll(".card1").forEach((card) => {
      const curso = card.querySelector("#curso").textContent.trim();

      // Se nenhum checkbox estiver marcado ou o curso do card estiver na lista, mostra
      if (selecionados.length === 0 || selecionados.includes(curso)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});

document.querySelectorAll(".conect").forEach((botao) => {
  botao.addEventListener("click", () => {
    if (botao.classList.contains("activo")) {
      botao.textContent = "conect";
      botao.classList.remove("activo");
    } else {
      botao.textContent = "Conected✅";
      botao.classList.add("activo");
    }
  });
});
const btnSearch = document.getElementById("btnsearch");
const inputSearch = document.getElementById("inputserch");
const lista = document.querySelector(".cards");

btnSearch.addEventListener("click", () => {
  const termo = inputSearch.value.trim(); // pega o que o usuário digitou

  if (termo === "") return; // se estiver vazio, não faz nada

  // Limpa os cards antigos
  lista.innerHTML = "<p>Carregando...</p>";

  fetch(`https://api.github.com/search/users?q=${termo}`)
    .then((res) => res.json())
    .then((data) => {
      // Limpa o loading
      lista.innerHTML = "";

      if (data.items.length === 0) {
        lista.innerHTML = "<p>Nenhum usuário encontrado.</p>";
        return;
      }

      // Cria cards para cada usuário encontrado
      data.items.forEach((usuario) => {
        const card = document.createElement("div");
        card.classList.add("card1");

        card.innerHTML = `
          <img src="${usuario.avatar_url}" alt="${usuario.login}">
          <span>
            <div class="nome">${usuario.login}</div>
            <div class="curso">GitHub User</div>
          </span>
          <button class="conect">Conect</button>
          <button class="mensages">Send messages</button>
        `;

        // Evento para o botão "Conect"
        const btnConect = card.querySelector(".conect");
        btnConect.addEventListener("click", () => {
          if (btnConect.classList.contains("ativo")) {
            btnConect.textContent = "Conect";
            btnConect.classList.remove("ativo");
          } else {
            btnConect.textContent = "Conectado ✅";
            btnConect.classList.add("ativo");
          }
        });

        lista.appendChild(card);
      });
    })
    .catch((err) => {
      lista.innerHTML = "<p>Ocorreu um erro ao buscar os usuários.</p>";
      console.error("Erro:", err);
    });
});
document.querySelectorAll(".mensages").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "messages.html";
  });
});
