<template>
  <div class="pa-6">
    <h1>Список покупок</h1>
    <v-text-field
      v-model="newItemTitle"
      label="Додати новий елемент"
      append-icon="mdi-plus"
      @click:append="addNewItem"
      @keyup.enter="addNewItem"
      clearable
    ></v-text-field>

    <v-list>
      <div v-for="item in shoppingList" :key="item.id">
        <v-list-item :class="{ 'bg-deep-purple-darken-1': item.bought, 'list-item': true }">
          <v-list-item-content class="d-flex align-center">
            <v-checkbox
              :model-value="item.bought"
              @change="doneBought(item.id)"
              class="mr-2"
              density="compact"
              hide-details
            ></v-checkbox>
            <v-list-item-title
              :class="{ 'text-decoration-line-through': item.bought, 'list-item-title': true }"
              class="flex-grow-1"
            >
              {{ item.title }}
            </v-list-item-title>
            <v-btn icon @click.stop="deleteItem(item.id)" class="icon-button ml-2">
              <v-icon size="18">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      newItemTitle: '',
      shoppingList: [
        { id: 1, title: 'Bread', bought: false },
        { id: 2, title: 'Milk', bought: false },
        { id: 3, title: 'Eggs', bought: false },
      ],
    }
  },
  methods: {
    doneBought(id) {
      const item = this.shoppingList.find((item) => item.id === id)
      if (item) {
        item.bought = !item.bought
      }
    },
    deleteItem(id) {
      this.shoppingList = this.shoppingList.filter((item) => item.id !== id)
    },
    addNewItem() {
      if (this.newItemTitle.trim()) {
        const newId = this.shoppingList.length
          ? Math.max(...this.shoppingList.map((item) => item.id)) + 1
          : 1
        this.shoppingList.push({
          id: newId,
          title: this.newItemTitle.trim(),
          bought: false,
        })
        this.newItemTitle = ''
      }
    },
  },
}
</script>
