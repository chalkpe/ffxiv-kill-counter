const getHost = () => /HOST_PORT=(wss?:\/\/.+)/.exec(window.location.search)

function listenOverlayPlugin (handler) {
  document.addEventListener('onLogLine', e => {
    const { opcode, payload } = e.detail

    switch (opcode) {
      case 0:
        if (payload[0] === '0038') return handler({ type: 'cmd', args: payload[2] })
        if (payload[0] === '082b') return handler({ type: 'use', message: payload[2] })
        break

      case 2:
        return handler({
          type: 'me',
          id: parseInt(payload[0], 16),
          name: payload[1]
        })

      case 3:
        return handler({
          type: 'add',
          id: payload[0],
          job: payload[2],
          level: parseInt(payload[3], 16),
          server: payload[8]
        })

      case 25:
        return handler({
          type: 'kill',
          victim: { id: parseInt(payload[0], 16), name: payload[1] },
          attacker: { id: parseInt(payload[2], 16), name: payload[3] }
        })
    }
  })
}

function listenACTWebSocket (url, handler) {
  const ws = new WebSocket(url + 'BeforeLogLineRead')
  ws.onerror = () => listenACTWebSocket(url, handler)
  ws.onmessage = function (e, m) {
    if (e.data === '.') return ws.send('.')
    const { msgtype: opcode, msg: payload } = JSON.parse(e.data)

    switch (opcode) {
      case 'SendCharName':
        return handler({
          type: 'me',
          id: payload.charID,
          name: payload.charName
        })

      case 'AddCombatant':
        return handler({
          type: 'add',
          id: payload.id,
          level: payload.level,
          job: payload.job.toString(16)
        })

      case 'Chat':
        m = payload.split('|')
        if (m[0] === '00' && m[2] === '0038') return handler({ type: 'cmd', args: m[4] })
        if (m[0] === '00' && m[2] === '082b') return handler({ type: 'use', message: m[4] })
        if (m[0] === '00' && m[2] === '082b') return handler({ type: 'use', message: m[4] })
        if (m[0] === '03') return handler({ type: 'add', id: parseInt(m[2], 16), job: m[4], level: parseInt(m[5], 16), server: m[10] })
        if (m[0] === '25') return handler({ type: 'kill', victim: { id: parseInt(m[2], 16), name: m[3] }, attacker: { id: parseInt(m[4], 16), name: m[5] } })
    }
  }

  window.addEventListener('unload', () => ws.close())
}

export default function (handler) {
  try {
    const m = getHost()
    if (!m) listenOverlayPlugin(handler)
    else listenACTWebSocket(m[1], handler)
  } catch (err) {
    console.error(err)
  }
}
