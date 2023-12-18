interface SeedElement {
  name: string;
}

interface SeedStudy {
  name: string;
}

interface SeedService {
  element: SeedElement,
  study: SeedStudy,
  price: number,
  description: string
}

export const initialElementData: SeedElement[] = [
  {
    name: "oro"
  },
  {
    name: "plata"
  },
  {
    name: "cobre"
  },
  {
    name: "hierro"
  }
]

export const initialStudyData: SeedStudy[] = [
  {
    name: "reconocimiento"
  },
  {
    name: "lote"
  },
  {
    name: "newmont"
  },
  {
    name: "triplicado"
  },
  {
    name: "cuadriplicado"
  }
]
