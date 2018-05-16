<template>
    <v-container fluid>

        <v-flex xs12 sm6 offset-sm3>
            <v-form ref="form" lazy-validation v-on:submit.prevent="updateUser">
                <v-card>
                    <v-card-title primary-title>

                        <v-layout row wrap>
                            <v-flex xs12 class="text-xs-center">
                                <v-avatar
                                        :tile="false"
                                        :size="200"
                                        class="grey lighten-4"
                                >
                                    <img :src="getGravatar(editedUser.email)" alt="avatar">
                                </v-avatar>
                            </v-flex>

                            <v-flex xs6>
                                <v-text-field
                                        name="profile.firstname"
                                        label="Firstname"
                                        single-line
                                        prepend-icon="account_circle"
                                        v-model="editedUser.profile.firstname"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs6>
                                <v-text-field
                                        name="profile.lastname"
                                        label="Lastname"
                                        single-line
                                        prepend-icon="account_circle"
                                        v-model="editedUser.profile.lastname"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs4>
                                <v-subheader>Email</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                        name="email"
                                        label="Email"
                                        single-line
                                        prepend-icon="mail"
                                        :disabled="true"
                                        v-model="editedUser.email"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs4>
                                <v-subheader>Website</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                        name="profile.url"
                                        label="Website"
                                        single-line
                                        prepend-icon="link"
                                        v-model="editedUser.profile.url"
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs4>
                                <v-subheader>Gender</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-select
                                        name="profile.gender"
                                        label="Gender"
                                        prepend-icon="link"
                                        :items="genders"
                                        :rules="[v => !!v || 'Gender is required']"
                                        v-model="editedUser.profile.gender"
                                        required
                                ></v-select>
                            </v-flex>

                            <v-flex xs4>
                                <v-subheader>Bio</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-text-field
                                        name="profile.bio"
                                        label="Bio"
                                        prepend-icon="info_outline"
                                        v-model="editedUser.profile.bio"
                                        multi-line
                                ></v-text-field>
                            </v-flex>

                            <v-flex xs4>
                                <v-subheader>Language</v-subheader>
                            </v-flex>
                            <v-flex xs8>
                                <v-select
                                        name="profile.lang"
                                        label="Language"
                                        prepend-icon="language"
                                        :items="languages"
                                        :rules="[v => !!v || 'Language is required']"
                                        v-model="editedUser.profile.lang"
                                        required
                                ></v-select>
                            </v-flex>
                        </v-layout>

                    </v-card-title>
                    <v-card-actions>
                        <v-btn type="submit">Update</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-flex>
    </v-container>
</template>

<script>
import Vuex from 'vuex'
import gravatarHelper from '@/helpers/gravatar'

const oStoreUser = Vuex.createNamespacedHelpers('user')

export default {
  name: 'Profile',
  data () {
    return {
      languages: ['english', 'french'],
      genders: ['male', 'female'],
      editedUser: {
        email: '',
        profile: {
          firstname: '',
          lastname: '',
          gender: 'male',
          lang: 'english',
          bio: ''
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
      let oClonedUser = Object.assign({}, JSON.parse(JSON.stringify(newVal)))
      this.editedUser = oClonedUser
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('user/USER_REQUEST', { user_id: localStorage.getItem('user_id') }, {root: true})
    })
  },
  methods: {
    updateUser (oEvent) {
      this.$store.dispatch('user/updateUser', this.editedUser, {root: true})
    },
    getGravatar (sEmail) {
      return gravatarHelper(sEmail, 200)
    }
  }
}
</script>
