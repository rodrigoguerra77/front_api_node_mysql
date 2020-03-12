<template lang="html">
  <b-col md="6" class="my-1">
    <b-button class="btn-send" v-b-modal.modalPrevent>Create Course</b-button>
    <b-modal
      id="modalPrevent"
      ref="modal"
      title="Create Course"
      @ok="handleOk"
    >
      <form @submit.stop.prevent="handleSubmit">
        <label for="name">Name</label><b-form-input type="text" placeholder="Enter the course name" v-model="newItem.courses_name" />
        <label for="description">Description</label><b-form-input type="text" placeholder="Enter the course description" v-model="newItem.courses_descrption" />
        <label for="start">Start date</label><b-form-input type="date" v-model="newItem.courses_start_date" />
        <label for="end">End date</label><b-form-input type="date" v-model="newItem.courses_final_date" />
        <label for="students">Students</label><b-form-input type="number" v-model="newItem.courses_students" />
      </form>
    </b-modal>
  </b-col>
</template>

<script>
  import http from "../http-common";

  export default {
    name: 'create-courses',
    data() {
      return {
        submitted: false,
        newItem : {
          courses_id : 0,
          status_id : 1
        },
      }
    },
    methods: {
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
          courses_id: 0,
          courses_name: this.newItem.courses_name,
          courses_descrption: this.newItem.courses_descrption,
          courses_descrption: this.newItem.courses_descrption,
          courses_start_date: this.newItem.courses_start_date,
          courses_final_date: this.newItem.courses_final_date,
          courses_students: this.newItem.courses_students,
          status_id: 1,
        };
        http
        .post("/courses/create", data)
        .then(response => {
          this.newItem.courses_id = response.data.courses_id;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });

        this.submitted = true;
        //this.items.push(this.newItem)
        //this.newItem = {}
        this.$refs.modal.hide()

      }
    }
  }
</script>

<style lang="css" scoped>
  .btn-send {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }
</style>
