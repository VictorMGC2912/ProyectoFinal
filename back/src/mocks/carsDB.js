let carsDB = [
    {
      id: 1,
      marca: "Toyota",
      modelo: "Corolla",
      anio: 2020,
      descripcion: "Un sedán compacto confiable y eficiente.",
      precio: 20000,
      foto: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2023/12/toyota-corolla-2024-3254131.jpg?tf=3840x"
    },
    {
      id: 2,
      marca: "Honda",
      modelo: "Civic",
      anio: 2021,
      descripcion: "Un sedán compacto con estilo deportivo y tecnología avanzada.",
      precio: 22000,
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT34QD0tIO4QbKMFL3y9ltLR24qBX_JaD6qjw&s"
    },
    {
      id: 3,
      marca: "Ford",
      modelo: "Focus",
      anio: 2019,
      descripcion: "Un hatchback práctico y versátil con gran rendimiento.",
      precio: 19000,
      foto: "https://5659238.fs1.hubspotusercontent-na1.net/hubfs/5659238/ford%202019.webp"
    },
    {
      id: 4,
      marca: "Chevrolet",
      modelo: "Malibu",
      anio: 2022,
      descripcion: "Un sedán mediano con características modernas y confort.",
      precio: 24000,
      foto: "https://di-uploads-pod3.dealerinspire.com/championauto/uploads/2021/11/mineral-gray-metallic-2022-chevrorlet-malibu.png"
    },
    {
      id: 5,
      marca: "Nissan",
      modelo: "Altima",
      anio: 2021,
      descripcion: "Un sedán con gran espacio interior y eficiencia en el consumo de combustible.",
      precio: 23000,
      foto: "https://di-sitebuilder-assets.s3.amazonaws.com/Nissan/MLP/Altima/2021/colors/Brilliant+Silver+Metallic.jpg"
    },
    {
      id: 6,
      marca: "BMW",
      modelo: "Serie 3",
      anio: 2020,
      descripcion: "Un sedán deportivo con lujo y rendimiento excepcionales.",
      precio: 40000,
      foto: "https://www.carsized.com/resources/bmw/3/s-m3/2020/sm_245109145_bmw-3-2020-side-view_4x.png"
    },
    {
      id: 7,
      marca: "Audi",
      modelo: "A4",
      anio: 2022,
      descripcion: "Un sedán premium con un diseño elegante y tecnología avanzada.",
      precio: 42000,
      foto: "https://www.motortrend.com/uploads/sites/10/2021/12/2022-audi-a4-premium-sedan-angular-front.png"
    },
    {
      id: 8,
      marca: "Mercedes-Benz",
      modelo: "C-Class",
      anio: 2021,
      descripcion: "Un sedán de lujo con un interior refinado y un motor potente.",
      precio: 45000,
      foto: "https://cdn.wheel-size.com/thumbs/c5/bd/c5bd4ca68075d211de80de41e2473d07.jpg"
    },
    {
      id: 9,
      marca: "Tesla",
      modelo: "Model 3",
      anio: 2023,
      descripcion: "Un sedán eléctrico con una autonomía impresionante y tecnología innovadora.",
      precio: 50000,
      foto: "https://www.km77.com/images/medium/3/8/5/5/tesla-model-3-2021-gran-autonomia-frontal.353855.jpg"
    },
    {
      id: 10,
      marca: "Hyundai",
      modelo: "Elantra",
      anio: 2021,
      descripcion: "Un sedán compacto con un diseño moderno y características avanzadas.",
      precio: 21000,
      foto: "https://netrinoimages.s3.eu-west-2.amazonaws.com/2017/08/13/463730/462600/hyundai_elantra_2021_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_5459186.jpg"
    },
    {
      id: 11,
      marca: "Mazda",
      modelo: "Mazda3",
      anio: 2022,
      descripcion: "Un compacto elegante con gran desempeño y eficiencia.",
      precio: 23000,
      foto: "https://autolab.com.co/wp-content/uploads/2022/04/regre.png"
    },
    {
      id: 12,
      marca: "Kia",
      modelo: "Optima",
      anio: 2020,
      descripcion: "Un sedán mediano con un diseño atractivo y tecnología avanzada.",
      precio: 22000,
      foto: "https://static.motor.es/fotos-noticias/2021/06/kia-k5-2022-oficial-202179122-1624617268_3.jpg"
    },
    {
      id: 13,
      marca: "Subaru",
      modelo: "Impreza",
      anio: 2021,
      descripcion: "Un compacto con tracción en las cuatro ruedas y gran desempeño.",
      precio: 24000,
      foto: "https://rincondelmotor.com/wp-content/uploads/2022/11/subaru-impreza-21-ficha.jpg"
    },
    {
      id: 14,
      marca: "Volkswagen",
      modelo: "Jetta",
      anio: 2021,
      descripcion: "Un sedán confiable y eficiente con estilo europeo.",
      precio: 21000,
      foto: "https://dealerinspire-image-library-prod.s3.us-east-1.amazonaws.com/images/1fkFLd8QShuBRArsKfxfS587Gmet8alTbQjksoGe.jpeg"
    },
    {
      id: 15,
      marca: "Volvo",
      modelo: "S60",
      anio: 2022,
      descripcion: "Un sedán premium con seguridad líder en su clase.",
      precio: 42000,
      foto: "https://images.dealer.com/ddc/vehicles/2022/Volvo/S60%20Recharge%20Plug-In%20Hybrid/Sedan/perspective/front-left/2022_24.png"
    },
    {
      id: 16,
      marca: "Lexus",
      modelo: "IS",
      anio: 2021,
      descripcion: "Un sedán de lujo con un diseño deportivo y un interior refinado.",
      precio: 43000,
      foto: "https://p.turbosquid.com/ts-thumb/GC/h99oQ7/iUjU3Au5/01/jpg/1597188223/600x600/fit_q87/7eaba41e87b83b860bf5815a4ecc8a5b70dff784/01.jpg"
    },
    {
      id: 17,
      marca: "Acura",
      modelo: "TLX",
      anio: 2021,
      descripcion: "Un sedán de lujo con gran desempeño y tecnología avanzada.",
      precio: 44000,
      foto: "https://media.ed.edmunds-media.com/acura/tlx/2021/oem/2021_acura_tlx_sedan_base_fq_oem_1_1600.jpg"
    },
    {
      id: 18,
      marca: "Toyota",
      modelo: "Camry",
      anio: 2020,
      descripcion: "Un sedán confiable y eficiente con un diseño moderno.",
      precio: 25000,
      foto: "https://i.blogs.es/e10752/usd10toc021a021001/1366_2000.jpeg"
    },
    {
      id: 19,
      marca: "Honda",
      modelo: "Accord",
      anio: 2021,
      descripcion: "Un sedán mediano con un interior espacioso y tecnología avanzada.",
      precio: 27000,
      foto: "https://di-honda-enrollment.s3.amazonaws.com/2021/model-pages/accord/trims/honda_accord_sport.jpg"
    },
    {
      id: 20,
      marca: "Ford",
      modelo: "Mustang",
      anio: 2022,
      descripcion: "Un coupé deportivo icónico con gran potencia y estilo",
      precio: 55000,
      foto: "https://platform.cstatic-images.com/large/in/v2/stock_photos/90884105-7fd5-4da9-8479-27e482a4e479/2b678835-3279-4de7-8047-36484d4e2900.png"      
    }    
]    