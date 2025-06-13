<template>
  <div class="product-form-container">
    <h1>{{ isEditing ? "Editar Producto" : "Crear Nuevo Producto" }}</h1>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>

      <div class="form-group">
        <label for="description">Descripción:</label>
        <textarea id="description" v-model="product.description"></textarea>
      </div>

      <div class="form-group">
        <label for="price">Precio:</label>
        <input
          type="number"
          id="price"
          v-model.number="product.price"
          step="0.01"
          required
        />
      </div>

      <div class="form-group">
        <label for="quantity">Cantidad:</label>
        <input
          type="number"
          id="quantity"
          v-model.number="product.quantity"
          required
        />
      </div>

      <div class="form-actions">
        <button type="submit" class="button-save">
          {{ isEditing ? "Actualizar" : "Guardar" }}
        </button>
        <button type="button" @click="cancel" class="button-cancel">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: 0.0,
        quantity: 1,
      },
      isEditing: false,
    };
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.isEditing = true;
          this.fetchProduct(newId);
        } else {
          this.isEditing = false;
          this.resetForm();
        }
      },
    },
  },
  methods: {
    async fetchProduct(id) {
      try {
        const response = await this.$http.get(`/products/${id}`);
        this.product = response.data;
        this.product.price = parseFloat(this.product.price);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
        alert("No se pudo cargar el producto para editar.");
        this.$router.push({ name: "ProductList" });
      }
    },
    async submitForm() {
      try {
        if (this.isEditing) {
          await this.$http.put(`/products/${this.product.id}`, this.product);
          alert("Producto actualizado correctamente.");
        } else {
          await this.$http.post("/products", this.product);
          alert("Producto creado correctamente.");
        }
        this.$router.push({ name: "ProductList" });
      } catch (error) {
        console.error("Error al guardar el producto:", error);
        const errorMessage =
          error.response?.data?.message ||
          "Hubo un error al guardar el producto.";
        alert(errorMessage);
      }
    },
    resetForm() {
      this.product = {
        name: "",
        description: "",
        price: 0.0,
        quantity: 1,
      };
    },
    cancel() {
      this.$router.push({ name: "ProductList" });
    },
  },
};
</script>

<style scoped>
.product-form-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.2em;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #555;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group textarea {
  width: calc(100% - 24px);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.form-group input[type="number"]::-webkit-inner-spin-button,
.form-group input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
}

.button-save,
.button-cancel {
  padding: 12px 25px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button-save {
  background-color: #007bff;
  color: white;
}

.button-save:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.button-cancel {
  background-color: #6c757d;
  color: white;
}

.button-cancel:hover {
  background-color: #5a6268;
  transform: translateY(-2px);
}
</style>
