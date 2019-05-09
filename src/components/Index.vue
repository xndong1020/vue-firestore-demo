<template>
  <div class="index container">
    <div v-if="error">{{ error }}</div>
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
      <div class="card-title indigo-text">{{ smoothie.title }}</div>
      <div class="card-content">
        <ul class="ingredients">
          <li v-for="(ingredient, idx) in smoothie.ingredients" :key="idx">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
        <a href class="btn-floating btn-large halfway-fab pink">
          <router-link :to="{ name: 'edit-smoothie', params: { slug: smoothie.slug }}">
            <i class="material-icons">edit</i>
          </router-link>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getAll, findById, deleteById } from "@/services/smoothiesService";
export default {
  name: "Index",
  data() {
    return {
      smoothies: [],
      error: ""
    };
  },
  methods: {
    async deleteSmoothie(id) {
      try {
        await deleteById(id);
        this.smoothies = this.smoothies.filter(smoothie => smoothie.id !== id);
      } catch (err) {
        this.error = error;
      }
    }
  },
  async created() {
    try {
      const smoothies = await getAll();
      this.smoothies = smoothies;
    } catch (err) {
      this.error = error;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  .card-title {
    margin-top: 30px;
  }
  .ingredients {
    margin: 30px auto;
    li {
      display: inline-block;
    }
  }
  .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
}
</style>
