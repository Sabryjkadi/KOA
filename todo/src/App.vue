<template>
  <div id="app">
    <h1 class="subtitle has-text-centered">Bucket List:</h1>

    <hr />
    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" v-model="description" type="text" placeholder="Go to mars..." />
      </div>
      <div class="control">
        <a class="button is-info" @click="addItem" :disabled="!description">Add</a>
      </div>
          <button v-on:click="button">btn </button>    

    </div>
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <div class="columns">
        <input class="column input" v-if="isSelected(item)" v-model="editedDescription" />
        <p v-else class="column">
          <span class="tag is-primary">{{ i + 1}}</span>
          {{ item.description }}
        </p>
        <div class="column is-narrow">
          <span
            class="icon has-text-primary"
            @click="isSelected(item) ?  unselect() : select(item)"
          >
            <i class="material-icons">{{isSelected(item) ? 'close': 'edit'}}</i>
          </span>

          <span
            class="icon has-text-info"
            @click="isSelected(item) ? updateItem(item, i) : removeItem(item, i)"
          >
            <i class="material-icons">{{isSelected(item) ? 'save': 'delete'}}</i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {}

    };
  },
    async created() {
        const response = await axios.get("http://localhost:3000/api/notes");
    this.items = response.data;
  },


  async mounted() {
    const response = await axios.get("http://localhost:3000/api/notes");
    this.items = response.data;
  },
  methods: {
    button(){
      window.location.reload()    

    },
    async addItem() {
      const response = await axios.post("http://localhost:3000/api/notes", {
        description: this.description
      });
      
      this.items.push(response.data);
      this.description = "";

    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:3000/api/notes/" + item._id);
      this.items.splice(i, 1);
    },
    
    select(item) {
      console.log("selected")
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      
      return item._id === this.selected._id;
    },
    unselect() {
      console.log("unselect")
      this.selected = {};
      this.editedDescription = "";
    },

    async updateItem(item, i) {
      
      const response = await axios.put("http://localhost:3000/api/notes/" + item._id, {
        description: this.editedDescription
      });
      console.log(response)
      this.items[i] = response.data;
      this.button();

}
  }
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
.icon {
  cursor: pointer;
}
</style>