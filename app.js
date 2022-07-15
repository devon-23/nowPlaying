const app = Vue.createApp({
    data() {
        return {
            songName: '',
            timestamp: '',
            albumName: '',
            artistName: '',
            username: 'devonbarks',
            gender: '',
            picture: '',
            length: '',
            api_key: "092d316884d8385f35ad8b84f5f42ef8",
        }
    },
    created() {
        setInterval(() => {
          this.getNow();
        }, 1000),
        setInterval(() => {
            this.nowPlaying();
          }, 10000)
    },
    
    methods: {
        getNow: function() {
            const today = new Date();
            var minutes = (today.getMinutes()<10?'0':'') + today.getMinutes()
            var seconds = (today.getSeconds()<10?'0':'') + today.getSeconds()
            const time = today.getHours() + ":" + minutes + ":" + seconds;
            this.timestamp = time;
        },
        async nowPlaying() {
            const res = await fetch(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.username}&api_key=${this.api_key}&format=json&limit=1`)
            const results = await res.json()

            if (results.recenttracks.track[0]["@attr"] !== undefined) {
                this.songName = results.recenttracks.track[0].name
                this.albumName = results.recenttracks.track[0].album.name
                this.artistName = `by ${results.recenttracks.track[0].artist["#text"]}`
                this.picture = results.recenttracks.track[0].image[3]["#text"]
            } else {
                this.songName = "Nothing playing"
                this.albumName = ''
                this.artistName = ''
                this.picture = ''
                this.length = '0'
            }
        }
    }
})

app.mount('#app')