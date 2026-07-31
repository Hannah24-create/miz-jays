const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const assert = require('node:assert/strict')
const bcrypt = require('bcryptjs')
const { login } = require('../controllers/authController')

function createRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    }
  }
}

test('locks the admin login after three failed attempts', async () => {
  process.env.ADMIN_PASSWORD = 'super-secret'
  process.env.JWT_SECRET = 'test-secret'

  const req = {
    body: { password: 'wrong' },
    headers: {},
    ip: '203.0.113.10'
  }

  const first = createRes()
  const second = createRes()
  const third = createRes()

  await login(req, first)
  await login(req, second)
  await login(req, third)

  assert.equal(first.statusCode, 401)
  assert.equal(second.statusCode, 401)
  assert.equal(third.statusCode, 403)
  assert.match(third.body.message, /temporarily locked/i)
})

test('accepts a stored bcrypt hash as a valid admin credential', async () => {
  const plainPassword = 'correct-password'
  const hashedPassword = bcrypt.hashSync(plainPassword, 10)

  const envPath = path.resolve(__dirname, '..', '.env')
  const original = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''

  try {
    fs.writeFileSync(envPath, `ADMIN_PASSWORD=${hashedPassword}\nJWT_SECRET=test-secret\n`, 'utf8')
    process.env.ADMIN_PASSWORD = ''
    process.env.JWT_SECRET = 'test-secret'

    const req = {
      body: { password: plainPassword },
      headers: {},
      ip: '203.0.113.20'
    }

    const res = createRes()
    await login(req, res)

    assert.equal(res.statusCode, 200)
    assert.ok(res.body.token)
  } finally {
    if (original) {
      fs.writeFileSync(envPath, original, 'utf8')
    } else {
      fs.unlinkSync(envPath)
    }
  }
})

test('reloads the admin password from .env when it changes', async () => {
  const envPath = path.resolve(__dirname, '..', '.env')
  const original = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : ''

  try {
    fs.writeFileSync(envPath, 'ADMIN_PASSWORD=updated-password\nJWT_SECRET=test-secret\n', 'utf8')
    process.env.ADMIN_PASSWORD = ''
    process.env.JWT_SECRET = 'test-secret'

    const req = {
      body: { password: 'updated-password' },
      headers: {},
      ip: '203.0.113.30'
    }

    const res = createRes()
    await login(req, res)

    assert.equal(res.statusCode, 200)
    assert.ok(res.body.token)
  } finally {
    if (original) {
      fs.writeFileSync(envPath, original, 'utf8')
    } else {
      fs.unlinkSync(envPath)
    }
  }
})
