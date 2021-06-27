const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

module.export = {
    Query: {

    },
    Mutation: {
        Signup: async (req, { email, password }) => {
            const hashpass = await bcrypt.hash(password, 10)
            await User.create({
                email,
                hashpass
            })
        },
        Signin: async (req, { email, username, password } ) => {
            const user = await User.findOne({ where: { email } })

            const refreshToken = sign(
                { userId: user.id },
                'reftokensecret',
                { expiresIn: '7d' }
            )

            const accessToken = sign(
                { userId: user.id },
                'acctokensecret',
                { expiresIn: '15min' }

            )
        }
    }
}