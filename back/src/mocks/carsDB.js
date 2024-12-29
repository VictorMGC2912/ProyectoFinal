let carsDB = [
    {
      id: 1,
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2020,
      descripcion: "Un sedán compacto confiable y eficiente.",
      precio: 20000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/9/9e/2018_Toyota_Corolla.jpg"
    },
    {
      id: 2,
      marca: "Honda",
      modelo: "Civic",
      anio: 2021,
      descripcion: "Un sedán compacto con estilo deportivo y tecnología avanzada.",
      precio: 22000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/1/12/2018_Honda_Civic.jpg"
    },
    {
      id: 3,
      marca: "Ford",
      modelo: "Focus",
      anio: 2019,
      descripcion: "Un hatchback práctico y versátil con gran rendimiento.",
      precio: 19000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/f/f9/2018_Ford_Focus.jpg"
    },
    {
      id: 4,
      marca: "Chevrolet",
      modelo: "Malibu",
      anio: 2022,
      descripcion: "Un sedán mediano con características modernas y confort.",
      precio: 24000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/3/34/2018_Chevrolet_Malibu.jpg"
    },
    {
      id: 5,
      marca: "Nissan",
      modelo: "Altima",
      anio: 2021,
      descripcion: "Un sedán con gran espacio interior y eficiencia en el consumo de combustible.",
      precio: 23000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/d/db/2019_Nissan_Altima.jpg"
    },
    {
      id: 6,
      marca: "BMW",
      modelo: "Serie 3",
      anio: 2020,
      descripcion: "Un sedán deportivo con lujo y rendimiento excepcionales.",
      precio: 40000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/5/53/2019_BMW_330i.jpg"
    },
    {
      id: 7,
      marca: "Audi",
      modelo: "A4",
      anio: 2022,
      descripcion: "Un sedán premium con un diseño elegante y tecnología avanzada.",
      precio: 42000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/1/1a/2019_Audi_A4.jpg"
    },
    {
      id: 8,
      marca: "Mercedes-Benz",
      modelo: "C-Class",
      anio: 2021,
      descripcion: "Un sedán de lujo con un interior refinado y un motor potente.",
      precio: 45000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/9/9c/2019_Mercedes-Benz_C-Class.jpg"
    },
    {
      id: 9,
      marca: "Tesla",
      modelo: "Model 3",
      anio: 2023,
      descripcion: "Un sedán eléctrico con una autonomía impresionante y tecnología innovadora.",
      precio: 50000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Tesla_Model_3_parked.jpg"
    },
    {
      id: 10,
      marca: "Hyundai",
      modelo: "Elantra",
      anio: 2021,
      descripcion: "Un sedán compacto con un diseño moderno y características avanzadas.",
      precio: 21000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/6/60/2021_Hyundai_Elantra.jpg"
    },
    {
      id: 11,
      marca: "Mazda",
      modelo: "Mazda3",
      anio: 2022,
      descripcion: "Un compacto elegante con gran desempeño y eficiencia.",
      precio: 23000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/4/48/2021_Mazda_3.jpg"
    },
    {
      id: 12,
      marca: "Kia",
      modelo: "Optima",
      anio: 2020,
      descripcion: "Un sedán mediano con un diseño atractivo y tecnología avanzada.",
      precio: 22000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/f/fd/2019_Kia_Optima.jpg"
    },
    {
      id: 13,
      marca: "Subaru",
      modelo: "Impreza",
      anio: 2021,
      descripcion: "Un compacto con tracción en las cuatro ruedas y gran desempeño.",
      precio: 24000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/3/3b/2019_Subaru_Impreza.jpg"
    },
    {
      id: 14,
      marca: "Volkswagen",
      modelo: "Jetta",
      anio: 2021,
      descripcion: "Un sedán confiable y eficiente con estilo europeo.",
      precio: 21000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/a/ab/2019_Volkswagen_Jetta.jpg"
    },
    {
      id: 15,
      marca: "Volvo",
      modelo: "S60",
      anio: 2022,
      descripcion: "Un sedán premium con seguridad líder en su clase.",
      precio: 42000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/a/a6/2019_Volvo_S60.jpg"
    },
    {
      id: 16,
      marca: "Lexus",
      modelo: "IS",
      anio: 2021,
      descripcion: "Un sedán de lujo con un diseño deportivo y un interior refinado.",
      precio: 43000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/5/5a/2021_Lexus_IS.jpg"
    },
    {
      id: 17,
      marca: "Acura",
      modelo: "TLX",
      anio: 2021,
      descripcion: "Un sedán de lujo con gran desempeño y tecnología avanzada.",
      precio: 44000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/5/50/2021_Acura_TLX.jpg"
    },
    {
      id: 18,
      marca: "Toyota",
      modelo: "Camry",
      anio: 2020,
      descripcion: "Un sedán confiable y eficiente con un diseño moderno.",
      precio: 25000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/5/55/2019_Toyota_Camry.jpg"
    },
    {
      id: 19,
      marca: "Honda",
      modelo: "Accord",
      anio: 2021,
      descripcion: "Un sedán mediano con un interior espacioso y tecnología avanzada.",
      precio: 27000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/7/79/2019_Honda_Accord.jpg"
    },
    {
      id: 20,
      marca: "Ford",
      modelo: "Mustang",
      anio: 2022,
      descripcion: "Un coupé deportivo icónico con gran potencia y estilo",
      precio: 55000,
      foto: "https://upload.wikimedia.org/wikipedia/commons/8/84/2021_Ford_Mustang.jpg"      
    }    
]    