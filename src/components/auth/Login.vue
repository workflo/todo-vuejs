<template>
    <v-form v-model="valid" ref="loginform" lazy-validation>

        <v-btn @click="authenticate('twitter')">Twitter</v-btn>

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
                    @click="login(email, password)"
                    :disabled="!valid"
            >
                submit
            </v-btn>
        </v-layout>
    </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
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
    login (email, password) {
      console.log(email, password)
      this.$store.dispatch('login', {login: email, password}, {})
    },
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function () {
        // Execute application logic after successful social authentication
      })
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