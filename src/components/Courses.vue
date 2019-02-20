<template lang="html">
  <div class="courses">
    <h1 class="text-center title">Courses</h1>

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <create-courses></create-courses>
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
        @refreshData="refreshList"
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
  import http from "../http-common";
  import CreateCourses from "./CreateCourses.vue";

  const items = [];

  export default {
    components: {
      CreateCourses
    },
    name: 'courses',
    data() {
      return {
        items: items,
        fields: [
          { key: 'courses_name', label: 'Name', sortDirection: 'desc' },
          { key: 'courses_descrption', label: 'Description' },
          { key: 'courses_start_date', label: 'Start date', class: 'text-center' },
          { key: 'courses_final_date', label: 'End date', class: 'text-center' },
          { key: 'status_description', label: 'Status', class: 'text-center' },
          { key: 'courses_students', label: 'Students', class: 'text-center' }
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
      retrieveCourses() {
      http
        .get("/")
        .then(response => {
          this.items = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      },
      refreshList() {
        this.retrieveCourses();
      }
    },
    mounted() {
      this.retrieveCourses();
    }
  }
</script>

<style lang="css" scoped>
  .title {
    color: #42b983;
    font-weight: bold;
    padding: 15px;
  }

</style>
