<template>
  <div class="signup-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="onSubmit">
          <div class="form-group">
              <input
                  type="text"
                  v-model="username"
                  placeholder="Username"
                  required
              />
              <p class="errortext" v-if="errors.username">
                  {{ errors.username }}
              </p>
          </div>
          <div class="form-group">
              <input
                  type="email"
                  v-model="email"
                  placeholder="E-mail"
                  required
              />
              <p class="errortext" v-if="errors.email">{{ errors.email }}</p>
          </div>
          <div class="form-group">
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

          <div class="checkbox-group" style="padding: 0.5rem">
              <Checkbox
                  v-model="agreeToTerms"
                  inputId="terms"
                  name="terms"
                  value="terms"
              />
              <label for="terms"
                  >&nbsp; I agree to all the
                  <a
                      href="../assets/UCVME_Terms_and_Conditions.pdf"
                      download="Terms_and_Privacy_Policies.pdf"
                      >Terms and Privacy Policies</a
                  ></label
              >
              <p class="errortext" v-if="errors.terms">{{ errors.terms }}</p>
          </div>

          <button type="submit" class="login-button">Create account</button>
      </form>
      <br />
      <button class="google-sign-in">Sign up with Google</button>
      <br />
      <div class="alternative signup-link">
          <div class="centered-text">
              <p>Already have an account?</p>
              <router-link to="/login">Login</router-link>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
        errors: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: ''
        }
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
      }
    },
    methods: {
      onSubmit() {

        const username = this.username.toLowerCase();
        const email = this.email.toLowerCase();

        if (!this.agreeToTerms) {
          this.errors.terms = "You must agree to the terms and privacy policies!";
          return;
        }

        // Check if passwords match before sending the form
        if (this.password !== this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match!';
          return; // Stop the submission if the passwords don't match
        } else {
          this.errors.confirmPassword = ''; // Clear the error if the passwords match
        }

        // Send POST request to your server
        fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            email: email,
            password: this.password
          })
        })
        .then(response => response.json())
        .then(data => {
          if (!data.success) {
            this.errors = {}; // Reset errors

            switch (data.message) {
              case 'Username already exists':
                this.errors.username = 'Username already exists!';
                break;
              case 'Email already exists':
                this.errors.email = 'Email already exists!';
                break;
              case 'Invalid username':
                this.errors.username = 'Username can only contain characters!';
                break;
              case 'Invalid email address':
                this.errors.email = 'Invalid email format!';
                break;
              case 'Invalid password format':
                this.errors.password = 'Password requires a number, a capital letter, and a special character, and must be at least 8 characters long!';
                break;
            }
          } else {
            // Success logic here
            alert('Signup successful!');

            localStorage.setItem('token', data.token);

            this.$router.push('/CVProcess');
          }
        })
      }
    }
  };
</script>

<style scoped>
  .form-group input,
  .login-button,
  .google-sign-in {
      width: calc(100% - 20px);
      max-width: 300px;
      margin: 10px auto;
  }

  h2 {
      text-align: center;
      margin-bottom: 30px;
  }

  .form-group {
      margin-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .form-group input {
      width: 100%;
      max-width: 300px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 25px;
  }

  .actions {
      align-items: center;
      padding: 0 10%;
      flex-direction: row;
  }

  .checkbox-group {
      text-align: center;
  }

  .forgot-password {
      display: block;
      text-align: center;
      font-size: 12px;
      color: #3498db;
      text-decoration: none;
      margin: 10px 0;
  }

  .forgot-password:hover {
      text-decoration: underline;
  }

  .login-button,
  .google-sign-in {
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

  .signup-link,
  .separator {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 30px;
  }

  .form-separator {
      display: flex;
      align-items: center;
      margin: 20px 0;
  }

  .line {
      flex: 1;
      height: 1px;
      background-color: #ccc;
      margin: 0 10px;
  }

  .or-text {
      color: #aaa;
      white-space: nowrap;
  }

  .errortext {
      color: red;
      font-size: x-small;
      text-align: center;
      text-align-last: center;
  }

  @media (max-width: 1000px) {
      .form-group input,
      .login-button,
      .google-sign-in {
          width: 70dvw;
          max-width: none;
      }

      .form-group,
      .form-separator,
      .signup-link,
      .forgot-password {
          padding: 0 20px;
      }
  }
</style>
