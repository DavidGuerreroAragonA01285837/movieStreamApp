// Estructura de base de datos MovieStream en NoSQL (MongoDB) creada por
// David Guerrero Aragon A01285837

use('MovieStreamPlayground');

db.dropDatabase();

db.createCollection('genre',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["genre_id", "name"],
      properties: {
        genre_id: {
          bsonType: "number"
        },
        name: {
          bsonType: "string"
        }
      }
    }
  }
});

// Se decidio relacionar la coleccion de genero con la de peliculas embebiendo el id y nombre del genero debido a que
// el nombre es crucial ya que es lo que uno como humano entiende y le numbereresa, y el id es la forma en la que uno dentro
// de un sistema puede acceder a mas informacion del genero en caso de que exista o sea necesario. Estos se ingresaron en una lista
// ya que una pelicula puede llegar a tener mas de un genero.
db.createCollection('movie', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["sku", "title", "genre", "list_price", "movie_id", "views", "summary"],
      properties: {
        sku: {
          bsonType: "string"
        },
        title: {
          bsonType: "string"
        },
        genre: {
          bsonType: "array",
          items: {
            bsonType: "object",

            required: ["genre_id", "name"],

            properties: {
              genre_id: {
                bsonType: "number"
              },
              name: {
                bsonType: "string"
              }
            }
          }
        },
        list_price: {
          bsonType: "number"
        },
        movie_id: {
          bsonType: "number"
        },
        views: {
          bsonType: "number"
        },
        summary: {
          bsonType: "string"
        }
      }
    }
  }
});

db.createCollection('customer_segment', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["segment_id", "name"],
      properties: {
        segment_id: {
          bsonType: "number"
        },
        name: {
          bsonType: "string"
        }
      }
    }
  }
});

// Aqui se determino que la forma en la que se relacionaria la coleccionde cliente con la de segmento seria embebiendo el semgento
// dentro del cliente. Esto ya que el segmento cuenta con una baja cantidad de datos lo cual permite que toda la informacion
// sea accesible dentro del cliente sin requerir de una llamada adicional y sin explotar la cantidad de informacion que se esta 
// embebiendo.
db.createCollection('customer', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["cust_id", "last_name", "first_name", "email", "street_address", "postal_code", "city", "country", "age", "gender", "segment_id"],
      properties: {
        cust_id: {
          bsonType: "number"
        },
        last_name: {
          bsonType: "string"
        },
        first_name: {
          bsonType: "string"
        },
        email: {
          bsonType: "string"
        },
        street_address: {
          bsonType: "string"
        },
        postal_code: {
          bsonType: "string"
        },
        city: {
          bsonType: "string"
        },
        country: {
          bsonType: "string"
        },
        age: {
          bsonType: "number"
        },
        gender: {
          bsonType: "string"
        },
        segment_id: {
          bsonType: "object",
          required: ["segment_id", "name"],
          properties: {
            segment_id: {
              bsonType: "number"
            },
            name: {
              bsonType: "string"
            }
          }
        }
      }
    }
  }
});

// Para esta coleccion se determino que la mejor forma de relacionarla con la coleccione de cliente seria por medio de
// una vista reducida que en lugar de identificar al cliente como individuo lo identeifica por sus estadisticas lo cual
// facilita la generacion de estadisticas sin necesidad de buscar toda la informacion sobre el cliente ya que esta
// informacion suele ser mas comun para cuestiones de actividad y metricas. Para la cuestion de genero de pelicula se decidio 
// embebir los generos completo debido a su reducido tamano y a que es informacion relevante para entender el tipo de actividad
// que se realizo, ademas de incluir el id para obtener mas datos de ser necesario. Para la cuestion de pelicula se incluyo
// solo el nombre y genero ya que son los datos mas comunes que se ocupen para realizar metricas sin tener que traer toda la
// informacion de la pelicula.
db.createCollection('activity',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["os", "app", "customer", "activity", "genre", "movie", "activity_time"],
    
    properties: {
      os: {
        bsonType: "string"
      },
      app: {
        bsonType: "string"
      },
      customer: {
        bsonType: "object",
        required: ["cust_id", "segment_id", "country", "age", "gender"],
        properties: {
          cust_id: {
            bsonType: "number"
          },
          segment_id: {
            bsonType: "number"
          },
          country: {
            bsonType: "string"
          },
          age: {
            bsonType: "number"
          },
          gender: {
            bsonType: "string"
          }
        }
      },
      activity: {
        bsonType: "string"
      },
      genre: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["genre_id", "name"],
          properties: {
            genre_id: {
              bsonType: "number"
            },
            name: {
              bsonType: "string"
            }
          }
        }
      },
      movie: {
        bsonType: "object",
        required: ["movie_id", "title"],
        properties: {
          movie_id: {
            bsonType: "number"
          },
          title: {
            bsonType: "string"
          }
        }
      },
      activity_time: {
        bsonType: "string"
      }
    }
  }}
});

// Para esta coleccion se decidio relacionarla con la coleccion de cliente unicamente por medio del id del cliente, esto
// debido a que la informacion requerida normalmente para realizar un contacto con el cliente ya viene incluida dentro de
// la coleccion de contacto por lo que no es necesario embebir mas informacion y se puede tratar la coleccion de cliente 
// como una coleccion de referencia para buscar mas informacion del cliente de ser necesario.
// Se decidio mantener esta coleccionya que aunque la coleccion de cliente almacena toda la informacion de contacto, esta
// coleccion es mas enfocada y por lo tanto mas compacta para lo que se requiere y de esa manera reducir la cantidad de datos
// que se tienen que mover para realizar un contacto.
db.createCollection('customer_contact',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["cust_id", "last_name", "first_name", "email", "street_address", "postal_code", "city", "country"],
      properties: {
        cust_id: {
          bsonType: "number"
        },
        last_name: {
          bsonType: "string"
        },
        first_name: {
          bsonType: "string"
        },
        email: {
          bsonType: "string"
        },
        street_address: {
          bsonType: "string"
        },
        postal_code: {
          bsonType: "string"
        },
        city: {
          bsonType: "string"
        },
        country: {
          bsonType: "string"
        }
      }
    }
  }
});

// Se determino eliminar las colecciones de extension de clientes y demografica de cliente ya que la informacion contenida
// ambas colecciones es la misma y ademas ya esta contenida en el cliente por lo que no es necesario repetirla ya que no traen
// consigo el beneficio de colecciones pequenas ya que a pesar de tener un menor tamano que la de cliente estas siguen siendo
// bastante grandes por lo que son datos duplicados sin ningun beneficio.

// Para esta coleccion se decidio el relacionar la informacion del cliente requerida por medio de el embebido de una porcion
// de la informacion del cliente. Esto ya que mucha de la informacion que esta tabla tenia en sql es parte de la tabla de customer
// por lo que se decidio embebir esta informacion para evitar consultas adicionales. En caso de ser requerido se puede usar el 
// cust_id para obtener mas informacion del cliente.
db.createCollection('customer_feedback',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["date", "customer", "customer_comments" ],
      properties: {
        date: {
          bsonType: "string"
        },
        customer: {
          bsonType: "object",
          required: ["cust_id", "city", "country", "state_province", "continent", "email"],
          properties: {
            cust_id: {
              bsonType: "number"
            },
            city: {
              bsonType: "string"
            },
            country: {
              bsonType: "string"
            },
            state_province: {
              bsonType: "string"
            },
            continent: {
              bsonType: "string"
            },
            email: {
              bsonType: "string"
            }
          }
        },
        customer_comments: {
          bsonType: "string"
        }
      }
    }
  }
});

// Para esta coleccion se decidio que la forma de relacionarla con la coleccion de cliente seria por medio del embebido
// de una porcion de la informacion. Esta porcion se enfoca en las metricas debido a su importancia a la hora de realizar
// analisis sobre encuestas. Ademas de incluir el id del cliente para poder llamar su documento con mas informacion en caso 
// de requerirlo.
db.createCollection('customer_survey', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["completed_survey", "customer", "rating", "would_recommend", "numbererested_in_premium_tier", "numbererested_in_exclusive_offerings" ],
      properties: {
        completed_survey: {
          bsonType: "string"
        },
        customer: {
          bsonType: "object",
          required: ["cust_id", "segment_id", "country", "age", "gender"],
          properties: {
            cust_id: {
              bsonType: "number"
            },
            segment_id: {
              bsonType: "number"
            },
            country: {
              bsonType: "string"
            },
            age: {
              bsonType: "number"
            },
            gender: {
              bsonType: "string"
            }
          }
        },
        rating: {
          bsonType: "number"
        },
        would_recommend: {
          bsonType: "string"
        },
        numbererested_in_premium_tier: {
          bsonType: "string"
        },
        numbererested_in_exclusive_offerings: {
          bsonType: "string"
        }
      }
    }
  }
});

// En esta coleccion se decidio utilizar el mismo enfoque que en la coleccion de actividad. Enfocandose en realizar embebidos
// parciales de la informacion del cliente debido al gran tamano de toda la informacion y que el enfoque regular de esta
// coleccion es de analisis de metricas por lo que la informacion embebida incluye las caracteristicas del cliente.
// Para la parte de genero se decidio embebir un array de generos completos debido al pequeno tamano de estos.
// Finalmente para la cuestion de la pelicula se decidio embebir solo el nombre y id ya que la coleccion de pelicula
// no tiene tanta informacion para metricas y con el nombre basta y el id de pelicula para poder obtener mas informacion de
// ser requerido
db.createCollection('custsales', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["day_id", "genres", "movie", "customer", "app", "os", "payment_method", "actual_price", "list_price", "discount_type", "discount_percent"],
      properties: {
        day_id: {
          bsonType: "string"
        },
        genres: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["genre_id", "name"],
            properties: {
              genre_id: {
                bsonType: "number"
              },
              name: {
                bsonType: "string"
              }
            }
          }
        },
        movie: {
          bsonType: "object",
          required: ["movie_id", "title"],
          properties: {
            movie_id: {
              bsonType: "number"
            },
            title: {
              bsonType: "string"
            }
          }
        },
        customer: {
          bsonType: "object",
          required: ["cust_id", "segment_id", "country", "age", "gender"],
          properties: {
            cust_id: {
              bsonType: "number"
            },
            segment_id: {
              bsonType: "number"
            },
            country: {
              bsonType: "string"
            },
            age: {
              bsonType: "number"
            },
            gender: {
              bsonType: "string"
            }
          }
        },
        app: {
          bsonType: "string"
        },
        os: {
          bsonType: "string"
        },
        payment_method: {
          bsonType: "string"
        },
        actual_price: {
          bsonType: "number"
        },
        list_price: {
          bsonType: "number"
        },
        discount_type: {
          bsonType: "string"
        },
        discount_percent: {
          bsonType: "number"
        }
      }
    }
  }
});

// Nuevamente para esta coleccion se decidio relacionarla con la coleccion de clientes por medio de un embebido parcial.
// Este embebido se enfoca en la informacion relevante para metricas. Asimismo se almacena tambien el id del cliente para
// obtener mas informacion de ser necesario.
db.createCollection('user_sessions', {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customer", "session_id", "start_time", "end_time", "elapsed_time"],
      properties: {
        customer: {
          bsonType: "object",
          required: ["cust_id", "segment_id", "country", "age", "gender"],
          properties: {
            cust_id: {
              bsonType: "number"
            },
            segment_id: {
              bsonType: "number"
            },
            country: {
              bsonType: "string"
            },
            age: {
              bsonType: "number"
            },
            gender: {
              bsonType: "string"
            }
          }
        },
        session_id: {
          bsonType: "string"
        },
        start_time: {
          bsonType: "string"
        },
        end_time: {
          bsonType: "string"
        },
        elapsed_time: {
          bsonType: "number"
        }
      }
    }
  }
});

// Como esta coleccion no tiene relacion con ninguna otra se crea de forma sencilla sin embebidos ni referencias.
db.createCollection('weather',{
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["location", "zipcode", "reported_date", "wind_avg", "precipitation", "snow", "snowdepth", "temp_max", "temp_min"],
      properties: {
        location: {
          bsonType: "string"
        },
        zipcode: {
          bsonType: "string"
        },
        reported_date: {
          bsonType: "string"
        },
        wind_avg: {
          bsonType: "number"
        },
        precipitation: {
          bsonType: "number"
        },
        snow: {
          bsonType: "number"
        },
        snowdepth: {
          bsonType: "number"
        },
        temp_max: {
          bsonType: "number"
        },
        temp_min: {
          bsonType: "number"
        }
      }
    }
  }
});

// Inicializacion de datos Dummy

// =========================
// GENRES
// =========================
db.genre.insertMany([
  { genre_id: 1, name: "Action" },
  { genre_id: 2, name: "Comedy" },
  { genre_id: 3, name: "Drama" },
  { genre_id: 4, name: "Sci-Fi" },
  { genre_id: 5, name: "Horror" }
]);

// =========================
// CUSTOMER SEGMENTS
// =========================
db.customer_segment.insertMany([
  { segment_id: 1, name: "Free" },
  { segment_id: 2, name: "Premium" },
  { segment_id: 3, name: "Student" }
]);

// =========================
// MOVIES (20)
// =========================
db.movie.insertMany([
  {
    sku: "MOV001",
    title: "Neon Shadows",
    genre: [
      { genre_id: 1, name: "Action" },
      { genre_id: 4, name: "Sci-Fi" }
    ],
    list_price: 19.99,
    movie_id: 1,
    views: 1200,
    summary: "Starring Ethan Cole and Mia Rivers, a cyberpunk detective uncovers a city conspiracy."
  },
  {
    sku: "MOV002",
    title: "Laughing Again",
    genre: [{ genre_id: 2, name: "Comedy" }],
    list_price: 14.99,
    movie_id: 2,
    views: 800,
    summary: "Starring Daniel Brooks and Chloe Hart, a comedian rebuilds his career."
  },
  {
    sku: "MOV003",
    title: "Silent Echoes",
    genre: [{ genre_id: 3, name: "Drama" }],
    list_price: 17.99,
    movie_id: 3,
    views: 640,
    summary: "Sophia Lane and Liam Turner reconnect after years apart."
  },
  {
    sku: "MOV004",
    title: "Dark Signal",
    genre: [
      { genre_id: 4, name: "Sci-Fi" },
      { genre_id: 5, name: "Horror" }
    ],
    list_price: 21.50,
    movie_id: 4,
    views: 1400,
    summary: "Emma Blake and Noah Reed receive a terrifying signal from space."
  },
  {
    sku: "MOV005",
    title: "Fast Horizon",
    genre: [{ genre_id: 1, name: "Action" }],
    list_price: 18.00,
    movie_id: 5,
    views: 1750,
    summary: "Jason Cruz and Olivia Stone uncover a smuggling ring."
  },
  {
    sku: "MOV006",
    title: "Campus Chaos",
    genre: [{ genre_id: 2, name: "Comedy" }],
    list_price: 13.50,
    movie_id: 6,
    views: 930,
    summary: "Three students accidentally become numberernet celebrities."
  },
  {
    sku: "MOV007",
    title: "Broken Letters",
    genre: [{ genre_id: 3, name: "Drama" }],
    list_price: 16.99,
    movie_id: 7,
    views: 500,
    summary: "A journalist discovers hidden family secrets."
  },
  {
    sku: "MOV008",
    title: "Quantum Drift",
    genre: [{ genre_id: 4, name: "Sci-Fi" }],
    list_price: 22.99,
    movie_id: 8,
    views: 2200,
    summary: "Scientists open a portal to another reality."
  },
  {
    sku: "MOV009",
    title: "The Basement Door",
    genre: [{ genre_id: 5, name: "Horror" }],
    list_price: 15.99,
    movie_id: 9,
    views: 980,
    summary: "Teenagers discover something terrifying underground."
  },
  {
    sku: "MOV010",
    title: "Steel Justice",
    genre: [{ genre_id: 1, name: "Action" }],
    list_price: 20.00,
    movie_id: 10,
    views: 1800,
    summary: "An ex-cop hunts down a corrupt corporation."
  },
  {
    sku: "MOV011",
    title: "Weekend Disaster",
    genre: [{ genre_id: 2, name: "Comedy" }],
    list_price: 12.99,
    movie_id: 11,
    views: 720,
    summary: "Friends survive the worst vacation of their lives."
  },
  {
    sku: "MOV012",
    title: "Autumn Rain",
    genre: [{ genre_id: 3, name: "Drama" }],
    list_price: 15.49,
    movie_id: 12,
    views: 430,
    summary: "Two strangers meet during a difficult season."
  },
  {
    sku: "MOV013",
    title: "Orbit Seven",
    genre: [{ genre_id: 4, name: "Sci-Fi" }],
    list_price: 24.99,
    movie_id: 13,
    views: 2300,
    summary: "A mission to Saturn goes horribly wrong."
  },
  {
    sku: "MOV014",
    title: "Night Screams",
    genre: [{ genre_id: 5, name: "Horror" }],
    list_price: 16.50,
    movie_id: 14,
    views: 1180,
    summary: "A radio station broadcasts voices from the dead."
  },
  {
    sku: "MOV015",
    title: "Zero Mercy",
    genre: [{ genre_id: 1, name: "Action" }],
    list_price: 18.99,
    movie_id: 15,
    views: 1600,
    summary: "A mercenary protects a witness from assassins."
  },
  {
    sku: "MOV016",
    title: "Office Therapy",
    genre: [{ genre_id: 2, name: "Comedy" }],
    list_price: 11.99,
    movie_id: 16,
    views: 610,
    summary: "Employees rebel against their absurd manager."
  },
  {
    sku: "MOV017",
    title: "Fading Lights",
    genre: [{ genre_id: 3, name: "Drama" }],
    list_price: 17.49,
    movie_id: 17,
    views: 520,
    summary: "An aging musician struggles with fame and regret."
  },
  {
    sku: "MOV018",
    title: "Nano Wars",
    genre: [
      { genre_id: 1, name: "Action" },
      { genre_id: 4, name: "Sci-Fi" }
    ],
    list_price: 23.99,
    movie_id: 18,
    views: 2050,
    summary: "Nanotechnology becomes humanity's greatest threat."
  },
  {
    sku: "MOV019",
    title: "The Last Cabin",
    genre: [{ genre_id: 5, name: "Horror" }],
    list_price: 14.49,
    movie_id: 19,
    views: 860,
    summary: "Travelers become trapped in a haunted cabin."
  },
  {
    sku: "MOV020",
    title: "Midnight Circuit",
    genre: [
      { genre_id: 1, name: "Action" },
      { genre_id: 2, name: "Comedy" }
    ],
    list_price: 19.49,
    movie_id: 20,
    views: 1340,
    summary: "Two hackers accidentally become fugitives."
  }
]);

// =========================
// CUSTOMERS (15)
// =========================
db.customer.insertMany([
  {
    cust_id: 1,
    last_name: "Garcia",
    first_name: "Luis",
    email: "luis@email.com",
    street_address: "Av. Central 100",
    postal_code: "64000",
    city: "Monterrey",
    country: "Mexico",
    age: 24,
    gender: "Male",
    segment_id: {
      segment_id: 2,
      name: "Premium"
    }
  },
  {
    cust_id: 2,
    last_name: "Martinez",
    first_name: "Ana",
    email: "ana@email.com",
    street_address: "Calle Norte 23",
    postal_code: "44100",
    city: "Guadalajara",
    country: "Mexico",
    age: 29,
    gender: "Female",
    segment_id: {
      segment_id: 1,
      name: "Free"
    }
  },
  {
    cust_id: 3,
    last_name: "Lopez",
    first_name: "Carlos",
    email: "carlos@email.com",
    street_address: "Insurgentes 55",
    postal_code: "03100",
    city: "CDMX",
    country: "Mexico",
    age: 21,
    gender: "Male",
    segment_id: {
      segment_id: 3,
      name: "Student"
    }
  },
  {
    cust_id: 4,
    last_name: "Smith",
    first_name: "Emily",
    email: "emily@email.com",
    street_address: "Sunset Blvd 12",
    postal_code: "90001",
    city: "Los Angeles",
    country: "USA",
    age: 32,
    gender: "Female",
    segment_id: {
      segment_id: 2,
      name: "Premium"
    }
  },
  {
    cust_id: 5,
    last_name: "Brown",
    first_name: "James",
    email: "james@email.com",
    street_address: "Main Street 45",
    postal_code: "77001",
    city: "Houston",
    country: "USA",
    age: 41,
    gender: "Male",
    segment_id: {
      segment_id: 1,
      name: "Free"
    }
  },
  {
    cust_id: 6,
    last_name: "Fernandez",
    first_name: "Lucia",
    email: "lucia@email.com",
    street_address: "Av. Reforma 90",
    postal_code: "06000",
    city: "CDMX",
    country: "Mexico",
    age: 27,
    gender: "Female",
    segment_id: {
      segment_id: 2,
      name: "Premium"
    }
  },
  {
    cust_id: 7,
    last_name: "Taylor",
    first_name: "Michael",
    email: "michael@email.com",
    street_address: "King Road 77",
    postal_code: "SW1A",
    city: "London",
    country: "UK",
    age: 36,
    gender: "Male",
    segment_id: {
      segment_id: 1,
      name: "Free"
    }
  },
  {
    cust_id: 8,
    last_name: "Kim",
    first_name: "Soo",
    email: "soo@email.com",
    street_address: "River Street 18",
    postal_code: "04524",
    city: "Seoul",
    country: "South Korea",
    age: 22,
    gender: "Female",
    segment_id: {
      segment_id: 3,
      name: "Student"
    }
  },
  {
    cust_id: 9,
    last_name: "Muller",
    first_name: "Hans",
    email: "hans@email.com",
    street_address: "Bahnhofstrasse 5",
    postal_code: "10115",
    city: "Berlin",
    country: "Germany",
    age: 30,
    gender: "Male",
    segment_id: {
      segment_id: 2,
      name: "Premium"
    }
  },
  {
    cust_id: 10,
    last_name: "Silva",
    first_name: "Maria",
    email: "maria@email.com",
    street_address: "Rua Azul 10",
    postal_code: "01000",
    city: "Sao Paulo",
    country: "Brazil",
    age: 26,
    gender: "Female",
    segment_id: {
      segment_id: 1,
      name: "Free"
    }
  },
  {
    cust_id: 11,
    last_name: "White",
    first_name: "Olivia",
    email: "olivia@email.com",
    street_address: "Oak Avenue 6",
    postal_code: "10001",
    city: "New York",
    country: "USA",
    age: 34,
    gender: "Female",
    segment_id: {
      segment_id: 2,
      name: "Premium"
    }
  },
  {
    cust_id: 12,
    last_name: "Perez",
    first_name: "Diego",
    email: "diego@email.com",
    street_address: "Av. del Sol 80",
    postal_code: "64010",
    city: "Monterrey",
    country: "Mexico",
    age: 20,
    gender: "Male",
    segment_id: {
      segment_id: 3,
      name: "Student"
    }
  },
  {
    cust_id: 13,
    last_name: "Johnson",
    first_name: "Emma",
    email: "emma@email.com",
    street_address: "Maple Road 90",
    postal_code: "20001",
    city: "Washington",
    country: "USA",
    age: 28,
    gender: "Female",
    segment_id: {
      segment_id: 2,
      name: "Premium"
    }
  },
  {
    cust_id: 14,
    last_name: "Torres",
    first_name: "Sofia",
    email: "sofia@email.com",
    street_address: "Calle Luna 11",
    postal_code: "72000",
    city: "Puebla",
    country: "Mexico",
    age: 31,
    gender: "Female",
    segment_id: {
      segment_id: 1,
      name: "Free"
    }
  },
  {
    cust_id: 15,
    last_name: "Anderson",
    first_name: "Noah",
    email: "noah@email.com",
    street_address: "Lake View 4",
    postal_code: "60601",
    city: "Chicago",
    country: "USA",
    age: 38,
    gender: "Male",
    segment_id: {
      segment_id: 2,
      name: "Premium"
    }
  }
]);

// =========================
// ACTIVITIES
// =========================
db.activity.insertMany([
  {
    os: "Windows",
    app: "Web",
    customer: {
      cust_id: 1,
      segment_id: 2,
      country: "Mexico",
      age: 24,
      gender: "Male"
    },
    activity: "VIEW",
    genre: [
      { genre_id: 1, name: "Action" },
      { genre_id: 4, name: "Sci-Fi" }
    ],
    movie: {
      movie_id: 1,
      title: "Neon Shadows"
    },
    activity_time: "2026-05-01T20:30:00"
  },
  {
    os: "Android",
    app: "Mobile",
    customer: {
      cust_id: 2,
      segment_id: 1,
      country: "Mexico",
      age: 29,
      gender: "Female"
    },
    activity: "VIEW",
    genre: [
      { genre_id: 2, name: "Comedy" }
    ],
    movie: {
      movie_id: 6,
      title: "Campus Chaos"
    },
    activity_time: "2026-05-02T18:15:00"
  },
  {
    os: "iOS",
    app: "Mobile",
    customer: {
      cust_id: 3,
      segment_id: 3,
      country: "Mexico",
      age: 21,
      gender: "Male"
    },
    activity: "VIEW",
    genre: [
      { genre_id: 4, name: "Sci-Fi" }
    ],
    movie: {
      movie_id: 8,
      title: "Quantum Drift"
    },
    activity_time: "2026-05-03T22:10:00"
  }
]);

// =========================
// CUSTOMER SURVEYS
// =========================
db.customer_survey.insertMany([
  {
    completed_survey: "2026-05-01",
    customer: {
      cust_id: 1,
      segment_id: 2,
      country: "Mexico",
      age: 24,
      gender: "Male"
    },
    rating: 5,
    would_recommend: "Yes",
    numbererested_in_premium_tier: "Already Premium",
    numbererested_in_exclusive_offerings: "Yes"
  },
  {
    completed_survey: "2026-05-02",
    customer: {
      cust_id: 2,
      segment_id: 1,
      country: "Mexico",
      age: 29,
      gender: "Female"
    },
    rating: 4,
    would_recommend: "Yes",
    numbererested_in_premium_tier: "Yes",
    numbererested_in_exclusive_offerings: "No"
  }
]);

// =========================
// CUSTOMER FEEDBACK
// =========================
db.customer_feedback.insertMany([
  {
    date: "2026-05-01",
    customer: {
      cust_id: 1,
      city: "Monterrey",
      country: "Mexico",
      state_province: "Nuevo Leon",
      continent: "North America",
      email: "luis@email.com"
    },
    customer_comments: "Excellent movie catalog and smooth streaming."
  },
  {
    date: "2026-05-02",
    customer: {
      cust_id: 4,
      city: "Los Angeles",
      country: "USA",
      state_province: "California",
      continent: "North America",
      email: "emily@email.com"
    },
    customer_comments: "The horror recommendations are really good."
  }
]);

// =========================
// SALES
// =========================
db.custsales.insertMany([
  {
    day_id: "2026-05-01",
    genres: [
      { genre_id: 1, name: "Action" },
      { genre_id: 4, name: "Sci-Fi" }
    ],
    movie: {
      movie_id: 1,
      title: "Neon Shadows"
    },
    customer: {
      cust_id: 1,
      segment_id: 2,
      country: "Mexico",
      age: 24,
      gender: "Male"
    },
    app: "Web",
    os: "Windows",
    payment_method: "Credit Card",
    actual_price: 14.99,
    list_price: 19.99,
    discount_type: "Premium Discount",
    discount_percent: 25.0
  },
  {
    day_id: "2026-05-02",
    genres: [
      { genre_id: 5, name: "Horror" }
    ],
    movie: {
      movie_id: 14,
      title: "Night Screams"
    },
    customer: {
      cust_id: 4,
      segment_id: 2,
      country: "USA",
      age: 32,
      gender: "Female"
    },
    app: "Mobile",
    os: "iOS",
    payment_method: "PayPal",
    actual_price: 12.37,
    list_price: 16.50,
    discount_type: "Weekend Discount",
    discount_percent: 25.0
  }
]);

// =========================
// USER SESSIONS
// =========================
db.user_sessions.insertMany([
  {
    customer: {
      cust_id: 1,
      segment_id: 2,
      country: "Mexico",
      age: 24,
      gender: "Male"
    },
    session_id: "SES001",
    start_time: "2026-05-01T20:00:00",
    end_time: "2026-05-01T22:00:00",
    elapsed_time: 120
  },
  {
    customer: {
      cust_id: 4,
      segment_id: 2,
      country: "USA",
      age: 32,
      gender: "Female"
    },
    session_id: "SES002",
    start_time: "2026-05-04T22:30:00",
    end_time: "2026-05-05T00:00:00",
    elapsed_time: 90
  }
]);

// =========================
// WEATHER
// =========================
db.weather.insertMany([
  {
    location: "Monterrey",
    zipcode: "64000",
    reported_date: "2026-05-01",
    wind_avg: 12.5,
    precipitation: 0.0,
    snow: 0.0,
    snowdepth: 0.0,
    temp_max: 35.0,
    temp_min: 24.0
  },
  {
    location: "Los Angeles",
    zipcode: "90001",
    reported_date: "2026-05-02",
    wind_avg: 8.2,
    precipitation: 0.0,
    snow: 0.0,
    snowdepth: 0.0,
    temp_max: 28.0,
    temp_min: 18.0
  }
]);