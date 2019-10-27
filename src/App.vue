<template>
  <div id="app">
    <span v-if="!me">플레이어 인식 불가</span>
    <table>
      <tr v-for="entry in counts" :key="entry[0]">
        <td>{{ entry[0] }}</td><td>{{ entry[1] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import listen from './listener'
export default {
  name: 'App',
  data: () => ({ me: 0, counter: {}, ban: [] }),

  mounted () {
    listen(d => {
      const m = `on${d.type.substr(0, 1).toUpperCase()}${d.type.substr(1)}`
      if (typeof this[m] === 'function') try { this[m](d) } catch (e) { console.error(e) }
    })
  },

  computed: {
    counts () {
      const entries = Object.entries(this.counter)
      entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))

      return entries
    }
  },

  methods: {
    onMe ({ id }) {
      this.me = id
    },

    onCmd ({ args }) {
      args = args.trim().split(' ')

      if (args[0] === 'reset') {
        this.counter = {}
      }

      if (args[0] === 'ban' && args.length > 1) {
        const name = args.slice(1).join(' ').trim()

        this.$delete(this.counter, name)
        if (this.ban.indexOf(name) < 0) this.ban.push(name)
      }
    },

    onKill ({ attacker, victim }) {
      if (attacker.id !== this.me) return
      if (this.ban.indexOf(victim.name) > -1) return

      const count = this.counter[victim.name] || 0
      this.$set(this.counter, victim.name, count + 1)
    }
  }
}
</script>

<style lang="scss">
#app {
  color: white;
  font-size: 14px;
  line-height: 1rem;
  letter-spacing: -0.1rem;
  text-shadow: 0 0 3px #ffc72f;
  font-family: '맑은 고딕', sans-serif;
}

tr td:first-child {
  text-align: right;
  padding-right: 0.3rem;
}

tr td:last-child {
  text-align: left;
}
</style>
