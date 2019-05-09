<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Edit Exsiting Smoothie Recipe</h2>
    <form @submit.prevent="handleSubmit">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field" v-for="(ingredient, idx) in ingredients" :key="idx">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[idx]">
        <i class="material-icons delete" @click="deleteIngredient(idx)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an Ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab="addIngredient" v-model="another">
      </div>
      <div>
        <p v-if="message" class="red-text">{{ message }}</p>
      </div>
      <div class="field center-align">
        <button class="btn pink">Save Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
import { findBySlug, update } from "@/services/smoothiesService";
export default {
  name: "EditSmoothie",
  data() {
    return {
      slug: this.$route.params.slug,
      id: null,
      title: null,
      another: null,
      ingredients: [],
      message: null
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.title) {
        this.message = "Please enter a valid title";
        return;
      }
      if (!this.ingredients.length) {
        this.message = "Please enter at least 1 ingredient";
        return;
      }
      this.message = null;
      const smoothie = {
        title: this.title,
        slug: this.slug,
        ingredients: this.ingredients
      };
      try {
        await update(this.id, smoothie);
        this.message = null;
        this.$router.push({ name: "home" });
      } catch (err) {
        this.message = err;
      }
    },
    addIngredient() {
      if (this.another) {
        this.ingredients = [...this.ingredients, this.another];
        // reset another
        this.another = null;
        this.message = null;
      } else {
        this.message = "Please enter a valid name for ingredient";
      }
    },
    deleteIngredient(index) {
      this.ingredients = this.ingredients.filter(
        (ingredient, idx) => idx !== index
      );
    }
  },
  async created() {
    const smoothie = await findBySlug(this.slug);
    const { id, title, ingredients } = smoothie;
    this.id = id;
    this.title = title;
    this.ingredients = ingredients;
  }
};
</script>

<style lang="scss">
.add-smoothie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
  h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .field {
    margin: 20px auto;
  }
  .btn {
    text-transform: uppercase;
  }
  .field {
    position: relative;
  }
  .delete {
    position: absolute;
    font-size: 1.4em;
    bottom: 16px;
    right: 0;
    color: #aaa;
    cursor: pointer;
  }
  .delete:hover {
    color: red;
  }
}
</style>

