<template>
    <v-form v-model="valid" ref="loginform" lazy-validation @submit.prevent="login">

        <v-text-field
                label="Enter your e-mail address"
                v-model="email"
                :rules="emailRules"
                required
        ></v-text-field>
        <v-text-field
                name="input-10-1"
                label="Enter your password"
                hint="At least 6 characters"
                v-model="password"
                min="6"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (showPassword = !showPassword)"
                :type="showPassword ? 'password' : 'text'"
                counter
        ></v-text-field>
        <v-layout justify-end>
            <v-btn
                    type="submit"
                    :disabled="!valid"
            >
                submit
            </v-btn>
        </v-layout>

        <v-snackbar
                :timeout="5000"
                :bottom="true"
                :vertical="true"
                v-model="notification_success"
        >
            Logged in successfully
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>

        <v-snackbar
                :timeout="5000"
                :bottom="true"
                :vertical="true"
                v-model="notification_error"
        >
            Please check your credentials
            <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>

    </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: 'test@test.fr',
    password: '235689',
    notification_success: false,
    notification_error: false,
    error: false,
    showPassword: true,
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters'
    ],
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    ]
  }),
  methods: {
    login () {
      var context = this
      this.$store.dispatch('auth/AUTH_REQUEST', {login: this.email, password: this.password}, {}).then(() => {
        // this.$router.push('/')
        context.notification_success = (context.$store.getters['auth/isAuthenticated'] === true)
        context.notification_error = (context.$store.getters['auth/isAuthenticated'] === false)
      })
    },
    logout () {
      this.$store.dispatch('auth/AUTH_LOGOUT')
    }
    //
    // register: function () {
    //   this.$auth.register({name, email, password }).then(function () {
    //     // Execute application logic after successful registration
    //   })
    // }
  }
}
</script>