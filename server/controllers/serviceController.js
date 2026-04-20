const Service = require('../models/Service')


const getAllServices = async (req, res) => {
    try {
        const service = await Service.find()
        res.json(service)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
        
const getSingleService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({ message: 'Service not found' })
        }
        res.json(service)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body)
        res.status(201).json(service)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
    
}

module.exports ={getAllServices,getSingleService,createService}
