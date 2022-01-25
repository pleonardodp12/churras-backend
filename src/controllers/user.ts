import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import UserModel from '../resources/db/models/User';

export default class UserController {
  async register(request: Request, response: Response) {
    const { name, email, password } = request.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const validateUniqueEmail = { $ne: email }

    const verifyEmail = await UserModel.findOne({
      email,
      validateUniqueEmail,
    })

    if (verifyEmail) return response.json({
      success: false,
      result: "Email já cadastrado!"
    })

    try {
      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      })

      if (!user) {
        return response.json({ success: false, error: 'Erro ao salvar usuário!' })
      }

      return response.json({
        success: true,
        result: "Usuário salvo com sucesso!"
      })
    } catch (error) {
      console.log('ERROR', error)
      return response.json({ success: false, error: error })
    }
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body

    try {
      const user = await UserModel.findOne({
        $or: [{ email }]
      })

      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return response.json({ success: false, error: err })
          }

          if (result) {

            let token = jwt.sign({ email: user.email }, 'verySecretValue', { expiresIn: '1h' })

            return response.json({
              success: true,
              token,
              user: {
                name: user.name,
              },
            })
          } else {
            return response.json({
              success: false,
              result: "Senha incorreta!"
            })
          }
        })
      }

      if (!user) {
        return response.json({ success: false, error: 'Usuário não encontrado!' })
      }

    } catch (error) {
      console.log('ERROR', error)
      return response.json({ success: false, error: error })
    }
  }

}