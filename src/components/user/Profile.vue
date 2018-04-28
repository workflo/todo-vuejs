<template>
    <v-container fluid>

        <v-flex xs12 sm6 offset-sm3>
            <v-form ref="form" lazy-validation>
                <v-card>
                    <v-card-title primary-title>

                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-subheader>Language</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-select
                                        name="lang"
                                        label="Language"
                                        prepend-icon="language"
                                        :items="languages"
                                        :rules="[v => !!v || 'Language is required']"
                                        required
                                ></v-select>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-text-field
                                        name="firstname"
                                        label="Firstname"
                                        single-line
                                        prepend-icon="account_circle"
                                        :value="profile.profile.firstname"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs6>
                                <v-text-field
                                        name="lastname"
                                        label="Lastname"
                                        single-line
                                        prepend-icon="account_circle"
                                        :value="profile.profile.lastname"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-subheader>Email</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                        name="email"
                                        label="Email"
                                        single-line
                                        prepend-icon="mail"
                                        :value="profile.email"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-subheader>Website</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                        name="url"
                                        label="Website"
                                        single-line
                                        prepend-icon="link"
                                        :value="profile.profile.url"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-subheader>Gender</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-select
                                        name="gender"
                                        label="Gender"
                                        prepend-icon="link"
                                        :items="genders"
                                        :rules="[v => !!v || 'Gender is required']"
                                        :value="profile.profile.gender"
                                        required
                                ></v-select>
                            </v-flex>
                        </v-layout>

                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-subheader>Bio</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                        name="bio"
                                        label="Bio"
                                        prepend-icon="info_outline"
                                        :value="profile.profile.bio"
                                        multi-line
                                ></v-text-field>
                            </v-flex>
                        </v-layout>

                    </v-card-title>
                    <v-card-actions>
                        <v-btn>Update</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-flex>
    </v-container>
</template>

<script>
import Vuex from 'vuex'

const oStoreUser = Vuex.createNamespacedHelpers('user')

export default {
  name: 'Profile',
  data () {
    return {
      languages: ['english', 'french'],
      genders: ['male', 'female'],
      profile: {
        email: '',
        profile: {
          firstname: '',
          lastname: '',
          gender: 'male'
        }
      }
    }
  },
  computed: {
    ...oStoreUser.mapState({
      user: 'user'
    })
  },
  watch: {
    user: function (newVal) {
      this.profile = newVal
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      // load todo if needed (access by url)
      if (vm.$route.params.id) {
        vm.$store.dispatch('todo/getTodoById', { id: vm.$route.params.id })
      } else {
        console.log('raz')
        vm.$store.dispatch('todo/setEditedTodo', { content: '' })
      }

      vm.$store.dispatch('todo/getTodos')
    })
  },
  beforeRouteUpdate (to, from, next) {
    console.log(this.$route.params.id)
  }
}
</script>
