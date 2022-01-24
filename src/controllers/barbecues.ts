import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid'
import BarbecueModel from '../resources/db/models/Barbecue';


export default class BarbecueController {
  async create(request: Request, response: Response) {
    const {
      reason,
      date,
      priceDrink,
      priceWithoutDrink,
    } = request.body

    const barbecueObj = {
      id: uuidv4(),
      reason,
      date,
      priceDrink,
      priceWithoutDrink,
      peoples: [],
    }

    try {
      const barbecue = await BarbecueModel.create(barbecueObj)

      if (!barbecue) {
        return response.status(500).json({ success: false, error: 'Houve um erro' })
      }

      return response.status(200).json({
        success: true,
        result: barbecue,
      })
    } catch (error) {
      console.log('ERROR', error)
      return response.status(500).json({ success: false, error: error })
    }
  }

  async get(request: Request, response: Response) {
    try {
      const barbecues = await BarbecueModel.find({})

      if (!barbecues) {
        return response.status(500).json({ success: false, error: 'Houve um erro' })
      }

      return response.status(200).json({
        success: true,
        result: barbecues,
      })
    } catch (error) {
      console.log('ERROR', error)
      return response.status(500).json({ success: false, error: error })
    }
  }

  async index(request: Request, response: Response) {
    const { id } = request.params

    try {
      const responseBarbecue = await BarbecueModel.findOne({
        id,
      })

      if (!responseBarbecue) {
        return response.status(500).json({ success: false, error: 'Falha ao tentar achar o churras' })
      }

      return response.status(200).json({
        success: true,
        result: responseBarbecue,
      })
    } catch (error) {
      console.log('ERROR', error)
      return response.status(500).json({ success: false, error: error })
    }
  }

  async insertPeople(request: Request, response: Response) {
    const { id } = request.params
    const { name, drink, amountToPay } = request.body

    const validateUniqueName = { $ne: name }

    try {
      const responseBarbecue = await BarbecueModel.updateOne({
        id,
        'peoples.name': validateUniqueName
      }, {
        $push: {
          peoples: {
            name,
            drink,
            amountToPay,
            confirm: false
          }
        }
      })

      if (!responseBarbecue.nModified) {
        return response.status(200).json({ success: false, error: 'Falha ao inserir participante' })
      }

      return response.status(200).json({
        success: true,
        result: responseBarbecue,
      })
    } catch (error) {
      console.log('ERROR', error)
      return response.status(500).json({ success: false, error: error })
    }
  }

  async confirmPresense(request: Request, response: Response) {
    const { id } = request.params
    const { peoples } = request.body

    try {
      const responseBarbecue = await BarbecueModel.updateOne({
        id,
      }, {
        $set: {
          'peoples': peoples
        }

      })

      if (!responseBarbecue) {
        return response.status(500).json({ success: false, error: 'Falha ao atualizar o churras' })
      }

      return response.status(200).json({
        success: true,
        result: peoples,
      })
    } catch (error) {
      console.log('ERROR', error)
      return response.status(500).json({ success: false, error: error })
    }
  }
}