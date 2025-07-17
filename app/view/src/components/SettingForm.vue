<template>
  <div class="setting-form">
      <form @submit.prevent="onSubmit">
          <div class="form-group">
              <label for="username">Username</label>
              <input
                  id="username"
                  v-model="username"
                  type="text"
                  placeholder="Enter a new username"
              />
              <p class="errortext" v-if="errors.username">
                  {{ errors.username }}
              </p>
          </div>

          <div class="form-group">
              <label for="password">Password</label>
              <input
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  required
              />
              <p class="errortext" v-if="errors.password">
                  {{ errors.password }}
              </p>
          </div>
          <div class="form-group">
              <label for="password"> Confirm Password</label>
              <input
                  type="password"
                  v-model="confirmPassword"
                  placeholder="Confirm Password"
                  required
              />
              <p class="errortext" v-if="errors.confirmPassword">
                  {{ errors.confirmPassword }}
              </p>
          </div>

          <div class="form-group">
              <label for="theme">Theme</label>
              <select id="theme" v-model="theme">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
              </select>
          </div>

          <button type="submit" class="btn">Update Profile</button>
          <button
              type="button"
              class="btn btn-danger"
              @click="onDeleteAccount"
          >
              Deactivate Account
          </button>
      </form>
  </div>
</template>

<script>
  import e from 'cors';
import { jwtDecode } from 'jwt-decode';

  var token = localStorage.getItem('token');
  var user = 'username'; // temp placeholder name
  
  if (token)
    user = jwtDecode(token).username;

  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: '',
        theme: 'light', // Default theme
        errors: {
          username: '',
          password: '',
          confirmPassword: ''
        },
      };
    },
    watch: {
      // Watcher for the password
      password(newVal) {
        if (newVal !== this.confirmPassword && this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match!';
        } else {
          this.errors.confirmPassword = '';  // Clear the error if the passwords match
        }
      },
      // Watcher for the confirm password
      confirmPassword(newVal) {
        if (newVal !== this.password) {
          this.errors.confirmPassword = 'Passwords do not match!';
        } else {
          this.errors.confirmPassword = '';  // Clear the error if the passwords match
        }
      },
    },
    methods: {
      onSubmit() {

        // Check if passwords match before sending the form
        if (this.password !== this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match!';

          return; // Stop the submission if the passwords don't match
        } else {
          this.errors.confirmPassword = ''; // Clear the error if the passwords match
        }

        // If no new username was entered
        if (!this.username) {
          this.errors.username = 'New username required!';
          return;
        }

        const username = this.username.toLowerCase();

        fetch('/changeusername', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            curUser: user,
            username: username,
            password: this.password
          })
        })
        .then(response => response.json())
        .then(data => {
          if(!data.success) {
            
            this.errors = {};

            switch (data.message) {
              case 'Username already exists':
                this.errors.username = 'That username already exists!';
                break;

              case 'Update failed':
                this.errors.username = 'Failed to update username, try again!';
                break;

              case 'Incorrect password':
                this.errors.password = 'Incorrect password entered!';
                break;
              
              case 'Login Error':
                this.errors.password = 'An error occured, try again!';
                break
            }
          }
          else {
            // Settings updated successfully, delete the token and ask user to log in again
            localStorage.removeItem('token');

            alert('Settings updated! Please log in again!');

            this.$router.push('/login');
          }
        });
      },
      onDeleteAccount() {
        // Implement account deletion logic here
        if(!this.password || !this.confirmPassword) {
          this.errors.password = 'Password is required for account deletion!';
          return;
        }


        if (confirm('Are you sure you want to delete your account? This cannot be undone!')) {

          fetch('./deleteaccount', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              curUser: user,
              password: this.password
            })
          })
          .then(response => response.json())
          .then(data => {
            if (!data.success) {
              
              switch(data.message) {

                case 'Incorrect password':
                  this.errors.password = 'Incorrect password entered!';
                  break;

                case 'Deletion failed':
                  this.errors.password = 'Deletion failed, please refrsh and try again!';
                  break;

              }
            } 
            else {
              localStorage.removeItem('token');

              alert('Account deleted!');
              this.$router.push('/login');
            }
          })
        }
        else {
          alert('Account not deleted!');
        }
      }
    }
  }
</script>

<style scoped>
  .form-group input,
  .button {
      width: calc(100% - 20px);
      max-width: 300px;
      margin: 10px auto;
  }

  h2 {
      text-align: center;
      margin-bottom: 30px;
  }

  .form-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
  }

  .form-group input {
      width: 100%;
      min-width: 400px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 25px;
  }

  .form-group select {
      width: 100%;
      min-width: 400px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 25px;
      background-color: white;
      cursor: pointer;
  }

  .form-group select:focus {
      border-color: rgb(132, 87, 187);
      outline: none;
  }

  .btn {
      width: 100%;
      max-width: 300px;
      margin: 10px auto;
      display: block;
      background: #ffffff;
      border: 1px solid rgb(132, 87, 187);
      color: #2e2e2e;
      padding: 0.8rem;
      border-radius: 25px;
      cursor: pointer;
  }
  .btn-danger {
      background: #f73737;
      border: 1px solid rgb(255, 255, 255);
      color: #ffffff;
      font-weight: bold;
  }

  .errortext {
      color: red;
      font-size: x-small;
      text-align: center;
      text-align-last: center;
  }

  @media (max-width: 766px) {
      .form-group input,
      .btn {
          width: 70dvw;
          max-width: none;
      }

      .form-group {
          padding: 0 20px;
      }
  }
</style>
