const menuData = [
  {
    id: 1,
    name: 'AREPAS',
    items: [
      {
        id: 1,
        name: 'Pollo',
        description: 'Arepa rellena de pollo mechado',
        price: 7500,
        image: '/images/arepa-pollo.jpg',
        isPromo: false
      },
      {
        id: 2,
        name: 'Carne Mechada',
        description: 'Arepa rellena de carne mechada',
        price: 7500,
        image: '/images/arepa-carne.jpg',
        isPromo: false
      },
      {
        id: 3,
        name: 'Bondiola al vino',
        description: 'Arepa rellena de bondiola al vino',
        price: 7500,
        image: '/images/arepa-bondiola.jpg',
        isPromo: false
      },
      {
        id: 4,
        name: 'Queso',
        description: 'Arepa rellena de queso',
        price: 7500,
        image: '/images/arepa-queso.jpg',
        isPromo: false
      },
      {
        id: 5,
        name: 'Pabellon',
        description: 'Arepa con carne mechada, plátano maduro, queso y poroto negro',
        price: 7800,
        image: '/images/arepa-pabellon.jpg',
        isPromo: false
      },
      {
        id: 6,
        name: 'Reina',
        description: 'Arepa con pollo, palta y mayonesa',
        price: 7700,
        image: '/images/arepa-reina.jpg',
        isPromo: false
      },
      {
        id: 7,
        name: 'Rubia',
        description: 'Arepa con pollo mechado y queso amarillo',
        price: 7700,
        image: '/images/arepa-rubia.jpg',
        isPromo: false
      },
      {
        id: 8,
        name: 'Pelua',
        description: 'Arepa con carne mechada y queso amarillo',
        price: 7700,
        image: '/images/arepa-pelua.jpg',
        isPromo: false
      },
      {
        id: 9,
        name: 'Rumbera',
        description: 'Arepa con bondiola al vino y queso amarillo',
        price: 7700,
        image: '/images/arepa-rumbera.jpg',
        isPromo: false
      },
      {
        id: 10,
        name: 'Sifrina',
        description: 'Arepa con reina pepiada y queso amarillo',
        price: 7700,
        image: '/images/arepa-sifrina.jpg',
        isPromo: false
      },
      {
        id: 11,
        name: 'Perico',
        description: 'Arepa con huevo revuelto, tomate y cebolla',
        price: 7500,
        image: '/images/arepa-perico.jpg',
        isPromo: false
      },
      {
        id: 12,
        name: 'Chorizo ahumado con queso',
        description: 'Arepa con chorizo ahumado y queso',
        price: 7800,
        image: '/images/arepa-chorizo.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 2,
    name: 'TEQUEÑOS',
    items: [
      {
        id: 13,
        name: 'Box 1 (6 tequeños + salsa)',
        description: '6 tequeños acompañados con salsa',
        price: 6000,
        image: '/images/tequenos-6.jpg',
        isPromo: false
      },
      {
        id: 14,
        name: 'Box 2 (12 tequeños + salsa)',
        description: '12 tequeños acompañados con salsa',
        price: 12000,
        image: '/images/tequenos-12.jpg',
        isPromo: false
      },
      {
        id: 15,
        name: 'Box 3 (2 tequeyoyos + salsa)',
        description: '2 tequeyoyos XL (queso con plátano maduro) acompañados con salsa',
        price: 7000,
        image: '/images/tequeyoyos.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 3,
    name: 'EMPANADAS',
    items: [
      {
        id: 16,
        name: 'Queso',
        description: 'Empanada rellena de queso',
        price: 4000,
        image: '/images/empanada-queso.jpg',
        isPromo: false
      },
      {
        id: 17,
        name: 'Jamon y queso',
        description: 'Empanada rellena de jamón y queso',
        price: 4000,
        image: '/images/empanada-jamon.jpg',
        isPromo: false
      },
      {
        id: 18,
        name: 'Mechada',
        description: 'Empanada rellena de carne mechada',
        price: 4000,
        image: '/images/empanada-carne.jpg',
        isPromo: false
      },
      {
        id: 19,
        name: 'Pollo',
        description: 'Empanada rellena de pollo',
        price: 4000,
        image: '/images/empanada-pollo.jpg',
        isPromo: false
      },
      {
        id: 20,
        name: 'Domino',
        description: 'Empanada de poroto negro con queso',
        price: 4000,
        image: '/images/empanada-domino.jpg',
        isPromo: false
      },
      {
        id: 21,
        name: 'Pabellon',
        description: 'Empanada con carne mechada, plátano maduro, queso y poroto negro',
        price: 4300,
        image: '/images/empanada-pabellon.jpg',
        isPromo: false
      },
      {
        id: 22,
        name: 'Pollo con queso',
        description: 'Empanada de pollo con queso',
        price: 4000,
        image: '/images/empanada-pollo-queso.jpg',
        isPromo: false
      },
      {
        id: 23,
        name: 'Mechada y queso',
        description: 'Empanada de carne mechada con queso',
        price: 4000,
        image: '/images/empanada-mechada-queso.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 4,
    name: 'CACHAPAS',
    items: [
      {
        id: 24,
        name: 'Cachapa con queso',
        description: 'Cachapa elaborada a base de choclo con queso llanero',
        price: 6500,
        image: '/images/cachapa-queso.jpg',
        isPromo: false
      },
      {
        id: 25,
        name: 'Cachapa con Carne y Queso',
        description: 'Cachapa elaborada a base de choclo con queso y carne mechada',
        price: 8900,
        image: '/images/cachapa-carne.jpg',
        isPromo: false
      },
      {
        id: 26,
        name: 'Cachapa con Bondiola y queso',
        description: 'Cachapa elaborada a base de choclo con queso y bondiola al vino',
        price: 8900,
        image: '/images/cachapa-bondiola.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 5,
    name: 'PANCHOS',
    items: [
      {
        id: 27,
        name: 'Pancho argentino',
        description: 'Pancho clásico estilo argentino',
        price: 2600,
        image: '/images/pancho-argentino.jpg',
        isPromo: false
      },
      {
        id: 28,
        name: 'Perro Clasico',
        description: 'Hot dog clásico con condimentos',
        price: 4600,
        image: '/images/perro-clasico.jpg',
        isPromo: false
      },
      {
        id: 29,
        name: 'Perro Especial',
        description: 'Hot dog especial con ingredientes premium',
        price: 5800,
        image: '/images/perro-especial.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 6,
    name: 'PEPITOS',
    items: [
      {
        id: 30,
        name: 'Guaro',
        description: 'Lomo, suprema de pollo, panceta, papas pay, queso muzza, tártara, mayonesa, queso de año',
        price: 15500,
        image: '/images/pepito-guaro.jpg',
        isPromo: false
      },
      {
        id: 31,
        name: 'Granjero',
        description: 'Lomo, suprema de pollo, papas pay, queso muzza, tártara, mayonesa, queso de año, choclo y bacón',
        price: 15800,
        image: '/images/pepito-granjero.jpg',
        isPromo: false
      },
      {
        id: 32,
        name: 'Llanero',
        description: 'Lomo, suprema de pollo, papas pay, queso muzza, tártara, mayonesa, queso de año, choclo y chorizo ahumado',
        price: 16000,
        image: '/images/pepito-llanero.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 7,
    name: 'POSTRES',
    items: [
      {
        id: 33,
        name: 'Torta 3 leches',
        description: 'Tradicional torta tres leches',
        price: 5500,
        image: '/images/torta-3leches.jpg',
        isPromo: false
      },
      {
        id: 34,
        name: 'Quesillo',
        description: 'Tradicional quesillo venezolano',
        price: 4500,
        image: '/images/quesillo.jpg',
        isPromo: false
      },
      {
        id: 35,
        name: 'Rolls canela chocolate',
        description: 'Rolls de canela con chocolate',
        price: 3500,
        image: '/images/rolls-chocolate.jpg',
        isPromo: false
      },
      {
        id: 36,
        name: 'Rolls canela Nutella',
        description: 'Rolls de canela con Nutella',
        price: 3500,
        image: '/images/rolls-nutella.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 8,
    name: 'BEBIDAS SIN ALCOHOL',
    items: [
      {
        id: 37,
        name: 'Malta +58',
        description: 'Bebida de malta +58',
        price: 2500,
        image: '/images/malta-58.jpg',
        isPromo: false
      },
      {
        id: 38,
        name: 'Rekomalta',
        description: 'Bebida de malta Rekomalta',
        price: 2500,
        image: '/images/rekomalta.jpg',
        isPromo: false
      },
      {
        id: 39,
        name: 'Malta Caracas',
        description: 'Bebida de malta Caracas',
        price: 2800,
        image: '/images/malta-caracas.jpg',
        isPromo: false
      },
      {
        id: 40,
        name: 'Malta Maracucha',
        description: 'Bebida de malta Maracucha',
        price: 2500,
        image: '/images/malta-maracucha.jpg',
        isPromo: false
      },
      {
        id: 41,
        name: 'Frescolita',
        description: 'Refresco Frescolita',
        price: 2800,
        image: '/images/frescolita.jpg',
        isPromo: false
      },
      {
        id: 42,
        name: 'Rekolita',
        description: 'Refresco Rekolita',
        price: 2300,
        image: '/images/rekolita.jpg',
        isPromo: false
      },
      {
        id: 43,
        name: 'Rekopiña',
        description: 'Refresco Rekopiña',
        price: 2300,
        image: '/images/rekopina.jpg',
        isPromo: false
      },
      {
        id: 44,
        name: 'Rekomanzana',
        description: 'Refresco Rekomanzana',
        price: 2300,
        image: '/images/rekomanzana.jpg',
        isPromo: false
      },
      {
        id: 45,
        name: 'Coca lata',
        description: 'Coca Cola en lata',
        price: 2000,
        image: '/images/coca-lata.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 9,
    name: 'JUGOS NATURALES',
    items: [
      {
        id: 46,
        name: 'Jugo Maracuya',
        description: 'Jugo natural de maracuyá',
        price: 4000,
        image: '/images/jugo-maracuya.jpg',
        isPromo: false
      },
      {
        id: 47,
        name: 'Panela con Limón',
        description: 'Refrescante bebida de panela con limón',
        price: 4000,
        image: '/images/panela-limon.jpg',
        isPromo: false
      },
      {
        id: 48,
        name: 'Jugo de Guayaba',
        description: 'Jugo natural de guayaba',
        price: 4000,
        image: '/images/jugo-guayaba.jpg',
        isPromo: false
      }
    ]
  },
  {
    id: 10,
    name: 'ADICIONALES',
    items: [
      {
        id: 49,
        name: 'Tartara',
        description: 'Salsa tártara',
        price: 1100,
        image: '/images/tartara.jpg',
        isPromo: false
      },
      {
        id: 50,
        name: 'Salsa Ajo',
        description: 'Salsa de ajo',
        price: 1100,
        image: '/images/salsa-ajo.jpg',
        isPromo: false
      },
      {
        id: 51,
        name: 'Picante',
        description: 'Salsa picante',
        price: 1500,
        image: '/images/picante.jpg',
        isPromo: false
      },
      {
        id: 52,
        name: 'Guasacaca',
        description: 'Salsa guasacaca',
        price: 1100,
        image: '/images/guasacaca.jpg',
        isPromo: false
      }
    ]
  }
];

// Validación de la estructura de datos
if (!Array.isArray(menuData)) {
  console.error('Error: menuData debe ser un array');
}

menuData.forEach((category, index) => {
  if (!category.id || !category.name || !Array.isArray(category.items)) {
    console.error(`Error en la categoría ${index}:`, category);
  }
});

// Exportación por defecto
export default menuData;