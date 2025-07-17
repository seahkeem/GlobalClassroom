<template>
<div>
  <h2>Sign In</h2>
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <input type="text" id="email" v-model="email" placeholder="Email" required>
      <p class="errortext" v-if="errors.email">
        {{ errors.email }}
      </p>
    </div>
    <div class="form-group">
      <input type="password" id="password" v-model="password" placeholder="Password" required>
      <p class="errortext" v-if="errors.password">
        {{ errors.password }}
      </p>
    </div>
    <a href="#" class="forgot-password">Forgot Password?</a>

    <div style="padding: 0.5rem;">
      <div class="checkbox-group" style="padding: 0.5rem;">
        <Checkbox v-model="rememberMe" inputId="rememberMe" name="remember" value="RememberMe" />
        <label for="rememberMe">&nbsp Remember me</label>
      </div>
    </div>
    <button type="submit" class="login-button">Login</button>

    <div class="form-separator">
      <span class="line"></span>
      <span class="or-text">or</span>
      <span class="line"></span>
    </div>
    <button type="button" class="google-sign-in">Sign in with Google</button>
    <div class="signup-link">Don’t have an account? <a href="/signup">Sign up</a></div>
  </form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        errors: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      onSubmit() {
        const email = this.email.toLowerCase();

        fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: this.password,
            rememberMe: this.rememberMe
          })
        })
        .then(response => response.json())
        .then(data => {
          if (!data.success) {

            this.errors = {};

            switch (data.message) {
              case 'User not found':
                this.errors.email = 'Email address does not exist!';
                break;
              case 'Invalid password':
                this.errors.password = 'Invalid password entered!';
                break;
            }

          } else {
            localStorage.setItem('token', data.token);
            this.$router.push('/'); 
          }
        })
        .catch(error => {
          console.error('Error during fetch:', error);
        });
      }
    }
  }
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
