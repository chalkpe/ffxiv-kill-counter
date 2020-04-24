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
      entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      return entries
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
      if (line[0] !== '25') return
      const victim = { name: line[3], id: parseInt(line[2], 16) }
      const attacker = { name: line[5], id: parseInt(line[4], 16) }

      if (attacker.id !== this.me.id) return
      const count = this.counter[victim.name] || 0
      this.$set(this.counter, victim.name, count + 1)
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
