<template>
    <v-form v-model="valid" ref="loginform" lazy-validation @submit.prevent="login">


        <v-flex xs12 sm6 offset-sm3>
            <h1 class="headline mt-3">Login</h1>

            <v-card>
                <v-card-text>
                    <div>
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
                                :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                                :append-icon-cb="() => (hidePassword = !hidePassword)"
                                :type="hidePassword ? 'password' : 'text'"
                                counter
                        ></v-text-field>

                        <v-btn href="https://localhost:3000/auth/google">
                            Twitter
                        </v-btn>

                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            type="submit"
                            :disabled="!valid"
                    >
                        submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>

    </v-form>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    email: 'test@test.fr',
    password: '235689',
    error: false,
    hidePassword: true,
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
      this.$store.dispatch('auth/AUTH_REQUEST', {login: this.email, password: this.password}, {}).then(() => {
        this.$router.push({name: 'todo'})
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