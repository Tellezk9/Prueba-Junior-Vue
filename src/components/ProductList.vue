<template>
  <div class="test-container">
    <h1>Crud Productos - Prueba Junior</h1>
    <router-link to="/product/new" class="button-create"
      >Crear Nuevo Producto</router-link
    >
    <table class="product-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>
            ${{
              product.price !== null && product.price !== undefined
                ? parseFloat(product.price)
                : "N/A"
            }}
          </td>
          <td>{{ product.quantity }}</td>
          <td class="actions-column">
            <router-link
              :to="{ name: 'ProductEdit', params: { id: product.id } }"
              class="button-edit"
              >Editar</router-link
            >
            <button @click="deleteProduct(product.id)" class="button-delete">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!isLoading && products.length === 0" class="no-products-message">
      No hay productos disponibles.
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      isLoading: true,
    };
  },
  mounted() {
    console.log("Montando peticion");
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await this.$http.get("/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        alert(
          "Hubo un error al cargar los productos. Asegúrate de que el backend esté funcionando y el CORS configurado."
        );
      } finally {
        this.isLoading = false;
      }
    },
    async deleteProduct(id) {
      if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
        try {
          await this.$http.delete(`/products/${id}`);
          this.products = this.products.filter((product) => product.id !== id);
          alert("Producto eliminado correctamente.");
        } catch (error) {
          console.error("Error al eliminar el producto:", error);
          alert("Hubo un error al eliminar el producto.");
        }
      }
    },
  },
};
</script>

<style scoped>
.product-list-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 25px;
  font-size: 2em;
}

.button-create {
  display: inline-block;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}

.button-create:hover {
  background-color: #218838;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.product-table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.product-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.actions-column {
  white-space: nowrap;
}

.button-edit,
.button-delete {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: inline-block;
  margin-right: 8px;
}

.button-edit {
  background-color: #ffc107;
  color: #333;
}

.button-edit:hover {
  background-color: #e0a800;
}

.button-delete {
  background-color: #dc3545;
  color: white;
}

.button-delete:hover {
  background-color: #c82333;
}

.no-products-message {
  text-align: center;
  margin-top: 30px;
  font-style: italic;
  color: #666;
}
</style>
