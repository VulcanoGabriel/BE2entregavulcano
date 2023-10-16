const fs = require(`fs`);

// Creamos la clase ProductManager

class productManager {
  constructor() {
    //Array donde se van a guardar temporalmente los datos antes de enviarlos al archivo principal para sus modificaciones
    this.listado = [];

    //Ubicacion donde se crea el archivo que contendra la base de datos

    this.path = "./lista.json";
  }

  // Metodo para agregar un producto cumpliendo ciertos requerimientos

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    //Variables

    const listaVar = this.listado;
    const totalId = this.listado.length;

    //Molde objeto del producto a crear

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: totalId + 1,
    };

    //Si nos falta alguna de las propiedades no pasara el testeo

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return "Faltan parametros";
    }

    //Si se repide el codigo del producto no pasara el testeo

    if (this.listado.some((product) => product.code === code)) {
      return `El codigo delproducto ${code} ya esta ingresado`;
    } else {
      this.listado.push(product);
      fs.promises.writeFile(this.path, JSON.stringify(listaVar, null));
    }
  };

  //Metodo para traer los productos cargados en this.path

  getProducts = () => {
    if (fs.existsSync(this.path)) {
      fs.promises.readFile(this.path, `utf-8`).then((contenido) => {
        const conteidoDb = JSON.parse(contenido);
        return conteidoDb;
      });
    }
  };

  //Metodo para traer un producto de this.path por su ID

  getProductById = async (id) => {
    const contenidoDb2 = await fs.promises.readFile(this.path, `utf-8`);
    this.listado = JSON.parse(contenidoDb2);
    const idEncontrada = this.listado.find((idE) => idE.id === id);

    if (idEncontrada) {
      return ` la id encontrada es ${idEncontrada.id} `;
    } else {
      return `no se encontro la ID`;
    }
  };

  //Metodo para actualizar un producto de this.path

  updateProduct = async (idU, campo) => {
    const contenidoDb3 = await fs.promises.readFile(this.path, `utf-8`);

    this.listado = JSON.parse(contenidoDb3);

    //buscamos el ID del producto a actualizar

    let idEncontrada2 = this.listado.find((idE) => idE.id === idU);

    // de existir la ID buscamos el campo a actualizar en el objeto y lo reemplazamos en la ubicacion de this.listado

    for (let llaveCampo in campo) {
      if (idEncontrada2.hasOwnProperty(llaveCampo)) {
        idEncontrada2[llaveCampo] = campo[llaveCampo];
        return `Producto ${idU} actualizado`;
      }
    }

    //escribimos el arhivo con los datos de nuestro listado a su vercion final

    await fs.promises.writeFile(this.path, JSON.stringify(this.listado, null));
  };

  deleteProduct = async (id) => {
    //Leemos el arhivo this.path

    const idEncontrada = await fs.promises.readFile(this.path, `utf-8`);

    //Lo traemos y grabamos en this.listado en formato objeto

    this.listado = JSON.parse(idEncontrada);

    //Filtramos de nuestro listado todo lo que no coincida !==

    const productoFiltado = this.listado.filter(
      (producto) => producto.id !== id
    );

    //escribimos el arhivo this.path con nuestra busqueda de productos filtrados que no coincidieron con la ID quedando solo los que no queremos borrar

    await fs.promises.writeFile(
      this.path,
      JSON.stringify(productoFiltado, null)
    );

    return `producto ${id} eliminado`;
  };
}

//Instancia de testeo

const manager1 = new productManager();

//Funcion que ejecuta todos los metodos con el metodo

const ejecutar = async () => {
  await manager1.addProduct(
    "sadasd",
    "sadsa",
    "sadsa",
    "sadsa",
    "sadsa",
    "sadsa"
  );

  await manager1.addProduct(
    "sadasd",
    "sadsa",
    "sadsa",
    "sadsa",
    "22222",
    "sadsa"
  );

  await manager1.addProduct(
    "sadasd",
    "sadsa",
    "sadsa",
    "sadsa",
    "3333",
    "sadsa"
  );

  await manager1.addProduct(
    "sadasd",
    "sadsa",
    "sadsa",
    "sadsa",
    "sadsa",
    "sadsa"
  );

  await manager1.addProduct(
    "sadasd",
    "sadsa",
    "sadsa",
    "sadsa",
    "sadsa",
    "sadsa"
  );

  await manager1.getProducts();

  manager1.getProductById(2);
  await manager1.updateProduct(1, { price: 5 });

  await manager1.getProducts();

  await manager1.deleteProduct(2);
  await manager1.getProducts();
};

//ejecutamos la funcion anteriormente creada

ejecutar();
