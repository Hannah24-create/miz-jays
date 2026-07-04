const Service = require('../models/Service')

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find()
        res.json(services)
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

const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({ message: 'Service not found' })
        }
        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedService)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
        if (!service) {
            return res.status(404).json({ message: 'Service not found' })
        }
        await service.deleteOne()
        res.json({ message: 'Service deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllServices,
    getSingleService,
    createService,
    updateService,
    deleteService
}