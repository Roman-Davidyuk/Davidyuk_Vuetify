<template>
  <v-container>
    <h1>Моя група</h1>

    <v-form @submit.prevent="addOrUpdateStudent">
      <v-row>
        <v-col cols="12" sm="3">
          <v-text-field v-model="newStudent.name" label="ПІП" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field
            v-model.number="newStudent.birthYear"
            label="Рік народження"
            type="number"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field v-model="newStudent.phone" label="Телефон" required></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <v-text-field
            v-model="newStudent.email"
            label="Email"
            type="email"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn color="primary" type="submit" :disabled="!isFormValid">
            {{ editMode ? 'Оновити' : 'Додати' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <v-text-field
      v-model="search"
      label="Пошук"
      prepend-icon="mdi-magnify"
      class="mt-4"
    ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="students"
      :search="search"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon @click="editStudent(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteStudent(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { Faker, uk } from '@faker-js/faker'

const faker = new Faker({ locale: [uk] })

export default {
  name: 'MyGroup',
  data() {
    return {
      search: '',
      students: Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        name: faker.person.fullName(),
        birthYear: faker.date.birthdate({ min: 1995, max: 2005, mode: 'year' }).getFullYear(),
        phone: faker.phone.number(),
        email: faker.internet.email(),
      })),
      headers: [
        { title: 'ПІП', key: 'name', sortable: true },
        { title: 'Рік народження', key: 'birthYear', sortable: true },
        { title: 'Телефон', key: 'phone', sortable: true },
        { title: 'Email', key: 'email', sortable: true },
        { title: 'Дії', key: 'actions', sortable: false },
      ],
      newStudent: {
        id: null,
        name: '',
        birthYear: null,
        phone: '',
        email: '',
      },
      editMode: false,
    }
  },
  computed: {
    isFormValid() {
      return (
        this.newStudent.name.trim() &&
        this.newStudent.birthYear &&
        this.newStudent.phone.trim() &&
        this.newStudent.email.trim()
      )
    },
  },
  methods: {
    addOrUpdateStudent() {
      if (!this.isFormValid) return

      if (this.editMode) {
        const index = this.students.findIndex((student) => student.id === this.newStudent.id)
        if (index !== -1) {
          this.students[index] = { ...this.newStudent }
        }
        this.editMode = false
      } else {
        const newId = this.students.length ? Math.max(...this.students.map((s) => s.id)) + 1 : 1
        this.students.push({ ...this.newStudent, id: newId })
      }
      this.newStudent = { id: null, name: '', birthYear: null, phone: '', email: '' }
    },
    editStudent(student) {
      this.newStudent = { ...student }
      this.editMode = true
    },
    deleteStudent(id) {
      this.students = this.students.filter((student) => student.id !== id)
    },
  },
}
</script>
