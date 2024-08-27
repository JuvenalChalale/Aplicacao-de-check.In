let participantes = [
  {
    nome: "Juvenal Chalale",
    email: "juvenalchalale@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 10),
  },
  {
    nome: "Mayk Brito",
    email: "gabriel@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 15, 10),
    dataCheckIn: null,
  },
  {
    nome: "Carmen Varela",
    email: "4c@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 10, 30),
    dataCheckIn: new Date(2024, 2, 27, 14, 20),
  },
  {
    nome: "Esperanca Chalale",
    email: "espcom@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 12, 45),
    dataCheckIn: null,
  },
  {
    nome: "Raquel Chalale",
    email: "rcc@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 8, 0),
    dataCheckIn: new Date(2024, 2, 29, 10, 40),
  },
  {
    nome: "Justino Chalale",
    email: "justino@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 16, 20),
    dataCheckIn: new Date(2024, 3, 1, 20, 5),
  },
  {
    nome: "Belarmino Chalale",
    email: "belarmino@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 11, 55),
    dataCheckIn: new Date(2024, 3, 2, 15, 30),
  },
  {
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 14, 40),
    dataCheckIn: null,
  },
  {
    nome: "Valentino Chalale",
    email: "valentino@gmail.com",
    dataInscricao: new Date(2024, 3, 2, 9, 15),
    dataCheckIn: null,
  },
  {
    nome: "Mário Mudiquixi",
    email: "Mario@gmail.com",
    dataInscricao: new Date(2024, 3, 3, 18, 5),
    dataCheckIn: new Date(2024, 3, 5, 21, 35),
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        class="font-normal text-xs text-nlw-light-green hover:underline"
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td class="px-4 py-3 flex flex-col gap-1 border-t border-t-white/10">
      <strong class="font-semibold text-sm text-white">
        ${participante.nome}
      </strong>
      <small class="font-normal text-xs text-nlw-grey">
        ${participante.email}
      </small>
    </td>
    <td class="px-4 py-3 font-normal text-xs text-nlw-grey border-t border-t-white/10">${dataInscricao}</td>
    <td class="px-4 py-3 font-normal text-xs text-nlw-grey border-t border-t-white/10">${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}