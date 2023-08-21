import moment from "moment";
import { DealTypes } from "types/Deal";

//DADOS FIXOS PARA RENDERIZAÇÃO DO FRONT ENQUANDO N TEM BACKEND
// export const mockDeals: DealTypes[] = [
//   {
//     name: "Privatização",
//     company: "Akahmadi",
//     contact: "Jonny Cash",
//     value: 247,
//     tag: "hot",
//     pipeline: "wonID",
//   },
//   {
//     name: "Privatização",
//     company: "Akahmadi",
//     contact: "Jonny Cash",
//     value: 247,
//     tag: "hot",
//     pipeline: "newid",
//   },
//   {
//     name: "Privatização",
//     company: "Akahmadi",
//     contact: "Jonny Cash",
//     value: 247,
//     tag: "hot",
//     pipeline: "wonID",
//   },
// ];

export const oldMockPipes = [
  {
    title: "Won",
    _id: "wonID",
    totalColumnValue: 0,
  },
  {
    title: "Lost",
    _id: "lostid",
    totalColumnValue: 0,
  },
  {
    title: "Teste",
    _id: "testeid",
    totalColumnValue: 0,
  },
  {
    title: "Product",
    _id: "productid",
    totalColumnValue: 0,
  },
  {
    title: "New",
    _id: "newid",
    totalColumnValue: 0,
  },
  {
    title: "Greater",
    _id: "greaterid",
    totalColumnValue: 0,
  },
];



export const mockPipes = [
  {
    name: "Won",
    id: "wonID",
    totalColumnValue: 0,
  },
];

export const mockAddCard = {
  title: "teste venda",
  companyName: "kibe frito",
  companyPicture: "",
  contactName: "risole de presunto e queijo",
  budget: 2457,
  startDate: moment().format("DD/MM/YYYY HH:MM"),
  tag: "cold",
  id: "testeAdd123",
  pipe: "",
};

export const navBarRoutes = [
  { name: "Contatos", icon: "fa-id-card", link: "/contact" },
  { name: "E-mail", icon: "fa fa-envelope", link: "/mail" },
];

export const navBarRoutesManager = [
  { name: "Dashboards", icon: "fa-bar-chart", link: "/dashboard" },
]

export const navBarRoutesSecond = [
  // { name: "Minha conta", icon: "fa-user", link: "/account" },
  // { name: "Usuários", icon: "fa-users", link: "/user" },
  { name: "Configuração", icon: "fa-gear", link: "/account" },
]
export const routeExit = [
  { name: "Sair", icon: "fa-sign-out", link: "/bye" },
]


export const mockTags = [
  { value: "HOT", label: "Quente" },
  { value: "COLD", label: "Frio" },
  { value: "WARM", label: "Morno" },
];

export const mockRoles = [
  { value: "ADMIN", label: "Administrador" },
  { value: "SELLER", label: "Vendedor" },
];

export const mocksBancoconta = [
  { id: 1, sigla: "Banco do Brasil" },
  { id: 2, sigla: "Caixa Econômica Federal"},
  { id: 3, sigla: "Banco Itaú" },
  { id: 4, sigla: "Banco Bradesco" },
  { id: 5, sigla: "Banco Santander" },
  { id: 6, sigla: "Banco C6 "},
  { id: 7, sigla: "Banco PAN "},
  { id: 8, sigla: "Banco Inter"},
  { id: 9, sigla: "Banco Nubank"},
  { id: 10, sigla: "Banco Original"},
  { id: 11, sigla: "Banco Picpay"},
  { id: 12, sigla: "Banco Crefisa"},
  { id: 13, sigla: "Banco BMG" },
];
export const mocksOrgs = [
  { id: 1, sigla: "SDS" },
  { id: 2, sigla: "SSP" },
  { id: 3, sigla: "DETRAN" },
];

export const mocksTipoconta = [
  { id: 1, sigla: "Conta corrente" },
  { id: 2, sigla: "Conta Poupança" },
  { id: 3, sigla: "Cartão Magnético" },
  { id: 4, sigla: "Ordem de Pagamento" },
];

export const mockYesNo = [
  { id: 1, sigla: "Sim" },
  { id: 2, sigla: "Não" },

]

export const mocksPrazo = [
  { id: 1, sigla: "36x" },
  { id: 2, sigla: "48x" },
  { id: 3, sigla: "60x" },
  { id: 4, sigla: "72x" },
  { id: 4, sigla: "84x" },
];

export const mocksSituation = [
  { id: 1, sigla: "Digitado"},
  { id: 1, sigla: "Regularizada" },
  { id: 2, sigla: "Pendente" },
];

export const mocksProduto = [
  { id: 1, sigla: "Margem Livre" },
  { id: 2, sigla: "Margem" },
  { id: 4, sigla: "Aumento salarial" },
  { id: 3, sigla: "Refinanciamento" },
  { id: 4, sigla: "Portabilidade" },
  { id: 4, sigla: "Cartão Benefício" },
  { id: 4, sigla: "FGTS" },
  { id: 4, sigla: "Cartão de Crédito" },
  { id: 4, sigla: "Conta de luz" },
];


export const mockEstados = [
  { id: 1, sigla: "AC" },
  { id: 2, sigla: "AL" },
  { id: 3, sigla: "AP" },
  { id: 4, sigla: "AM" },
  { id: 5, sigla: "BA" },
  { id: 6, sigla: "CE" },
  { id: 7, sigla: "DF" },
  { id: 8, sigla: "ES" },
  { id: 9, sigla: "GO" },
  { id: 10, sigla: "MA" },
  { id: 11, sigla: "MT" },
  { id: 12, sigla: "MS" },
  { id: 13, sigla: "MG" },
  { id: 14, sigla: "PA" },
  { id: 15, sigla: "PB" },
  { id: 16, sigla: "PR" },
  { id: 17, sigla: "PE" },
  { id: 18, sigla: "PI" },
  { id: 19, sigla: "RJ" },
  { id: 20, sigla: "RN" },
  { id: 21, sigla: "RS" },
  { id: 22, sigla: "RO" },
  { id: 23, sigla: "RR" },
  { id: 24, sigla: "SC" },
  { id: 25, sigla: "SP" },
  { id: 26, sigla: "SE" },
  { id: 27, sigla: "TO" },
];

export const mockstates = [
  { value: 1, label: "AC" },
  { value: 2, label: "AL" },
  { value: 3, label: "AP" },
  { value: 4, label: "AM" },
  { value: 5, label: "BA" },
  { value: 6, label: "CE" },
  { value: 7, label: "DF" },
  { value: 8, label: "ES" },
  { value: 9, label: "GO" },
  { value: 10, label: "MA" },
  { value: 11, label: "MT" },
  { value: 12, label: "MS" },
  { value: 13, label: "MG" },
  { value: 14, label: "PA" },
  { value: 15, label: "PB" },
  { value: 16, label: "PR" },
  { value: 17, label: "PE" },
  { value: 18, label: "PI" },
  { value: 19, label: "RJ" },
  { value: 20, label: "RN" },
  { value: 21, label: "RS" },
  { value: 22, label: "RO" },
  { value: 23, label: "RR" },
  { value: 24, label: "SC" },
  { value: 25, label: "SP" },
  { value: 26, label: "SE" },
  { value: 27, label: "TO" },
];

const FunnelsAuto = [
  {
    name: "Funil de captação",
    description: "Capte contatos para nutrir sua base e qualifique os leads para que se tornem consumir seu produto ou serviço",
  },
  {
    name: "Funil de relacionamento",
    description: "Melhore o relacionamento com seu cliente, faça campanhas de pesquisas, promoções ou ofertas para manter seus clientes engajados em seu negócio",
  },
  {
    name: "Funil de Onboarding",
    description: "Faça o Onboarding do cliente na sua empresa, mostre ferramentas, produtos e como utiliza-los;",
  },
  {
    name: "Funil de sucesso do cliente",
    description: "Analise a experiencia do seu cliente, forneça recursos para seu cliente utilizar melhor suas ferramentas, produtos ou serviços, promova NPS, faça pesquisas de CSAT e mais;",
  },
  {
    name: "Funil de CrossSelling e UpSelling",
    description: "Apresente recursos complementares aos que seu cliente utiliza ou faça uma oferta de uma versão mais completa, melhorada e de maior valor de sua ferramenta, produto ou serviço",
  },
]

const mock = [
  {
    value: 131542,
    status: "WON",
    updatedAt: "2021-11-01T17:38:44.873Z",
  },
  {
    value: 231343,
    status: "WON",
    updatedAt: "2021-11-02T17:38:44.873Z",
  },
  {
    value: 312761,
    status: "WON",
    updatedAt: "2021-11-03T17:38:44.873Z",
  },
  {
    value: 459832,
    status: "WON",
    updatedAt: "2021-11-04T17:38:44.873Z",
  },
  {
    value: 112122,
    status: "WON",
    updatedAt: "2021-11-05T17:38:44.873Z",
  },
  {
    value: 231342,
    status: "WON",
    updatedAt: "2021-11-05T17:38:44.873Z",
  },
  {
    value: 546432,
    status: "LOST",
    updatedAt: "2021-11-01T17:38:44.873Z",
  },
  {
    value: 345354,
    status: "LOST",
    updatedAt: "2021-11-02T17:38:44.873Z",
  },
  {
    value: 226512,
    status: "LOST",
    updatedAt: "2021-11-03T17:38:44.873Z",
  },
  {
    value: 453113,
    status: "LOST",
    updatedAt: "2021-11-04T17:38:44.873Z",
  },
  {
    value: 212772,
    status: "LOST",
    updatedAt: "2021-11-05T17:38:44.873Z",
  },
];

const x = [
  "November 5, 2021",
  "November 6, 2021",
  "November 7, 2021",
  "November 8, 2021",
  "November 9, 2021",
  "November 11, 2021",
  "November 12, 2021",
  "November 13, 2021",
  "November 14, 2021",
  "November 15, 2021",
  "November 16, 2021",
  "November 17, 2021",
];

const s = [
  {
    name: "Convertida",
    data: [
      2432, 4654, 5912, 4342, 5982, 7354, 3370, 6609, 9904, 1323, 5434, 8767,
    ],
  },
  {
    name: "Perdida",
    data: [
      3301, 6660, 9990, 1323, 5434, 8767, 3432, 6654, 9912, 4342, 5982, 7354,
    ],
  },
];
