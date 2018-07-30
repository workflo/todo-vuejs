<template>
        <v-tabs
                value="0"
                :grow="true"
        >
            <v-tab key="login" ripple>
                Login
            </v-tab>
            <v-tab-item key="login">
                <v-card flat>
                    <v-card-text>
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
                                    :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (hidePassword = !hidePassword)"
                                    :type="hidePassword ? 'password' : 'text'"
                                    counter
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-btn
                                    type="submit"
                                    :disabled="disableSubmit"
                            >
                                submit
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab key="register" ripple>
                Register
            </v-tab>
            <v-tab-item key="register">
                <v-card flat>
                    <v-card-text>
                        <v-form v-model="valid" ref="loginform" lazy-validation @submit.prevent="register">

                            <v-text-field
                                    label="Enter your e-mail address"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
                            ></v-text-field>
                            <v-text-field
                                    name="input-10-1"
                                    label="Enter your password"
                                    hint="At least 8 characters"
                                    v-model="password"
                                    min="8"
                                    :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (hidePassword = !hidePassword)"
                                    :type="hidePassword ? 'password' : 'text'"
                                    counter
                            ></v-text-field>
                            <v-text-field
                                    name="input-10-1"
                                    label="Confirm your password"
                                    hint="At least 8 characters"
                                    v-model="passwordConfirmation"
                                    min="8"
                                    :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (hidePassword = !hidePassword)"
                                    :type="hidePassword ? 'password' : 'text'"
                                    counter
                            ></v-text-field>
                            <v-spacer></v-spacer>
                            <v-btn
                                    type="submit"
                                    :disabled="disableSubmit"
                            >
                                submit
                            </v-btn>

                        </v-form>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab key="social" ripple>
                Social
            </v-tab>
            <v-tab-item key="social">
                <v-card flat>
                    <v-card-text>
                        <v-btn @click.prevent="socialLogin('google')" :disabled="disableSubmit">
                            Google
                        </v-btn>

                        <v-btn @click.prevent="socialLogin('twitter')" :disabled="disableSubmit">
                            Twitter
                        </v-btn>

                        <v-btn @click.prevent="socialLogin('instagram')" :disabled="disableSubmit">
                            Instagram
                        </v-btn>

                        <v-btn @click.prevent="socialLogin('facebook')" :disabled="disableSubmit">
                            Facebook
                        </v-btn>

                        <v-btn @click.prevent="socialLogin('pinterest')" :disabled="disableSubmit">
                            Pinterest
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from '@/helpers/debounce'

export default {
  name: 'Login',
  data: () => ({
    email: 'test@test.fr',
    password: '235689',
    passwordConfirmation: '235689',
    error: false,
    hidePassword: true,
    disableSubmit: false,
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
  computed: {
    ...mapGetters([
      'backend_host'
    ])
  },
  mounted: function () {
    if (this.email && this.password) {
      this.valid = true
    }
  },
  methods: {
    login () {
      let context = this
      this.disableSubmit = true
      this.$store.dispatch('auth/AUTH_REQUEST', {login: this.email, password: this.password}, {}).then(() => {
        this.disableSubmit = false
        this.$router.push({name: 'todo'})
      }).catch(function (err) {
        if (err) {
          context.disableSubmit = false
        }
      })
    },
    register () {
      let context = this
      this.disableSubmit = true
      this.$store.dispatch('auth/AUTH_REGISTER', {login: this.email, password: this.password, password2: this.passwordConfirmation}, {}).then(() => {
        this.disableSubmit = false
      }).catch(function (err) {
        if (err) {
          context.disableSubmit = false
        }
      })
    },
    socialLogin (sNetwork) {
      let context = this
      let iLeft = (screen.width / 2) - (520 / 2)
      let iTop = (screen.height / 2) - (520 / 2)
      let sWindowFeatures = 'location=yes,height=570,width=520,left=' + iLeft + ',top=' + iTop + ',scrollbars=yes,status=yes'
      window.open(this.backend_host + '/auth/' + sNetwork.toLowerCase(), '_blank', sWindowFeatures)

      // Social auth process
      let fSocialAuth = debounce(function (e) {
        if (e.origin !== context.backend_host) {
          return false
        }

        context.$store.dispatch('auth/EXTERNAL_AUTH_REQUEST', e.data).then(() => {
          context.disableSubmit = false
          window.removeEventListener('message', fSocialAuth, false)
          context.$router.push({ name: 'todo' })
        }).catch(function (err) {
          if (err) {
            context.disableSubmit = false
            window.removeEventListener('message', fSocialAuth, false)
          }
        })
      }, 500)

      // Child window message listener
      window.addEventListener('message', fSocialAuth, false)
    }
  }
}
</script>