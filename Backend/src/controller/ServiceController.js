import ServiceModel from "../model/ServiceModel.js";

export const ADD_SERVICE = async (req, res) => {

    const { name, desc, price, category } = req.body

    const image = req.file?.filename

    try {
        const service = new ServiceModel({
            name,
            desc,
            price,
            category,
            image: image
        })

        await service.save()

        return res.status(200).json({ message: "Service was added." })

    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

}

export const GET_ALL_SERVICE = async (req, res) => {
    try {
        const service = await ServiceModel.find().lean()
        return res.status(202).json(service)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}


export const GET_SERVICE = async (req, res) => {
    const id = req.params.id
    try {
        const service = await ServiceModel.findById(id).lean()

        if (!service) return res.status(404).json({ message: "invalid Id" })

        return res.status(202).json({ service, userId: req.user })
    }

    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const DELETE = async (req, res) => {
    const id = req.params.id
    try {
        const filter = await ServiceModel.findByIdAndDelete(id).lean()
        return res.status(202).json({ message: "Delete from Service." })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

export const UPDATE = async (req, res) => {
    try {
        const { name, desc, price } = req.body;
        const updateData = { name, desc, price };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const service = await ServiceModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.json({
            success: true,
            message: "Service Updated Successfully!",
            data: service
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
