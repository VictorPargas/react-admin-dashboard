import { tokens } from "../theme";

export const mockDataTeam = [
  {
    id: 1,
    name: "Yasmin Rodrigues",
    email: "yasmin@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "supervisor",
  },
  {
    id: 2,
    name: "Hairine Marques",
    email: "hairinecql@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "teste Santos",
    email: "teste@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Ana Kokura",
    email: "anakoks@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Rene Geribola",
    email: "renegeri@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
];

export const mockDataSubjects = [
  { id: 1, subjectCode: "MAT101", name: "Matemática", teacher: "Prof. João", credits: 4, semester: "2024/1" },
  { id: 2, subjectCode: "HIS102", name: "História", teacher: "Prof. Maria", credits: 3, semester: "2024/1" },
];

export const mockDataContacts = [
  {
    id: 12,
    name: "Maria da Silva",
    email: "mariasilva@gmail.com",
    age: 28,
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    zipCode: "01234-567",
    rede: "Hadash",
    registrarId: 789012,
  },
  {
    id: 13,
    name: "João Santos",
    email: "joaosantos@gmail.com",
    age: 35,
    phone: "(21) 91234-5678",
    address: "Avenida Principal, 456",
    city: "Rio de Janeiro",
    zipCode: "20000-123",
    rede: "Vinho Novo",
    registrarId: 890123,
  },
  {
    id: 14,
    name: "Ana Oliveira",
    email: "anaoliveira@gmail.com",
    age: 42,
    phone: "(31) 87654-3210",
    address: "Rua do Bosque, 789",
    city: "Belo Horizonte",
    zipCode: "30000-456",
    rede: "Amor Maior",
    registrarId: 901234,
  },
  {
    id: 15,
    name: "Pedro Souza",
    email: "pedrosouza@gmail.com",
    age: 30,
    phone: "(47) 89012-3456",
    address: "Travessa da Praia, 101",
    city: "Florianópolis",
    zipCode: "40000-789",
    rede: "Tetelestai",
    registrarId: 912345,
  },
  {
    id: 16,
    name: "Mariana Costa",
    email: "marianacosta@gmail.com",
    age: 25,
    phone: "(51) 82345-6789",
    address: "Avenida dos Coqueiros, 202",
    city: "Porto Alegre",
    zipCode: "50000-234",
    rede: "Sangar",
    registrarId: 923456,
  },
];

export const mockDataInvoices = [
  {
    id: 9,
    name: "Rafael Oliveira",
    email: "rafaoliveira@gmail.com",
    cost: "45.67",
    phone: "(11) 98765-4321",
    date: "10/03/2023",
  },
  {
    id: 10,
    name: "Carla Santos",
    email: "carlasantos@gmail.com",
    cost: "32.89",
    phone: "(21) 91234-5678",
    date: "07/22/2023",
  },
  {
    id: 11,
    name: "Gabriel Souza",
    email: "gabrielsouza@gmail.com",
    cost: "102.45",
    phone: "(31) 87654-3210",
    date: "04/15/2023",
  },
  {
    id: 12,
    name: "Patricia Costa",
    email: "patriciacosta@gmail.com",
    cost: "75.20",
    phone: "(47) 89012-3456",
    date: "09/01/2023",
  },
  {
    id: 13,
    name: "Marcelo Almeida",
    email: "marceloalmeida@gmail.com",
    cost: "24.99",
    phone: "(51) 82345-6789",
    date: "12/30/2023",
  },
];

export const mockDataClasses = [
  { id: 1, subject: "Matemática", room: "101", teacher: "Prof. João", schedule: "08:00 - 10:00", days: "Segunda, Quarta" },
  { id: 2, subject: "História", room: "102", teacher: "Prof. Maria", schedule: "10:00 - 12:00", days: "Terça, Quinta" },
];

export const mockTransactions = [
  {
    txId: "01e4dsa",
    user: "victorparg",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "0315dsaa",
    user: "weldenmarq",
    date: "2022-04-01",
    cost: "133.45",
  },
  {
    txId: "01e4dsa",
    user: "lucarsantos",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "51034szv",
    user: "eduaardos",
    date: "2022-11-05",
    cost: "200.95",
  },
  {
    txId: "0a123sb",
    user: "anasant",
    date: "2022-11-02",
    cost: "13.55",
  },
  {
    txId: "01e4dsa",
    user: "stegany",
    date: "2021-09-01",
    cost: "43.95",
  },
  {
    txId: "120s51a",
    user: "hudsonsan",
    date: "2019-04-15",
    cost: "24.20",
  },
  {
    txId: "0315dsaa",
    user: "testesanto",
    date: "2022-04-01",
    cost: "133.45",
  },
];

export const mockDataEnrollments = [
  {
    id: 1,
    name: "João Silva",
    phone: "(11) 1234-5678",
    email: "joao.silva@example.com",
    cpf: "123.456.789-00",
    age: 20,
    rede: "Public",
    subject: "Matemática",
    days: "Segunda, Quarta, Sexta",
    schedule: "08:00 - 10:00",
  },
  {
    id: 2,
    name: "Maria Oliveira",
    phone: "(11) 8765-4321",
    email: "maria.oliveira@example.com",
    cpf: "987.654.321-00",
    age: 22,
    rede: "Private",
    subject: "História",
    days: "Terça, Quinta",
    schedule: "10:00 - 12:00",
  },
];

export const mockDataFees = [
  {
    id: 1,
    student: "João Silva",
    cpf: "123.456.789-00",
    subject: "Matemática",
    amount: 200.0,
    dueDate: "2023-06-30",
  },
  {
    id: 2,
    student: "Maria Oliveira",
    cpf: "987.654.321-00",
    subject: "História",
    amount: 180.0,
    dueDate: "2023-06-25",
  },
  {
    id: 3,
    student: "Carlos Souza",
    cpf: "321.654.987-00",
    subject: "Física",
    amount: 210.0,
    dueDate: "2023-07-05",
  },
  {
    id: 4,
    student: "Ana Costa",
    cpf: "654.321.987-00",
    subject: "Química",
    amount: 220.0,
    dueDate: "2023-07-01",
  },
  {
    id: 5,
    student: "Pedro Pereira",
    cpf: "789.123.456-00",
    subject: "Biologia",
    amount: 190.0,
    dueDate: "2023-06-28",
  },
  {
    id: 6,
    student: "Laura Martins",
    cpf: "456.789.123-00",
    subject: "Geografia",
    amount: 195.0,
    dueDate: "2023-07-03",
  },
];

export const mockTeacherSubjects = [
  {
    id: 1,
    subject: "Matemática",
    completed: "Não",
    days: "Segunda, Quarta, Sexta",
    time: "10:00 - 12:00",
    startYear: 2023,
    endDate: "2023-12-15",
  },
  {
    id: 2,
    subject: "História",
    completed: "Sim",
    days: "Terça, Quinta",
    time: "14:00 - 16:00",
    startYear: 2022,
    endDate: "2023-06-30",
  },
  {
    id: 3,
    subject: "Física",
    completed: "Não",
    days: "Segunda, Quarta",
    time: "08:00 - 10:00",
    startYear: 2023,
    endDate: "2024-05-30",
  },
  // Adicione mais dados conforme necessário
];

export const mockBarData = [
  {
    country: "CD",
    "hot dog": 137,
    "hot dogColor": "hsl(229, 70%, 50%)",
    CapDestino: 96,
    burgerColor: "hsl(296, 70%, 50%)",
    kebab: 72,
    kebabColor: "hsl(97, 70%, 50%)",
    donut: 140,
    donutColor: "hsl(340, 70%, 50%)",
  },
  {
    country: "TN",
    "hot dog": 55,
    "hot dogColor": "hsl(307, 70%, 50%)",
    CapDestino: 28,
    burgerColor: "hsl(111, 70%, 50%)",
    kebab: 58,
    kebabColor: "hsl(273, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(275, 70%, 50%)",
  },
  {
    country: "FT",
    "hot dog": 109,
    "hot dogColor": "hsl(72, 70%, 50%)",
    CapDestino: 23,
    burgerColor: "hsl(96, 70%, 50%)",
    kebab: 34,
    kebabColor: "hsl(106, 70%, 50%)",
    donut: 152,
    donutColor: "hsl(256, 70%, 50%)",
  },
  {
    country: "TI",
    "hot dog": 133,
    "hot dogColor": "hsl(257, 70%, 50%)",
    CapDestino: 52,
    burgerColor: "hsl(326, 70%, 50%)",
    kebab: 43,
    kebabColor: "hsl(110, 70%, 50%)",
    donut: 83,
    donutColor: "hsl(9, 70%, 50%)",
  },
  {
    country: "UN",
    "hot dog": 81,
    "hot dogColor": "hsl(190, 70%, 50%)",
    CapDestino: 80,
    burgerColor: "hsl(325, 70%, 50%)",
    kebab: 112,
    kebabColor: "hsl(54, 70%, 50%)",
    donut: 35,
    donutColor: "hsl(285, 70%, 50%)",
  },
  {
    country: "TO",
    "hot dog": 66,
    "hot dogColor": "hsl(208, 70%, 50%)",
    CapDestino: 111,
    burgerColor: "hsl(334, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(182, 70%, 50%)",
    donut: 18,
    donutColor: "hsl(76, 70%, 50%)",
  },
  {
    country: "IF",
    "hot dog": 80,
    "hot dogColor": "hsl(87, 70%, 50%)",
    CapDestino: 47,
    burgerColor: "hsl(141, 70%, 50%)",
    kebab: 158,
    kebabColor: "hsl(224, 70%, 50%)",
    donut: 49,
    donutColor: "hsl(274, 70%, 50%)",
  },
];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

export const mockLineData = [
  {
    id: "japan",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "cap",
        y: 101,
      },
      {
        x: "teo",
        y: 75,
      },
      {
        x: "informar",
        y: 36,
      },
      {
        x: "gg",
        y: 216,
      },
      {
        x: "subggway",
        y: 35,
      },
      {
        x: "bugs",
        y: 236,
      },
      {
        x: "cgar",
        y: 88,
      },
      {
        x: "gg",
        y: 232,
      },
      {
        x: "bicgggycle",
        y: 281,
      },
      {
        x: "ggg",
        y: 1,
      },
      {
        x: "ggg",
        y: 35,
      },
      {
        x: "othgggers",
        y: 14,
      },
    ],
  },
  {
    id: "france",
    color: tokens("dark").blueAccent[300],
    data: [
      {
        x: "cap",
        y: 212,
      },
      {
        x: "cap",
        y: 190,
      },
      {
        x: "cap",
        y: 270,
      },
      {
        x: "cap",
        y: 9,
      },
      {
        x: "cap",
        y: 75,
      },
      {
        x: "cap",
        y: 175,
      },
      {
        x: "cap",
        y: 33,
      },
      {
        x: "cap",
        y: 189,
      },
      {
        x: "cap",
        y: 97,
      },
      {
        x: "cap",
        y: 87,
      },
      {
        x: "cap",
        y: 299,
      },
      {
        x: "cap",
        y: 251,
      },
    ],
  },
  {
    id: "ST",
    color: tokens("dark").redAccent[200],
    data: [
      {
        x: "CAP",
        y: 191,
      },
      {
        x: "plane",
        y: 136,
      },
      {
        x: "plane",
        y: 91,
      },
      {
        x: "plane",
        y: 190,
      },
      {
        x: "plane",
        y: 211,
      },
      {
        x: "bus",
        y: 152,
      },
      {
        x: "car",
        y: 189,
      },
      {
        x: "moto",
        y: 152,
      },
      {
        x: "bicycle",
        y: 8,
      },
      {
        x: "horse",
        y: 197,
      },
      {
        x: "skateboard",
        y: 107,
      },
      {
        x: "others",
        y: 170,
      },
    ],
  },
];

export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];
