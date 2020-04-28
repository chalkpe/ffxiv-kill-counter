<template>
  <div id="app">
    <table>
      <caption highlighted>
        <span v-if="!me">플레이어 인식 불가!</span>
        <span @click="counter = {}">리셋</span>
        <span @click="collapsed = !collapsed">{{ collapsed ? '펼치기' : '접기' }}</span>
      </caption>

      <transition-group name="counter" tag="tbody">
        <tr
          class="counter-entry"
          v-for="entry in counts"
          :key="entry[0]"
          :collapsed="collapsed"
          :highlighted="highlighted.includes(entry[0])"
          @click="toggleHighlight(entry[0])"
        >
          <td>{{ entry[0] }}</td> <td>{{ entry[1] }}</td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    me: null,
    pets: [],
    counter: {},
    highlighted: [],
    collapsed: false
  }),

  created () {
    this.addOverlayListener('LogLine')
    this.addOverlayListener('ChangePrimaryPlayer')
    window.startOverlayEvents()
  },

  computed: {
    counts () {
      const entries = Object.entries(this.counter)
      return entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    }
  },

  methods: {
    addOverlayListener (type) {
      window.addOverlayListener(type, this[`on${type}`].bind(this))
    },

    onChangePrimaryPlayer ({ charID, charName }) {
      this.me = { name: charName, id: parseInt(charID, 10) }
    },

    onLogLine ({ line }) {
      switch (line[0]) {
        case '00': return this.onGameLogLine(line)
        case '03': return this.onAddCombatant(line)
        case '04': return this.onRemoveCombatant(line)
        case '25': return this.onNetworkDeath(line)
      }
    },

    onGameLogLine (line) {
      switch (line[2].toLowerCase()) {
        case '0b3a':
          const m = /^(.+?)[이가] (.+?)[을를] 쓰러뜨렸습니다\.$/.exec(line[4])
          return m !== null && m[1] === this.me.name && this.count(m[2])
      }
    },

    onAddCombatant (line) {
      const owner = parseInt(line[6], 16)
      if (owner === this.me.id) this.pets.push(parseInt(line[2], 16))
    },

    onRemoveCombatant (line) {
      const index = this.pets.indexOf(parseInt(line[2], 16))
      if (index > -1) this.pets.splice(index, 1)
    },

    onNetworkDeath (line) {
      const victim = { name: line[3], id: parseInt(line[2], 16) }
      const attacker = { name: line[5], id: parseInt(line[4], 16) }

      if (attacker.id === this.me.id) return // detected by game logline
      if (this.pets.includes(attacker.id)) this.count(victim.name)
    },

    count (name) {
      const value = this.counter[name] || 0
      this.$set(this.counter, name, value + 1)
    },

    toggleHighlight (name) {
      const index = this.highlighted.indexOf(name)
      if (index < 0) this.highlighted.push(name)
      else this.highlighted.splice(index, 1)
    }
  }
}
</script>

<style lang="scss">
#app {
  user-select: none;
  color: white;
  font-size: 14px;
  line-height: 1rem;
  letter-spacing: -0.1rem;
  font-family: 'Noto Sans KR', '맑은 고딕', sans-serif;
  text-shadow: 0 0 0.1rem #0090ce, 0 0 0.1rem #0090ce, 0 0 0.1rem #0090ce, 0 0 0.1rem #0090ce;

  [highlighted] {
    text-shadow: 0 0 0.1rem #ffc72f, 0 0 0.1rem #ffc72f;
  }

  table {
    min-width: 6rem;

    .counter-move {
      transition: transform 1s;
    }

    .counter-enter, .counter-leave-to {
      opacity: 0;
      transform: translateX(1rem);
    }

    .counter-entry {
      transition: all 0.5s;

      &[collapsed]:not([highlighted]) {
        display: none;
      }

      td:first-child {
        text-align: right;
        padding-right: 0.3rem;
      }

      td:last-child {
        text-align: left;
      }
    }

    caption {
      margin-bottom: 0.5rem;

      span {
        cursor: pointer;
      }

      span + span {
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
