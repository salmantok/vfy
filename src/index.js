import assert from 'assert'

const mockedLogs = []
const mockedErrors = []
const originalConsoleLog = console.log
const originalConsoleError = console.error

console.log = (msg) => mockedLogs.push(msg)
console.error = (...msgs) => mockedErrors.push(msgs.join(' '))

const restoreConsole = () => {
  console.log = originalConsoleLog
  console.error = originalConsoleError
}

const getMockedResults = () => ({
  logs: mockedLogs,
  errors: mockedErrors,
})

export const test = (expectedLogs) => {
  return new Promise((resolve, reject) => {
    try {
      assert.deepStrictEqual(
        mockedLogs,
        expectedLogs,
        'Urutan eksekusi tidak sesuai'
      )
      console.log('Pengujian berhasil!', resolve())
    } catch (error) {
      const errorMessage = `PENGUJIAN GAGAL: ~> ${JSON.stringify(
        expectedLogs
      )}, TAPI TIDAK: ~> ${JSON.stringify(mockedLogs)}`
      console.error(errorMessage, reject(error))
    } finally {
      restoreConsole()
      const { logs, errors } = getMockedResults()
      console.log('Mocked logs:', logs)
      console.log('Mocked errors:', errors)
    }
  })
}
