<template>
  <v-layout row wrap>
      <v-flex xs12>
          <v-card>
              <v-card-title>
                  Users management
                  <v-spacer></v-spacer>
                  <v-text-field
                          v-model="search"
                          append-icon="search"
                          label="Search"
                          single-line
                          hide-details
                  ></v-text-field>
              </v-card-title>
              <v-data-table
                      :headers="oUserTable.headers"
                      :items="users"
                      :loading="isUsersLoading"
                      class="elevation-1"
                      :search="search"
              >
                  <template slot="items" slot-scope="props">
                      <td class="text-xs-right">
                          <v-avatar
                                  :tile="false"
                                  :size="96"
                                  class="grey lighten-4"
                          >
                              <img :src="getGravatar(props.item.email)" alt="avatar">
                          </v-avatar>
                      </td>
                      <td class="text-xs-center">{{ props.item.email }}</td>
                      <td class="text-xs-center">{{ buildRoles(props.item.roles) }}</td>
                      <td class="text-xs-center">{{ props.item.provider }}</td>
                      <td class="text-xs-center"><p>Connected accounts ici</p></td>
                      <td class="text-xs-center">{{ props.item.created }}</td>
                      <td class="text-xs-center"><p>Actions ici</p></td>
                  </template>
                  <v-alert slot="no-results" :value="true" color="error" icon="warning">
                      Your search for "{{ search }}" found no results.
                  </v-alert>
              </v-data-table>
          </v-card>
      </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import gravatarHelper from '@/helpers/gravatar'

const oStoreUser = Vuex.createNamespacedHelpers('user')

export default {
  name: 'Dashboard',
  watch: {
    users (newVal, oldVal) {
      console.log(newVal)
      this.isUsersLoading = false
      this.users = newVal
    }
  },
  data () {
    return {
      search: '',
      isUsersLoading: true,
      users: [],
      oUserTable: {
        headers: [
          {
            text: 'Avatar',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'email', value: 'email' },
          { text: 'roles', value: 'roles' },
          { text: 'provider', value: 'provider' },
          { text: 'Connected accounts', value: 'connected_accounts' },
          { text: 'created', value: 'created' },
          { text: 'actions', value: 'actions' }
        ]
      }
    }
  },
  computed: {
    ...oStoreUser.mapGetters({
      user: 'user'
    })
  },
  mounted () {
    this.loadUsers()
  },
  methods: {
    loadUsers () {
      let sUrl = this.$store.getters['api_url'] + '/users'
      let oHeaders = {headers: {Authorization: 'Bearer ' + this.$store.getters['auth/token']}}

      axios.get(sUrl, oHeaders).then(oResponse => Vue.set(this, 'users', oResponse.data.data), reason => console.log(reason))
    },
    save (newValue) {
      let payload = { content: newValue }
      if (typeof this.edited_todo._id !== 'undefined') {
        payload._id = this.edited_todo._id
      }
      this.$store.dispatch('todo/createOrUpdateTodo', payload)
    },
    buildRoles (aRoles) {
      let sOutput = ''
      for (let i in aRoles) {
        let oRole = aRoles[i]
        sOutput += oRole.name
      }
      return sOutput
    },
    getGravatar (sEmail) {
      return gravatarHelper(sEmail, 200)
    }
  }
}
</script>
