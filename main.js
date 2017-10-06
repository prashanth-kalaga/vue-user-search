var apiURL = 'https://api.github.com/search/users?q='


Vue.use(VueMaterial)
var demo = new Vue({

  el: '#demo',

  data: {
    search : '',
    searchInput: '',
    preVal : '',
    users:[],
    pagesize : 10,
    all_users : []
  },

  created: function () {
  },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    searchUsers: function (newVal,oldVal) {
      var self = this

      if( self.searchInput.length>=3 ) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', apiURL + self.searchInput)
        xhr.onload = function () {
          var response = JSON.parse(xhr.responseText)
          self.all_users = (response.total_count) && response.items
          self.users = self.all_users.slice(0,self.pagesize)
          console.log(self.users && self.users[0].html_url)
        }
        xhr.send()
      }
    }
  }
})
