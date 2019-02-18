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
              <b-form-input type="text" v-model="newItem.courses_id" disabled/>
              <label for="name">Name</label><b-form-input type="text" placeholder="Enter the course name" v-model="newItem.courses_name" />
              <label for="description">Description</label><b-form-input type="text" placeholder="Enter the course description" v-model="newItem.courses_descrption" />
              <label for="start">Start date</label><b-form-input type="date" v-model="newItem.courses_start_date" />
              <label for="end">End date</label><b-form-input type="date" v-model="newItem.courses_final_date" />
              <b-form-input type="text" v-model="newItem.status_id" disabled/>
              <label for="students">Students</label><b-form-input type="number" v-model="newItem.courses_students" />
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

  const items = [];

  export default {
    name: 'courses',
    data() {
      return {
        items: items,
        submitted: false,
        newItem : {
          courses_id : 0,
          status_id : 1
        },
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
        var data = {
          courses_id: this.newItem.courses_id,
          courses_name: this.newItem.courses_name,
          courses_descrption: this.newItem.courses_descrption,
          courses_descrption: this.newItem.courses_descrption,
          courses_start_date: this.newItem.courses_start_date,
          courses_final_date: this.newItem.courses_final_date,
          courses_students: this.newItem.courses_students,
          status_id: this.newItem.status_id,
        };
        http
        .post("/", data)
        .then(response => {
          this.items.courses_id = response.data.courses_id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

        this.submitted = true;
        //this.items.push(this.newItem)
        //this.newItem = {}
        this.$refs.modal.hide()

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

  .btn-send {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }

</style>
