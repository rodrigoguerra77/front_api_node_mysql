<template lang="html">
  <div class="courses">
    <h1 class="text-center title">Courses</h1>

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col md="6" class="my-1">
          <b-button class="btn-send" v-b-modal.modalPrevent>Create Course</b-button>
          <b-modal
            id="modalPrevent"
            ref="modal"
            title="Create Course"
            @ok="handleOk"
          >
            <form @submit.stop.prevent="handleSubmit">
              <label for="name">Name</label><b-form-input type="text" placeholder="Enter the course name" v-model="newItem.name" />
              <label for="description">Description</label><b-form-input type="text" placeholder="Enter the course description" v-model="newItem.description" />
              <label for="start">Start date</label><b-form-input type="date" v-model="newItem.start" />
              <label for="end">End date</label><b-form-input type="date" v-model="newItem.end" />
              <label for="status">Status</label><b-form-input type="text" v-model="newItem.status" disabled/>
              <label for="students">Students</label><b-form-input type="number" v-model="newItem.students" />
            </form>
          </b-modal>
        </b-col>
        <b-col md="6" class="my-1">
          <b-form-group label-cols-sm="3" label="" class="mb-0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Type to Search" />
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group>
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Main table element -->
      <b-table responsive
        show-empty
        stacked="sm"
        :striped="striped"
        :borderless="borderless"
        :hover="hover"
        :dark="dark"
        :items="items"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >

        <template slot="row-details" slot-scope="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <b-row>
        <b-col md="6" class="my-1">
          <b-pagination
            :total-rows="totalRows"
            :per-page="perPage"
            v-model="currentPage"
            class="my-0"
          />
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
  const items = [
    { status: 'Creada', students: 40, name: 'Vue JS 2', description : 'The Progressive JavaScript Framework', start : '03/03/2019', end : '04/04/2019' },
    { status: 'Corriendo', students: 21, name: 'Angular JS', description : 'Superheroic JavaScript MVW Framework', start : '10/02/2019', end : '15/03/2019' },
    { status: 'Finalizada', students: 9, name: 'React JS', description : 'A JavaScript library for building user interfaces', start : '02/01/2019', end : '14/02/2019' },
    { status: 'Corriendo', students: 89, name: 'Laravel', description : 'The PHP Framework For Web Artisans', start : '10/02/2019', end : '15/03/2019' },
    { status: 'Creada', students: 38, name: 'Bootstrap', description : 'The most popular HTML, CSS, and JS library in the world', start : '03/03/2019', end : '04/04/2019' },
    { status: 'Finalizada', students: 27, name: 'Wordpress', description : 'The most powerful CMS', start : '02/01/2019', end : '14/02/2019' },
    { status: 'Creada', students: 40, name: 'Node JS', description : 'Is an execution environment for JavaScript built with the Chrome V8 JavaScript engine', start : '03/03/2019', end : '04/04/2019' },
    { status: 'Creada', students: 87, name: 'Mondo DB', description : 'Open Source Document Database', start : '03/03/2019', end : '04/04/2019' },
    { status: 'Finalizada', students: 26, name: 'MySQL', description : 'It is a relational database management system', start : '02/01/2019', end : '14/02/2019' },
    { status: 'Corriendo', students: 22, name: 'Postgresql', description : 'The world´s most advanced open source database', start : '10/02/2019', end : '15/03/2019' },
    { status: 'Creada', students: 38, name: '.NET', description : 'NET is a developer platform with tools and libraries for building any type of app, including web, mobile, desktop, gaming, IoT, cloud, and microservices', start : '03/03/2019', end : '04/04/2019' },
    { status: 'Finalizada', students: 29, name: 'ASP', description : 'is a Microsoft technology of the "server side" type for dynamically generated web pages', start : '02/01/2019', end : '14/02/2019' }
  ]

  export default {
    name: 'courses',
    data() {
      return {
        items: items,
        newItem : {
          status : 'Creada'
        },
        fields: [
          { key: 'name', label: 'Name', sortDirection: 'desc' },
          { key: 'description', label: 'Description' },
          { key: 'start', label: 'Start date', class: 'text-center' },
          { key: 'end', label: 'End date', class: 'text-center' },
          { key: 'status', label: 'Status', class: 'text-center' },
          { key: 'students', label: 'Students', class: 'text-center' }
        ],
        currentPage: 1,
        perPage: 5,
        totalRows: items.length,
        sortDirection: 'asc',
        filter: null,
        striped: true,
        borderless: true,
        hover: true,
        dark: true
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      handleOk(evt) {
        // Prevent modal from closing
        evt.preventDefault()
        //if (!this.name) {
        //  alert('Please enter your name')
        //} else {
          this.handleSubmit()
        //}
      },
      handleSubmit() {
        this.items.push(this.newItem)
        this.newItem = {}
        this.$refs.modal.hide()
      }
    }
  }
</script>

<style lang="css" scoped>
  .title {
    color: #42b983;
    font-weight: bold;
    padding: 15px;
  }

  .btn-send {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }

</style>
